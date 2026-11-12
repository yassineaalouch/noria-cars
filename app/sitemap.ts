import type { MetadataRoute } from "next";
import { cars, pickupPoints } from "@/lib/fleet";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = "2026-11-12";
  const staticPaths = ["/", "/cars", "/locations", "/about", "/contact", "/faq", "/terms"];
  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: path === "/" || path === "/cars" ? "weekly" as const : "monthly" as const,
      priority: path === "/" ? 1 : path === "/locations" || path === "/cars" ? 0.9 : 0.6
    })),
    ...cars.map((car) => ({
      url: absoluteUrl(`/cars/${car.id}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...pickupPoints.map((point) => ({
      url: absoluteUrl(`/locations/${point.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
