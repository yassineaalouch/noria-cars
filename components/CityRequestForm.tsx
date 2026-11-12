"use client";

import { Calendar, CarFront, MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fleetTypes, pickupPoints } from "@/lib/fleet";

export default function CityRequestForm({ pickupSlug }: { pickupSlug: string }) {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState(pickupSlug);
  const [dropLocation, setDropLocation] = useState(pickupSlug);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [type, setType] = useState("all");

  return (
    <form
      className="rounded-3xl border border-line bg-white p-4 shadow-[0_18px_50px_rgba(13,18,32,0.08)] sm:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        params.set("location", pickupLocation);
        if (dropLocation) params.set("drop", dropLocation);
        if (pickup) params.set("pickup", pickup);
        if (dropoff) params.set("dropoff", dropoff);
        if (type !== "all") params.set("type", type);
        router.push(`/cars?${params.toString()}`);
      }}
    >
      <p className="text-sm font-extrabold text-ink">Plan this pickup</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">Choose the places and dates. The desk confirms which car is free. This site does not hold live stock by city.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          <span className="mb-1 flex items-center gap-1.5 text-slate-500"><MapPin size={14} className="text-ink" /> Pick-up</span>
          <select value={pickupLocation} onChange={(event) => setPickupLocation(event.target.value)} className="w-full rounded-xl border border-line px-3 py-2.5 font-medium outline-none">
            {pickupPoints.map((point) => (
              <option key={point.slug} value={point.slug}>{point.name}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold">
          <span className="mb-1 flex items-center gap-1.5 text-slate-500"><MapPin size={14} className="text-ink" /> Drop-off</span>
          <select value={dropLocation} onChange={(event) => setDropLocation(event.target.value)} className="w-full rounded-xl border border-line px-3 py-2.5 font-medium outline-none">
            {pickupPoints.map((point) => (
              <option key={point.slug} value={point.slug}>{point.name}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold">
          <span className="mb-1 flex items-center gap-1.5 text-slate-500"><Calendar size={14} className="text-ink" /> Pick-up date</span>
          <input required type="date" value={pickup} onChange={(event) => setPickup(event.target.value)} className="w-full rounded-xl border border-line px-3 py-2.5 font-medium outline-none" />
        </label>
        <label className="block text-sm font-semibold">
          <span className="mb-1 flex items-center gap-1.5 text-slate-500"><Calendar size={14} className="text-ink" /> Drop-off date</span>
          <input required type="date" min={pickup || undefined} value={dropoff} onChange={(event) => setDropoff(event.target.value)} className="w-full rounded-xl border border-line px-3 py-2.5 font-medium outline-none" />
        </label>
        <label className="block text-sm font-semibold sm:col-span-2">
          <span className="mb-1 flex items-center gap-1.5 text-slate-500"><CarFront size={14} className="text-ink" /> Car type</span>
          <select value={type} onChange={(event) => setType(event.target.value)} className="w-full rounded-xl border border-line px-3 py-2.5 font-medium outline-none">
            <option value="all">All types</option>
            {fleetTypes.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-noria py-3 text-sm font-bold text-white hover:bg-noria-dark">
        <Search size={16} /> Find cars
      </button>
    </form>
  );
}
