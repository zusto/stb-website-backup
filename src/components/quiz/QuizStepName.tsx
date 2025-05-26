
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FormData } from './TravelQuizTypes'; // Corrected import path

interface QuizStepNameProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const QuizStepName: React.FC<QuizStepNameProps> = ({ formData, handleInputChange }) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl">What's your name?</CardTitle>
        <CardDescription className="font-handwritten text-[#fe4c02]">Question 1 of 4</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleInputChange}
            className="border-[#fdad32] rounded-lg"
            aria-label="Your name"
          />
        </div>
      </CardContent>
    </>
  );
};

