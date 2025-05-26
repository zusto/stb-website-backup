import React from 'react';

export interface FormData {
  name: string;
  email: string;
  dest: string;
  vibe: string;
  style: string;
  cats: string[];
  group: string;
  idealTripDescription?: string;
}

export interface TravelQuizStepSharedProps {
  answers: {
    name: string;
    email: string;
    dest: string;
    vibe: string;
    style: string;
    cats: string[];
    group: string;
  };
  update: (key: string, value: any) => void;
  onNext?: () => void;  // Add this optional callback
}

export interface DailyActivity {
  name: string;
  icon: React.ReactNode | string; // Lucide icon or emoji
  description?: string;
  saving?: string; // e.g., "$10"
  isicPerk?: boolean; // True if ISIC related
  sheerIdPerk?: boolean; // True if SheerID related
}

export interface DailyItinerary {
  day: number;
  title?: string; // e.g., "Arrival & Orientation"
  activities: DailyActivity[];
  dailySavings?: string; // e.g., "$125"
}

export interface TravelQuizCalculatedResults {
  base: string; // Existing overall budget
  breakdown: { [key: string]: { spend: string; save: string } }; // Existing category breakdown
  saveTotal: string; // Existing total savings from categories
  dailyItinerary?: DailyItinerary[]; // New detailed daily itinerary
  totalItinerarySavings?: string; // New total savings from detailed itinerary
  itineraryTitle?: string; // e.g., "5-Day Student Travel Itinerary – London from LA"
}

export interface TravelQuizResultsViewProps {
  answers: FormData;
  calculatedResults: TravelQuizCalculatedResults;
  onSnagMembership: () => void;
}