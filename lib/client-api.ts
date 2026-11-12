export const RESERVATION_URL = process.env.NEXT_PUBLIC_RESERVATION_URL ?? "http://127.0.0.1:8788";

export type ReservationPayload = {
  kind: "reservation" | "contact" | "newsletter";
  fullName?: string;
  email: string;
  phone?: string;
  carId?: string;
  carName?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  dropoffDate?: string;
  estimatedTotalMad?: number;
  message?: string;
  company?: string;
};

export async function postReservation(payload: ReservationPayload) {
  const response = await fetch(RESERVATION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string; emailDelivered?: boolean; reference?: string } | null;
  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || "The reservation desk could not take this request.");
  }
  return data;
}
