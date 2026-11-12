"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "noria-cars-saved";

export const readSaved = () => {
  if (typeof window === "undefined") return [] as string[];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
};

export default function WishlistButton({ id }: { id: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readSaved().includes(id));
  }, [id]);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved cars" : "Save this car"}
      onClick={() => {
        const next = saved ? readSaved().filter((item) => item !== id) : [...readSaved(), id];
        window.localStorage.setItem(KEY, JSON.stringify(next));
        setSaved(!saved);
      }}
      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-slate-500 shadow-sm transition hover:text-noria"
    >
      <Heart size={16} className={saved ? "fill-noria text-noria" : ""} />
    </button>
  );
}
