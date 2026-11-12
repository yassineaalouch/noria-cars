import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Noria-Cars home">
      <svg viewBox="0 0 46 28" className="h-7 w-11" aria-hidden="true">
        <path d="M3 20c8-1 12-9 16-9 3 0 4 3 8 3 6 0 9-6 16-7" fill="none" stroke="#e10600" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M8 22h22" stroke={light ? "#fff" : "#0d1220"} strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="22" r="2.2" fill="#e10600" />
        <circle cx="26" cy="22" r="2.2" fill="#e10600" />
      </svg>
      <span className="leading-none">
        <span className={`block text-[1.15rem] font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>
          Noria<span className="text-noria">-Cars</span>
        </span>
        <span className={`mt-0.5 block text-[9px] font-medium tracking-[0.08em] ${light ? "text-white/70" : "text-slate-500"}`}>
          Drive Morocco Your Way
        </span>
      </span>
    </Link>
  );
}
