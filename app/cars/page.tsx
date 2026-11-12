import { Car, ChevronRight } from "lucide-react";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import FleetBrowser from "@/components/FleetBrowser";
import JsonLd from "@/components/JsonLd";
import { cars } from "@/lib/fleet";
import { buildMetadata, fleetListJsonLd } from "@/lib/seo";

const heroImage = "/images/pages%20images/hero%20section.jpg";
const dreamImage = "/images/pages%20images/drive%20your%20dream%20car.jpg";

export const metadata = buildMetadata({
  title: "Rental cars and motorcycles in Morocco",
  description: `Compare ${cars.length} Noria-Cars vehicles for Morocco: economy, sedan, SUV, luxury, van and off-road motorcycle, with daily rates in MAD and EUR.`,
  path: "/cars",
  image: heroImage,
  imageAlt: "Black BMW sedan on a Marrakech road, with the Koutoubia minaret and the Atlas mountains"
});

export default function CarsPage() {
  return (
    <main>
      <JsonLd data={fleetListJsonLd()} />
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-[30rem]">
          <Image
            src={heroImage}
            alt="Black BMW sedan on a Marrakech road, with the Koutoubia minaret and the Atlas mountains"
            fill
            priority
            unoptimized
            className="object-cover object-[70%_42%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,22,0.78)_0%,rgba(7,11,22,0.5)_24%,rgba(7,11,22,0.16)_46%,rgba(7,11,22,0)_68%)]" />
          <div className="relative z-10 mx-auto flex min-h-[22rem] max-w-6xl items-center px-4 py-14 sm:min-h-[26rem] sm:px-6 lg:min-h-[30rem]">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-noria px-3.5 py-1.5 text-xs font-bold">
                <Car size={14} /> Our Fleet
              </p>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                Explore Our <span className="text-noria">Cars</span>
              </h1>
              <p className="mt-3 text-base text-white/90 sm:text-lg">Find the perfect car for your journey in Morocco</p>
              <svg aria-hidden className="mt-4 h-7 w-40 text-noria" viewBox="0 0 180 28" fill="none">
                <path d="M2 18C46 24 78 6 118 8c28 1 42 8 60 4" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-paper px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Suspense fallback={<p className="text-sm text-slate-500">Loading the fleet…</p>}>
            <FleetBrowser />
          </Suspense>
        </div>
      </section>
      <section className="px-4 pb-16 sm:px-6">
        <div className="relative mx-auto min-h-56 max-w-6xl overflow-hidden rounded-[1.75rem] bg-ink text-white">
          <Image src={dreamImage} alt="" fill unoptimized className="object-cover object-[68%_center]" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,22,0.88)_0%,rgba(8,12,22,0.62)_28%,rgba(8,12,22,0.18)_50%,rgba(8,12,22,0)_68%)]" />
          <div className="relative flex min-h-56 max-w-xl flex-col justify-center px-6 py-8 sm:px-10">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Drive Your Dream
              <br />
              with <span className="text-noria">Noria-Cars</span> !
            </h2>
            <p className="mt-3 text-sm text-white/85 sm:text-base">Rent the best cars at the best prices in Morocco</p>
            <Link href="/cars" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-noria px-5 py-2.5 text-sm font-bold text-white hover:bg-noria-dark">
              Explore More Cars <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
