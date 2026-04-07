export type ServiceType = "airport" | "city-to-city" | "day-hire";

export type VehicleType = "skoda" | "mercedes-e" | "vito" | "sprinter";

export type PriceMap = Record<VehicleType, number>;

export type AirportCode = "CMN";

export type Direction = "arriving" | "departing";

export type DayHireDuration = "half-day" | "full-day" | "2-days" | "3-plus-days";

export interface Airport {
  code: AirportCode;
  name: string;
  city: string;
  fullName: string;
}

export interface City {
  id: string;
  name: string;
  nameAr?: string;
  nameFr?: string;
  region?: string;
}

export interface Vehicle {
  id: VehicleType;
  name: string;
  category: string;
  capacity: number;
  luggage: number;
  features: string[];
  image: string;
  description: string;
  badge: string | null;
  bgColor?: string;
}

export interface Route {
  from: string;
  to: string;
  distance: number;
  duration: string;
  prices: PriceMap;
}

export interface BookingFormData {
  serviceType: ServiceType;
  // Airport transfer fields
  airportCode?: AirportCode;
  direction?: Direction;
  destinationAddress?: string;
  // City to city fields
  fromCity?: string;
  toCity?: string;
  // Day hire fields
  baseCity?: string;
  dayHireDuration?: DayHireDuration;
  // Common fields
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  vehicleType?: VehicleType;
  // Address fields
  pickupAddress?: string;
  dropoffAddress?: string;
  // Personal details
  fullName: string;
  email: string;
  phone: string;
  flightNumber?: string;
  hotelAddress: string;
  specialRequests?: string;
  paymentMethod: "online" | "on-arrival";
}

export interface PriceCalculation {
  basePrice: number;
  totalPrice: number;
  currency: "MAD" | "EUR";
}

export interface Testimonial {
  id: number;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  text: string;
  route: string;
  date: string;
}
