import React from 'react'; // Added for JSX in icons
import { destinations as travelDestinationsData } from "@/data/destinationsList";
import { DestinationItinerary, HolidayTypeDetails, Attraction } from "@/types/travel"; // Added Attraction
import { DESTINATIONS, DEFAULT_TRAVEL_IMAGE, SPEND_PROFILES, CATEGORY_WEIGHTS, DISCOUNT_RATES, Q4_CATEGORIES } from "./TravelQuizConstants";
import { FormData, TravelQuizCalculatedResults, DailyItinerary, DailyActivity } from "./TravelQuizTypes";

// Import Lucide icons for generic itinerary
// Corrected to use Plane and Landmark
import { Bed, Utensils, ShoppingBag, Ticket, Plane, Bus, Landmark, Gift, Coffee, MapPin, Building, Star, Users, Film } from 'lucide-react';

export const normalizeString = (str: string): string =>
  str ? str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

export const getDestData = (city: string): { costFactor: number; img: string; details?: DestinationItinerary } => {
  const normalizedQueryCity = normalizeString(city);
  let imageUrl: string | undefined = undefined;
  let destinationDetails: DestinationItinerary | undefined = undefined;

  // 1. Try to get image from imported travelDestinationsData (primary source)
  const destinationEntry = travelDestinationsData.find(
    (dest: DestinationItinerary) => normalizeString(dest.city) === normalizedQueryCity
  );

  if (destinationEntry) {
    destinationDetails = destinationEntry;
    if (destinationEntry.imageUrl) {
      imageUrl = destinationEntry.imageUrl;
    }
  }
  
  // 2. Fallback to DESTINATIONS constant for image if not found above and city is in DESTINATIONS
  // This is useful if travelDestinationsData entry exists but is missing an image URL for some reason.
  if (!imageUrl && city && DESTINATIONS[city]?.img) {
    imageUrl = DESTINATIONS[city].img;
  }
  
  // 3. Fallback to Unsplash dynamic query if still no image and city is provided
  if (!imageUrl && city) {
    console.log(`Falling back to Unsplash for city: ${city}`);
    imageUrl = `https://source.unsplash.com/1200x800/?${encodeURIComponent(city + " travel, cityscape")}`;
  }

  // 4. Ultimate fallback to default image
  if (!imageUrl) {
    imageUrl = DEFAULT_TRAVEL_IMAGE;
  }
  
  const costFactor = (city && DESTINATIONS[city]?.costFactor) ?? 1.1;

  return { costFactor, img: imageUrl, details: destinationDetails };
};

// Helper to get an attraction from details, fallback to generic
const getAttractionOrDefault = (
  idx: number,
  attractionType: 'mustSee' | 'attractions',
  destinationDetails: DestinationItinerary | undefined,
  defaultName: string,
  defaultIcon: React.ReactNode
): { name: string; icon: React.ReactNode | string; description?: string } => {
  const attractions = destinationDetails?.holidayTypes?.general?.[attractionType];
  if (attractions && attractions[idx]) {
    return attractions[idx];
  }
  return { name: defaultName, icon: defaultIcon };
};


