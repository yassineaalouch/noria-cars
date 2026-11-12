import { Fuel, Settings2, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import ReserveForm from "@/components/ReserveForm";
import { cars, formatMad, getCar } from "@/lib/fleet";
import { breadcrumbJsonLd, buildMetadata, carJsonLd } from "@/lib/seo";

type Params = { id: string };

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const car = getCar(id);
  if (!car) return {};
  return buildMetadata({
    title: `Rent a ${car.name} in Morocco`,
    description: `${car.blurb} From ${formatMad(car.priceMad)} per day (€${car.priceEur}). ${car.seats} seats, ${car.gearbox.toLowerCase()}, ${car.fuel.toLowerCase()}.`,
    path: `/cars/${car.id}`,
    image: car.image,
    imageAlt: car.name
  });
}

export default async function CarPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) notFound();

  return (
    <main className="bg-paper">
      <JsonLd data={carJsonLd(car.id)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cars", path: "/cars" }, { name: car.name, path: `/cars/${car.id}` }])} />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_.9fr]">
        <article>
          <p className="text-sm font-semibold text-slate-500">
            <Link href="/cars" className="text-noria">All cars</Link> / {car.type}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold">{car.name}</h1>
          <p className="mt-3 max-w-xl text-slate-600">{car.blurb}</p>
          <div className="relative mt-6 h-80 rounded-3xl border border-line bg-white">
            <Image src={car.image} alt={car.name} fill className="object-contain p-6" sizes="(max-width: 1024px) 100vw, 50vw" priority />
          </div>
          <ul className="mt-6 grid grid-cols-3 gap-3 text-sm font-semibold">
            <li className="rounded-2xl bg-white p-4"><Users size={16} className="mb-2 text-noria" />{car.seats} seats</li>
            <li className="rounded-2xl bg-white p-4"><Settings2 size={16} className="mb-2 text-noria" />{car.gearbox}</li>
            <li className="rounded-2xl bg-white p-4"><Fuel size={16} className="mb-2 text-noria" />{car.fuel}</li>
          </ul>
          <p className="mt-6 text-3xl font-extrabold">{formatMad(car.priceMad)} <span className="text-base font-medium text-slate-500">/ day · €{car.priceEur}</span></p>
        </article>
        <Suspense fallback={<p className="text-sm">Loading the reservation form…</p>}>
          <ReserveForm car={car} />
        </Suspense>
      </div>
    </main>
  );
}
