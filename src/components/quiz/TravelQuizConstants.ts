import { destinations as travelDestinationsData } from "@/data/destinationsList";

// Hardcoded destinations for fallback and cost factors
export const DESTINATIONS: Record<string, { costFactor: number; img?: string }> = { // img is optional as primary source is travelDestinationsData
  "Cancún": { costFactor: 0.9, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
  "Paris": { costFactor: 1.2, img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80" },
  "London": { costFactor: 1.3, img: "https://images.unsplash.com/photo-1543877087-ebf71bb88de2?auto=format&fit=crop&w=1200&q=80" },
  "Rome": { costFactor: 1.1, img: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1200&q=80" },
  "Barcelona": { costFactor: 1.0, img: "https://images.unsplash.com/photo-1501959915551-4e8d21282f19?auto=format&fit=crop&w=1200&q=80" },
  "Tokyo": { costFactor: 1.4, img: "https://images.unsplash.com/photo-1505061481992-53fb0f931f5d?auto=format&fit=crop&w=1200&q=80" },
  "Seoul": { costFactor: 1.1, img: "https://images.unsplash.com/photo-1580170533783-0c0d9fcc9a19?auto=format&fit=crop&w=1200&q=80" },
  "Honolulu": { costFactor: 1.3, img: "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=1200&q=80" },
  "New York": { costFactor: 1.35, img: "https://images.unsplash.com/photo-1501147830916-ce44a6359892?auto=format&fit=crop&w=1200&q=80" },
  "Los Angeles": { costFactor: 1.2, img: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1200&q=80" },
  "Venice": { costFactor: 1.15, img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80" } // Added Venice
};

export const DEFAULT_TRAVEL_IMAGE = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80";
export const SUNNY_IMG = "/lovable-uploads/4f7ff15f-54ee-4439-8905-39341b5428d5.png";

export const SPEND_PROFILES: Record<string, number> = { Shoestring: 350, "Mid-range": 550, "Treat Yo’Self": 900 };
export const DISCOUNT_RATES: Record<string, number> = { accommodation: 0.2, transport: 0.15, attractions: 0.5, food: 0.1, nightlife: 0.05, shopping: 0.1 };
export const CATEGORY_WEIGHTS: Record<string, number> = { accommodation: 0.35, transport: 0.15, attractions: 0.2, food: 0.15, nightlife: 0.05, shopping: 0.1 };

// Q1_DESTS will be derived from travelDestinationsData for the dropdown.
// The DESTINATIONS object above is mainly for costFactors and fallback images.
export const ALL_AVAILABLE_DESTINATIONS = travelDestinationsData.map(dest => dest.city);
// Keep Q1_DESTS from DESTINATIONS keys for any place it might still be specifically used for "surprise me" logic, if not updated.
// However, it's better for "surprise me" to also use ALL_AVAILABLE_DESTINATIONS.
export const Q1_DESTS_FALLBACK = Object.keys(DESTINATIONS); 


export const Q2_VIBES = ["Beach/Party", "Culture & Museums", "Foodie Adventures", "Outdoor/Nature", "City Blitz"];
export const Q3_STYLE = Object.keys(SPEND_PROFILES);
export const Q4_CATEGORIES = Object.keys(CATEGORY_WEIGHTS);
export const Q5_GROUP = ["Solo", "1–2", "3–5", "6+"];

export const gradientBtn = "bg-gradient-to-r from-sunny-yellow to-sunny-orange";
