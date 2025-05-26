import React, { useState } from "react";
import { motion } from "framer-motion";
import SunnyMascot from "@/components/SunnyMascot";
import { destinations as travelDestinationsData } from "@/data/destinationsList";
import { calculateQuizResults } from "./quiz/TravelQuizLogic.tsx";
import { 
  SUNNY_IMG, 
  Q2_VIBES, 
  Q3_STYLE, 
  Q4_CATEGORIES, 
  Q5_GROUP, 
  gradientBtn,
  ALL_AVAILABLE_DESTINATIONS 
} from "./quiz/TravelQuizConstants";
import { TravelQuizStep0NameEmail } from "./quiz/steps/TravelQuizStep0NameEmail";
import { TravelQuizStep1Destination } from "./quiz/steps/TravelQuizStep1Destination";
import { TravelQuizStep2Vibe } from "./quiz/steps/TravelQuizStep2Vibe";
import { TravelQuizStep3Style } from "./quiz/steps/TravelQuizStep3Style";
import { TravelQuizStep4Categories } from "./quiz/steps/TravelQuizStep4Categories";
import { TravelQuizStep5Group } from "./quiz/steps/TravelQuizStep5Group";
import { TravelQuizResultsView } from "./quiz/TravelQuizResultsView";
import { FormData as TravelQuizFormData, TravelQuizCalculatedResults } from "./quiz/TravelQuizTypes";
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

// ---------- TYPE DEFINITIONS ----------
// FormData is now TravelQuizFormData to avoid conflict if any other FormData type is used locally.
// These types like DisplayItinerary would ideally also be in TravelQuizTypes.ts
import { Attraction as ImportedAttraction } from '@/types/travel';

export interface DisplayItinerary {
  title?: string;
  imageEmoji?: string;
  city?: string;
  country?: string;
  aiVibeDescription?: string;
  vibeDescription?: string;
  userDescriptionConsidered?: string;
  mustSee?: ImportedAttraction[];
  attractions?: ImportedAttraction[];
  estimatedSavings?: string;
}

// ---------- COMPONENT ----------
export default function TravelQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<TravelQuizFormData>({ name: "", email: "", dest: "", vibe: "", style: Q3_STYLE[1], cats: [], group: Q5_GROUP[0], idealTripDescription: "" });
  const [calculatedResults, setCalculatedResults] = useState<TravelQuizCalculatedResults | null>(null);

  const update = (key: keyof TravelQuizFormData, val: string | string[]) => setAnswers((prev) => ({ ...prev, [key]: val }));
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  // ---------- VALID ----------
  const valid = () => {
    if (step === 0) return answers.name && /.+@.+\..+/.test(answers.email);
    if (step === 1) return !!answers.dest;
    if (step === 2) return !!answers.vibe;
    if (step === 3) return !!answers.style;
    // Step 4 (categories) can be empty, Step 5 (group size) has a default
    return true;
  };

  const handleShowResults = async () => {
    try {
      console.log('🎯 Starting quiz submission...', answers);
      const results = calculateQuizResults(answers);
      
      // Debug log to check cats structure
      console.log('📋 Categories before processing:', answers.cats);

      // Force categories to be an array
      let categories = [];
      if (answers.cats) {
        categories = Array.isArray(answers.cats) ? [...answers.cats] : [];
      }

      // Debug log after array conversion
      console.log('📋 Categories after processing:', categories);
      
      const formattedAnswers = {
        name: answers.name || '',
        email: answers.email || '',
        dest: answers.dest || '',
        vibe: answers.vibe || '',
        style: answers.style || '',
        group: answers.group || 'Solo',
        cats: categories.length > 0 ? categories.join(';') : '' // Handle empty array case
      };

      // Debug log formatted data
      console.log('📊 Formatted answers:', formattedAnswers);

      const response = await axios.post('http://localhost:3000/api/quiz/submit', {
        answers: formattedAnswers,
        calculations: {
          base: results.base,
          saveTotal: results.saveTotal
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 5000
      });

      console.log('✅ Server response:', response.data);

      if (response.data.success) {
        setCalculatedResults(results);
        setStep(6);
        toast({
          title: "Success!",
          description: "Your quiz results have been saved",
        });
      }
    } catch (error) {
      // Detailed error logging
      if (axios.isAxiosError(error)) {
        console.error('❌ Network error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
      } else {
        console.error('❌ Unexpected error:', error);
      }

      // Still show results even if API fails
      const results = calculateQuizResults(answers);
      setCalculatedResults(results);
      setStep(6);
      
      toast({
        title: "Error",
        description: "Failed to save your results",
        variant: "destructive"
      });
    }
  };
  
  const handleSnagMembership = () => {
    const membershipDetailsSection = document.getElementById('membership-details-section');
    if (membershipDetailsSection) {
      membershipDetailsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn("Membership details section with ID 'membership-details-section' not found for scroll.");
    }
  };

  // ---------- RESULTS ----------
  if (step === 6 && calculatedResults) {
    // const heroImg = getDestData(answers.dest).img; // No longer needed
    return (
      <TravelQuizResultsView 
        answers={answers}
        calculatedResults={calculatedResults}
        // heroImg={heroImg} // Prop removed
        onSnagMembership={handleSnagMembership}
      />
    );
  }

  // ---------- QUESTIONS ----------
  const renderStep = () => {
    switch (step) {
      case 0:
        return <TravelQuizStep0NameEmail answers={answers} update={update} />;
      case 1:
        return <TravelQuizStep1Destination answers={answers} update={update} />;
      case 2:
        return <TravelQuizStep2Vibe answers={answers} update={update} />;
      case 3:
        return <TravelQuizStep3Style answers={answers} update={update} />;
      case 4:
        return <TravelQuizStep4Categories answers={answers} update={update} />;
      case 5:
        return <TravelQuizStep5Group answers={answers} update={update} />;
      default:
        return null;
    }
  };

  return (
    <section className="bg-gradient-to-br from-sunny-yellow-pale to-sunny-yellow-light p-6 rounded-2xl shadow-xl max-w-xl mx-auto text-center">
      {step < 6 && (
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            {/* Updated SunnyMascot to include withText and message */}
            <SunnyMascot 
              size="lg" 
              travelStyle="adventure" 
              withText 
              message="Let's find your ideal destination! 🌍" 
            />
          </div>
          <h1 className="text-3xl font-bold text-sunny-orange-dark mb-2">
            Ready for an Adventure? 🚀
          </h1>
          <p className="text-md text-gray-700">
            Answer a few Q's to find your perfect trip & unlock sweet ISIC savings! ✨
          </p>
        </div>
      )}
      {renderStep()}
      <div className="flex justify-between mt-6">
        {step > 0 && step < 6 && <button className="text-sunny-orange underline" onClick={back}>← Back</button>}
        {step < 6 && (
          <button 
            disabled={!valid()} 
            onClick={step === 5 ? handleShowResults : next} 
            className={`${gradientBtn} text-white px-4 py-2 rounded-2xl disabled:opacity-40 ml-auto`}
          >
            {step === 5 ? "Show Me the Savings →" : "Next →"}
          </button>
        )}
      </div>
    </section>
  );
}
