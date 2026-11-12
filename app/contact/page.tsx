import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { SITE_EMAIL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact the Morocco rental desk",
  description: "Write to the Noria-Cars reservation desk about a car, a pickup city, or a one-way rental in Morocco.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main className="bg-paper">
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold">Contact</h1>
          <p className="mt-4 text-slate-600">Send a note if you already know the car, or if you want the desk to suggest one. The reply comes from {SITE_EMAIL}.</p>
          <p className="mt-6 text-sm font-semibold">Desk email<br /><a className="text-noria" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a></p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
