const MAX_BODY_BYTES = 12_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

type Kind = "reservation" | "contact" | "newsletter";

type Reservation = {
  kind: Kind;
  fullName: string;
  email: string;
  phone: string;
  carId: string;
  carName: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  estimatedTotalMad: number | null;
  message: string;
};

type EmailMessage = {
  to: string;
  from: string | { email: string; name?: string };
  subject: string;
  html: string;
  replyTo?: string;
};

type Env = {
  ALLOWED_ORIGINS: string;
  BOOKING_NOTIFY_EMAIL: string;
  RESEND_FROM: string;
  RESEND_API_KEY?: string;
  EMAIL?: {
    send(message: EmailMessage): Promise<void>;
  };
};

const json = (body: unknown, status: number, cors: Headers) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...Object.fromEntries(cors.entries()), "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "";

const escapeHtml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const corsHeaders = (request: Request, env: Env) => {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = env.ALLOWED_ORIGINS.split(",").map((item) => item.trim()).filter(Boolean);
  const headers = new Headers();
  headers.set("access-control-allow-origin", allowed.includes(origin) ? origin : "null");
  headers.set("access-control-allow-methods", "POST, OPTIONS");
  headers.set("access-control-allow-headers", "content-type");
  headers.set("access-control-max-age", "86400");
  headers.set("vary", "Origin");
  return headers;
};

const parseFrom = (value: string): { email: string; name?: string } => {
  const match = value.match(/^(.*?)\s*<([^>]+)>$/);
  if (!match) return { email: value.trim() };
  const name = match[1].replace(/^["']|["']$/g, "").trim();
  return { email: match[2].trim(), name: name || undefined };
};

const parseBody = (value: unknown): { reservation: Reservation } | { error: string } | { ignored: true } => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "Request body must be an object." };
  const body = value as Record<string, unknown>;
  if (clean(body.company, 80)) return { ignored: true };

  const kind = body.kind;
  if (kind !== "reservation" && kind !== "contact" && kind !== "newsletter") return { error: "Unknown request type." };

  const email = clean(body.email, 160);
  if (!EMAIL_PATTERN.test(email)) return { error: "A valid email is required." };

  const reservation: Reservation = {
    kind,
    fullName: clean(body.fullName, 120),
    email,
    phone: clean(body.phone, 40),
    carId: clean(body.carId, 80),
    carName: clean(body.carName, 120),
    pickupLocation: clean(body.pickupLocation, 120),
    dropoffLocation: clean(body.dropoffLocation, 120),
    pickupDate: clean(body.pickupDate, 10),
    dropoffDate: clean(body.dropoffDate, 10),
    estimatedTotalMad: typeof body.estimatedTotalMad === "number" && Number.isFinite(body.estimatedTotalMad) ? Math.round(body.estimatedTotalMad) : null,
    message: clean(body.message, 2000)
  };

  if (kind !== "newsletter" && reservation.fullName.length < 2) return { error: "A full name is required." };
  if (kind === "reservation") {
    if (!reservation.carName || !reservation.pickupLocation || !reservation.dropoffLocation) return { error: "Car and both locations are required." };
    if (!DATE_PATTERN.test(reservation.pickupDate) || !DATE_PATTERN.test(reservation.dropoffDate)) return { error: "Pickup and drop-off dates are required." };
    if (reservation.dropoffDate <= reservation.pickupDate) return { error: "Drop-off must be after pickup." };
  }
  if (kind === "contact" && reservation.message.length < 4) return { error: "A message is required." };
  return { reservation };
};

const ACCESSORY_NOTE =
  "Child seats, a breakdown kit and other accessories are not included in the daily rate. The person who confirms the booking will go through each extra and give the additional price for it.";

const row = (label: string, value: string) =>
  value ? `<tr><td style="padding:8px 0;color:#667;font-size:13px;">${label}</td><td style="padding:8px 0;font-size:14px;font-weight:700;color:#0d1220;">${escapeHtml(value)}</td></tr>` : "";

const deskHtml = (item: Reservation, reference: string) => `<!DOCTYPE html><html><body style="margin:0;background:#f5f7fb;font-family:Arial,sans-serif;color:#0d1220;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px;"><tr><td align="center">
    <table width="560" style="background:#fff;border-radius:16px;padding:28px;">
      <tr><td><p style="margin:0;color:#e10600;font-weight:800;letter-spacing:.08em;">NORIA-CARS</p>
      <h1 style="margin:8px 0 16px;font-size:24px;">New ${item.kind}</h1>
      <p style="margin:0 0 12px;">Reference ${escapeHtml(reference)}</p>
      <table width="100%">${row("Name", item.fullName)}${row("Email", item.email)}${row("Phone", item.phone)}${row("Car", item.carName)}${row("Pickup", `${item.pickupLocation} · ${item.pickupDate}`)}${row("Drop-off", `${item.dropoffLocation} · ${item.dropoffDate}`)}${row("Indicative total", item.estimatedTotalMad ? `${item.estimatedTotalMad} MAD` : "")}${row("Message", item.message)}</table>
      ${item.kind === "reservation" ? `<p style="margin:16px 0 0;font-size:13px;line-height:1.5;color:#445;">${escapeHtml(ACCESSORY_NOTE)} Reply to the customer with those prices if they asked for extras.</p>` : ""}
      </td></tr>
    </table>
  </td></tr></table></body></html>`;

