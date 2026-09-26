// Hero shapes, built from simple primitives. Each primitive gets particles in proportion
// to its weight, so outlines stay crisp and filled areas read as soft surfaces.
//
// - "page": an "exploded" web page, like the 3D layers view in browser dev tools.
// - "git":  a commit graph. Feature branches split off main, commit and merge back.

export type HeroVariant = "git" | "page";

// Which shape the hero shows. Switch to "git" for the commit graph.
export const HERO_VARIANT: HeroVariant = "page";

type Vec3 = [number, number, number];
type Primitive = { weight: number; tone: number; sample: () => Vec3 };

// Tone picks the colour in the shader: 0 → deep violet, 1 → pale lilac, 2 → warm accent.
const TONE = { glass: 0, frame: 0.2, card: 0.45, text: 0.65, glyph: 1, accent: 2 };
const Z = { back: -0.55, page: -0.15, cards: 0.2, glyph: 0.6 };

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function line(x1: number, y1: number, x2: number, y2: number, z: number, tone: number, density = 1): Primitive {
  return {
    weight: Math.hypot(x2 - x1, y2 - y1) * density,
    tone,
    sample: () => {
      const t = Math.random();
      return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, z];
    },
  };
}

// Outline of a rounded rectangle.
function outline(cx: number, cy: number, w: number, h: number, r: number, z: number, tone: number, density = 1): Primitive {
  const sx = w - 2 * r;
  const sy = h - 2 * r;
  const arc = (Math.PI / 2) * r;
  const perimeter = 2 * sx + 2 * sy + 4 * arc;
  return {
    weight: perimeter * density,
    tone,
    sample: () => {
      let s = Math.random() * perimeter;
      const x0 = cx - w / 2;
      const y0 = cy - h / 2;
      if (s < sx) return [x0 + r + s, y0, z];
      s -= sx;
      if (s < sy) return [x0 + w, y0 + r + s, z];
      s -= sy;
      if (s < sx) return [x0 + w - r - s, y0 + h, z];
      s -= sx;
      if (s < sy) return [x0, y0 + h - r - s, z];
      s -= sy;
      const corner = Math.floor(s / arc);
      const a = (s - corner * arc) / r;
      const [ccx, ccy, start] = [
        [x0 + r, y0 + r, Math.PI],
        [x0 + w - r, y0 + r, -Math.PI / 2],
        [x0 + w - r, y0 + h - r, 0],
        [x0 + r, y0 + h - r, Math.PI / 2],
      ][Math.min(corner, 3)];
      return [ccx + Math.cos(start + a) * r, ccy + Math.sin(start + a) * r, z];
    },
  };
}

// A filled rectangle, e.g. a skeleton line of text.
function block(cx: number, cy: number, w: number, h: number, z: number, tone: number, density: number): Primitive {
  return {
    weight: w * h * density,
    tone,
    sample: () => [cx + rand(-w / 2, w / 2), cy + rand(-h / 2, h / 2), z],
  };
}

function disc(cx: number, cy: number, r: number, z: number, tone: number, density: number): Primitive {
  return {
    weight: Math.PI * r * r * density,
    tone,
    sample: () => {
      const a = Math.random() * Math.PI * 2;
      const d = Math.sqrt(Math.random()) * r;
      return [cx + Math.cos(a) * d, cy + Math.sin(a) * d, z];
    },
  };
}

// A thick, slightly volumetric stroke along a polyline.
function stroke(points: [number, number][], z: number, width: number, tone: number, density: number): Primitive {
  const lengths = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  const total = lengths.reduce((a, b) => a + b, 0);
  return {
    weight: total * density,
    tone,
    sample: () => {
      let s = Math.random() * total;
      let i = 0;
      while (i < lengths.length - 1 && s > lengths[i]) s -= lengths[i++];
      const [ax, ay] = points[i];
      const [bx, by] = points[i + 1];
      const t = s / lengths[i];
      const nx = -(by - ay) / lengths[i];
      const ny = (bx - ax) / lengths[i];
      const o = rand(-width / 2, width / 2);
      return [ax + (bx - ax) * t + nx * o, ay + (by - ay) * t + ny * o, z + rand(-width, width) * 0.7];
    },
  };
}

