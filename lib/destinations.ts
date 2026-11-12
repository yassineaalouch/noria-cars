export const destinationTagline: Record<string, string> = {
  marrakech: "The Red City.",
  casablanca: "Morocco's modern metropolis.",
  agadir: "Sun, beaches and relaxation.",
  tangier: "Where Africa meets Europe.",
  fes: "The cultural capital.",
  rabat: "The elegant capital.",
  essaouira: "The coastal escape.",
  chefchaouen: "The blue pearl.",
  ouarzazate: "Gateway to the Sahara.",
  merzouga: "The edge of Erg Chebbi."
};

export const airportCode: Record<string, string> = {
  "marrakech-menara": "RAK",
  "casablanca-cmn": "CMN",
  "agadir-airport": "AGA",
  "tangier-airport": "TNG",
  "fes-saiss": "FEZ"
};

export const offersHotelHandover = (slug: string) => slug === "marrakech" || slug === "agadir";
