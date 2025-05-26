
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FormData } from './TravelQuizTypes'; // Corrected import path

interface QuizStepDestinationProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const QuizStepDestination: React.FC<QuizStepDestinationProps> = ({ formData, handleInputChange }) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl">What city are you traveling to?</CardTitle>
        <CardDescription className="font-handwritten text-[#fe4c02]">Question 2 of 4 (Or type "SURPRISE ME")</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Input
            type="text"
            name="dest" // Changed from "destination"
            placeholder="Destination city or type 'SURPRISE ME'"
            value={formData.dest} // Changed from formData.destination
            onChange={handleInputChange}
            className="border-[#fdad32] rounded-lg"
            aria-label="Destination city"
          />
        </div>
      </CardContent>
    </>
  );
};

