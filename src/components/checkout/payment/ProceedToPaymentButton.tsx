
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ProceedToPaymentButtonProps {
  isLoading: boolean;
  onClick: () => void;
  showAnimation?: boolean; // Added to control animation state text if needed
}

const ProceedToPaymentButton: React.FC<ProceedToPaymentButtonProps> = ({ isLoading, onClick, showAnimation }) => {
  return (
    <Button 
      onClick={onClick} 
      disabled={isLoading || showAnimation} // Disable if loading or animation is showing
      className="w-full stb-button text-lg py-3 mt-4"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : showAnimation ? (
        'Payment Successful!' // Or some other indicator during animation
      ) : (
        'Pay $20'
      )}
      {!isLoading && !showAnimation && <ArrowRight className="ml-2 h-5 w-5" />}
    </Button>
  );
};

export default ProceedToPaymentButton;
