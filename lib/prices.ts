import type { Vehicle, VehicleType } from "./types";

// EUR conversion rate
export const EUR_RATE = 10.8;

export type PriceMap = Record<VehicleType, number>;
export type DayDuration = "half-day" | "full-day";

// ─── AIRPORT TRANSFER PRICES (per vehicle, all-inclusive) ────────────────────
// All prices are exact per vehicle — no multipliers applied.
// Vito is the main / default vehicle.

export const AIRPORT_TRANSFERS: Record<string, {
  city: string;
  duration: string;
  prices: PriceMap;
}[]> = {
  CMN: [
    { city: 'Casablanca',  duration: '40 min', prices: { skoda: 300,  'mercedes-e': 550,  vito: 400,  sprinter: 650  } },
    { city: 'Mohammedia',  duration: '30 min', prices: { skoda: 350,  'mercedes-e': 650,  vito: 500,  sprinter: 750  } },
    { city: 'Rabat',       duration: '1h 15',  prices: { skoda: 700,  'mercedes-e': 1250, vito: 1000, sprinter: 1550 } },
    { city: 'El Jadida',   duration: '1h 15',  prices: { skoda: 700,  'mercedes-e': 1250, vito: 1000, sprinter: 1550 } },
    { city: 'Marrakech',   duration: '3h 00',  prices: { skoda: 1050, 'mercedes-e': 1900, vito: 1500, sprinter: 2300 } },
    { city: 'Fez',         duration: '3h 30',  prices: { skoda: 1450, 'mercedes-e': 2600, vito: 2000, sprinter: 3200 } },
    { city: 'Tangier',     duration: '3h 30',  prices: { skoda: 1950, 'mercedes-e': 3500, vito: 2700, sprinter: 4300 } },
    { city: 'Agadir',      duration: '5h 00',  prices: { skoda: 2500, 'mercedes-e': 4500, vito: 3500, sprinter: 5500 } },
    { city: 'Meknes',      duration: '3h 00',  prices: { skoda: 1350, 'mercedes-e': 2450, vito: 1900, sprinter: 3000 } },
    { city: 'Chefchaouen', duration: '4h 30',  prices: { skoda: 2000, 'mercedes-e': 3600, vito: 2800, sprinter: 4400 } },
    { city: 'Essaouira',   duration: '4h 30',  prices: { skoda: 2150, 'mercedes-e': 3850, vito: 3000, sprinter: 4750 } },
    { city: 'Ouarzazate',  duration: '5h 30',  prices: { skoda: 2500, 'mercedes-e': 4500, vito: 3500, sprinter: 5500 } },
    { city: 'Merzouga',    duration: '8h 00',  prices: { skoda: 3200, 'mercedes-e': 5750, vito: 4500, sprinter: 7050 } },
    { city: 'Tetouan',     duration: '4h 00',  prices: { skoda: 2500, 'mercedes-e': 4500, vito: 3500, sprinter: 5500 } },
  ],
};

// ─── CITY TO CITY PRICES ─────────────────────────────────────────────────────