const generateGenericDetailedItinerary = (
  destinationDetails: DestinationItinerary | undefined,
  costFactor: number,
  cityName: string
): { dailyItinerary: DailyItinerary[]; totalItinerarySavings: string; itineraryTitle: string } | null => {
  if (!cityName) return null;

  const itineraryTitle = `🗺️ 5-Day Student Itinerary: ${cityName}`;
  let overallSavings = 0;
  const dailyItineraries: DailyItinerary[] = [];

  const genericSavings = {
    flight: 25 * costFactor,
    transport: 5 * costFactor,
    accommodation: 15 * costFactor, // Simplified to a per-trip discount contribution
    activity: 8 * costFactor,
    meal: 4 * costFactor,
    coffee: 2 * costFactor,
    shopping: 7 * costFactor,
  };
  
  // --- Day 1: Arrival & Settling In ---
  let day1Activities: DailyActivity[] = [];
  let day1Savings = 0;
  const arrivalAttraction = getAttractionOrDefault(0, 'attractions', destinationDetails, "Explore Nearby Area", <MapPin size={20} className="text-teal-500" />);
  
  day1Activities.push({ name: `Flight to ${cityName}`, icon: <Plane size={20} className="text-blue-500" />, saving: `$${genericSavings.flight.toFixed(0)}`, isicPerk: true, description: "Student flight deals via ISIC." });
  day1Savings += genericSavings.flight;
  day1Activities.push({ name: "Airport Transfer", icon: <Bus size={20} className="text-red-500" />, saving: `$${genericSavings.transport.toFixed(0)}`, isicPerk: true, description: "Use public transport or student shuttles." });
  day1Savings += genericSavings.transport;
  day1Activities.push({ name: "Hostel/Budget Stay Check-in", icon: <Bed size={20} className="text-green-500" />, saving: `$${genericSavings.accommodation.toFixed(0)}`, isicPerk: true, description: "Student-friendly accommodation discounts." });
  day1Savings += genericSavings.accommodation;
  day1Activities.push({ name: `Evening: ${arrivalAttraction.name}`, icon: arrivalAttraction.icon, saving: `$${genericSavings.meal.toFixed(0)}`, isicPerk: true, description: arrivalAttraction.description || "Welcome dinner at a local spot." });
  day1Savings += genericSavings.meal;
  dailyItineraries.push({ day: 1, title: "Arrival & Local Immersion", activities: day1Activities, dailySavings: `$${day1Savings.toFixed(0)}` });
  overallSavings += day1Savings;

  // --- Day 2: Cultural Discovery ---
  let day2Activities: DailyActivity[] = [];
  let day2Savings = 0;
  const museumAttraction = getAttractionOrDefault(0, 'mustSee', destinationDetails, "Visit a Top Museum/Landmark", <Landmark size={20} className="text-indigo-500" />);
  const foodAttraction = getAttractionOrDefault(1, 'attractions', destinationDetails, "Try Local Cuisine", <Utensils size={20} className="text-orange-500" />);

  day2Activities.push({ name: "Morning Coffee & Plan", icon: <Coffee size={20} className="text-yellow-600" />, saving: `$${genericSavings.coffee.toFixed(0)}`, isicPerk: true });
  day2Savings += genericSavings.coffee;
  day2Activities.push({ name: museumAttraction.name, icon: museumAttraction.icon, saving: `$${genericSavings.activity.toFixed(0)}`, isicPerk: true, description: museumAttraction.description || "Explore local history and art." });
  day2Savings += genericSavings.activity;
  day2Activities.push({ name: foodAttraction.name, icon: foodAttraction.icon, saving: `$${genericSavings.meal.toFixed(0)}`, isicPerk: true, description: foodAttraction.description || "Lunch with local flavors." });
  day2Savings += genericSavings.meal;
  day2Activities.push({ name: "Afternoon: Explore Historical Site", icon: <Building size={20} className="text-gray-600" />, saving: `$${genericSavings.activity.toFixed(0)}`, sheerIdPerk: true, description: "Student discounts often available." });
  day2Savings += genericSavings.activity;
  dailyItineraries.push({ day: 2, title: "Culture & History", activities: day2Activities, dailySavings: `$${day2Savings.toFixed(0)}` });
  overallSavings += day2Savings;

  // --- Day 3: City Exploration & Shopping ---
  let day3Activities: DailyActivity[] = [];
  let day3Savings = 0;
  const shoppingAttractionName = "Souvenir Shopping / Local Crafts";
  
  day3Activities.push({ name: "City Walking Tour (Self-guided or Free)", icon: <MapPin size={20} className="text-lime-500" />, description: "Discover hidden gems." });
  // No direct saving for free tour, but enables other savings.
  day3Activities.push({ name: shoppingAttractionName, icon: <ShoppingBag size={20} className="text-pink-500" />, saving: `$${genericSavings.shopping.toFixed(0)}`, isicPerk: true, description: "Find unique items and use student discounts." });
  day3Savings += genericSavings.shopping;
  day3Activities.push({ name: "Relax at a Park or Cafe", icon: <Coffee size={20} className="text-green-600" />, saving: `$${genericSavings.coffee.toFixed(0)}`, isicPerk: true });
  day3Savings += genericSavings.coffee;
  day3Activities.push({ name: "Evening: Student Hangout Spot", icon: <Users size={20} className="text-purple-500" />, saving: `$${genericSavings.meal.toFixed(0)}`, isicPerk: true, description: "Dinner with potential student deals." });
  day3Savings += genericSavings.meal;
  dailyItineraries.push({ day: 3, title: "Explore & Shop", activities: day3Activities, dailySavings: `$${day3Savings.toFixed(0)}` });
  overallSavings += day3Savings;
  
  // --- Day 4: Unique Experience / Entertainment ---
  let day4Activities: DailyActivity[] = [];
  let day4Savings = 0;
  const uniqueAttraction = getAttractionOrDefault(1, 'mustSee', destinationDetails, "Special City Attraction", <Star size={20} className="text-amber-500" />);

  day4Activities.push({ name: uniqueAttraction.name, icon: uniqueAttraction.icon, saving: `$${genericSavings.activity.toFixed(0)}`, isicPerk: true, description: uniqueAttraction.description || "Experience something unique to the city."});
  day4Savings += genericSavings.activity;
  day4Activities.push({ name: "Lunch: Quick & Tasty Street Food", icon: <Utensils size={20} className="text-red-600" />, saving: `$${(genericSavings.meal / 2).toFixed(0)}`, sheerIdPerk: true });
  day4Savings += (genericSavings.meal / 2);
  day4Activities.push({ name: "Entertainment (e.g. Cinema, Show)", icon: <Ticket size={20} className="text-cyan-500" />, saving: `$${genericSavings.activity.toFixed(0)}`, isicPerk: true, description: "Student prices for shows or events." });
  day4Savings += genericSavings.activity;
  day4Activities.push({ name: "Subscription Service Perk (e.g. Music/Streaming)", icon: <Film size={20} className="text-violet-500" />, saving: `$${(genericSavings.coffee).toFixed(0)}`, sheerIdPerk: true, description: "Utilize student digital perks." }); // Small symbolic saving
  day4Savings += genericSavings.coffee;
  dailyItineraries.push({ day: 4, title: "Adventure & Fun", activities: day4Activities, dailySavings: `$${day4Savings.toFixed(0)}` });
  overallSavings += day4Savings;

  // --- Day 5: Last Bites & Departure ---
  let day5Activities: DailyActivity[] = [];
  let day5Savings = 0;

  day5Activities.push({ name: "Last Minute Souvenirs", icon: <Gift size={20} className="text-orange-400" />, saving: `$${(genericSavings.shopping / 2).toFixed(0)}`, isicPerk: true });
  day5Savings += (genericSavings.shopping / 2);
  day5Activities.push({ name: "Farewell Lunch/Coffee", icon: <Coffee size={20} className="text-yellow-700" />, saving: `$${genericSavings.coffee.toFixed(0)}`, isicPerk: true });
  day5Savings += genericSavings.coffee;
  day5Activities.push({ name: "Travel to Airport", icon: <Bus size={20} className="text-red-500" />, saving: `$${genericSavings.transport.toFixed(0)}`, isicPerk: true });
  day5Savings += genericSavings.transport;
  dailyItineraries.push({ day: 5, title: "Departure Day", activities: day5Activities, dailySavings: `$${day5Savings.toFixed(0)}` });
  overallSavings += day5Savings;

  return {
    dailyItinerary: dailyItineraries,
    totalItinerarySavings: `$${overallSavings.toFixed(0)}`,
    itineraryTitle,
  };
};


