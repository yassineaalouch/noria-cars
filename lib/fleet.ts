export type FleetType = "economy" | "sedan" | "suv" | "luxury" | "van" | "motorcycle";
export type Fuel = "Petrol" | "Diesel" | "Hybrid";
export type Gearbox = "Automatic" | "Manual";

export type Car = {
  id: string;
  name: string;
  type: FleetType;
  image: string;
  seats: number;
  gearbox: Gearbox;
  fuel: Fuel;
  priceEur: number;
  priceMad: number;
  blurb: string;
  housePick?: boolean;
};

export type PickupPoint = {
  slug: string;
  name: string;
  city: string;
  region: string;
  image: string;
  lat: number;
  lng: number;
  summary: string;
  pickupNote: string;
};

const carImage = (filename: string) => `/images/cars/${encodeURIComponent(filename)}`;
const motoImage = (filename: string) => `/images/motocycles/${encodeURIComponent(filename)}`;

export const fleetTypes: { id: FleetType; label: string; hint: string }[] = [
  { id: "economy", label: "Economy", hint: "Compact city cars for medinas and short hops" },
  { id: "sedan", label: "Sedan", hint: "Comfortable saloons for airport and highway days" },
  { id: "suv", label: "SUV", hint: "Higher cars for Atlas roads and lighter tracks" },
  { id: "luxury", label: "Luxury", hint: "Premium and 4×4 cars for longer desert roads" },
  { id: "van", label: "Van", hint: "Minibuses for families and small groups" },
  { id: "motorcycle", label: "Motorcycle", hint: "Off-road motorcycles for desert and mountain tracks" }
];

