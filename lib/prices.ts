import type { AirportTransferPrice, DayHirePrice, Route, Vehicle, AirportCode, VehicleType } from "./types";

// EUR conversion rate
export const EUR_RATE = 10.8;

// Vehicle multipliers relative to base (economy/skoda) price
export const VEHICLE_MULTIPLIERS: Record<VehicleType, number> = {
  "skoda":      1.0,
  "mercedes-e": 1.5,
  "vito":       1.4,
  "sprinter":   2.2,
};

// ─── AIRPORT TRANSFER PRICES (per vehicle, economy, all-inclusive) ───────────

export const AIRPORT_PRICES: AirportTransferPrice[] = [
  // CMN – Casablanca Mohammed V
  { airportCode: "CMN", destination: "Casablanca City Center", priceEconomy: 350 },
  { airportCode: "CMN", destination: "Mohammedia", priceEconomy: 300 },
  { airportCode: "CMN", destination: "Rabat", priceEconomy: 500 },
  { airportCode: "CMN", destination: "El Jadida", priceEconomy: 600 },
  { airportCode: "CMN", destination: "Marrakech", priceEconomy: 1250 },
  { airportCode: "CMN", destination: "Fez", priceEconomy: 1100 },
  { airportCode: "CMN", destination: "Tangier", priceEconomy: 1500 },
  { airportCode: "CMN", destination: "Agadir", priceEconomy: 2000 },
  { airportCode: "CMN", destination: "Essaouira", priceEconomy: 1400 },
  { airportCode: "CMN", destination: "Chefchaouen", priceEconomy: 1300 },
  { airportCode: "CMN", destination: "Ouarzazate", priceEconomy: 1800 },
  { airportCode: "CMN", destination: "Meknes", priceEconomy: 900 },
];

// ─── CITY TO CITY PRICES ─────────────────────────────────────────────────────

export const CITY_ROUTES: Route[] = [
  { id: "casa-marrakech", from: "Casablanca", to: "Marrakech", distanceKm: 240, durationText: "3h", priceEconomy: 1100, popular: true },
  { id: "casa-rabat", from: "Casablanca", to: "Rabat", distanceKm: 90, durationText: "1h15", priceEconomy: 450, popular: true },
  { id: "casa-tangier", from: "Casablanca", to: "Tangier", distanceKm: 340, durationText: "3h30", priceEconomy: 1400, popular: true },
  { id: "casa-fez", from: "Casablanca", to: "Fez", distanceKm: 300, durationText: "3h30", priceEconomy: 1200, popular: true },
  { id: "casa-agadir", from: "Casablanca", to: "Agadir", distanceKm: 460, durationText: "5h", priceEconomy: 1900, popular: true },
  { id: "casa-eljadida", from: "Casablanca", to: "El Jadida", distanceKm: 100, durationText: "1h15", priceEconomy: 450, popular: true },
  { id: "casa-mohammedia", from: "Casablanca", to: "Mohammedia", distanceKm: 70, durationText: "1h", priceEconomy: 300, popular: false },
  { id: "casa-essaouira", from: "Casablanca", to: "Essaouira", distanceKm: 350, durationText: "4h", priceEconomy: 1400, popular: false },
  { id: "casa-chefchaouen", from: "Casablanca", to: "Chefchaouen", distanceKm: 400, durationText: "4h30", priceEconomy: 1500, popular: false },
  { id: "casa-meknes", from: "Casablanca", to: "Meknes", distanceKm: 230, durationText: "2h30", priceEconomy: 900, popular: false },
  { id: "casa-ouarzazate", from: "Casablanca", to: "Ouarzazate", distanceKm: 430, durationText: "5h", priceEconomy: 1800, popular: false },
];

export const POPULAR_ROUTES = CITY_ROUTES.filter((r) => r.popular);

// ─── DAY HIRE PRICES ─────────────────────────────────────────────────────────

export const DAY_HIRE_PRICES: DayHirePrice[] = [
  { vehicle: "skoda",      halfDay: 500,  fullDay: 800,  extraHour: 100 },
  { vehicle: "mercedes-e", halfDay: 750,  fullDay: 1200, extraHour: 150 },
  { vehicle: "vito",       halfDay: 900,  fullDay: 1400, extraHour: 160 },
  { vehicle: "sprinter",   halfDay: 1400, fullDay: 2200, extraHour: 250 },
];

export const MULTI_DAY_DISCOUNTS = {
  "2-days": 0.05,
  "3-plus-days": 0.10,
};

// ─── VEHICLES ─────────────────────────────────────────────────────────────────

export const VEHICLES: Vehicle[] = [
  // ── Sedan ──────────────────────────────────────────────────────────────────
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
  // ── Minivan ────────────────────────────────────────────────────────────────
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
  // ── Sprinter Van ───────────────────────────────────────────────────────────
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

// ─── PRICE CALCULATOR ─────────────────────────────────────────────────────────

export function calculatePrice(
  basePrice: number,
  vehicleType: VehicleType,
  currency: "MAD" | "EUR" = "MAD"
): { basePrice: number; total: number; inEur: number } {
  const multiplier = VEHICLE_MULTIPLIERS[vehicleType];
  const total = Math.round(basePrice * multiplier);
  const inEur = Math.round((total / EUR_RATE) * 10) / 10;
  return { basePrice, total, inEur };
}

export function getAirportPrice(
  airportCode: AirportCode,
  destination: string
): number | null {
  const match = AIRPORT_PRICES.find(
    (p) =>
      p.airportCode === airportCode &&
      p.destination.toLowerCase() === destination.toLowerCase()
  );
  return match ? match.priceEconomy : null;
}

export function getCityRoutePrice(from: string, to: string): Route | null {
  return (
    CITY_ROUTES.find(
      (r) =>
        (r.from.toLowerCase() === from.toLowerCase() && r.to.toLowerCase() === to.toLowerCase()) ||
        (r.from.toLowerCase() === to.toLowerCase() && r.to.toLowerCase() === from.toLowerCase())
    ) ?? null
  );
}

export function getRecommendedVehicle(passengers: number): VehicleType {
  if (passengers <= 3) return "skoda";
  if (passengers <= 7) return "vito";
  return "sprinter";
}

export function getDayHirePrice(vehicle: VehicleType, duration: string): number {
  const prices = DAY_HIRE_PRICES.find((p) => p.vehicle === vehicle);
  if (!prices) return 0;
  if (duration === "half-day") return prices.halfDay;
  if (duration === "full-day") return prices.fullDay;
  if (duration === "2-days") return Math.round(prices.fullDay * 2 * (1 - MULTI_DAY_DISCOUNTS["2-days"]));
  if (duration === "3-plus-days") return Math.round(prices.fullDay * 3 * (1 - MULTI_DAY_DISCOUNTS["3-plus-days"]));
  return prices.fullDay;
}
