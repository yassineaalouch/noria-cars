import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Rental conditions in Morocco",
  description: "Noria-Cars rental conditions: who can drive, what to bring, fuel, mileage, one-way trips and the fact that the website does not charge a card.",
  path: "/terms"
});

const sections = [
  {
    title: "What this website does",
    body: "A reservation on Noria-Cars is a request. It emails the desk and, when delivery is configured, emails you a copy. It does not take a payment and it does not guarantee a car until the desk writes back with a confirmation."
  },
  {
    title: "Who can drive",
    body: "The main driver is at least 21 and has held a full licence for twelve months. Bring a passport or national identity card, the licence, and a credit card in the driver's name for the security hold. If the licence is not in Latin letters, bring an international driving permit or an official translation. A higher age can apply to minibuses and premium cars, and that age is written on the confirmation."
  },
  {
    title: "Price, fuel and distance",
    body: "The daily rate on the site is indicative and is shown in Moroccan dirhams and euros. The confirmation states the rate for your dates. Fuel is full-to-full unless the confirmation says otherwise. Mileage on paved roads inside Morocco is included unless a limit is written on the confirmation. Driving off the paved road needs a car that the desk has cleared for that route."
  },
  {
    title: "Where the car can go",
    body: "The car stays in Morocco. It is not taken onto sand, into a closed medina, or across a border. One-way drop-off between listed cities is possible only after the desk confirms it."
  },
  {
    title: "Damage and the hold",
    body: "A security hold is placed on the driver's credit card at pickup and released after the car is returned in the agreed condition. The excess, if the car is damaged, is a separate figure. Both numbers are on the confirmation, not on this page."
  }
];

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-extrabold">Rental conditions</h1>
      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-extrabold">{section.title}</h2>
            <p className="mt-2 leading-7 text-slate-700">{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
