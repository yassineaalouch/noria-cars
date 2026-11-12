import AccountPanel from "@/components/AccountPanel";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "My account",
  description: "See the last Noria-Cars reservation sent from this browser and the cars you saved. Confirmation emails stay in your inbox.",
  path: "/account",
  index: false
});

export default function AccountPage() {
  return (
    <main className="bg-paper">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h1 className="text-4xl font-extrabold">My account</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Noria-Cars confirms rentals by email. This page only remembers the last request and the cars you hearted on this browser.</p>
        <div className="mt-8">
          <AccountPanel />
        </div>
      </section>
    </main>
  );
}
