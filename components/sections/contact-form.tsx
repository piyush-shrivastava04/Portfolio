"use client";

import emailjs from "@emailjs/browser";
import * as React from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

type ContactState = {
  status: "idle" | "sending" | "success" | "error";
  message?: string;
};

const initialState: ContactState = { status: "idle" };

function getEmailJsConfig() {
  return {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  };
}

export function ContactForm({ submitLabel }: { submitLabel: string }) {
  const [state, setState] = React.useState<ContactState>(initialState);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const { serviceId, templateId, publicKey } = getEmailJsConfig();

    if (!serviceId || !templateId || !publicKey) {
      setState({
        status: "error",
        message: "Contact form is missing EmailJS configuration.",
      });
      return;
    }

    if (!form.reportValidity()) return;

    setState({ status: "sending" });

    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      setState({
        status: "success",
        message: "Thanks, your message has been sent. I will reply soon.",
      });
    } catch (error) {
      console.error("[contact]", error);
      setState({
        status: "error",
        message: "I could not send the message right now. Please email me directly.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Field
        label="Name"
        name="name"
        placeholder="Your name"
        required
        maxLength={120}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="you@company.com"
        required
      />
      <Field
        label="Message"
        name="message"
        as="textarea"
        rows={5}
        placeholder="What are you building?"
        required
        minLength={10}
        maxLength={4000}
      />

      {state.status === "success" && state.message && (
        <p
          aria-live="polite"
          className="flex items-start gap-2 text-sm text-[color:var(--color-copper)]"
        >
          <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          {state.message}
        </p>
      )}
      {state.status === "error" && state.message && (
        <p
          aria-live="polite"
          className="flex items-start gap-2 text-sm text-[color:var(--color-error)]"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {state.message}
        </p>
      )}

      <SubmitButton label={submitLabel} pending={state.status === "sending"} />
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  as = "input",
  rows,
  required,
  minLength,
  maxLength,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-caps text-[color:var(--color-ink-soft)]">
        {label}
        {required && <span aria-hidden className="text-[color:var(--color-copper)]"> *</span>}
      </span>
      {as === "textarea" ? (
        <Textarea
          name={name}
          placeholder={placeholder}
          rows={rows}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
        />
      ) : (
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
        />
      )}
    </label>
  );
}

function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <Button type="submit" variant="primary" size="lg" disabled={pending} className="self-start">
      {pending ? "Sending..." : label}
      <Send size={14} strokeWidth={2} />
    </Button>
  );
}