// A smooth path through 3D space, sampled with a little thickness so it reads as a glowing tube.
function curve(at: (u: number) => Vec3, tone: number, density: number, width = 0.02): Primitive {
  let length = 0;
  for (let i = 0; i < 32; i++) {
    const [ax, ay, az] = at(i / 32);
    const [bx, by, bz] = at((i + 1) / 32);
    length += Math.hypot(bx - ax, by - ay, bz - az);
  }
  return {
    weight: length * density,
    tone,
    sample: () => {
      const [x, y, z] = at(Math.random());
      return [x, y + rand(-width, width) / 2, z + rand(-width, width) / 2];
    },
  };
}

function ring(cx: number, cy: number, z: number, r: number, tone: number, density: number): Primitive {
  return {
    weight: 2 * Math.PI * r * density,
    tone,
    sample: () => {
      const a = Math.random() * Math.PI * 2;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r, z];
    },
  };
}

function gitGraph(): Primitive[] {
  // Each lane has a height and a depth, so the branches separate as the graph turns.
  // Lane heights are shifted up by 0.36 so the four lanes are centred on the origin.
  const lanes = { feature: [1.08, -0.4], main: [0.36, 0], fix: [-0.36, 0.4], long: [-1.08, 0.8] } as const;
  type Lane = keyof typeof lanes;
  const ease = (u: number) => u * u * (3 - 2 * u);
  const straight = (x0: number, x1: number, lane: Lane, tone: number) => {
    const [y, z] = lanes[lane];
    return curve((u) => [x0 + (x1 - x0) * u, y, z], tone, 1);
  };
  const bend = (x0: number, x1: number, from: Lane, to: Lane, tone: number) => {
    const [y0, z0] = lanes[from];
    const [y1, z1] = lanes[to];
    return curve((u) => [x0 + (x1 - x0) * u, y0 + (y1 - y0) * ease(u), z0 + (z1 - z0) * ease(u)], tone, 1);
  };
  const commit = (x: number, lane: Lane, tone: number, r = 0.075) => {
    const [y, z] = lanes[lane];
    return [ring(x, y, z, r, tone, 1.25), disc(x, y, 0.034, z, TONE.glyph, 36)];
  };
  const MAIN = 1;
  const FEATURE = 0.45;
  const SECOND = 0.3;

  return [
    // main, ending at HEAD with a release tag
    straight(-1.95, 1.9, "main", MAIN),
    ...[-1.8, -1.35, -0.85, -0.4, 0.55].flatMap((x) => commit(x, "main", MAIN)),
    ...[0.2, 1.05, 1.35, 1.62].flatMap((x) => commit(x, "main", MAIN, 0.095)),
    ...commit(1.9, "main", TONE.accent, 0.11),
    outline(1.9, 0.66, 0.5, 0.16, 0.08, 0, TONE.accent, 1.1),
    block(1.9, 0.66, 0.26, 0.03, 0, TONE.accent, 40),

    // feature branch: off main, two commits, merged back
    bend(-1.35, -1.0, "main", "feature", FEATURE),
    straight(-1.0, -0.2, "feature", FEATURE),
    bend(-0.2, 0.2, "feature", "main", FEATURE),
    ...[-0.85, -0.5].flatMap((x) => commit(x, "feature", FEATURE)),

    // second branch below main
    bend(-0.4, -0.05, "main", "fix", SECOND),
    straight(-0.05, 0.75, "fix", SECOND),
    bend(0.75, 1.05, "fix", "main", SECOND),
    ...[0.1, 0.45].flatMap((x) => commit(x, "fix", SECOND)),

    // a long-running branch on the deepest lane
    // (it crosses two lanes, so its bends get twice the run to stay smooth)
    bend(-1.8, -1.1, "main", "long", SECOND),
    straight(-1.1, 0.95, "long", SECOND),
    bend(0.95, 1.62, "long", "main", SECOND),
    ...[-0.8, -0.15, 0.5].flatMap((x) => commit(x, "long", SECOND)),

    // hotfix in the warm accent
    bend(0.55, 0.85, "main", "feature", TONE.accent),
    straight(0.85, 1.05, "feature", TONE.accent),
    bend(1.05, 1.35, "feature", "main", TONE.accent),
    ...commit(0.95, "feature", TONE.accent),

    // faint dust around the graph for depth
    {
      weight: 5,
      tone: TONE.glass,
      sample: () => [rand(-2.1, 2.1), rand(-1.5, 1.5), rand(-0.9, 1.2)],
    },
  ];
}

