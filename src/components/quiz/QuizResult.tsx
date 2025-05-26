import React from 'react';
import { Link } from 'react-router-dom';
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, ArrowRight, AlertTriangle } from 'lucide-react';
import { DisplayItinerary } from '../TravelQuiz'; // DisplayItinerary is exported from TravelQuiz.tsx
import { FormData } from './TravelQuizTypes'; // Corrected import for FormData

interface QuizResultProps {
  displayItinerary: DisplayItinerary;
  onReset: () => void;
  // If formData were needed here, it would be:
  // formData: FormData; 
}

export const QuizResult: React.FC<QuizResultProps> = ({ displayItinerary, onReset }) => {
  const descriptionToDisplay = displayItinerary.aiVibeDescription || displayItinerary.vibeDescription;

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl text-[#fe4c02]">{displayItinerary.title}</CardTitle>
        <CardDescription className="font-handwritten text-lg">Based on your answers, we've found your ideal match!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="bg-white p-6 rounded-full shadow-md mb-6 border border-[#fdad32]/30">
          <div className="bg-gradient-to-br from-[#fdad32]/50 to-[#fe4c02]/50 p-6 rounded-full flex items-center justify-center">
            <span className="text-5xl">{displayItinerary.imageEmoji || "🌍"}</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-[#fdad32]">{displayItinerary.city}, {displayItinerary.country}</h3>
        <p className="text-center text-gray-600 mb-6 font-handwritten text-lg">
          {descriptionToDisplay}
        </p>
        {displayItinerary.aiVibeDescription === undefined && (
            <p className="text-xs text-amber-600 mb-4 text-center flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Personalized description unavailable. Showing default.
            </p>
        )}
        {displayItinerary.userDescriptionConsidered && (
          <p className="text-sm text-gray-500 mb-4 italic text-center">
            {displayItinerary.userDescriptionConsidered}
          </p>
        )}
        
        {displayItinerary.mustSee && displayItinerary.mustSee.length > 0 && (
          <div className="bg-[#fff7e0]/70 p-4 rounded-lg w-full mb-6 border border-[#fdad32]/50">
            <p className="font-medium text-center text-[#fe4c02] font-handwritten text-xl">⭐ Student Must-See Spots:</p>
            <ul className="mt-2 space-y-2">
              {displayItinerary.mustSee.map((attraction, index) => (
                <li key={`mustsee-${index}`} className="flex items-center gap-2 justify-center">
                  {typeof attraction.icon === 'string' ? <span>{attraction.icon}</span> : React.cloneElement(attraction.icon as React.ReactElement, { className: "w-5 h-5 text-[#fdad32]" })}
                  <span>{attraction.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-[#ffeea6]/40 p-4 rounded-lg w-full mb-6 border border-[#fdad32]/30">
          <p className="font-medium text-center">Your personalized guide could include:</p>
          <ul className="mt-2 space-y-2">
            {displayItinerary.attractions.map((attraction, index) => (
              <li key={`attraction-${index}`} className="flex items-center gap-2 justify-center">
                {typeof attraction.icon === 'string' ? <span>{attraction.icon}</span> : React.cloneElement(attraction.icon as React.ReactElement, { className: "w-4 h-4"})}
                {attraction.name}
              </li>
            ))}
          </ul>
        </div>
        
        {displayItinerary.estimatedSavings && (
          <div className="flex items-center">
            <div className="bg-[#ffeea6] p-3 rounded-lg">
              <p className="font-handwritten text-[#fe4c02]">
                Estimated savings with ISIC card: <span className="font-bold">{displayItinerary.estimatedSavings}</span>!
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
        <Button 
          className="border-[#fdad32] text-[#fe4c02] hover:bg-[#fdad32]/10 rounded-full w-full sm:w-auto py-3 px-6" 
          variant="outline"
          onClick={onReset}
        >
          <Map className="mr-2 h-4 w-4" /> Try Another Destination
        </Button>
        <Link to="/checkout" className="w-full sm:w-auto">
          <Button 
            className="bg-gradient-to-r from-[#fdad32] to-[#fe4c02] hover:brightness-105 text-white rounded-full w-full py-3 px-6"
          >
            Get Full Guide <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </>
  );
};
