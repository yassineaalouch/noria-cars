import { Pacifico } from "next/font/google";
import { CalendarCheck, Car, Check, ChevronRight, Flame, Headphones, MapPin, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchCard from "@/components/SearchCard";
import { cars, carsOfType, cities, fleetTypes, formatMad, fromPrice } from "@/lib/fleet";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Rent a car in Morocco",
  absolute: true,
  description: "Rent a car or an off-road motorcycle in Morocco. Compare daily rates in MAD and EUR, then request pickup in Marrakech, Casablanca, Rabat, Fes, Tangier, Agadir or a listed airport.",
  path: "/",
  image: "/images/pages%20images/home%20page%20hero%20section%20image.jpg",
  imageAlt: "BMW SUV on a Marrakech road at sunset, with the Koutoubia minaret and palm trees"
});

const categoryImage: Record<string, string> = {
  economy: carsOfType("economy")[0].image,
  sedan: carsOfType("sedan")[1].image,
  suv: carsOfType("suv").find((car) => car.id === "dacia-duster")?.image ?? carsOfType("suv")[0].image,
  luxury: carsOfType("luxury").find((car) => car.id === "range-rover-evoque")?.image ?? carsOfType("luxury")[0].image,
  van: carsOfType("van")[0].image,
  motorcycle: carsOfType("motorcycle")[0].image
};

const heroImage = "/images/pages%20images/home%20page%20hero%20section%20image.jpg";
const locationImage = "/images/pages%20images/our%20location%20image%20section%20home%20page.jpg";
const roadImage = "/images/pages%20images/Ready%20to%20Hit%20the%20Road%20section.jpg";
const popularIds = ["renault-clio", "dacia-duster", "hyundai-accent-2026", "peugeot-208"];
const featuredSlugs = ["marrakech", "casablanca", "rabat", "fes", "tangier", "agadir", "ouarzazate"];

const script = Pacifico({ weight: "400", subsets: ["latin"] });

const heroPoints = ["Multiple Vehicles", "Competitive Prices", "Easy Reservation"];

