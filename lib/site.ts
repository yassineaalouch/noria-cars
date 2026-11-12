export const SITE_URL = "https://noria-cars.com";
export const SITE_NAME = "Noria-Cars";
export const SITE_EMAIL = "reservations@moroccomiles.com";
export const SITE_TAGLINE = "Drive Morocco your way";

export const absoluteUrl = (path = "/") => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
};
