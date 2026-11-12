"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { postReservation } from "@/lib/client-api";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [detail, setDetail] = useState("");

  return (
    <form
      className="mt-4 flex overflow-hidden rounded-full bg-white"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("sending");
        try {
          await postReservation({ kind: "newsletter", email, company: "" });
          setStatus("sent");
          setEmail("");
        } catch (error) {
          setStatus("error");
          setDetail(error instanceof Error ? error.message : "Could not subscribe.");
        }
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-ink outline-none"
      />
      <button type="submit" aria-label="Subscribe" className="grid w-12 place-items-center bg-noria text-white" disabled={status === "sending"}>
        <ArrowRight size={16} />
      </button>
      <span className="sr-only" role="status">
        {status === "sent" ? "Subscribed." : status === "error" ? detail : ""}
      </span>
    </form>
  );
}
