
import React from 'react';
import { ShoppingCart, TreePalm, Landmark, MapPin, Utensils, Building } from 'lucide-react';
import { HolidayTypeDetails } from '@/types/travel';

// Default itinerary / fallback if a specific destination or type isn't found
export const defaultItinerary: HolidayTypeDetails = {
  vibeDescription: "An exciting journey awaits! Discover unique spots and make unforgettable memories.",
  attractions: [
    { name: "Local Market", icon: <ShoppingCart className="w-4 h-4" />, description: "Experience the local culture and find unique souvenirs." },
    { name: "City Park", icon: <TreePalm className="w-4 h-4" />, description: "Relax and enjoy the green spaces." },
  ],
  mustSee: [
    { name: "Iconic Landmark", icon: <Landmark className="w-4 h-4" />, description: "A must-visit spot in any city." }
  ],
  isicSavings: {
    total: "Varies",
    period: "during your trip",
    highlights: ["Look for ISIC discounts at various attractions and eateries!"],
  },
};

export const minimalGeneralHolidayType: HolidayTypeDetails = {
  vibeDescription: "Discover the highlights and unique charm of this amazing city.",
  attractions: [
    { name: "City Exploration", icon: <MapPin className="w-4 h-4" />, description: "Wander and discover local spots." },
    { name: "Local Cuisine", icon: <Utensils className="w-4 h-4" />, description: "Try some authentic local food." }
  ],
  mustSee: [
    { name: "Famous Landmark", icon: <Landmark className="w-4 h-4" />, description: "Visit a well-known site." },
    { name: "Cultural Hotspot", icon: <Building className="w-4 h-4" />, description: "Experience the local culture." }
  ],
};

