import type { Metadata } from "next";
import { cars, pickupPoints } from "./fleet";
import { SITE_EMAIL, SITE_NAME, SITE_TAGLINE, SITE_URL, absoluteUrl } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  index?: boolean;
  absolute?: boolean;
  geo?: { lat: number; lng: number; placename: string };
};

const indexRobots = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1 }
};

export const buildMetadata = ({ title, description, path, image, imageAlt, index = true, absolute = false, geo }: PageMeta): Metadata => {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? "/images/places/koutoubia-mosque-1.webp");
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absolute ? { absolute: fullTitle } : title,
    description,
    alternates: {
      canonical: url,
      languages: { en: url, "x-default": url }
    },
    robots: index ? indexRobots : { index: false, follow: false },
    other: geo
      ? {
          "geo.region": "MA",
          "geo.placename": geo.placename,
          "geo.position": `${geo.lat};${geo.lng}`,
          ICBM: `${geo.lat}, ${geo.lng}`
        }
      : undefined,
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      locale: "en_US",
      images: [{ url: ogImage, alt: imageAlt ?? title }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage]
    }
  };
};

const dailyOffer = (name: string, priceMad: number, url: string) => ({
  "@type": "Offer",
  name,
  price: priceMad,
  priceCurrency: "MAD",
  availability: "https://schema.org/LimitedAvailability",
  url,
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price: priceMad,
    priceCurrency: "MAD",
    unitText: "DAY",
    referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" }
  }
});

const servedCities = () =>
  [...new Set(pickupPoints.map((point) => point.city))].map((city) => ({
    "@type": "City",
    name: city,
    containedInPlace: { "@type": "Country", name: "Morocco" }
  }));

export const rentalBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en",
      description: `${SITE_TAGLINE}. Self-drive cars and off-road motorcycles in Morocco.`,
      publisher: { "@id": `${SITE_URL}/#business` }
    },
    {
      "@type": "AutoRental",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      email: SITE_EMAIL,
      image: absoluteUrl("/images/places/koutoubia-mosque-1.webp"),
      description: `${SITE_NAME} lists self-drive cars and off-road motorcycles for travel in Morocco. Daily rates are in Moroccan dirhams. A person confirms the vehicle, the meeting point and any extras by email. No card is charged on the website.`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: 31.6295,
        longitude: -7.9811
      },
      areaServed: [{ "@type": "Country", name: "Morocco" }, ...servedCities()],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Marrakech",
        addressCountry: "MA"
      },
      currenciesAccepted: "MAD, EUR",
      paymentAccepted: "Email confirmation. No card payment on the website.",
      knowsLanguage: ["en"],
      makesOffer: cars.map((car) => dailyOffer(car.name, car.priceMad, absoluteUrl(`/cars/${car.id}`)))
    }
  ]
});

export const carJsonLd = (id: string) => {
  const car = cars.find((item) => item.id === id);
  if (!car) return null;
  return {
    "@context": "https://schema.org",
    "@type": car.type === "motorcycle" ? "Motorcycle" : "Car",
    name: car.name,
    brand: car.name.split(" ")[0],
    vehicleSeatingCapacity: car.seats,
    vehicleTransmission: car.gearbox,
    fuelType: car.fuel,
    image: absoluteUrl(car.image),
    url: absoluteUrl(`/cars/${car.id}`),
    description: car.blurb,
    offers: dailyOffer(car.name, car.priceMad, absoluteUrl(`/cars/${car.id}`)),
    areaServed: { "@type": "Country", name: "Morocco" }
  };
};

export const fleetListJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Noria-Cars rental fleet in Morocco",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: cars.length,
  itemListElement: cars.map((car, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(`/cars/${car.id}`),
    name: car.name
  }))
});

export const placeListJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Noria-Cars pickup points in Morocco",
  numberOfItems: pickupPoints.length,
  itemListElement: pickupPoints.map((point, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(`/locations/${point.slug}`),
    name: point.name,
    item: {
      "@type": "Place",
      name: point.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: point.city,
        addressRegion: point.region,
        addressCountry: "MA"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: point.lat,
        longitude: point.lng
      }
    }
  }))
});

export const cityJsonLd = (slug: string) => {
  const point = pickupPoints.find((item) => item.slug === slug);
  if (!point) return null;
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: `${SITE_NAME} pickup in ${point.name}`,
    url: absoluteUrl(`/locations/${point.slug}`),
    image: absoluteUrl(point.image),
    email: SITE_EMAIL,
    geo: {
      "@type": "GeoCoordinates",
      latitude: point.lat,
      longitude: point.lng
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: point.city,
      addressRegion: point.region,
      addressCountry: "MA"
    },
    description: `${point.summary} ${point.pickupNote}`,
    areaServed: {
      "@type": "City",
      name: point.city,
      containedInPlace: { "@type": "Country", name: "Morocco" }
    }
  };
};

export const llmsText = () => `# Noria-Cars

> English desk for self-drive cars and off-road motorcycles in Morocco. ${SITE_URL}

The desk confirms every request by email. No card is charged on this website. Each vehicle page lists a daily rate in MAD and EUR. Child seats, a breakdown kit and other accessories are priced during confirmation. Rentals are self-drive. The site does not hold live stock by city.

Cities: ${[...new Set(pickupPoints.map((point) => point.city))].join(", ")}.
Airports with a listed handover: Marrakech Menara (RAK), Casablanca Mohammed V (CMN), Fes–Saïss (FEZ), Tangier Ibn Battuta (TNG), Agadir Al Massira (AGA).
Rabat–Salé airport is not a listed pickup.

- Fleet: ${absoluteUrl("/cars")}
- Locations: ${absoluteUrl("/locations")}
- Questions: ${absoluteUrl("/faq")}
- Full facts: ${absoluteUrl("/llms-full.txt")}
- Desk: ${SITE_EMAIL}
`;

export const llmsFullText = () => {
  const fleet = cars
    .map((car) => `- ${car.name} | ${car.type} | ${car.seats} seats | ${car.gearbox} | ${car.fuel} | ${car.priceMad} MAD/day | ${car.priceEur} EUR/day | ${absoluteUrl(`/cars/${car.id}`)}`)
    .join("\n");
  const places = pickupPoints
    .map((point) => `- ${point.name} | ${point.city} | ${point.region} | ${point.lat}, ${point.lng} | ${point.pickupNote} | ${absoluteUrl(`/locations/${point.slug}`)}`)
    .join("\n");
  return `${llmsText()}
## Fleet

${fleet}

## Pickup points

${places}
`;
};

export const faqJsonLd = (items: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path)
  }))
});
