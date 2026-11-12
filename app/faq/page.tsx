import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/faq";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Car rental questions for Morocco",
  description: "Answers on Noria-Cars pickup cities, daily rates in dirhams and euros, documents at handover, and one-way rentals in Morocco.",
  path: "/faq"
});

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <JsonLd data={faqJsonLd([...faqs])} />
      <h1 className="text-4xl font-extrabold">Questions before you reserve</h1>
      <div className="mt-8 space-y-6">
        {faqs.map((item) => (
          <article key={item.question}>
            <h2 className="text-xl font-extrabold">{item.question}</h2>
            <p className="mt-2 leading-7 text-slate-700">{item.answer}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
