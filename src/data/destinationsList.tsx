import React from 'react';
import { Plane, MapPin, Camera, Coffee, Building, BookOpen, Bike, TreePalm, Ticket, Landmark, ShoppingCart, Utensils, Bed, Bus, Euro, Star, Users, Film, Briefcase, ArrowRight } from 'lucide-react'; // Added more icons
import { DestinationItinerary, HolidayTypeDetails } from '@/types/travel';
import { minimalGeneralHolidayType } from './travelDefaults';

// --- Detailed London Student Itinerary ---
const londonStudentItinerary: HolidayTypeDetails = {
  vibeDescription: "Explore London with this 5-day itinerary packed with student savings!",
  itineraryTitle: "🗺️ 5-Day Student Travel Itinerary – London from LA (ISIC + SheerID Discounts)",
  attractions: [], // Can be kept minimal if detailed itinerary is primary
  mustSee: [],    // Can be kept minimal
  dailyItinerary: [
    {
      day: 1,
      title: "Arrival & Orientation",
      activities: [
        { name: "Flight: Air France or Lufthansa", icon: <Plane className="w-5 h-5 text-blue-500" />, saving: "$100", isicPerk: true, description: "Book via ISIC for discounts." },
        { name: "Airport transfer: National Express", icon: <Bus className="w-5 h-5 text-red-500" />, saving: "$10", isicPerk: true, description: "Coach service from airports." },
        { name: "Stay: a&o Hostels London", icon: <Bed className="w-5 h-5 text-green-500" />, saving: "$10/night", isicPerk: true, description: "Budget-friendly student accommodation." },
        { name: "Dinner: Hard Rock Café", icon: <Utensils className="w-5 h-5 text-yellow-500" />, saving: "$5", isicPerk: true, description: "Enjoy a meal with a discount." },
      ],
      dailySavings: "$125",
    },
    {
      day: 2,
      title: "Cultural Discovery",
      activities: [
        { name: "Breakfast: Costa Coffee", icon: <Coffee className="w-5 h-5 text-orange-500" />, saving: "$2", isicPerk: true },
        { name: "Madame Tussauds London", icon: <Users className="w-5 h-5 text-purple-500" />, saving: "$20", isicPerk: true },
        { name: "Lunch: Starbucks", icon: <Coffee className="w-5 h-5 text-green-600" />, saving: "$2", isicPerk: true },
        { name: "London Dungeon", icon: <Building className="w-5 h-5 text-gray-600" />, saving: "$12", isicPerk: true, description: "Spooky historical fun." },
        { name: "Evening: Spotify Premium", icon: <Ticket className="w-5 h-5 text-green-400" />, saving: "$2", sheerIdPerk: true, description: "Music streaming for students." },
      ],
      dailySavings: "$38",
    },
    {
      day: 3,
      title: "Shopping & Chill",
      activities: [
        { name: "Thames Cruise", icon: <Plane className="w-5 h-5 text-blue-400" />, saving: "$14", isicPerk: true, description: "See London from the river." }, // Using Plane as placeholder for boat
        { name: "Shopping: Zalando/C&A", icon: <ShoppingCart className="w-5 h-5 text-pink-500" />, saving: "$10", isicPerk: true },
        { name: "Groceries: Tesco", icon: <ShoppingCart className="w-5 h-5 text-blue-600" />, saving: "$5", sheerIdPerk: true, description: "Stock up on essentials." },
        { name: "Dinner: Domino’s/Vapiano", icon: <Utensils className="w-5 h-5 text-red-600" />, saving: "$6", isicPerk: true },
      ],
      dailySavings: "$35",
    },
    {
      day: 4,
      title: "Adventure & Entertainment",
      activities: [
        { name: "Excursion: Harry Potter Studios", icon: <Film className="w-5 h-5 text-yellow-600" />, saving: "$15", description: "Requires Student ID. Magical experience!" },
        { name: "Lunch: Papa John’s", icon: <Utensils className="w-5 h-5 text-red-700" />, saving: "$8", isicPerk: true },
        { name: "Chill: Headspace App", icon: <Star className="w-5 h-5 text-teal-500" />, saving: "$9.99/year", sheerIdPerk: true, description: "Meditation and mindfulness." },
        { name: "Taxi: Free Now app", icon: <Bus className="w-5 h-5 text-black" />, saving: "$12", isicPerk: true, description: "Ride-hailing service." }, // Using Bus as placeholder for Taxi
      ],
      dailySavings: "$35", // Note: Headspace saving is annual, but contributes to overall value.
    },
    {
      day: 5,
      title: "Last Day & Return",
      activities: [
        { name: "Museum or gallery (ISIC)", icon: <Landmark className="w-5 h-5 text-indigo-500" />, saving: "$10", isicPerk: true, description: "Many offer student discounts." },
        { name: "Lunch: Café/Starbucks", icon: <Coffee className="w-5 h-5 text-green-600" />, saving: "$4", isicPerk: true },
        { name: "Shopping: Amazon UK/local shops", icon: <ShoppingCart className="w-5 h-5 text-orange-600" />, saving: "$6", isicPerk: true },
        { name: "Return to airport: National Express", icon: <Bus className="w-5 h-5 text-red-500" />, saving: "$10", isicPerk: true },
      ],
      dailySavings: "$30",
    },
  ],
  isicSavings: { // Summary for the detailed itinerary
    total: "$263",
    period: "over 5 days",
    highlights: ["Significant savings on flights, accommodation, attractions, and food with ISIC & SheerID."],
  },
};