export const CITY_ROUTES: {
  from: string;
  to: string;
  distance: number;
  duration: string;
  prices: PriceMap;
}[] = [
  { from: 'Casablanca', to: 'Marrakech',   distance: 240, duration: '3h 00', prices: { skoda: 1050, 'mercedes-e': 1900, vito: 1500, sprinter: 2300 } },
  { from: 'Casablanca', to: 'Rabat',       distance: 90,  duration: '1h 15', prices: { skoda: 700,  'mercedes-e': 1250, vito: 1000, sprinter: 1550 } },
  { from: 'Casablanca', to: 'Tangier',     distance: 340, duration: '3h 30', prices: { skoda: 1950, 'mercedes-e': 3500, vito: 2700, sprinter: 4300 } },
  { from: 'Casablanca', to: 'Fez',         distance: 300, duration: '3h 30', prices: { skoda: 1450, 'mercedes-e': 2600, vito: 2000, sprinter: 3200 } },
  { from: 'Casablanca', to: 'Agadir',      distance: 460, duration: '5h 00', prices: { skoda: 2500, 'mercedes-e': 4500, vito: 3500, sprinter: 5500 } },
  { from: 'Casablanca', to: 'El Jadida',   distance: 100, duration: '1h 15', prices: { skoda: 700,  'mercedes-e': 1250, vito: 1000, sprinter: 1550 } },
  { from: 'Casablanca', to: 'Meknes',      distance: 280, duration: '3h 00', prices: { skoda: 1350, 'mercedes-e': 2450, vito: 1900, sprinter: 3000 } },
  { from: 'Casablanca', to: 'Essaouira',   distance: 370, duration: '4h 30', prices: { skoda: 2150, 'mercedes-e': 3850, vito: 3000, sprinter: 4750 } },
  { from: 'Casablanca', to: 'Chefchaouen', distance: 430, duration: '5h 00', prices: { skoda: 2000, 'mercedes-e': 3600, vito: 2800, sprinter: 4400 } },
  { from: 'Casablanca', to: 'Ouarzazate',  distance: 450, duration: '5h 30', prices: { skoda: 2500, 'mercedes-e': 4500, vito: 3500, sprinter: 5500 } },
  { from: 'Casablanca', to: 'Merzouga',    distance: 680, duration: '8h 00', prices: { skoda: 3200, 'mercedes-e': 5750, vito: 4500, sprinter: 7050 } },
  { from: 'Casablanca', to: 'Tetouan',     distance: 370, duration: '4h 00', prices: { skoda: 2500, 'mercedes-e': 4500, vito: 3500, sprinter: 5500 } },
];

// ─── DAY HIRE RATES ──────────────────────────────────────────────────────────

export const DAY_HIRE_RATES: Record<VehicleType, {
  halfDay: number;
  fullDay: number;
  extraHour: number;
}> = {
  'skoda':       { halfDay: 1200, fullDay: 1500, extraHour: 0 },
  'mercedes-e':  { halfDay: 1500, fullDay: 2000, extraHour: 0 },
  'vito':        { halfDay: 1500, fullDay: 2000, extraHour: 0 },
  'sprinter':    { halfDay: 2000, fullDay: 3000, extraHour: 0 },
};

// ─── VEHICLES ─────────────────────────────────────────────────────────────────

export const VEHICLES: Vehicle[] = [
  {
    id: "skoda",
    name: "Skoda Superb",
    category: "Sedan",
    capacity: 3,
    luggage: 3,
    features: ["Air Conditioning", "USB Charging", "Professional Driver", "Door-to-Door"],
    image: "https://iprenders.blob.core.windows.net/transnz3v26200004/0E0Esl2uV9S0eoam5gFWZCyd_Nq-UO1vBlV0H.pLYasJ74Eju9-e5CySJMU30YGQPsv29u-960540dayvext_front1080.png",
    description: "Comfortable and reliable sedan. Ideal for solo travelers and couples up to 3.",
    badge: null,
    bgColor: "#1a1a2e",
  },
  {
    id: "mercedes-e",
    name: "Mercedes E-Class",
    category: "Sedan",
    capacity: 3,
    luggage: 3,
    features: ["Leather Seats", "Air Conditioning", "Wi-Fi", "Water Included", "Premium Sound"],
    image: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8yNDJhNTI4OWFjMTRkYzBlMGRjOGMxZTJiOGNhMWQ4ZTBiM2M0MDI5L05EUzIwNzU3NDcwX1cxSzIxNDAwNDFfMS5qcGVnIiwiYnVja2V0IjoibmQtc3RvY2staXJlbGFuZC1wcm9kdWN0aW9uIiwibGFzdF9tb2RpZmllZCI6IjE3Njk4NDY5MjciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwNSwiaGVpZ2h0IjoyODQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    description: "Premium business-class comfort for executives and VIP travelers.",
    badge: "Business",
    bgColor: "#1a1a2e",
  },
  {
    id: "vito",
    name: "Mercedes Vito",
    category: "Minivan",
    capacity: 7,
    luggage: 7,
    features: ["Air Conditioning", "Wi-Fi", "Water Included", "Spacious Interior", "USB Charging"],
    image: "https://i.ytimg.com/vi/pBhuigPS2Yk/maxresdefault.jpg",
    description: "The most popular choice for families and groups across Morocco.",
    badge: "Most Popular",
    bgColor: "#1a1a2e",
  },
  {
    id: "sprinter",
    name: "Mercedes Sprinter",
    category: "Sprinter Van",
    capacity: 14,
    luggage: 14,
    features: ["Air Conditioning", "Wi-Fi", "Water Included", "Reclining Seats", "Luggage Compartment"],
    image: "https://www.shutterstock.com/image-photo/luxury-black-minibus-mercedes-sprinter-600nw-2682078289.jpg",
    description: "Maximum capacity for large tour groups and corporate teams up to 14.",
    badge: "Groups",
    bgColor: "#1a1a2e",
  },
];

