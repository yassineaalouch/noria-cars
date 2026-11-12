import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Noria-Cars",
    short_name: "Noria-Cars",
    description: "Rent a car or an off-road motorcycle in Morocco. Drive Morocco your way.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1220",
    theme_color: "#e10600",
    lang: "en"
  };
}
