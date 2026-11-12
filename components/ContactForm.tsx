"use client";

import { useState } from "react";
import { postReservation } from "@/lib/client-api";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [detail, setDetail] = useState("");

  return (
    <form
      className="space-y-4 rounded-3xl border border-line bg-white p-6 shadow-sm"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setStatus("sending");
        try {
          await postReservation({
            kind: "contact",
            fullName: String(form.get("fullName") ?? ""),
            email: String(form.get("email") ?? ""),
            phone: String(form.get("phone") ?? ""),
            message: String(form.get("message") ?? ""),
            company: String(form.get("company") ?? "")
          });
          setStatus("sent");
          event.currentTarget.reset();
        } catch (error) {
          setStatus("error");
          setDetail(error instanceof Error ? error.message : "Could not send the message.");
        }
      }}
    >
      <label className="block text-sm font-semibold">
        Full name
        <input name="fullName" required className="mt-1 w-full rounded-xl border border-line px-3 py-2.5" />
      </label>
      <label className="block text-sm font-semibold">
        Email
        <input name="email" type="email" required className="mt-1 w-full rounded-xl border border-line px-3 py-2.5" />
      </label>
      <label className="block text-sm font-semibold">
        Phone
        <input name="phone" type="tel" className="mt-1 w-full rounded-xl border border-line px-3 py-2.5" />
      </label>
      <label className="block text-sm font-semibold">
        Message
        <textarea name="message" required rows={5} className="mt-1 w-full rounded-xl border border-line px-3 py-2.5" />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button type="submit" disabled={status === "sending"} className="rounded-full bg-noria px-6 py-3 text-sm font-bold text-white">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" ? <p className="text-sm font-semibold text-emerald-700" role="status">Message sent to the reservation desk.</p> : null}
      {status === "error" ? <p className="text-sm font-semibold text-noria" role="alert">{detail}</p> : null}
    </form>
  );
}
