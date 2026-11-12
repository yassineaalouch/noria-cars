import { Mail } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
import NewsletterForm from "@/components/NewsletterForm";
import { cities, fleetTypes } from "@/lib/fleet";
import { SITE_EMAIL, SITE_TAGLINE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm font-semibold text-white">{SITE_TAGLINE}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">
            Self-drive cars across Morocco, with the same fleet and daily rates as MoroccoMiles. The desk confirms every request by email.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/cars">Cars</Link></li>
            <li><Link href="/locations">Locations</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Popular destinations</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {cities.map((city) => (
              <li key={city.slug}><Link href={`/locations/${city.slug}`}>{city.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Car categories</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {fleetTypes.map((type) => (
              <li key={type.id}><Link href={`/cars?type=${type.id}`}>{type.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Customer support</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/faq">Questions before you book</Link></li>
            <li><Link href="/terms">Rental conditions</Link></li>
          </ul>
          <a href={`mailto:${SITE_EMAIL}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
            <Mail size={15} /> {SITE_EMAIL}
          </a>
          <p className="mt-4 text-sm leading-6 text-white/70">Leave your email and the desk will send rate updates and pickup notes. No payment is taken here.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-white/60 sm:px-6">
          <p>© 2026 Noria-Cars. All rights reserved.</p>
          <p>English · Morocco</p>
        </div>
      </div>
    </footer>
  );
}
