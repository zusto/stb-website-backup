
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

interface QuizNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
  previousButtonText?: string;
  nextButtonText?: string;
  showPreviousButton?: boolean;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  onPrevious,
  onNext,
  isPreviousDisabled = false,
  isNextDisabled = false,
  previousButtonText = 'Previous',
  nextButtonText = 'Next',
  showPreviousButton = true,
}) => {
  return (
    <CardFooter className="flex justify-between">
      {showPreviousButton ? (
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isPreviousDisabled}
          className="border-[#fdad32] text-[#fe4c02] hover:bg-[#fdad32]/10 rounded-full"
        >
          {previousButtonText}
        </Button>
      ) : (
        <div></div> // Placeholder to keep spacing if previous button is hidden
      )}
      <Button
        className="bg-gradient-to-r from-[#fdad32] to-[#fe4c02] hover:brightness-105 text-white rounded-full"
        onClick={onNext}
        disabled={isNextDisabled}
      >
        {nextButtonText}
      </Button>
    </CardFooter>
  );
};
