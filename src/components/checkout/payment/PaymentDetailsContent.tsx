
import React from 'react';
import { CardContent } from '@/components/ui/card';
import UserInfoDisplay from './UserInfoDisplay';
import OrderSummaryDisplay from './OrderSummaryDisplay';
import ProceedToPaymentButton from './ProceedToPaymentButton';
import MockStripeForm from './MockStripeForm'; // Import the new mock form
import { BasicDetails } from '@/types/checkout';

interface PaymentDetailsContentProps {
  basicDetails: BasicDetails;
  error: string | null;
  isLoading: boolean;
  onProceedToPayment: () => void; // Renamed to onPay
  showAnimation: boolean; // New prop to control animation display
}

const PaymentDetailsContent: React.FC<PaymentDetailsContentProps> = ({
  basicDetails,
  error,
  isLoading,
  onProceedToPayment, // This is actually onPay
  showAnimation,
}) => {
  return (
    <CardContent className="p-6 md:p-8 space-y-6">
      <UserInfoDisplay details={basicDetails} />
      <OrderSummaryDisplay />
      <MockStripeForm /> {/* Add the mock Stripe form */}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Important</p>
          <p>{error}</p>
        </div>
      )}

      <p className="text-sm text-gray-600">
        Please confirm your details. Clicking "Pay $20" will simulate payment and take you to the next step.
      </p>
      
      {/* Conditionally render button or nothing if animation is showing elsewhere */}
      {!showAnimation && (
         <ProceedToPaymentButton 
            isLoading={isLoading} 
            onClick={onProceedToPayment} 
            showAnimation={showAnimation}
        />
      )}
    </CardContent>
  );
};

export default PaymentDetailsContent;