// ─── PRICE CALCULATORS ────────────────────────────────────────────────────────

/** Fuzzy match destination text against city names in AIRPORT_TRANSFERS. */
function findAirportRoute(airportCode: string, destination: string) {
  const routes = AIRPORT_TRANSFERS[airportCode] || [];
  const dest = destination.toLowerCase().trim();
  return routes.find((r) => {
    const city = r.city.toLowerCase();
    return dest.includes(city) || city.includes(dest.split(",")[0].trim());
  });
}

export function calculateAirportPrice(
  airportCode: string,
  city: string,
  vehicleType: VehicleType = "vito"
): number {
  const route = findAirportRoute(airportCode, city);
  if (!route) return 0;
  return route.prices[vehicleType] ?? 0;
}

export function calculateCityPrice(
  from: string,
  to: string,
  vehicleType: VehicleType = "vito"
): number {
  const route = CITY_ROUTES.find(
    (r) =>
      (r.from.toLowerCase() === from.toLowerCase() &&
        r.to.toLowerCase() === to.toLowerCase()) ||
      (r.from.toLowerCase() === to.toLowerCase() &&
        r.to.toLowerCase() === from.toLowerCase())
  );
  if (!route) return 0;
  return route.prices[vehicleType] ?? 0;
}

export function calculateDayHirePrice(
  vehicleType: VehicleType,
  duration: DayDuration,
  numDays = 1
): number {
  const rates = DAY_HIRE_RATES[vehicleType];
  if (!rates) return 0;
  if (duration === "half-day") return rates.halfDay;
  const discount = numDays >= 3 ? 0.10 : numDays === 2 ? 0.05 : 0;
  const total = rates.fullDay * numDays;
  return Math.round((total * (1 - discount)) / 50) * 50;
}

export function getAllVehiclePricesForAirport(
  airportCode: string,
  city: string
): PriceMap | null {
  const route = findAirportRoute(airportCode, city);
  return route ? route.prices : null;
}

export function getAllVehiclePricesForCity(
  from: string,
  to: string
): PriceMap | null {
  const route = CITY_ROUTES.find(
    (r) =>
      (r.from.toLowerCase() === from.toLowerCase() &&
        r.to.toLowerCase() === to.toLowerCase()) ||
      (r.from.toLowerCase() === to.toLowerCase() &&
        r.to.toLowerCase() === from.toLowerCase())
  );
  return route ? route.prices : null;
}

/** Vito is the main vehicle — recommended for all groups up to 7. */
export function getRecommendedVehicle(passengers: number): VehicleType {
  if (passengers <= 7) return "vito";
  return "sprinter";
}

/**
 * getDayHirePrice — supports legacy duration strings from RouteSelector
 * ("half-day" | "full-day" | "2-days" | "3-plus-days")
 */
export function getDayHirePrice(vehicle: VehicleType, duration: string): number {
  const rates = DAY_HIRE_RATES[vehicle];
  if (!rates) return 0;
  if (duration === "half-day")     return rates.halfDay;
  if (duration === "full-day")     return rates.fullDay;
  if (duration === "2-days")       return Math.round(rates.fullDay * 2 * 0.95 / 50) * 50;
  if (duration === "3-plus-days")  return Math.round(rates.fullDay * 3 * 0.90 / 50) * 50;
  return rates.fullDay;
}
