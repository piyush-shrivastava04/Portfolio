import emailjs from "@emailjs/browser";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "./contact-form";

vi.mock("@emailjs/browser", () => ({
  default: {
    sendForm: vi.fn(),
  },
}));

const sendForm = vi.mocked(emailjs.sendForm);

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = "service_test";
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = "template_test";
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = "public_test";
  });

  afterEach(() => {
    cleanup();
    delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    delete process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    delete process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  });

  it("sends the form through EmailJS and resets it on success", async () => {
    const user = userEvent.setup();
    sendForm.mockResolvedValue({ status: 200, text: "OK" });

    render(<ContactForm submitLabel="Send message" />);

    await user.type(screen.getByLabelText(/name/i), "Piyush");
    await user.type(screen.getByLabelText(/email/i), "piyush@example.com");
    await user.type(
      screen.getByLabelText(/message/i),
      "I would like to discuss a product role.",
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(sendForm).toHaveBeenCalledTimes(1));

    expect(sendForm).toHaveBeenCalledWith(
      "service_test",
      "template_test",
      expect.any(HTMLFormElement),
      {
        publicKey: "public_test",
      },
    );
    expect(screen.getByText(/thanks, your message has been sent/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue("");
  });

  it("shows an error when EmailJS is not configured", async () => {
    const user = userEvent.setup();
    delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

    render(<ContactForm submitLabel="Send message" />);

    await user.type(screen.getByLabelText(/name/i), "Piyush");
    await user.type(screen.getByLabelText(/email/i), "piyush@example.com");
    await user.type(screen.getByLabelText(/message/i), "This is a valid message.");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(sendForm).not.toHaveBeenCalled();
    expect(screen.getByText(/contact form is missing emailjs configuration/i)).toBeInTheDocument();
  });
});
