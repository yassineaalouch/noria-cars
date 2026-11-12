import type { Metadata } from "next";
import { ChevronRight, MapPin, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CarCard from "@/components/CarCard";
import CityRequestForm from "@/components/CityRequestForm";
import JsonLd from "@/components/JsonLd";
import { airportCode, destinationTagline, offersHotelHandover } from "@/lib/destinations";
import { cars, getPickup, pickupPoints } from "@/lib/fleet";
import { faqs } from "@/lib/faq";
import { breadcrumbJsonLd, buildMetadata, cityJsonLd, faqJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return pickupPoints.map((point) => ({ slug: point.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const point = getPickup(slug);
  if (!point) return {};
  const airport = point.name.includes("Airport");
  return buildMetadata({
    title: airport ? `Rent a car at ${point.name}` : `Rent a car in ${point.city}, Morocco`,
    description: `${point.summary} ${point.pickupNote}`,
    path: `/locations/${point.slug}`,
    image: point.image,
    imageAlt: point.name,
    geo: { lat: point.lat, lng: point.lng, placename: airport ? point.name : point.city }
  });
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const point = getPickup(slug);
  if (!point) notFound();

  const airport = point.name.includes("Airport");
  const sameCity = pickupPoints.filter((item) => item.city === point.city);
  const cityPoint = sameCity.find((item) => !item.name.includes("Airport"));
  const airportPoint = sameCity.find((item) => item.name.includes("Airport"));
  const hotelPoint = cityPoint && offersHotelHandover(cityPoint.slug) ? cityPoint : undefined;
  const fleetSample = cars.slice(0, 6);
  const tagline = destinationTagline[point.slug];

  const localFaqs = [
    { question: `Where is the handover for ${point.name}?`, answer: point.pickupNote },
    ...(airportPoint && !airport
      ? [{ question: `Can I collect the car at the airport in ${point.city}?`, answer: `${airportPoint.name}. ${airportPoint.pickupNote}` }]
      : []),
    ...(hotelPoint ? [{ question: "Can the car meet me at a hotel or riad?", answer: hotelPoint.pickupNote }] : []),
    { question: "Is this a self-drive rental?", answer: `Yes. You drive. A chauffeur is not offered. ${faqs[2].answer}` },
    { question: "Can I return the car in another city?", answer: faqs[3].answer }
  ];

  return (
    <main className="bg-paper">
      <JsonLd data={cityJsonLd(point.slug)} />
      <JsonLd data={faqJsonLd(localFaqs)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }, { name: point.name, path: `/locations/${point.slug}` }])} />

      <section className="relative min-h-[46vh] bg-ink text-white">
        <Image src={point.image} alt={point.name} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,22,0.82)_0%,rgba(7,11,22,0.45)_42%,rgba(7,11,22,0.15)_100%)]" />
        <div className="relative mx-auto flex min-h-[46vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6">
          <p className="text-sm font-semibold text-white/80">{point.region} · Morocco</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            {airport ? `Rent a Car at ${point.name}` : `Rent a Car in ${point.city}, Morocco`}
          </h1>
          {tagline ? <p className="mt-3 text-lg font-semibold text-noria">{tagline}</p> : null}
          <p className="mt-3 max-w-2xl text-white/85">{point.summary}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div className="space-y-10">
          <article className="rounded-[1.5rem] border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold">How pickup works</h2>
            <p className="mt-3 leading-7 text-slate-600">{point.summary}</p>
            <p className="mt-3 leading-7 text-slate-600">{point.pickupNote}</p>
            <p className="mt-3 leading-7 text-slate-600">The daily rate does not change with the city. A one-way drop at another listed handover has to be confirmed before you travel. No payment is taken on this website.</p>
          </article>

          <article>
            <h2 className="text-2xl font-extrabold">Pickup and drop-off here</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Only the meeting points the desk already uses in {point.city} are listed.</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {sameCity.map((item) => (
                <li key={item.slug}>
                  <Link href={`/locations/${item.slug}`} className="block rounded-2xl border border-line bg-white p-4 shadow-sm hover:border-noria">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-noria">
                      {item.name.includes("Airport") ? <Plane size={13} /> : <MapPin size={13} />}
                      {airportCode[item.slug] ?? "City"}
                    </span>
                    <span className="mt-1 block font-extrabold">{item.name}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">{item.pickupNote}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-slate-600">Drop-off can be requested at any other Noria-Cars handover. The desk confirms the one-way before travel.</p>
          </article>

          {airportPoint ? (
            <article className="rounded-[1.5rem] border border-line bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-extrabold">Airport pickup</h2>
              <p className="mt-3 leading-7 text-slate-600">{airportPoint.name}. {airportPoint.pickupNote}</p>
              <Link href={`/cars?location=${airportPoint.slug}`} className="mt-4 inline-flex rounded-full bg-noria px-4 py-2 text-sm font-bold text-white hover:bg-noria-dark">
                Find cars at {airportCode[airportPoint.slug] ?? airportPoint.name}
              </Link>
            </article>
          ) : null}

          {hotelPoint ? (
            <article className="rounded-[1.5rem] border border-line bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-extrabold">Hotel and riad handover</h2>
              <p className="mt-3 leading-7 text-slate-600">{hotelPoint.pickupNote}</p>
            </article>
          ) : null}

          <article className="rounded-[1.5rem] border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold">Self-drive</h2>
            <p className="mt-3 leading-7 text-slate-600">Rentals are self-drive. A car with a driver is not offered. {faqs[2].answer}</p>
          </article>

          <article>
            <h2 className="text-2xl font-extrabold">Questions before you book</h2>
            <div className="mt-4 space-y-3">
              {localFaqs.map((item) => (
                <details key={item.question} className="rounded-2xl border border-line bg-white px-5 py-4">
                  <summary className="cursor-pointer font-bold">{item.question}</summary>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </article>
        </div>

        <div className="lg:sticky lg:top-24">
          <CityRequestForm pickupSlug={point.slug} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold">Cars you can request</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">This is the national fleet, not a live count for {point.city}. The desk confirms which of these cars is free for your dates.</p>
          </div>
          <Link href={`/cars?location=${point.slug}`} className="text-sm font-bold text-noria">
            View the full fleet
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {fleetSample.map((car) => (
            <CarCard key={car.id} car={car} href={`/cars/${car.id}?location=${point.slug}`} />
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 rounded-[1.75rem] bg-ink px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10">
          <div>
            <h2 className="text-2xl font-extrabold">Ready to request a car in {point.city}?</h2>
            <p className="mt-2 text-sm text-white/75">Open the fleet with this pickup already selected.</p>
          </div>
          <Link href={`/cars?location=${point.slug}`} className="inline-flex items-center gap-2 rounded-full bg-noria px-5 py-2.5 text-sm font-bold text-white hover:bg-noria-dark">
            Find Your Car Now <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
