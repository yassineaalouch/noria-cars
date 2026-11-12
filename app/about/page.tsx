import { buildMetadata } from "@/lib/seo";
import { cars } from "@/lib/fleet";
import { SITE_EMAIL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Noria-Cars",
  absolute: true,
  description: "Noria-Cars is the English car-rental desk for the MoroccoMiles fleet: city and airport pickup, written confirmation, and daily rates in MAD and EUR.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-extrabold">About Noria-Cars</h1>
      <div className="mt-6 space-y-4 text-base leading-7 text-slate-700">
        <p>Noria-Cars is the international, English-language desk for renting a car in Morocco. The vehicles are the same {cars.length} cars already published by MoroccoMiles, with the same daily rates.</p>
        <p>You choose a car, a pickup point and your dates. The site emails the reservation desk and sends you a copy when email delivery is configured. Nobody charges a card on this website. The confirmation, sent by a person, is what locks the car.</p>
        <p>Pickups cover the cities travelers actually use: Marrakech, Casablanca, Rabat, Fes, Tangier, Agadir, Essaouira, Ouarzazate, Chefchaouen and Merzouga, plus the main airports. A car is handed over where a car can legally wait, not inside a pedestrian medina.</p>
        <p>Questions go to <a className="font-semibold text-noria" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.</p>
      </div>
    </main>
  );
}
