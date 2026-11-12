"use client";

import { Compass, MapPin, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type DirectoryCity = {
  slug: string;
  name: string;
  region: string;
  image: string;
  summary: string;
  tagline: string;
  lat: number;
  lng: number;
};

const heroImage = "/images/places/koutoubia-mosque-1.webp";

const coast: Array<[number, number]> = [
  [35.8, -5.193863],
  [35.330712, -4.591006],
  [35.399855, -3.640057],
  [35.179093, -2.604306],
  [35.168396, -2.169914],
  [34.527919, -1.792986],
  [33.919713, -1.733455],
  [32.864015, -1.388049],
  [32.651522, -1.124551],
  [32.262889, -1.307899],
  [32.094346, -2.616605],
  [31.724498, -3.06898],
  [31.637294, -3.647498],
  [30.896952, -3.690441],
  [30.501188, -4.859646],
  [30.000443, -5.242129],
  [29.7317, -6.060632],
  [29.579228, -7.059228],
  [28.841289, -8.674116],
  [27.656426, -8.66559],
  [27.656426, -8.817809],
  [27.120696, -8.794884],
  [27.088476, -9.413037],
  [26.860945, -9.735343],
  [26.860945, -10.189424],
  [26.990808, -10.551263],
  [26.883424, -11.392555],
  [26.104092, -11.71822],
  [26.030866, -12.030759],
  [24.770116, -12.500963],
  [23.691009, -13.89111],
  [22.310163, -14.221168],
  [21.86094, -14.630833],
  [21.5006, -14.750955],
  [21.420734, -17.002962],
  [21.42231, -17.020428],
  [21.885745, -16.973248],
  [22.158234, -16.589137],
  [22.67934, -16.261922],
  [23.017768, -16.326414],
  [23.723358, -15.982611],
  [24.359134, -15.426004],
  [24.520261, -15.089332],
  [25.103533, -14.824645],
  [25.636265, -14.800926],
  [26.254418, -14.43994],
  [26.618892, -13.773805],
  [27.640148, -13.139942],
  [27.654148, -13.121613],
  [28.038186, -12.618837],
  [28.148644, -11.688919],
  [28.832142, -10.900957],
  [29.098586, -10.399592],
  [29.933574, -9.564811],
  [31.177736, -9.814718],
  [31.55, -10.05],
  [32.0, -9.55],
  [32.038096, -9.434793],
  [32.564679, -9.300693],
  [33.240245, -8.657476],
  [33.697065, -7.654178],
  [34.110476, -6.912544],
  [35.145865, -6.244342],
  [35.55, -5.98],
  [35.9, -6.08],
  [35.96, -5.72],
  [35.9, -5.35],
  [35.8, -5.193863]
];

const lats = coast.map(([lat]) => lat);
const lngs = coast.map(([, lng]) => lng);
const minLat = Math.min(...lats);
const maxLat = Math.max(...lats);
const minLng = Math.min(...lngs);
const maxLng = Math.max(...lngs);
const xScale = Math.cos((((minLat + maxLat) / 2) * Math.PI) / 180);
const PAD = 28;
const INNER_W = 520;
const INNER_H = INNER_W * ((maxLat - minLat) / ((maxLng - minLng) * xScale));
const WIDTH = INNER_W + PAD * 2;
const HEIGHT = INNER_H + PAD * 2;

const project = (lat: number, lng: number) => ({
  x: ((lng - minLng) / (maxLng - minLng)) * INNER_W + PAD,
  y: ((maxLat - lat) / (maxLat - minLat)) * INNER_H + PAD
});

const outline = coast
  .map(([lat, lng], index) => {
    const point = project(lat, lng);
    return `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
  })
  .join(" ") + " Z";

export default function LocationsExplorer({ cities }: { cities: DirectoryCity[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(cities[0]?.slug ?? "");
  const normalized = query.trim().toLowerCase();
  const visible = useMemo(
    () => cities.filter((city) => !normalized || `${city.name} ${city.region} ${city.tagline}`.toLowerCase().includes(normalized)),
    [cities, normalized]
  );
  const active = cities.find((city) => city.slug === selected) ?? visible[0];

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="relative min-h-[28rem] sm:min-h-[32rem]">
          <Image src={heroImage} alt="Koutoubia Mosque in Marrakech" fill priority className="object-cover object-[center_40%]" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,22,0.82)_0%,rgba(7,11,22,0.55)_34%,rgba(7,11,22,0.2)_62%,rgba(7,11,22,0.28)_100%)]" />
          <div className="relative z-10 mx-auto flex min-h-[28rem] max-w-6xl flex-col justify-center px-4 pb-14 pt-28 sm:min-h-[32rem] sm:px-6">
            <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-noria px-3.5 py-1.5 text-xs font-bold">
              <Compass size={14} /> Explore Morocco
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Discover Morocco, One Destination at a Time
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/90 sm:text-lg">Find the perfect car rental location and start exploring Morocco your way.</p>
            <form
              className="mt-8 flex max-w-xl items-center gap-2 rounded-full bg-white p-2 text-ink shadow-[0_18px_50px_rgba(13,18,32,0.28)]"
              onSubmit={(event) => {
                event.preventDefault();
                if (visible.length === 1) router.push(`/locations/${visible[0].slug}`);
              }}
            >
              <Search size={18} className="ml-2 shrink-0 text-ink" aria-hidden />
              <label className="sr-only" htmlFor="destination-search">Search by city or destination</label>
              <input
                id="destination-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by city or destination"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm font-semibold outline-none placeholder:font-medium placeholder:text-slate-400"
              />
              {query ? (
                <button type="button" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-500 hover:bg-paper" aria-label="Clear search" onClick={() => setQuery("")}>
                  <X size={16} />
                </button>
              ) : null}
              <button type="submit" className="shrink-0 rounded-full bg-noria px-5 py-2.5 text-sm font-bold text-white hover:bg-noria-dark">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pickup cities on the <span className="text-noria">map</span>
          </h2>
          <p className="mt-2 text-slate-600">Every pin is a handover the desk already arranges. Car counts are not shown, because stock is confirmed for your dates rather than published per city.</p>
        </div>
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.75fr)]">
          <div className="rounded-[1.75rem] border border-line bg-white p-3 shadow-sm sm:p-5">
            <div className="relative mx-auto w-full max-w-md">
              <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="block h-auto w-full" role="img" aria-label="Map of Morocco with pickup cities">
                <defs>
                  <filter id="morocco-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#0d1220" floodOpacity="0.12" />
                  </filter>
                </defs>
                <path d={outline} fill="#e7e8ee" stroke="#c5c8d4" strokeWidth="2.5" strokeLinejoin="round" filter="url(#morocco-shadow)" />
              </svg>
              {cities.map((city) => {
                const point = project(city.lat, city.lng);
                const dimmed = normalized.length > 0 && !visible.some((item) => item.slug === city.slug);
                const isSelected = active?.slug === city.slug;
                return (
                  <button
                    key={city.slug}
                    type="button"
                    className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 ${dimmed ? "opacity-25" : ""}`}
                    style={{ left: `${(point.x / WIDTH) * 100}%`, top: `${(point.y / HEIGHT) * 100}%` }}
                    aria-label={city.name}
                    aria-pressed={isSelected}
                    onClick={() => setSelected(city.slug)}
                  >
                    <span className={`pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-white transition ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}>
                      {city.name}
                    </span>
                    <span className={`block rounded-full border-2 border-white bg-noria shadow-[0_6px_16px_rgba(225,6,0,0.45)] ${isSelected ? "h-4 w-4" : "h-3 w-3"}`} />
                  </button>
                );
              })}
            </div>
          </div>
          <aside className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-sm lg:sticky lg:top-24 lg:self-start">
            {active ? (
              <>
                <div className="relative h-44">
                  <Image src={active.image} alt={active.name} fill className="object-cover" sizes="360px" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{active.region} · Morocco</p>
                  <h3 className="mt-1 text-2xl font-extrabold">{active.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-noria">{active.tagline}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{active.summary}</p>
                  <Link href={`/locations/${active.slug}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-noria px-5 py-2.5 text-sm font-bold text-white hover:bg-noria-dark">
                    <MapPin size={15} /> Explore {active.name}
                  </Link>
                </div>
              </>
            ) : (
              <p className="p-6 text-sm text-slate-600">Select a city on the map.</p>
            )}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Popular <span className="text-noria">Destinations</span>
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">City handovers across Morocco. Open a destination for the meeting point, then request a car from the fleet.</p>
        {visible.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-line bg-white p-8 text-sm text-slate-600">No destination matches “{query.trim()}”. Try Marrakech, Fes, Agadir or Tangier.</p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((city) => (
              <article key={city.slug} className={`group overflow-hidden rounded-[1.5rem] border bg-white shadow-sm transition motion-safe:hover:-translate-y-1 ${active?.slug === city.slug ? "border-noria" : "border-line"}`}>
                <Link href={`/locations/${city.slug}`} className="relative block h-52 overflow-hidden">
                  <Image src={city.image} alt={city.name} fill className="object-cover transition duration-500 motion-safe:group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </Link>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Morocco</p>
                  <h3 className="mt-1 text-xl font-extrabold">
                    <Link href={`/locations/${city.slug}`}>{city.name}</Link>
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-noria">{city.tagline}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{city.summary}</p>
                  <Link href={`/cars?location=${city.slug}`} className="mt-4 inline-flex rounded-full bg-noria px-4 py-2 text-sm font-bold text-white hover:bg-noria-dark">
                    Explore Cars
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
