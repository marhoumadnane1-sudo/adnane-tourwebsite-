import type { Airport, City } from "./types";

export const AIRPORTS: Airport[] = [
  { code: "CMN", name: "Mohammed V International", city: "Casablanca", fullName: "Casablanca Mohammed V (CMN)" },
];

export const CITIES: City[] = [
  { id: "casablanca", name: "Casablanca", nameFr: "Casablanca", nameAr: "الدار البيضاء", region: "Casablanca-Settat" },
  { id: "marrakech", name: "Marrakech", nameFr: "Marrakech", nameAr: "مراكش", region: "Marrakech-Safi" },
  { id: "rabat", name: "Rabat", nameFr: "Rabat", nameAr: "الرباط", region: "Rabat-Salé-Kénitra" },
  { id: "fez", name: "Fez", nameFr: "Fès", nameAr: "فاس", region: "Fès-Meknès" },
  { id: "tangier", name: "Tangier", nameFr: "Tanger", nameAr: "طنجة", region: "Tanger-Tétouan-Al Hoceïma" },
  { id: "agadir", name: "Agadir", nameFr: "Agadir", nameAr: "أكادير", region: "Souss-Massa" },
  { id: "meknes", name: "Meknes", nameFr: "Meknès", nameAr: "مكناس", region: "Fès-Meknès" },
  { id: "oujda", name: "Oujda", nameFr: "Oujda", nameAr: "وجدة", region: "Oriental" },
  { id: "essaouira", name: "Essaouira", nameFr: "Essaouira", nameAr: "الصويرة", region: "Marrakech-Safi" },
  { id: "chefchaouen", name: "Chefchaouen", nameFr: "Chefchaouen", nameAr: "شفشاون", region: "Tanger-Tétouan-Al Hoceïma" },
  { id: "ouarzazate", name: "Ouarzazate", nameFr: "Ouarzazate", nameAr: "ورزازات", region: "Drâa-Tafilalet" },
  { id: "merzouga", name: "Merzouga", nameFr: "Merzouga", nameAr: "مرزوقة", region: "Drâa-Tafilalet" },
  { id: "tetouan", name: "Tetouan", nameFr: "Tétouan", nameAr: "تطوان", region: "Tanger-Tétouan-Al Hoceïma" },
  { id: "el-jadida", name: "El Jadida", nameFr: "El Jadida", nameAr: "الجديدة", region: "Casablanca-Settat" },
  { id: "mohammedia", name: "Mohammedia", nameFr: "Mohammedia", nameAr: "المحمدية", region: "Casablanca-Settat" },
  { id: "taghazout", name: "Taghazout", nameFr: "Taghazout", nameAr: "تغاززوت", region: "Souss-Massa" },
  { id: "dakhla", name: "Dakhla", nameFr: "Dakhla", nameAr: "الداخلة", region: "Dakhla-Oued Ed-Dahab" },
  { id: "laayoune", name: "Laâyoune", nameFr: "Laâyoune", nameAr: "العيون", region: "Laâyoune-Sakia El Hamra" },
];

export const DAY_TRIP_ITINERARIES = [
  {
    base: "Marrakech",
    title: "Marrakech → Essaouira Day Trip",
    description: "Explore the blue and white medina of Essaouira, a UNESCO-listed coastal town with Gnawa music and fresh seafood.",
    duration: "Full day (10h)",
    highlights: ["Essaouira Medina", "Skala du Port", "Moulay Hassan Square", "Local fish market"],
  },
  {
    base: "Marrakech",
    title: "Marrakech → Ouarzazate Day Trip",
    description: "Cross the dramatic Tizi n'Tichka pass and visit the Hollywood of Africa, home to the iconic Aït Benhaddou kasbah.",
    duration: "Full day (12h)",
    highlights: ["Tizi n'Tichka Pass (2,260m)", "Aït Benhaddou (UNESCO)", "Atlas Film Studios", "Ounila Valley"],
  },
  {
    base: "Fez",
    title: "Fez → Chefchaouen Day Trip",
    description: "Drive to the enchanting Blue City nestled in the Rif Mountains, a paradise for photographers and wanderers.",
    duration: "Full day (10h)",
    highlights: ["Chefchaouen Medina", "Plaza Uta el-Hammam", "Ras el Ma waterfall", "Blue-painted alleyways"],
  },
  {
    base: "Agadir",
    title: "Agadir → Taghazout Surf Day",
    description: "Visit Morocco's top surf destination with golden beaches, argan oil cooperatives, and laid-back beach culture.",
    duration: "Half day (4h)",
    highlights: ["Taghazout Beach", "Banana Beach", "Panorama Point", "Local argan cooperatives"],
  },
  {
    base: "Tangier",
    title: "Tangier → Chefchaouen Day Trip",
    description: "Escape to the Blue Pearl of Morocco for a full day of exploration in one of North Africa's most photogenic cities.",
    duration: "Full day (10h)",
    highlights: ["Blue Medina", "Kasbah Museum", "Old Spanish Quarter", "Local craft shops"],
  },
  {
    base: "Casablanca",
    title: "Casablanca → Rabat Day Trip",
    description: "Visit Morocco's political capital — home to the Royal Palace, ancient Chellah necropolis and stunning coastline.",
    duration: "Full day (8h)",
    highlights: ["Hassan Tower", "Mausoleum of Mohammed V", "Kasbah des Oudayas", "Chellah Ruins"],
  },
];

export const CONTACT = {
  phone: '+212 661 659 607',
  whatsapp: '212661659607',
  email: 'nigor2.car@gmail.com',
  address: 'Ain Borja, Casablanca, Maroc',
  hours: '24/7 — Nous ne fermons jamais',
  license: '1754/T/2018',
  company: 'Carolina Prestige Travel',
};
