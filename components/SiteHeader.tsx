"use client";

import { ChevronDown, Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { cities } from "@/lib/fleet";

const links = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locationsActive = pathname.startsWith("/locations");
  const overlay = locationsActive;

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const solid = !overlay || scrolled || open;

  return (
    <header className={`${overlay ? "fixed inset-x-0" : "sticky"} top-0 z-40 border-b text-white transition-colors ${solid ? "border-white/10 bg-ink" : "border-transparent bg-transparent"}`}>
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo light />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.slice(0, 2).map((link) => (
            <Link key={link.href} href={link.href} className={navClass(pathname === link.href)}>
              {link.label}
            </Link>
          ))}
          <div className="relative" onMouseEnter={() => setLocationsOpen(true)} onMouseLeave={() => setLocationsOpen(false)}>
            <Link href="/locations" className={navClass(locationsActive)} aria-expanded={locationsOpen}>
              Locations <ChevronDown size={14} />
            </Link>
            {locationsOpen ? (
              <div className="absolute left-0 top-full w-64 rounded-2xl bg-white p-2 text-ink shadow-2xl">
                {cities.map((city) => (
                  <Link key={city.slug} href={`/locations/${city.slug}`} className="block rounded-xl px-3 py-2 text-sm font-semibold hover:bg-paper">
                    {city.name}
                  </Link>
                ))}
                <Link href="/locations" className="block rounded-xl px-3 py-2 text-sm font-bold text-noria hover:bg-paper">
                  All pickup points
                </Link>
              </div>
            ) : null}
          </div>
          {links.slice(2).map((link) => (
            <Link key={link.href} href={link.href} className={navClass(pathname === link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-white/15 px-3 py-1 text-xs font-bold sm:inline">EN</span>
          <Link href="/account" className="inline-flex items-center gap-2 rounded-full bg-noria px-3 py-2 text-xs font-bold sm:px-4 sm:text-sm">
            <UserRound size={15} /> My Account
          </Link>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="space-y-1 border-t border-white/10 px-4 py-4 lg:hidden" aria-label="Mobile">
          <Link href="/" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-semibold">Home</Link>
          <Link href="/cars" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-semibold">Cars</Link>
          <Link href="/locations" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-semibold">Locations</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-semibold">About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-semibold">Contact</Link>
        </nav>
      ) : null}
    </header>
  );
}

const navClass = (active: boolean) =>
  `inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold ${active ? "bg-noria text-white" : "text-white/85 hover:bg-white/10"}`;