function webPage(): Primitive[] {
  const W = 3.9;
  const H = 2.7;
  const left = -W / 2 + 0.23;
  const top = H / 2;
  const bar = top - 0.34;
  const parts: Primitive[] = [
    // Browser window
    outline(0, 0, W, H, 0.16, Z.back, TONE.frame, 2.2),
    line(-W / 2, bar, W / 2, bar, Z.back, TONE.frame, 1.2),
    disc(-W / 2 + 0.2, top - 0.17, 0.045, Z.back, TONE.accent, 160),
    disc(-W / 2 + 0.36, top - 0.17, 0.045, Z.back, TONE.text, 160),
    disc(-W / 2 + 0.52, top - 0.17, 0.045, Z.back, TONE.text, 160),
    outline(0.2, top - 0.17, 1.8, 0.17, 0.085, Z.back, TONE.frame, 1),
    block(0, -0.17, W - 0.1, H - 0.44, Z.back - 0.02, TONE.glass, 0.55),

    // Page: nav, headline, paragraph and a call to action
    block(left + 0.16, 0.8, 0.32, 0.09, Z.page, TONE.text, 40),
    block(0.95, 0.8, 0.26, 0.035, Z.page, TONE.text, 40),
    block(1.3, 0.8, 0.26, 0.035, Z.page, TONE.text, 40),
    block(1.65, 0.8, 0.22, 0.035, Z.page, TONE.text, 40),
    block(left + 0.95, 0.42, 1.9, 0.13, Z.page, TONE.glyph, 30),
    block(left + 0.68, 0.22, 1.36, 0.13, Z.page, TONE.glyph, 30),
    block(left + 0.85, 0.02, 1.7, 0.035, Z.page, TONE.text, 34),
    block(left + 0.78, -0.08, 1.56, 0.035, Z.page, TONE.text, 34),
    block(left + 0.55, -0.18, 1.1, 0.035, Z.page, TONE.text, 34),
    outline(left + 0.34, -0.42, 0.68, 0.19, 0.095, Z.page, TONE.accent, 2),

    // Cards
    ...[-1.24, 0, 1.24].flatMap((x) => [
      outline(x, -0.88, 1.1, 0.5, 0.07, Z.cards, TONE.card, 1.5),
      block(x - 0.18, -0.8, 0.6, 0.035, Z.cards, TONE.text, 30),
      block(x - 0.26, -0.92, 0.44, 0.03, Z.cards, TONE.text, 30),
    ]),

    // </> floating in front of the hero area
    stroke(
      [
        [0.62, 0.62],
        [0.36, 0.26],
        [0.62, -0.1],
      ],
      Z.glyph,
      0.07,
      TONE.glyph,
      7,
    ),
    stroke(
      [
        [1.12, 0.66],
        [0.86, -0.14],
      ],
      Z.glyph,
      0.07,
      TONE.accent,
      7,
    ),
    stroke(
      [
        [1.36, 0.62],
        [1.62, 0.26],
        [1.36, -0.1],
      ],
      Z.glyph,
      0.07,
      TONE.glyph,
      7,
    ),
  ];
  return parts;
}

// The scan highlight sweeps along this axis: across the graph, or down the page.
export const SCAN_DIRECTION: Record<HeroVariant, Vec3> = { git: [1, 0, 0], page: [0, -1, 0] };

export function buildHero(count: number, variant: HeroVariant = HERO_VARIANT) {
  const parts = variant === "git" ? gitGraph() : webPage();
  const total = parts.reduce((sum, part) => sum + part.weight, 0);
  const positions = new Float32Array(count * 3);
  const tones = new Float32Array(count);

  // Cumulative weights let each particle pick a primitive in proportion to its weight.
  const cumulative: number[] = [];
  parts.reduce((sum, part) => {
    cumulative.push(sum + part.weight);
    return sum + part.weight;
  }, 0);

  for (let i = 0; i < count; i++) {
    const pick = ((i + Math.random()) / count) * total;
    let index = cumulative.findIndex((c) => c >= pick);
    if (index < 0) index = parts.length - 1;
    const part = parts[index];
    const [x, y, z] = part.sample();
    positions[i * 3] = x + rand(-0.006, 0.006);
    positions[i * 3 + 1] = y + rand(-0.006, 0.006);
    positions[i * 3 + 2] = z + rand(-0.015, 0.015);
    tones[i] = part.tone;
  }

  // Shuffle so the scroll morph (which staggers by particle) mixes all parts evenly.
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    for (let k = 0; k < 3; k++) {
      const t = positions[i * 3 + k];
      positions[i * 3 + k] = positions[j * 3 + k];
      positions[j * 3 + k] = t;
    }
    const t = tones[i];
    tones[i] = tones[j];
    tones[j] = t;
  }
  return { positions, tones };
}
