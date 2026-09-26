"use server";

import React from "react";
import { Resend } from "resend";
import ContactFormEmail from "@/email/contact-form-email";

const deliveryError =
  "Your message couldn’t be sent. Please email me directly at elifbensuaslan@gmail.com.";

export const sendEmail = async (formData: FormData) => {
  const emailValue = formData.get("senderEmail");
  const messageValue = formData.get("message");

  if (formData.get("website")) return { error: "Unable to send this message." };
  if (
    typeof emailValue !== "string" ||
    emailValue.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim())
  ) {
    return { error: "Please enter a valid email address." };
  }
  if (
    typeof messageValue !== "string" ||
    messageValue.trim().length < 10 ||
    messageValue.length > 5000
  ) {
    return { error: "Please enter a message between 10 and 5,000 characters." };
  }
  if (!process.env.RESEND_API_KEY) return { error: deliveryError };

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: "elifbensuaslan@gmail.com",
      subject: "New message from your portfolio",
      replyTo: emailValue.trim(),
      react: React.createElement(ContactFormEmail, {
        message: messageValue.trim(),
        senderEmail: emailValue.trim(),
      }),
    });
    if (error || !data?.id) return { error: deliveryError };
    return { data: { id: data.id } };
  } catch {
    return { error: deliveryError };
  }
};
