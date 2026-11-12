import { CalendarCheck, CarFront, ChevronRight, KeyRound, MapPin, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LocationsExplorer, { type DirectoryCity } from "@/components/LocationsExplorer";
import JsonLd from "@/components/JsonLd";
import { airportCode, destinationTagline } from "@/lib/destinations";
import { cities, pickupPoints } from "@/lib/fleet";
import { buildMetadata, placeListJsonLd } from "@/lib/seo";

const roadImage = "/images/pages%20images/Ready%20to%20Hit%20the%20Road%20section.jpg";

const airports = pickupPoints.filter((point) => airportCode[point.slug]);

const directory: DirectoryCity[] = cities.map((city) => ({
  slug: city.slug,
  name: city.name,
  region: city.region,
  image: city.image,
  summary: city.summary,
  tagline: destinationTagline[city.slug] ?? city.region,
  lat: city.lat,
  lng: city.lng
}));

export const metadata = buildMetadata({
  title: "Car rental locations in Morocco",
  description: "Pick up a Noria-Cars rental in Marrakech, Casablanca, Rabat, Fes, Tangier, Agadir, Essaouira, Ouarzazate, Chefchaouen and Merzouga, plus Menara, Mohammed V, Al Massira, Ibn Battuta and Fes–Saïss airports.",
  path: "/locations",
  image: "/images/places/koutoubia-mosque-1.webp",
  imageAlt: "Koutoubia Mosque in Marrakech"
});

export default function LocationsPage() {
  return (
    <main className="bg-paper">
      <JsonLd data={placeListJsonLd()} />
      <LocationsExplorer cities={directory} />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Arriving in Morocco? Pick Up Your Car at the Airport.
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">Start your journey as soon as you land. These are the airports where the desk already meets arrivals.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {airports.map((airport) => (
            <article key={airport.slug} className="group overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-sm transition motion-safe:hover:-translate-y-1">
              <Link href={`/locations/${airport.slug}`} className="relative block h-44 overflow-hidden">
                <Image src={airport.image} alt={airport.name} fill className="object-cover transition duration-500 motion-safe:group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-white">
                  <Plane size={13} /> {airportCode[airport.slug]}
                </span>
              </Link>
              <div className="p-5">
                <h3 className="text-lg font-extrabold leading-snug">
                  <Link href={`/locations/${airport.slug}`}>{airport.name}</Link>
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">{airport.city}, Morocco</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{airport.summary}</p>
                <Link href={`/cars?location=${airport.slug}`} className="mt-4 inline-flex rounded-full bg-noria px-4 py-2 text-sm font-bold text-white hover:bg-noria-dark">
                  Find Cars
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] bg-ink text-white shadow-[0_20px_50px_rgba(13,18,32,0.18)]">
          <div aria-hidden className="pointer-events-none absolute -left-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-noria/30 blur-3xl" />
          <div className="absolute inset-y-0 left-0 w-1 bg-noria" />
          <div className="relative px-6 py-10 sm:px-10">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Explore Morocco with <span className="text-noria">Confidence</span>
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [CarFront, "Wide Selection", "Economy, sedan, SUV, luxury and vans from the published fleet."],
                [MapPin, "Flexible Pickup", "City centers and the five airports listed above. Hotel or riad handover only in Marrakech and Agadir, where the desk can reach the address."],
                [KeyRound, "Self-drive", "You drive the car. A chauffeur is not offered on this website."],
                [CalendarCheck, "Easy Booking", "Send a request online. The desk confirms the car, the meeting point and the rate by email."]
              ].map(([Icon, title, copy]) => (
                <li key={String(title)}>
                  <Icon size={26} className="text-noria" strokeWidth={1.75} />
                  <h3 className="mt-3 text-base font-extrabold">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/75">{String(copy)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="relative mx-auto min-h-64 max-w-6xl overflow-hidden rounded-[1.75rem] bg-ink text-white">
          <Image src={roadImage} alt="" fill unoptimized className="object-cover object-[70%_center]" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,22,0.88)_0%,rgba(8,12,22,0.55)_32%,rgba(8,12,22,0.12)_58%,rgba(8,12,22,0)_72%)]" />
          <div className="relative flex min-h-64 max-w-xl flex-col justify-center px-6 py-10 sm:px-10">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Your Moroccan Adventure <span className="text-noria">Starts Here</span>
            </h2>
            <p className="mt-3 text-sm text-white/85 sm:text-base">Choose your destination, find your perfect car and explore Morocco freely.</p>
            <Link href="/cars" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-noria px-5 py-2.5 text-sm font-bold text-white hover:bg-noria-dark">
              Find Your Car Now <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
