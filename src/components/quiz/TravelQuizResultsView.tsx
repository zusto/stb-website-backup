import React from 'react';
import { motion } from 'framer-motion';
import { FormData, TravelQuizResultsViewProps, DailyItinerary, DailyActivity } from './TravelQuizTypes';
import { SUNNY_IMG, gradientBtn } from './TravelQuizConstants';
import { Badge } from '@/components/ui/badge'; // For ISIC/SheerID badges
import { CheckCircle2, Sparkles } from 'lucide-react';

const ActivityItem: React.FC<{activity: DailyActivity}> = ({ activity }) => (
  <li className="flex items-start space-x-3 py-2">
    <div className="flex-shrink-0 w-6 h-6 mt-1">{typeof activity.icon === 'string' ? <span className="text-xl">{activity.icon}</span> : activity.icon}</div>
    <div className="flex-1">
      <p className="font-semibold">{activity.name}
        {activity.isicPerk && <Badge variant="outline" className="ml-2 border-blue-500 text-blue-500">ISIC</Badge>}
        {activity.sheerIdPerk && <Badge variant="outline" className="ml-2 border-green-500 text-green-500">SheerID</Badge>}
      </p>
      {activity.description && <p className="text-xs text-gray-600">{activity.description}</p>}
    </div>
    {activity.saving && <p className="font-semibold text-sunny-orange whitespace-nowrap">{activity.saving}</p>}
  </li>
);

const DailyItineraryCard: React.FC<{dayInfo: DailyItinerary}> = ({ dayInfo }) => (
  <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-4 mb-4">
    <h4 className="text-lg font-bold text-sunny-orange-dark mb-2">Day {dayInfo.day}: {dayInfo.title}</h4>
    <ul className="divide-y divide-gray-200">
      {dayInfo.activities.map((activity, index) => (
        <ActivityItem key={index} activity={activity} />
      ))}
    </ul>
    {dayInfo.dailySavings && (
      <p className="text-right font-bold mt-2">Daily Savings: <span className="text-sunny-orange">{dayInfo.dailySavings}</span></p>
    )}
  </div>
);


export const TravelQuizResultsView: React.FC<Omit<TravelQuizResultsViewProps, 'heroImg'>> = ({ answers, calculatedResults, onSnagMembership }) => {
  const { base, breakdown, saveTotal, dailyItinerary, totalItinerarySavings, itineraryTitle } = calculatedResults;
  const newHeroImageUrl = "/lovable-uploads/62502e44-1347-4dd9-851a-c31a519307bd.png";

  return (
    <section className="flex flex-col items-center text-center p-4 md:p-6 max-w-3xl mx-auto">
      {/* Hero Image and Basic Info */}
      <img 
        src={newHeroImageUrl} 
        alt="Explore your next destination with Sunny!" 
        className="rounded-2xl shadow-xl mb-4 w-full h-64 object-cover" 
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80"; // Fallback image
        }}
      />
      <h2 className="text-3xl font-bold mb-2">
        🔥 {answers.name || "Traveler"}, {answers.dest ? `${answers.dest} is calling!` : "your next adventure awaits!"}
      </h2>

      {/* Conditional Rendering: Detailed Itinerary or Budget Summary */}
      {dailyItinerary && totalItinerarySavings ? (
        // DETAILED ITINERARY VIEW
        <div className="w-full mt-4">
          {itineraryTitle && <h3 className="text-2xl font-semibold text-gray-800 mb-4">{itineraryTitle}</h3>}
          {dailyItinerary.map((dayInfo) => (
            <DailyItineraryCard key={dayInfo.day} dayInfo={dayInfo} />
          ))}
          <div className="mt-6 bg-gradient-to-r from-sunny-yellow to-sunny-orange text-white p-4 rounded-xl shadow-lg">
            <p className="text-2xl font-bold">
              Total Estimated Student Savings: <span className="block text-3xl">{totalItinerarySavings}</span>
            </p>
            <p className="text-sm">with ISIC & SheerID discounts over {dailyItinerary.length} days!</p>
          </div>

          {/* Display original budget summary as well, maybe toned down */}
          <div className="mt-8 p-4 bg-gray-100 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">General Budget Snapshot</h3>
            <p className="text-md mb-2">
              Your 1-week <span className="font-semibold">{answers.style || "Mid-range"}</span> budget estimate ≈ <span className="font-semibold">${base}</span>
            </p>
            <p className="text-lg font-bold mb-2">
              Potential general savings with ISIC (on categories) ≈ <span className="text-sunny-orange">${saveTotal}</span>
            </p>
          </div>

        </div>
      ) : (
        // ORIGINAL BUDGET SUMMARY VIEW
        <>
          <p className="text-lg mb-4">
            1‑week <span className="font-semibold">{answers.style || "Mid-range"}</span> budget ≈ <span className="font-semibold">${base}</span>
          </p>
          <p className="text-xl font-bold mb-4">
            Snag our membership with ISIC & save about <span className="text-sunny-orange">${saveTotal}</span> in 7&nbsp;days 🤑
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm w-full mb-6">
            {Object.entries(breakdown).map(([c, v]) => (
              <div 
                key={c} 
                className={`rounded-2xl p-3 shadow ${answers.cats.includes(c) ? "bg-sunny-yellow-light" : "bg-white/50 backdrop-blur-sm"}`}
              >
                <p className="font-semibold capitalize">{c}</p>
                <p>Spend: ${v.spend}</p>
                <p className="text-sunny-orange">Save: -${v.save}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Sunny's Pitch and Membership CTA (Common to both views) */}
      <div className="flex flex-col items-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 my-6 shadow w-full">
        <img src={SUNNY_IMG} alt="Sunny mascot" className="w-24 h-24 mb-2" />
        <p className="font-semibold mb-2 text-base">Sunny’s got your back:</p>
        <ul className="text-sm list-none text-left space-y-1 max-w-xs">
          <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />Digital ISIC discounts worldwide</li>
          <li className="flex items-center"><Sparkles className="w-4 h-4 mr-2 text-yellow-500" />Personalised itinerary & hacks</li>
          <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />Travel‑prep PDF cheat‑sheet</li>
          <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />24/7 Sunny bot support</li>
          <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />Member‑only giveaways</li>
        </ul>
      </div>

      <p className="text-md text-gray-700 mb-6 px-4">
        Want to see your <span className="font-semibold text-sunny-orange-dark">specific ISIC discounts</span> and get a <span className="font-semibold text-sunny-orange-dark">fully personalized travel plan</span> from Sunny? Grab your membership!
      </p>

      <motion.button 
        whileHover={{ scale: 1.05 }} 
        className={`${gradientBtn} text-white px-6 py-3 rounded-2xl text-lg shadow-lg`}
        onClick={onSnagMembership}
      >
        Snag our membership with ISIC & save big 💸
      </motion.button>
    </section>
  );
};
