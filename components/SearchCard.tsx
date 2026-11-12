"use client";

import { Calendar, CarFront, MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fleetTypes, pickupPoints } from "@/lib/fleet";

export default function SearchCard() {
  const router = useRouter();
  const [location, setLocation] = useState("marrakech");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [type, setType] = useState("all");

  return (
    <form
      className="grid gap-3 rounded-2xl bg-white p-3 shadow-[0_18px_50px_rgba(13,18,32,0.18)] md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] md:items-stretch md:p-3"
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (pickup) params.set("pickup", pickup);
        if (dropoff) params.set("dropoff", dropoff);
        if (type !== "all") params.set("type", type);
        router.push(`/cars?${params.toString()}`);
      }}
    >
      <label className="block px-2 py-1">
        <span className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
          <MapPin size={14} className="text-ink" /> Pick-up Location
        </span>
        <select value={location} onChange={(event) => setLocation(event.target.value)} className="w-full bg-transparent text-sm font-semibold text-ink outline-none">
          {pickupPoints.map((point) => (
            <option key={point.slug} value={point.slug}>
              {point.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block border-t border-line px-2 py-1 md:border-t-0 md:border-l">
        <span className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
          <Calendar size={14} className="text-ink" /> Pick-up Date
        </span>
        <input type="date" required value={pickup} onChange={(event) => setPickup(event.target.value)} className="w-full bg-transparent text-sm font-semibold text-ink outline-none" />
      </label>
      <label className="block border-t border-line px-2 py-1 md:border-t-0 md:border-l">
        <span className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
          <Calendar size={14} className="text-ink" /> Drop-off Date
        </span>
        <input type="date" required value={dropoff} min={pickup || undefined} onChange={(event) => setDropoff(event.target.value)} className="w-full bg-transparent text-sm font-semibold text-ink outline-none" />
      </label>
      <label className="block border-t border-line px-2 py-1 md:border-t-0 md:border-l">
        <span className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
          <CarFront size={14} className="text-ink" /> Car Type
        </span>
        <select value={type} onChange={(event) => setType(event.target.value)} className="w-full bg-transparent text-sm font-semibold text-ink outline-none">
          <option value="all">All types</option>
          {fleetTypes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-noria px-6 py-3.5 text-sm font-bold text-white transition hover:bg-noria-dark">
        <Search size={16} /> Search Cars
      </button>
    </form>
  );
}
