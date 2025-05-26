
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormData } from './TravelQuizTypes'; // Corrected import path

interface QuizStepHolidayTypeProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleRadioChange: (value: string) => void; // This function should update 'vibe'
}

export const QuizStepHolidayType: React.FC<QuizStepHolidayTypeProps> = ({ formData, handleInputChange, handleRadioChange }) => {
  const holidayOptions = [
    { value: "sun-beach", label: "Beach & Relaxation", emoji: "🏖️" }, // These values should match Q2_VIBES if used with TravelQuiz's 'vibe'
    { value: "cultural", label: "Cultural Exploration", emoji: "🏛️" },
    { value: "educational", label: "Educational", emoji: "📚" },
    { value: "adventure", label: "Adventure & Sports", emoji: "🧗‍♀️" },
  ];

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl">What's your travel style?</CardTitle>
        <CardDescription className="font-handwritten text-[#fe4c02]">Question 4 of 4</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup className="space-y-3" value={formData.vibe} onValueChange={handleRadioChange}> {/* Changed formData.holidayType to formData.vibe */}
          {holidayOptions.map(option => (
            <div key={option.value} className="flex items-center space-x-2 border border-[#fdad32]/30 rounded-lg p-4 hover:bg-[#ffeea6]/20 transition-colors cursor-pointer">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="w-full cursor-pointer flex items-center gap-2">
                <span className="text-xl">{option.emoji}</span> {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="mt-6 space-y-2">
          <Label htmlFor="idealTripDescription" className="font-handwritten text-[#fe4c02] text-md">
            Or describe your ideal trip for a vibe match (optional):
          </Label>
          <Textarea
            id="idealTripDescription"
            name="idealTripDescription" // This name should match a key in FormData if handleInputChange updates based on name
            placeholder="E.g., 'Looking for hidden cafes, art galleries, and local music scenes...'"
            value={formData.idealTripDescription || ''} // Accessing the new optional field
            onChange={handleInputChange}
            className="border-[#fdad32] rounded-lg min-h-[100px]"
          />
        </div>
      </CardContent>
    </>
  );
};

