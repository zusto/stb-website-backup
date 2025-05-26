
import React, { useState, useEffect } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FormData } from './TravelQuizTypes'; // Corrected import path

interface QuizStepEmailProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const QuizStepEmail: React.FC<QuizStepEmailProps> = ({ formData, handleInputChange }) => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (isTouched) {
      setIsValidEmail(/\S+@\S+\.\S+/.test(formData.email));
    }
  }, [formData.email, isTouched]);

  const handleBlur = () => {
    setIsTouched(true);
    setIsValidEmail(/\S+@\S+\.\S+/.test(formData.email));
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl">What's your email?</CardTitle>
        <CardDescription className="font-handwritten text-[#fe4c02]">Question 3 of 4 (Used to send your ISIC card and personalized travel guide offer)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Input
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`border-[#fdad32] rounded-lg ${!isValidEmail && isTouched ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            aria-label="Your email"
            aria-invalid={!isValidEmail && isTouched}
            aria-describedby={!isValidEmail && isTouched ? "email-error" : undefined}
          />
          {!isValidEmail && isTouched && (
            <p id="email-error" className="text-sm text-red-500">Please enter a valid email address.</p>
          )}
        </div>
      </CardContent>
    </>
  );
};

