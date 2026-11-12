import { Fuel, Settings2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WishlistButton from "@/components/WishlistButton";
import { formatMad, type Car } from "@/lib/fleet";

export default function CarCard({ car, href }: { car: Car; href: string }) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-line bg-white p-4 shadow-[0_10px_30px_rgba(13,18,32,0.05)]">
      <div className="mb-3 flex items-start justify-between">
        {car.housePick ? (
          <span className="rounded-full bg-noria px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">House pick</span>
        ) : (
          <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">{car.type}</span>
        )}
        <WishlistButton id={car.id} />
      </div>
      <Link href={href} className="relative mx-auto block h-36 w-full">
        <Image src={car.image} alt={car.name} fill sizes="(max-width: 768px) 100vw, 30vw" className="object-contain" />
      </Link>
      <h3 className="mt-3 text-lg font-extrabold text-ink">
        <Link href={href}>{car.name}</Link>
      </h3>
      <p className="mt-2 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
        <span className="inline-flex items-center gap-1"><Users size={13} /> {car.seats} seats</span>
        <span className="inline-flex items-center gap-1"><Settings2 size={13} /> {car.gearbox}</span>
        <span className="inline-flex items-center gap-1"><Fuel size={13} /> {car.fuel}</span>
      </p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-ink">
          <span className="text-xl font-extrabold">{formatMad(car.priceMad)}</span>
          <span className="text-sm text-slate-500"> / day</span>
          <span className="mt-0.5 block text-xs text-slate-400">€{car.priceEur}</span>
        </p>
        <Link href={href} className="rounded-full bg-noria px-4 py-2 text-sm font-bold text-white hover:bg-noria-dark">
          Rent now
        </Link>
      </div>
    </article>
  );
}