const guestHtml = (item: Reservation, reference: string) => `<!DOCTYPE html><html><body style="margin:0;background:#0d1220;font-family:Arial,sans-serif;color:#fff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px;"><tr><td align="center">
    <table width="560" style="background:#161c2c;border-radius:16px;padding:28px;">
      <tr><td><p style="margin:0;color:#e10600;font-weight:800;">Noria-Cars</p>
      <h1 style="margin:8px 0 12px;font-size:26px;">We received your ${item.kind === "reservation" ? "reservation request" : "message"}.</h1>
      <p style="line-height:1.6;color:#d5d8e2;">Hello ${escapeHtml(item.fullName || "there")}, reference <strong>${escapeHtml(reference)}</strong>. No payment has been taken. The desk will reply from this address to confirm the vehicle and the meeting point.</p>
      ${item.carName ? `<p style="line-height:1.6;">${escapeHtml(item.carName)} · ${escapeHtml(item.pickupLocation)} ${escapeHtml(item.pickupDate)} → ${escapeHtml(item.dropoffLocation)} ${escapeHtml(item.dropoffDate)}</p>` : ""}
      ${item.kind === "reservation" ? `<p style="line-height:1.6;color:#d5d8e2;">${escapeHtml(ACCESSORY_NOTE)}</p>` : ""}
      </td></tr>
    </table>
  </td></tr></table></body></html>`;

const sendResend = async (apiKey: string, from: string, to: string, replyTo: string, subject: string, html: string, key: string) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json", "idempotency-key": key },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, html }),
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) return { ok: false as const, detail: (await response.text()).slice(0, 300) };
  return { ok: true as const };
};

const deliver = async (env: Env, item: Reservation, reference: string) => {
  const subject = item.kind === "reservation"
    ? `Noria-Cars request ${reference} · ${item.carName} · ${item.fullName}`
    : `Noria-Cars ${item.kind} ${reference} · ${item.fullName || item.email}`;
  const guestSubject = `Your Noria-Cars request ${reference}`;
  const apiKey = env.RESEND_API_KEY?.trim();
  const wantsGuestCopy = item.kind !== "newsletter";

  if (apiKey && !apiKey.includes("your_")) {
    const [desk, guest] = await Promise.all([
      sendResend(apiKey, env.RESEND_FROM, env.BOOKING_NOTIFY_EMAIL, item.email, subject, deskHtml(item, reference), `${reference}-desk`),
      wantsGuestCopy
        ? sendResend(apiKey, env.RESEND_FROM, item.email, env.BOOKING_NOTIFY_EMAIL, guestSubject, guestHtml(item, reference), `${reference}-guest`)
        : Promise.resolve({ ok: true as const })
    ]);
    if (!desk.ok) return { ok: false as const, detail: desk.detail, customerCopy: false };
    return { ok: true as const, customerCopy: wantsGuestCopy && guest.ok };
  }

  if (env.EMAIL && typeof env.EMAIL.send === "function") {
    const from = parseFrom(env.RESEND_FROM);
    await env.EMAIL.send({
      to: env.BOOKING_NOTIFY_EMAIL,
      from,
      replyTo: item.email,
      subject,
      html: deskHtml(item, reference)
    });
    if (!wantsGuestCopy) return { ok: true as const, customerCopy: false };
    try {
      await env.EMAIL.send({
        to: item.email,
        from,
        replyTo: env.BOOKING_NOTIFY_EMAIL,
        subject: guestSubject,
        html: guestHtml(item, reference)
      });
      return { ok: true as const, customerCopy: true };
    } catch (error) {
      console.log(JSON.stringify({ event: "reservation.guest_email_failed", reference, detail: error instanceof Error ? error.message : "guest email failed" }));
      return { ok: true as const, customerCopy: false };
    }
  }

  return { ok: false as const, detail: "Email is not configured. Set RESEND_API_KEY or the EMAIL binding.", customerCopy: false };
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ ok: false, error: "Method not allowed." }, 405, cors);

    const origin = request.headers.get("Origin");
    const allowed = env.ALLOWED_ORIGINS.split(",").map((item) => item.trim());
    if (origin && !allowed.includes(origin)) return json({ ok: false, error: "Origin is not allowed." }, 403, cors);

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "Payload is too large." }, 413, cors);

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return json({ ok: false, error: "Request body must be valid JSON." }, 400, cors);
    }

    const result = parseBody(parsed);
    if ("ignored" in result) return json({ ok: true, ignored: true }, 202, cors);
    if ("error" in result) return json({ ok: false, error: result.error }, 400, cors);

    const reference = crypto.randomUUID().slice(0, 8).toUpperCase();
    console.log(JSON.stringify({ event: "reservation.received", reference, kind: result.reservation.kind, email: result.reservation.email }));

    try {
      const sent = await deliver(env, result.reservation, reference);
      if (!sent.ok) {
        console.log(JSON.stringify({ event: "reservation.email_failed", reference, detail: sent.detail }));
        return json({ ok: false, error: sent.detail }, 502, cors);
      }
      console.log(JSON.stringify({ event: "reservation.sent", reference, customerCopy: sent.customerCopy }));
      return json({ ok: true, reference, emailDelivered: sent.customerCopy }, 201, cors);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Email failed";
      console.log(JSON.stringify({ event: "reservation.unhandled", reference, detail }));
      return json({ ok: false, error: "The reservation email could not be sent." }, 502, cors);
    }
  }
} satisfies ExportedHandler<Env>;