export default function HomePage() {
  const popular = popularIds.map((id) => cars.find((car) => car.id === id)).filter((car) => car !== undefined);

  return (
    <main>
      <section className="relative bg-ink text-white">
        <div className="relative min-h-[34rem] overflow-hidden sm:min-h-[38rem]">
          <Image
            src={heroImage}
            alt="BMW SUV on a Marrakech road at sunset, with the Koutoubia minaret and palm trees"
            fill
            priority
            unoptimized
            className="object-cover object-[78%_42%] sm:object-[64%_center]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#070b16_0%,rgba(7,11,22,0.94)_16%,rgba(7,11,22,0.78)_32%,rgba(7,11,22,0.28)_52%,rgba(7,11,22,0.05)_70%,rgba(7,11,22,0)_100%)] max-sm:bg-[linear-gradient(180deg,rgba(7,11,22,0.55)_0%,rgba(7,11,22,0.82)_42%,rgba(7,11,22,0.9)_100%)]" />
          <div className="relative z-10 mx-auto flex min-h-[34rem] max-w-6xl items-center px-4 pb-24 pt-12 sm:min-h-[38rem] sm:px-6 sm:pt-10">
            <div className="max-w-2xl">
              <h1 className="text-[2.15rem] font-extrabold leading-[1.05] tracking-tight min-[420px]:text-5xl lg:text-[3.45rem] xl:text-6xl">
                Rent a Car in Morocco
                <br />
                with <span className="text-noria">Noria-Cars</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-white/90 sm:text-lg">
                Explore Morocco freely with a wide range of cars at the best prices!
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold sm:text-[15px]">
                {heroPoints.map((point) => (
                  <li key={point} className="inline-flex items-center gap-2">
                    <span className="grid size-5 place-items-center rounded-full bg-noria text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <svg aria-hidden className="pointer-events-none absolute bottom-10 left-0 z-10 hidden h-16 w-[min(40%,480px)] text-noria sm:block" viewBox="0 0 480 72" fill="none">
          <path d="M-16 50C70 58 130 14 250 18c70 2 120 16 210 8" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
        </svg>
        <div className="relative z-20 mx-auto -mt-[4.5rem] max-w-6xl px-4 sm:px-6">
          <SearchCard />
        </div>
      </section>

      <section className="bg-paper px-4 pb-10 pt-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold tracking-tight">Our <span className="text-noria">Car</span> Categories</h2>
          <p className="mt-1.5 text-slate-500">Choose the perfect car for your journey</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {fleetTypes.map((type) => (
              <Link key={type.id} href={`/cars?type=${type.id}`} className="group flex flex-col rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5">
                <div className="relative h-28">
                  <Image src={categoryImage[type.id]} alt="" fill className="object-contain" sizes="220px" />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-3">
                  <span>
                    <span className="block font-extrabold">{type.label}</span>
                    <span className="text-sm text-slate-500">From {formatMad(fromPrice(type.id))}/day</span>
                  </span>
                  <ChevronRight size={18} className="shrink-0 text-slate-400 transition group-hover:text-noria" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-extrabold tracking-tight">Popular Cars</h2>
            <Link href="/cars" className="text-sm font-bold text-noria">View All Cars →</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((car) => (
              <article key={car.id} className="flex flex-col rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <div className="relative h-36">
                  {car.housePick ? (
                    <span className="absolute right-0 top-0 z-10 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-noria shadow-sm">
                      <Flame size={12} className="fill-noria" /> Best Seller
                    </span>
                  ) : null}
                  <Image src={car.image} alt={car.name} fill className="object-contain" sizes="280px" />
                </div>
                <h3 className="mt-4 text-lg font-extrabold">{car.name}</h3>
                <p className="mt-2 text-xl font-extrabold">
                  {formatMad(car.priceMad)} <span className="text-sm font-medium text-slate-400">/ day</span>
                </p>
                <Link href={`/cars/${car.id}`} className="mt-4 inline-flex items-center justify-center gap-1 self-center rounded-full bg-noria px-6 py-2.5 text-sm font-bold text-white hover:bg-noria-dark">
                  Reserve Now <ChevronRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-4 sm:px-6" aria-label="Why travelers book with Noria-Cars">
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 overflow-hidden rounded-2xl bg-ink px-5 py-6 text-white lg:flex-row lg:items-center lg:gap-0 lg:px-8 lg:py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-[radial-gradient(circle_at_left,rgba(225,6,0,0.28),transparent_72%)]" />
          <div className="relative flex items-start gap-3.5 lg:shrink-0 lg:border-r lg:border-white/15 lg:pr-8">
            <span className="mt-1 h-11 w-[3px] shrink-0 rounded-full bg-noria" />
            <div>
              <h2 className="text-xl font-extrabold leading-tight lg:whitespace-nowrap lg:text-[1.65rem]">
                Why Choose <span className="text-noria">Noria-Cars</span> ?
              </h2>
              <p className="mt-1 text-sm text-white/60">Your satisfaction is our priority</p>
            </div>
          </div>
          <ul className="relative grid flex-1 grid-cols-2 gap-y-5 sm:grid-cols-4">
            {[
              [ShieldCheck, "Trusted & Secure", "Booking"],
              [Headphones, "24/7 Customer", "Support"],
              [Star, "Best Prices", "in Morocco"],
              [Car, "Wide Range", "of Vehicles"]
            ].map(([Icon, line, detail], index) => (
              <li key={String(line)} className={`flex flex-col items-center px-2 text-center ${index > 0 ? "lg:border-l lg:border-white/15" : ""}`}>
                <Icon size={26} className={Icon === Star ? "fill-noria text-noria" : "text-noria"} strokeWidth={1.75} />
                <p className="mt-2 text-sm font-semibold leading-snug">
                  {String(line)}
                  <br />
                  {String(detail)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] bg-[#f3f6fa] lg:h-[252px]">
          <Image src={locationImage} alt="" fill unoptimized className="object-cover object-center" sizes="100vw" />
          <div className="relative flex h-full flex-col justify-center gap-6 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-0">
            <div className="max-w-xl">
              <h2 className="text-[1.65rem] font-extrabold leading-none tracking-tight sm:text-[1.85rem]">
                Our <span className="text-noria">Locations</span> Across Morocco
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">Pick up your car from major cities</p>
              <ul className="mt-3.5 grid max-w-lg grid-cols-2 gap-2 sm:grid-cols-4">
                {featuredSlugs.map((slug) => {
                  const city = cities.find((item) => item.slug === slug);
                  if (!city) return null;
                  return (
                    <li key={city.slug}>
                      <Link href={`/locations/${city.slug}`} className="inline-flex w-full items-center gap-1.5 rounded-xl bg-white px-2.5 py-1.5 text-[13px] font-semibold shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
                        <MapPin size={13} className="shrink-0 fill-noria text-noria" /> {city.slug === "fes" ? "Fès" : city.name}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link href="/locations" className="inline-flex w-full items-center gap-1.5 rounded-xl bg-white px-2.5 py-1.5 text-[13px] font-semibold text-slate-400 shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
                    <MapPin size={13} className="shrink-0 fill-noria text-noria" /> and more...
                  </Link>
                </li>
              </ul>
              <Link href="/locations" className="mt-3.5 inline-flex items-center gap-1 rounded-full bg-noria px-4 py-2 text-sm font-bold text-white hover:bg-noria-dark">
                View All Locations <ChevronRight size={15} />
              </Link>
            </div>
            <p className={`${script.className} text-right text-[2.4rem] leading-[1.02] text-ink sm:text-5xl lg:pr-2`}>
              Explore Morocco
              <br />
              <span className="whitespace-nowrap text-[0.78em]">
                with{" "}
                <span className="relative inline-block text-noria">
                  Noria-Cars
                  <svg aria-hidden className="absolute -bottom-1 left-0 h-2.5 w-full" viewBox="0 0 120 10" fill="none" preserveAspectRatio="none">
                    <path d="M2 6C30 2 78 2 118 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </span>{" "}
                !
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <Image src={roadImage} alt="" fill unoptimized className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,22,0.9)_0%,rgba(7,11,22,0.72)_24%,rgba(7,11,22,0.28)_46%,rgba(7,11,22,0.05)_68%,rgba(7,11,22,0)_100%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-4 py-8 sm:px-6 sm:py-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to Hit the <span className="text-noria">Road</span>?
            </h2>
            <p className="mt-2 text-white/85">Book your car now and start your Moroccan adventure!</p>
          </div>
          <Link href="/cars" className="inline-flex items-center gap-2 rounded-full bg-noria px-5 py-3 text-sm font-bold text-white hover:bg-noria-dark">
            <CalendarCheck size={16} /> Reserve Now <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
