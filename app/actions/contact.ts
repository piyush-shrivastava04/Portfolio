"use server";

import { z } from "zod";
import { siteConfig } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Please use a valid email"),
  message: z.string().min(10, "Message too short").max(4000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  mailto?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0] as keyof NonNullable<ContactState["fieldErrors"]>;
      if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  // TODO: integrate with Formspree / Resend / SES when ready.
  // For now: log on the server + return a mailto link the client can open.
  console.log("[contact]", parsed.data);

  const body = encodeURIComponent(
    `Hi Piyush,\n\n${parsed.data.message}\n\n- ${parsed.data.name} (${parsed.data.email})`,
  );
  const subject = encodeURIComponent(`Portfolio enquiry from ${parsed.data.name}`);
  const mailto = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

  return {
    status: "success",
    message: "Got it. Opening your mail client as a fallback while the inbox is being wired up.",
    mailto,
  };
}
