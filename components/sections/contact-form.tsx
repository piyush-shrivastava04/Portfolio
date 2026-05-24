"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialState: ContactState = { status: "idle" };

export function ContactForm({ submitLabel }: { submitLabel: string }) {
  const [state, formAction] = useActionState(submitContact, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.status === "success" && state.mailto) {
      window.location.href = state.mailto;
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-6">
      <Field
        label="Name"
        name="name"
        placeholder="Your name"
        required
        error={state.fieldErrors?.name}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="you@company.com"
        required
        error={state.fieldErrors?.email}
      />
      <Field
        label="Message"
        name="message"
        as="textarea"
        rows={5}
        placeholder="What are you building?"
        required
        error={state.fieldErrors?.message}
      />

      {state.status === "success" && state.message && (
        <p className="flex items-start gap-2 text-sm text-[color:var(--color-copper)]">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          {state.message}
        </p>
      )}
      {state.status === "error" && state.message && (
        <p className="flex items-start gap-2 text-sm text-[color:var(--color-error)]">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {state.message}
        </p>
      )}

      <SubmitButton label={submitLabel} />
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
  error,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-caps text-[color:var(--color-ink-soft)]">
        {label}
        {required && <span aria-hidden className="text-[color:var(--color-copper)]"> *</span>}
      </span>
      {as === "textarea" ? (
        <Textarea name={name} placeholder={placeholder} rows={rows} required={required} />
      ) : (
        <Input name={name} type={type} placeholder={placeholder} required={required} />
      )}
      {error && (
        <span className="text-xs text-[color:var(--color-error)]">{error}</span>
      )}
    </label>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" size="lg" disabled={pending} className="self-start">
      {pending ? "Sending…" : label}
      <Send size={14} strokeWidth={2} />
    </Button>
  );
}
