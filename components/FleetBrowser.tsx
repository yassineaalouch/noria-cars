"use client";

import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CarCard from "@/components/CarCard";
import { cars, fleetTypes, priceBounds, type FleetType, type Fuel, type Gearbox } from "@/lib/fleet";

const PAGE_SIZE = 9;
const fuels: Array<Fuel | "all"> = ["all", "Petrol", "Diesel", "Hybrid"];
const gears: Array<Gearbox | "all"> = ["all", "Automatic", "Manual"];

export default function FleetBrowser() {
  const params = useSearchParams();
  const initialType = params.get("type");
  const location = params.get("location") ?? "";
  const drop = params.get("drop") ?? "";
  const pickup = params.get("pickup") ?? "";
  const dropoff = params.get("dropoff") ?? "";
  const [type, setType] = useState<FleetType | "all">(fleetTypes.some((item) => item.id === initialType) ? (initialType as FleetType) : "all");
  const [gearbox, setGearbox] = useState<Gearbox | "all">("all");
  const [fuel, setFuel] = useState<Fuel | "all">("all");
  const [minPrice, setMinPrice] = useState(priceBounds.min);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const list = cars.filter((car) => {
      if (type !== "all" && car.type !== type) return false;
      if (gearbox !== "all" && car.gearbox !== gearbox) return false;
      if (fuel !== "all" && car.fuel !== fuel) return false;
      if (car.priceMad < minPrice || car.priceMad > maxPrice) return false;
      return true;
    });
    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.priceMad - b.priceMad;
      if (sort === "price-desc") return b.priceMad - a.priceMad;
      if (sort === "name") return a.name.localeCompare(b.name);
      return Number(b.housePick) - Number(a.housePick) || a.priceMad - b.priceMad;
    });
  }, [type, gearbox, fuel, minPrice, maxPrice, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const query = new URLSearchParams();
  if (location) query.set("location", location);
  if (drop) query.set("drop", drop);
  if (pickup) query.set("pickup", pickup);
  if (dropoff) query.set("dropoff", dropoff);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-3xl border border-line bg-white p-5 shadow-sm lg:sticky lg:top-[4.75rem] lg:z-20 lg:max-h-[calc(100vh-5.5rem)] lg:self-start lg:overflow-y-auto">
        <h2 className="flex items-center gap-2 text-base font-extrabold">
          <SlidersHorizontal size={16} /> Filter results
        </h2>
        <fieldset className="mt-5">
          <legend className="text-sm font-bold">Car type</legend>
          <div className="mt-3 space-y-2 text-sm">
            <Radio name="type" label="All types" checked={type === "all"} onChange={() => { setType("all"); setPage(1); }} />
            {fleetTypes.map((item) => (
              <Radio key={item.id} name="type" label={item.label} checked={type === item.id} onChange={() => { setType(item.id); setPage(1); }} />
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="text-sm font-bold">Transmission</legend>
          <div className="mt-3 space-y-2 text-sm">
            {gears.map((item) => (
              <Radio key={item} name="gear" label={item === "all" ? "All" : item} checked={gearbox === item} onChange={() => { setGearbox(item); setPage(1); }} />
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="text-sm font-bold">Fuel type</legend>
          <div className="mt-3 space-y-2 text-sm">
            {fuels.map((item) => (
              <Radio key={item} name="fuel" label={item === "all" ? "All" : item} checked={fuel === item} onChange={() => { setFuel(item); setPage(1); }} />
            ))}
          </div>
        </fieldset>
        <div className="mt-6">
          <p className="text-sm font-bold">Price range (MAD/day)</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input type="number" min={priceBounds.min} max={maxPrice} value={minPrice} onChange={(event) => { setMinPrice(Number(event.target.value)); setPage(1); }} className="rounded-xl border border-line px-3 py-2 text-sm" aria-label="Minimum daily price" />
            <input type="number" min={minPrice} max={priceBounds.max} value={maxPrice} onChange={(event) => { setMaxPrice(Number(event.target.value)); setPage(1); }} className="rounded-xl border border-line px-3 py-2 text-sm" aria-label="Maximum daily price" />
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-noria py-3 text-sm font-bold text-white"
            onClick={() => {
              setType("all");
              setGearbox("all");
              setFuel("all");
              setMinPrice(priceBounds.min);
              setMaxPrice(priceBounds.max);
              setPage(1);
            }}
          >
            Reset filters
          </button>
        </div>
      </aside>
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-extrabold">Available cars ({filtered.length} results)</h2>
          <label className="text-sm text-slate-500">
            Sort by{" "}
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="font-semibold text-ink outline-none">
              <option value="popular">House picks</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
        {visible.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-white p-8 text-sm text-slate-600">No car matches these filters. Reset them to see the full fleet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((car) => (
              <CarCard key={car.id} car={car} href={`/cars/${car.id}?${query.toString()}`} />
            ))}
          </div>
        )}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white" onClick={() => setPage((value) => Math.max(1, value - 1))} aria-label="Previous page">‹</button>
          {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
            <button key={number} type="button" onClick={() => setPage(number)} className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${number === current ? "bg-noria text-white" : "bg-white"}`}>
              {number}
            </button>
          ))}
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white" onClick={() => setPage((value) => Math.min(pages, value + 1))} aria-label="Next page">›</button>
        </div>
      </div>
    </div>
  );
}

function Radio({ name, label, checked, onChange }: { name: string; label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="accent-noria" />
      {label}
    </label>
  );
}
