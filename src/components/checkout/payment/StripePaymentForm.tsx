import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

// Export the interface
export interface PaymentResponse {
  amount: string;
  paymentId: string;
  transactionId: string;
  date: string;
}

interface StripePaymentFormProps {
  amount: number;
  onPaymentSuccess: (response: PaymentResponse) => Promise<void>;
  onPaymentError: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError,
  isProcessing,
  setIsProcessing
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:3000/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (paymentError) {
        onPaymentError(paymentError.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        console.log('💳 Payment Intent:', paymentIntent); // Add this log
        
        const paymentResponse: PaymentResponse = {
          amount: (paymentIntent.amount / 20).toString(),
          paymentId: paymentIntent.id,           // Make sure this is populated
          transactionId: paymentIntent.id,       // Make sure this is populated
          date: new Date().toISOString()
        };
        
        console.log('📤 Payment Response:', paymentResponse); // Add this log
        await onPaymentSuccess(paymentResponse);
      }
    } catch (error) {
      onPaymentError('An error occurred during payment processing');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? 'Processing...' : `Pay ${amount.toFixed(2)} USD`}
      </Button>
    </form>
  );
};

export default StripePaymentForm;