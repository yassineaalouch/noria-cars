import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { rentalBusinessJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Rent a car in Morocco`,
    template: `%s | ${SITE_NAME}`
  },
  description: `${SITE_TAGLINE}. Rent a car or an off-road motorcycle in Morocco, with pickup in Marrakech, Casablanca, Rabat, Fes, Tangier, Agadir and the main airports.`,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: SITE_URL,
    languages: { en: SITE_URL, "x-default": SITE_URL }
  },
  robots: { index: true, follow: true },
  other: {
    "geo.region": "MA",
    "geo.placename": "Morocco",
    "geo.position": "31.6295;-7.9811",
    ICBM: "31.6295, -7.9811"
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full bg-white text-ink antialiased">
        <JsonLd data={rentalBusinessJsonLd()} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