export const cars: Car[] = [
  {
    id: "hyundai-i10",
    name: "Hyundai i10 Automatic",
    type: "economy",
    image: carImage("HYUNDAI I10 AUTOMATIC MODEL 2026.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 30,
    priceMad: 300,
    blurb: "A small automatic for Marrakech traffic, airport runs and easy city parking."
  },
  {
    id: "kia-picanto",
    name: "Kia Picanto",
    type: "economy",
    image: carImage("KIA Picanto.webp"),
    seats: 4,
    gearbox: "Manual",
    fuel: "Petrol",
    priceEur: 30,
    priceMad: 300,
    blurb: "A light manual city car when the plan stays inside town and nearby roads."
  },
  {
    id: "mg-3",
    name: "MG 3 Automatic",
    type: "economy",
    image: carImage("MG 3 AUTOMATIC.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 40,
    priceMad: 400,
    blurb: "A compact automatic with a bit more room for two people and cabin bags."
  },
  {
    id: "dacia-sandero-streetway",
    name: "Dacia Sandero Streetway",
    type: "economy",
    image: carImage("Dacia Sandero Streetway BVM.webp"),
    seats: 5,
    gearbox: "Manual",
    fuel: "Petrol",
    priceEur: 35,
    priceMad: 350,
    blurb: "A practical five-seat manual for coastal roads and day drives out of the city."
  },
  {
    id: "peugeot-208",
    name: "Peugeot 208",
    type: "economy",
    image: carImage("peugeot-208.webp"),
    seats: 5,
    gearbox: "Manual",
    fuel: "Petrol",
    priceEur: 35,
    priceMad: 350,
    blurb: "A familiar hatchback for self-drive days between the Atlantic cities."
  },
  {
    id: "renault-clio",
    name: "Renault Clio",
    type: "economy",
    image: carImage("renault-clio-e-tech-autonews-2024-99.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Hybrid",
    priceEur: 35,
    priceMad: 350,
    blurb: "A hybrid automatic Clio for drivers who want a quiet car in city traffic.",
    housePick: true
  },
  {
    id: "dacia-logan",
    name: "Dacia Logan",
    type: "sedan",
    image: carImage("dacia-logan-2026.webp"),
    seats: 5,
    gearbox: "Manual",
    fuel: "Petrol",
    priceEur: 350,
    priceMad: 3500,
    blurb: "A saloon with a large boot, listed at the daily rate already used on MoroccoMiles."
  },
  {
    id: "hyundai-accent-2026",
    name: "Hyundai Accent 2026",
    type: "sedan",
    image: carImage("hyundai-accent-2026-catalogue-main.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 60,
    priceMad: 600,
    blurb: "An automatic saloon for airport pickups and long highway stretches."
  },
  {
    id: "fiat-tipo",
    name: "Fiat Tipo",
    type: "sedan",
    image: carImage("Fiat Tipo.webp"),
    seats: 5,
    gearbox: "Manual",
    fuel: "Petrol",
    priceEur: 35,
    priceMad: 350,
    blurb: "A straightforward saloon with space for luggage on a multi-city itinerary."
  },
  {
    id: "geely-emgrand",
    name: "Geely Emgrand",
    type: "sedan",
    image: carImage("Geely Emgrand.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 40,
    priceMad: 400,
    blurb: "An automatic saloon aimed at comfortable inter-city days."
  },
  {
    id: "peugeot-308",
    name: "Peugeot 308",
    type: "sedan",
    image: carImage("Peugeot 308.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 35,
    priceMad: 350,
    blurb: "A larger automatic hatchback-saloon for four adults and a week of driving."
  },
  {
    id: "geely-gx3-pro",
    name: "Geely GX3 Pro",
    type: "suv",
    image: carImage("GEELY GX3 PRO.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 40,
    priceMad: 400,
    blurb: "A compact automatic SUV for mixed city and open-road days."
  },
  {
    id: "suzuki-jimny",
    name: "Suzuki Jimny",
    type: "suv",
    image: carImage("Suzuki Jimny 4x4.webp"),
    seats: 4,
    gearbox: "Manual",
    fuel: "Petrol",
    priceEur: 55,
    priceMad: 550,
    blurb: "A short-wheelbase 4×4 for two people who want a higher, slower mountain car."
  },
  {
    id: "dacia-duster",
    name: "Dacia Duster 4×4",
    type: "suv",
    image: carImage("DACIA DUSTER 4X4.webp"),
    seats: 5,
    gearbox: "Manual",
    fuel: "Petrol",
    priceEur: 45,
    priceMad: 450,
    blurb: "The everyday 4×4 of this fleet for Atlas passes and unpaved village roads.",
    housePick: true
  },
  {
    id: "fiat-500x",
    name: "Fiat 500X",
    type: "suv",
    image: carImage("FIAT 500 X.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 60,
    priceMad: 600,
    blurb: "A raised automatic crossover for drivers who want an easy seat height."
  },
  {
    id: "changan-uni-k",
    name: "Changan UNI-K",
    type: "suv",
    image: carImage("2.0 Turbo 226 AT Exclusive.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 55,
    priceMad: 550,
    blurb: "A turbo automatic SUV with more cabin room for a family week."
  },
  {
    id: "toyota-prado-tx",
    name: "Toyota Prado TX",
    type: "luxury",
    image: carImage("4x4 TOYOTA PRADO AUTO TX 7 PLACES.webp"),
    seats: 7,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 120,
    priceMad: 1200,
    blurb: "A seven-seat automatic Prado for families crossing the south."
  },
  {
    id: "toyota-prado-2026",
    name: "Toyota Prado Diesel 2026",
    type: "luxury",
    image: carImage("NEW TOYOTA PRADO DIESEL MODEL 2026 7 PLACE.webp"),
    seats: 7,
    gearbox: "Automatic",
    fuel: "Diesel",
    priceEur: 170,
    priceMad: 1700,
    blurb: "The newer diesel Prado, with seven seats, for long desert and mountain days."
  },
  {
    id: "ford-raptor",
    name: "Ford Raptor",
    type: "luxury",
    image: carImage("2017-ford-f-150-raptor-configurator.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 170,
    priceMad: 1700,
    blurb: "A high-performance pickup for travelers who want a bold desert car."
  },
  {
    id: "tank-300",
    name: "Tank 300",
    type: "luxury",
    image: carImage("tank icance.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 120,
    priceMad: 1200,
    blurb: "A body-on-frame automatic 4×4 for tracks beyond the main tourist road."
  },
  {
    id: "volkswagen-touareg-2026",
    name: "Volkswagen Touareg 2026",
    type: "luxury",
    image: carImage("volkswagen-touareg-2026-photo-exterieure-fond-clair-maroc-main.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 120,
    priceMad: 1200,
    blurb: "A premium automatic SUV for drivers who want a quieter long-distance cabin."
  },
  {
    id: "range-rover-evoque",
    name: "Range Rover Evoque",
    type: "luxury",
    image: carImage("land-rover-range-rover-evoque-2026-catalogue-main.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 120,
    priceMad: 1200,
    blurb: "A compact luxury SUV for city arrivals and paved mountain roads."
  },
  {
    id: "range-rover-sport",
    name: "Range Rover Sport",
    type: "luxury",
    image: carImage("range rover sport.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 260,
    priceMad: 2600,
    blurb: "The flagship of the fleet, reserved for travelers who want a Sport on the open road."
  },
  {
    id: "minibus-h1",
    name: "Minibus Hyundai H1",
    type: "van",
    image: carImage("Minibus H1 Marrakech.webp"),
    seats: 9,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 170,
    priceMad: 1700,
    blurb: "A nine-seat automatic minibus for families who want to travel in one vehicle."
  },
  {
    id: "minibus-ford",
    name: "Minibus Ford",
    type: "van",
    image: carImage("Minibus Ford.webp"),
    seats: 15,
    gearbox: "Manual",
    fuel: "Diesel",
    priceEur: 170,
    priceMad: 1700,
    blurb: "A fifteen-seat minibus for groups moving between cities with luggage."
  },
  {
    id: "minibus-mercedes",
    name: "Minibus Mercedes",
    type: "van",
    image: carImage("Minibus Mercedes.webp"),
    seats: 16,
    gearbox: "Automatic",
    fuel: "Diesel",
    priceEur: 170,
    priceMad: 1700,
    blurb: "A sixteen-seat automatic Mercedes minibus for larger private groups."
  },
  {
    id: "fiat-500",
    name: "Fiat 500",
    type: "economy",
    image: carImage("fiat-500.webp"),
    seats: 4,
    gearbox: "Manual",
    fuel: "Petrol",
    priceEur: 35,
    priceMad: 350,
    blurb: "A compact Fiat 500 for city days and short coastal hops."
  },
  {
    id: "kia-sportage",
    name: "Kia Sportage",
    type: "suv",
    image: carImage("kia-sportage.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 60,
    priceMad: 600,
    blurb: "A compact automatic SUV for highway days between the cities."
  },
  {
    id: "volkswagen-golf-8",
    name: "Volkswagen Golf 8",
    type: "sedan",
    image: carImage("volkswagen-golf-8.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 80,
    priceMad: 800,
    blurb: "A Golf 8 for travelers who want a familiar automatic hatchback."
  },
  {
    id: "volkswagen-t-roc",
    name: "Volkswagen T-Roc",
    type: "suv",
    image: carImage("volkswagen-t-roc.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 70,
    priceMad: 700,
    blurb: "A raised automatic T-Roc for city arrivals and open roads."
  },
  {
    id: "fiat-scudo",
    name: "Fiat Scudo Minibus",
    type: "van",
    image: carImage("fiat mini bus.webp"),
    seats: 9,
    gearbox: "Automatic",
    fuel: "Diesel",
    priceEur: 100,
    priceMad: 1000,
    blurb: "A nine-seat automatic diesel Fiat Scudo for small groups."
  },
  {
    id: "cupra-formentor",
    name: "Cupra Formentor",
    type: "suv",
    image: carImage("cupra-formentor-2023-hood.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 90,
    priceMad: 900,
    blurb: "A sporty automatic Cupra crossover for paved mountain roads."
  },
  {
    id: "hyundai-tucson",
    name: "Hyundai Tucson",
    type: "suv",
    image: carImage("hyundai-tucson.webp"),
    seats: 5,
    gearbox: "Automatic",
    fuel: "Petrol",
    priceEur: 60,
    priceMad: 600,
    blurb: "An automatic Tucson for families who want a comfortable SUV."
  },
  {
    id: "toyota-hilux",
    name: "Toyota Hilux",
    type: "suv",
    image: carImage("toyota-hilux.webp"),
    seats: 5,
    gearbox: "Manual",
    fuel: "Diesel",
    priceEur: 120,
    priceMad: 1200,
    blurb: "A double-cab Hilux for travelers who want a pickup on rougher roads."
  },
  {
    id: "moto-morini-x-cape",
    name: "Moto Morini X-Cape",
    type: "motorcycle",
    image: motoImage("moto-morini-x-cape.webp"),
    seats: 2,
    gearbox: "Manual",
    fuel: "Petrol",
    priceEur: 110,
    priceMad: 1100,
    blurb: "An off-road Morini for riders crossing the mountains and the south."
  },
  {
    id: "ducati-desertx",
    name: "Ducati DesertX",
    type: "motorcycle",
    image: motoImage("ducati-desertx.webp"),
    seats: 2,
    gearbox: "Manual",
    fuel: "Petrol",
    priceEur: 150,
    priceMad: 1500,
    blurb: "A DesertX for off-road riders who want a tall adventure bike."
  },
  {
    id: "bmw-r1250gs",
    name: "BMW R 1250 GS Adventure",
    type: "motorcycle",
    image: motoImage("bmw-r1250gs-adventure.webp"),
    seats: 2,
    gearbox: "Manual",
    fuel: "Petrol",
    priceEur: 150,
    priceMad: 1500,
    blurb: "A BMW GS Adventure for long off-road days with luggage."
  }
];

const place = (file: string) => `/images/places/${file}`;

export const pickupPoints: PickupPoint[] = [
  {
    slug: "marrakech",
    name: "Marrakech",
    city: "Marrakech",
    region: "Marrakech-Safi",
    image: place("koutoubia-mosque-1.webp"),
    lat: 31.6295,
    lng: -7.9811,
    summary: "Medina, Guéliz and the roads toward the High Atlas and Essaouira.",
    pickupNote: "Handover in Guéliz or Hivernage, or at a riad address the desk can reach by car."
  },
  {
    slug: "marrakech-menara",
    name: "Marrakech Menara Airport",
    city: "Marrakech",
    region: "Marrakech-Safi",
    image: place("koutoubia-mosque-1.webp"),
    lat: 31.6069,
    lng: -8.0363,
    summary: "Meet-and-greet at Menara for arrivals and departures.",
    pickupNote: "The driver or the car waits in the public arrivals area after you clear baggage claim."
  },
  {
    slug: "casablanca",
    name: "Casablanca",
    city: "Casablanca",
    region: "Casablanca-Settat",
    image: place("hassan-ii-mosque-1.webp"),
    lat: 33.5731,
    lng: -7.5898,
    summary: "The business city, the corniche and the start of many north–south itineraries.",
    pickupNote: "City handover near the center or Ain Diab, agreed in the confirmation."
  },
  {
    slug: "casablanca-cmn",
    name: "Casablanca Mohammed V Airport",
    city: "Casablanca",
    region: "Casablanca-Settat",
    image: place("hassan-ii-mosque-1.webp"),
    lat: 33.3675,
    lng: -7.59,
    summary: "The main international gateway, about 30 minutes from downtown Casablanca.",
    pickupNote: "Airport desk handover after you leave the arrivals hall."
  },
  {
    slug: "rabat",
    name: "Rabat",
    city: "Rabat",
    region: "Rabat-Salé-Kénitra",
    image: place("kasbah-of-the-udayas-1.webp"),
    lat: 34.0209,
    lng: -6.8416,
    summary: "The capital, useful as a pickup between Tangier, Casablanca and Fes.",
    pickupNote: "Handover in Agdal or the city center, not inside the medina lanes."
  },
  {
    slug: "fes",
    name: "Fes",
    city: "Fes",
    region: "Fès-Meknès",
    image: place("fes-el-bali-1.webp"),
    lat: 34.0331,
    lng: -5.0003,
    summary: "Imperial Fes, with the road south toward the Middle Atlas and the desert.",
    pickupNote: "Pickup in the Ville Nouvelle. Cars are not handed over inside Fes el-Bali."
  },
  {
    slug: "fes-saiss",
    name: "Fes–Saïss Airport",
    city: "Fes",
    region: "Fès-Meknès",
    image: place("fes-el-bali-1.webp"),
    lat: 33.9273,
    lng: -4.978,
    summary: "A short transfer from the airport to the new city.",
    pickupNote: "The car is ready outside the small arrivals hall."
  },
  {
    slug: "tangier",
    name: "Tangier",
    city: "Tangier",
    region: "Tanger-Tétouan-Al Hoceïma",
    image: place("cap-spartel-1.webp"),
    lat: 35.7595,
    lng: -5.834,
    summary: "The Strait city, for travelers arriving from Spain or starting a southbound drive.",
    pickupNote: "Handover near the city center or the port area, confirmed the day before."
  },
  {
    slug: "tangier-airport",
    name: "Tangier Ibn Battuta Airport",
    city: "Tangier",
    region: "Tanger-Tétouan-Al Hoceïma",
    image: place("cap-spartel-1.webp"),
    lat: 35.7269,
    lng: -5.9169,
    summary: "Airport pickup south-west of Tangier.",
    pickupNote: "Meet outside arrivals. Ferries are a separate city handover."
  },
  {
    slug: "agadir",
    name: "Agadir",
    city: "Agadir",
    region: "Souss-Massa",
    image: place("main-beach-and-corniche-1.webp"),
    lat: 30.4278,
    lng: -9.5981,
    summary: "The Atlantic resort city, a base for the Souss coast and the Anti-Atlas.",
    pickupNote: "Hotel or corniche handover in Agadir, or the airport on request."
  },
  {
    slug: "agadir-airport",
    name: "Agadir Al Massira Airport",
    city: "Agadir",
    region: "Souss-Massa",
    image: place("main-beach-and-corniche-1.webp"),
    lat: 30.325,
    lng: -9.4131,
    summary: "Al Massira sits inland, about 25 minutes from the Agadir bay.",
    pickupNote: "Airport handover in the public arrivals area."
  },
  {
    slug: "essaouira",
    name: "Essaouira",
    city: "Essaouira",
    region: "Marrakech-Safi",
    image: place("essaouira-main-beach-1.webp"),
    lat: 31.5085,
    lng: -9.7595,
    summary: "The windy Atlantic medina, usually a pickup linked to a Marrakech one-way.",
    pickupNote: "Handover outside the medina walls. The old town is pedestrian."
  },
  {
    slug: "ouarzazate",
    name: "Ouarzazate",
    city: "Ouarzazate",
    region: "Drâa-Tafilalet",
    image: place("ksar-ait-benhaddou-1.webp"),
    lat: 30.9335,
    lng: -6.937,
    summary: "The gateway to the kasbah valleys, after the Tizi n'Tichka pass.",
    pickupNote: "City or airport handover. Ask before planning a piste beyond the paved road."
  },
  {
    slug: "chefchaouen",
    name: "Chefchaouen",
    city: "Chefchaouen",
    region: "Tanger-Tétouan-Al Hoceïma",
    image: place("chefchaouen-kasbah-1.webp"),
    lat: 35.1714,
    lng: -5.2696,
    summary: "The blue city in the Rif, reached from Tangier or Fes.",
    pickupNote: "Handover on the edge of town. The medina lanes are not for rental cars."
  },
  {
    slug: "merzouga",
    name: "Merzouga",
    city: "Merzouga",
    region: "Drâa-Tafilalet",
    image: place("erg-chebbi-dunes-1.webp"),
    lat: 31.0801,
    lng: -4.0133,
    summary: "The Erg Chebbi edge. A 4×4 or a higher car is the sensible choice here.",
    pickupNote: "Handover in Merzouga or Rissani by arrangement. Soft sand is outside the rental area."
  }
];

export const cities = pickupPoints.filter((point) => !point.name.includes("Airport") && !point.slug.endsWith("-menara") && !point.slug.endsWith("-cmn"));

export const getCar = (id: string) => cars.find((car) => car.id === id);

export const getPickup = (slug: string) => pickupPoints.find((point) => point.slug === slug);

export const carsOfType = (type: FleetType) => cars.filter((car) => car.type === type);

export const fromPrice = (type: FleetType) => Math.min(...carsOfType(type).map((car) => car.priceMad));

export const priceBounds = {
  min: Math.min(...cars.map((car) => car.priceMad)),
  max: Math.max(...cars.map((car) => car.priceMad))
};

export const rentalDays = (pickup: string, dropoff: string) => {
  if (!pickup || !dropoff) return 1;
  const start = Date.parse(`${pickup}T00:00:00`);
  const end = Date.parse(`${dropoff}T00:00:00`);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 1;
  return Math.round((end - start) / 86_400_000);
};

export const formatMad = (value: number) => `${value.toLocaleString("en-US")} MAD`;
