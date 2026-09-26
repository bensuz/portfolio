const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

// Isolate the delivery provider: these tests never send an email or use real keys.
const compiled = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../actions/sendEmail.ts"), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  },
).outputText;

function action({
  env = { RESEND_API_KEY: "test-only" },
  send = async () => ({ data: { id: "test-message" }, error: null }),
} = {}) {
  const calls = [];
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    process: { env },
    require(name) {
      if (name === "react") return require("react");
      if (name === "resend")
        return {
          Resend: class {
            emails = {
              send: async (payload) => {
                calls.push(payload);
                return send(payload);
              },
            };
          },
        };
      if (name === "@/email/contact-form-email")
        return { __esModule: true, default: () => null };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return { sendEmail: exports.sendEmail, calls };
}

function message(
  email = "person@example.com",
  content = "I’d like to discuss a development opportunity.",
) {
  const form = new FormData();
  form.set("senderEmail", email);
  form.set("message", content);
  return form;
}

test("rejects invalid email addresses without contacting the provider", async () => {
  const { sendEmail, calls } = action();
  for (const email of [
    "",
    "bad-address",
    "a@b",
    "a\n@b.com",
    `${"a".repeat(250)}@example.com`,
  ]) {
    assert.match((await sendEmail(message(email))).error, /valid email/);
  }
  assert.equal(calls.length, 0);
});

test("rejects empty, whitespace-only, and out-of-range messages", async () => {
  const { sendEmail, calls } = action();
  for (const content of ["", "          ", "short", "a".repeat(5001)]) {
    assert.match(
      (await sendEmail(message("person@example.com", content))).error,
      /between 10 and 5,000/,
    );
  }
  assert.equal(calls.length, 0);
});

test("blocks honeypot submissions without contacting the provider", async () => {
  const { sendEmail, calls } = action();
  const form = message();
  form.set("website", "spam.example");
  assert.ok((await sendEmail(form)).error);
  assert.equal(calls.length, 0);
});

test("offers direct email when delivery is not configured", async () => {
  const { sendEmail, calls } = action({ env: {} });
  assert.match((await sendEmail(message())).error, /elifbensuaslan@gmail.com/);
  assert.equal(calls.length, 0);
});

test("reports success only after delivery is accepted and trims input", async () => {
  const { sendEmail, calls } = action({
    env: {
      RESEND_API_KEY: "test-only",
      RESEND_FROM_EMAIL: "Portfolio <test@example.com>",
    },
  });
  const result = await sendEmail(
    message(" person@example.com ", "  A valid opportunity to discuss.  "),
  );
  assert.equal(result.data.id, "test-message");
  assert.equal(result.error, undefined);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].replyTo, "person@example.com");
  assert.equal(calls[0].react.props.message, "A valid opportunity to discuss.");
  assert.equal(calls[0].from, "Portfolio <test@example.com>");
});

test("does not expose provider failures or report rejected deliveries as success", async () => {
  for (const send of [
    async () => {
      throw new Error("private provider details");
    },
    async () => ({}),
    async () => ({ data: null, error: { name: "validation_error", message: "private provider details" } }),
    async () => ({ data: { id: "ignored" }, error: { name: "application_error", message: "private provider details" } }),
  ]) {
    const { sendEmail } = action({ send });
    const result = await sendEmail(message());
    assert.equal(result.data, undefined);
    assert.match(result.error, /email me directly/);
    assert.doesNotMatch(result.error, /private provider details/);
  }
});
