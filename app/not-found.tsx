import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false }
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold">That page is not on the fleet list</h1>
      <p className="mt-3 text-slate-600">The car or the city may have moved. Start again from the fleet.</p>
      <Link href="/cars" className="mt-6 inline-flex rounded-full bg-noria px-5 py-3 text-sm font-bold text-white">Browse cars</Link>
    </main>
  );
}
