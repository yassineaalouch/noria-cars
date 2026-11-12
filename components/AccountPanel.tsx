"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cars, formatMad } from "@/lib/fleet";
import { readSaved } from "@/components/WishlistButton";

type LastRequest = {
  reference?: string;
  carName?: string;
  email?: string;
  total?: number;
  pickupDate?: string;
  dropoffDate?: string;
};

export default function AccountPanel() {
  const [saved, setSaved] = useState<string[]>([]);
  const [last, setLast] = useState<LastRequest | null>(null);

  useEffect(() => {
    setSaved(readSaved());
    try {
      const raw = window.localStorage.getItem("noria-cars-last-request");
      setLast(raw ? (JSON.parse(raw) as LastRequest) : null);
    } catch {
      setLast(null);
    }
  }, []);

  const savedCars = cars.filter((car) => saved.includes(car.id));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-3xl border border-line bg-white p-6">
        <h2 className="text-2xl font-extrabold">Latest request on this browser</h2>
        {last?.carName ? (
          <dl className="mt-4 space-y-2 text-sm">
            <div><dt className="text-slate-500">Car</dt><dd className="font-semibold">{last.carName}</dd></div>
            <div><dt className="text-slate-500">Dates</dt><dd className="font-semibold">{last.pickupDate} to {last.dropoffDate}</dd></div>
            <div><dt className="text-slate-500">Indicative total</dt><dd className="font-semibold">{typeof last.total === "number" ? formatMad(last.total) : "—"}</dd></div>
            <div><dt className="text-slate-500">Email</dt><dd className="font-semibold">{last.email}</dd></div>
            {last.reference ? <div><dt className="text-slate-500">Reference</dt><dd className="font-semibold">{last.reference}</dd></div> : null}
          </dl>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-600">No request has been sent from this browser yet. A confirmed rental lives in your email, not in an account password.</p>
        )}
        <Link href="/cars" className="mt-6 inline-flex rounded-full bg-noria px-5 py-2.5 text-sm font-bold text-white">Browse cars</Link>
      </section>
      <section className="rounded-3xl border border-line bg-white p-6">
        <h2 className="text-2xl font-extrabold">Saved cars</h2>
        {savedCars.length === 0 ? (
          <p className="mt-4 text-sm leading-6 text-slate-600">Tap the heart on a car to keep it here.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {savedCars.map((car) => (
              <li key={car.id} className="flex items-center justify-between gap-3 text-sm">
                <Link href={`/cars/${car.id}`} className="font-semibold">{car.name}</Link>
                <span>{formatMad(car.priceMad)} / day</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