// Sample destinations data
export const destinations: DestinationItinerary[] = [
  {
    city: "Barcelona",
    country: "Spain",
    imageEmoji: "🇪🇸",
    imageUrl: "https://images.unsplash.com/photo-1587789202069-f57c8a6d52c9?auto=format&fit=crop&w=1200&q=80", // Replaced local upload with Unsplash
    holidayTypes: {
      "cultural": {
        vibeDescription: "Immerse yourself in Barcelona's rich history, stunning architecture, and vibrant arts scene.",
        attractions: [
          { name: "Sagrada Familia", icon: <Landmark className="w-4 h-4" />, description: "Gaudí's masterpiece, an architectural marvel." },
          { name: "Gothic Quarter", icon: <Building className="w-4 h-4" />, description: "Historic streets, charming squares, and local shops." },
          { name: "Picasso Museum", icon: <Camera className="w-4 h-4" />, description: "Explore the early works of Pablo Picasso." },
        ],
        mustSee: [
          { name: "Park Güell", icon: <TreePalm className="w-4 h-4" />, description: "Another Gaudí wonder with panoramic city views (book tickets in advance!)." },
          { name: "La Boqueria Market", icon: <ShoppingCart className="w-4 h-4" />, description: "A bustling market with fresh produce and local delicacies." },
        ],
        isicSavings: {
          total: "€30 - €70",
          period: "on a 5-day trip",
          highlights: ["Discounted entry to many museums with ISIC.", "Student deals at some tapas bars."],
        },
      },
      "sun-beach": {
        vibeDescription: "Relax on Barcelona's sunny beaches, enjoy seaside paella, and soak up the Mediterranean atmosphere.",
        attractions: [
          { name: "Barceloneta Beach", icon: <TreePalm className="w-4 h-4" />, description: "The city's most famous beach." },
          { name: "Port Olímpic", icon: <Plane className="w-4 h-4" />, description: "Marina area with restaurants and nightlife." }, // Using Plane as placeholder
        ],
        mustSee: [
          { name: "Sitges (day trip)", icon: <MapPin className="w-4 h-4" />, description: "Beautiful coastal town near Barcelona, known for its beaches." },
        ],
        isicSavings: {
          total: "€20 - €50",
          period: "on a 5-day trip",
          highlights: ["Discounts on some water sports activities.", "Student offers at beachside cafes."],
        },
      },
      "adventure": {
        vibeDescription: "Explore Barcelona's surroundings with adventurous activities and enjoy the thrill of Catalonia.",
        attractions: [
          { name: "Montserrat Mountain", icon: <Bike className="w-4 h-4" />, description: "Hiking and stunning views at this unique rock formation." },
          { name: "Tibidabo Amusement Park", icon: <Camera className="w-4 h-4" />, description: "Historic amusement park with panoramic city views." },
        ],
        mustSee: [
          { name: "Collserola Park cycling", icon: <Bike className="w-4 h-4" />, description: "Extensive natural park perfect for biking." },
        ],
      },
    },
  },
  {
    city: "Paris",
    country: "France",
    imageEmoji: "🇫🇷",
    imageUrl: "/lovable-uploads/6babe884-a973-49d2-9125-fad3e4a98f6e.jpg", // Local upload preferred
    holidayTypes: {
      "cultural": {
        vibeDescription: "Experience the romance and artistry of Paris, from iconic landmarks to world-class museums.",
        attractions: [
          { name: "Eiffel Tower", icon: <Landmark className="w-4 h-4" />, description: "The symbol of Paris, offering breathtaking views." },
          { name: "Louvre Museum", icon: <Building className="w-4 h-4" />, description: "Home to masterpieces like the Mona Lisa." },
          { name: "Notre-Dame Cathedral", icon: <Landmark className="w-4 h-4" />, description: "Historic Gothic cathedral (check status for visits)." },
        ],
        mustSee: [
          { name: "Montmartre & Sacré-Cœur", icon: <Camera className="w-4 h-4" />, description: "Artistic neighborhood with stunning basilica views." },
          { name: "Seine River Cruise", icon: <Plane className="w-4 h-4" />, description: "See Paris landmarks from the water (placeholder icon)." },
        ],
        isicSavings: {
          total: "€40 - €100",
          period: "on a 5-day trip",
          highlights: ["Free/discounted museum entry for EU students under 26.", "ISIC discounts on some tours."],
        },
      },
      "educational": {
        vibeDescription: "Delve into Paris's rich literary, historical, and scientific heritage with its many institutions.",
        attractions: [
          { name: "Sorbonne University", icon: <BookOpen className="w-4 h-4" />, description: "Historic university in the Latin Quarter." },
          { name: "Musée d'Orsay", icon: <Building className="w-4 h-4" />, description: "Impressionist and Post-Impressionist art in a former railway station." },
        ],
        mustSee: [
          { name: "Shakespeare and Company", icon: <BookOpen className="w-4 h-4" />, description: "Iconic English-language bookstore." },
        ],
      }
    },
  },
  // --- New Entries ---
  {
    city: "Cancún", // Normalizing to Cancun for matching if needed, but display as Cancún
    country: "Mexico",
    imageEmoji: "🇲🇽",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    holidayTypes: { "general": minimalGeneralHolidayType },
  },
  {
    city: "London",
    country: "United Kingdom",
    imageEmoji: "🇬🇧",
    imageUrl: "https://images.unsplash.com/photo-1543877087-ebf71bb88de2?auto=format&fit=crop&w=1200&q=80",
    holidayTypes: { 
      "general": minimalGeneralHolidayType,
      "student-itinerary": londonStudentItinerary // Added detailed itinerary for London
    },
  },
  {
    city: "Rome",
    country: "Italy",
    imageEmoji: "🇮🇹",
    imageUrl: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1200&q=80",
    holidayTypes: { "general": minimalGeneralHolidayType },
  },
  {
    city: "Tokyo",
    country: "Japan",
    imageEmoji: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1505061481992-53fb0f931f5d?auto=format&fit=crop&w=1200&q=80",
    holidayTypes: { "general": minimalGeneralHolidayType },
  },
  {
    city: "Seoul",
    country: "South Korea",
    imageEmoji: "🇰🇷",
    imageUrl: "https://images.unsplash.com/photo-1580170533783-0c0d9fcc9a19?auto=format&fit=crop&w=1200&q=80",
    holidayTypes: { "general": minimalGeneralHolidayType },
  },
  {
    city: "Honolulu",
    country: "USA",
    imageEmoji: "🇺🇸", // Could also use 🌺 or similar
    imageUrl: "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=1200&q=80",
    holidayTypes: { "general": minimalGeneralHolidayType },
  },
  {
    city: "New York",
    country: "USA",
    imageEmoji: "🇺🇸",
    imageUrl: "https://images.unsplash.com/photo-1501147830916-ce44a6359892?auto=format&fit=crop&w=1200&q=80",
    holidayTypes: { "general": minimalGeneralHolidayType },
  },
  {
    city: "Los Angeles",
    country: "USA",
    imageEmoji: "🇺🇸",
    imageUrl: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1200&q=80",
    holidayTypes: { "general": minimalGeneralHolidayType },
  },
  {
    city: "Venice",
    country: "Italy",
    imageEmoji: "🇮🇹",
    imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80", // Venice image
    holidayTypes: { "general": minimalGeneralHolidayType },
  },
  {
    city: "Bratislava",
    country: "Slovakia",
    imageEmoji: "🇸🇰",
    imageUrl: "https://images.unsplash.com/photo-1587723954480-849445c9704e?auto=format&fit=crop&w=1200&q=80", // Added Bratislava
    holidayTypes: { "general": minimalGeneralHolidayType },
  },
  // Add more destinations here following the same structure
];
