"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { postReservation } from "@/lib/client-api";
import { formatMad, pickupPoints, rentalDays, type Car } from "@/lib/fleet";

export default function ReserveForm({ car }: { car: Car }) {
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [detail, setDetail] = useState("");
  const [customerCopy, setCustomerCopy] = useState(false);
  const [pickupDate, setPickupDate] = useState(params.get("pickup") ?? "");
  const [dropoffDate, setDropoffDate] = useState(params.get("dropoff") ?? "");
  const days = rentalDays(pickupDate, dropoffDate);
  const total = days * car.priceMad;
  const pickupDefault = pointName(params.get("location")) || "Marrakech";
  const dropDefault = pointName(params.get("drop")) || pickupDefault;

  return (
    <form
      className="space-y-4 rounded-3xl border border-line bg-white p-5 shadow-sm"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setStatus("sending");
        setDetail("");
        try {
          const result = await postReservation({
            kind: "reservation",
            fullName: String(form.get("fullName") ?? ""),
            email: String(form.get("email") ?? ""),
            phone: String(form.get("phone") ?? ""),
            carId: car.id,
            carName: car.name,
            pickupLocation: String(form.get("pickupLocation") ?? ""),
            dropoffLocation: String(form.get("dropoffLocation") ?? ""),
            pickupDate,
            dropoffDate,
            estimatedTotalMad: total,
            message: String(form.get("message") ?? ""),
            company: String(form.get("company") ?? "")
          });
          const snapshot = {
            reference: result.reference,
            carName: car.name,
            email: String(form.get("email") ?? ""),
            total,
            pickupDate,
            dropoffDate
          };
          window.localStorage.setItem("noria-cars-last-request", JSON.stringify(snapshot));
          setStatus("sent");
          setCustomerCopy(Boolean(result.emailDelivered));
          setDetail(result.reference ? `Reference ${result.reference}.` : "Request received.");
        } catch (error) {
          setStatus("error");
          setDetail(error instanceof Error ? error.message : "Could not send the request.");
        }
      }}
    >
      <h2 className="text-xl font-extrabold">Reserve this car</h2>
      <p className="text-sm leading-6 text-slate-600">No payment is taken online. The desk emails you to confirm the vehicle, the meeting point and the final rate.</p>
      <p className="rounded-2xl bg-paper px-4 py-3 text-sm leading-6 text-slate-600">Child seats, a breakdown kit and other accessories are not included in the daily rate. The person who confirms your booking will discuss each extra with you and tell you the additional price.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Full name" name="fullName" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <label className="block text-sm font-semibold">
          Pick-up
          <select name="pickupLocation" defaultValue={pickupDefault} className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 font-medium">
            {pickupPoints.map((point) => (
              <option key={point.slug} value={point.name}>{point.name}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold">
          Drop-off
          <select name="dropoffLocation" defaultValue={dropDefault} className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 font-medium">
            {pickupPoints.map((point) => (
              <option key={point.slug} value={point.name}>{point.name}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold">
          Pick-up date
          <input required type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 font-medium" />
        </label>
        <label className="block text-sm font-semibold">
          Drop-off date
          <input required type="date" min={pickupDate || undefined} value={dropoffDate} onChange={(event) => setDropoffDate(event.target.value)} className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 font-medium" />
        </label>
      </div>
      <label className="block text-sm font-semibold">
        Notes
        <textarea name="message" rows={3} className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 font-medium" placeholder="Flight number, a child seat, a breakdown kit, or a one-way city" />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <p className="rounded-2xl bg-paper px-4 py-3 text-sm">
        Indicative total for {days} day{days === 1 ? "" : "s"}: <strong>{formatMad(total)}</strong> ({car.priceEur * days} EUR). The confirmation can adjust this.
      </p>
      <button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-noria py-3 text-sm font-bold text-white hover:bg-noria-dark disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Reserve now"}
      </button>
      {status === "sent" ? (
        <p className="text-sm font-semibold text-emerald-700" role="status">
          {customerCopy
            ? `Request sent. A copy is on its way to your inbox. ${detail}`
            : `Request sent to the reservation desk. ${detail} Your own copy is emailed once the Resend key is set.`}
        </p>
      ) : null}
      {status === "error" ? <p className="text-sm font-semibold text-noria" role="alert">{detail}</p> : null}
    </form>
  );
}

function pointName(value: string | null) {
  if (!value) return "";
  return pickupPoints.find((point) => point.slug === value || point.name === value)?.name ?? "";
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input name={name} type={type} required={required} className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 font-medium" />
    </label>
  );
}