export const calculateQuizResults = (answers: FormData): TravelQuizCalculatedResults => {
  const { costFactor, details: destinationDetails } = getDestData(answers.dest);
  const styleKey = answers.style as keyof typeof SPEND_PROFILES;
  const baseSpend = SPEND_PROFILES[styleKey] || SPEND_PROFILES["Mid-range"];
  const base = baseSpend * costFactor;
  
  const breakdown: {[key: string]: {spend: string, save: string}} = {};
  let saveTotal = 0;
  Q4_CATEGORIES.forEach((c) => {
    const categoryKey = c as keyof typeof CATEGORY_WEIGHTS & keyof typeof DISCOUNT_RATES;
    const spend = base * (CATEGORY_WEIGHTS[categoryKey] || 0);
    const save = spend * (DISCOUNT_RATES[categoryKey] || 0) * (answers.cats.includes(c) ? 1 : 0.5);
    breakdown[c] = { spend: spend.toFixed(0), save: save.toFixed(0) };
    saveTotal += save;
  });

  // Generate detailed itinerary for all cities
  const itineraryData = generateGenericDetailedItinerary(destinationDetails, costFactor, answers.dest);

  return { 
    base: base.toFixed(0), 
    breakdown, 
    saveTotal: saveTotal.toFixed(0),
    dailyItinerary: itineraryData?.dailyItinerary,
    totalItinerarySavings: itineraryData?.totalItinerarySavings,
    itineraryTitle: itineraryData?.itineraryTitle
  };
};
