import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

const PaySuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        // Show success message for 7 seconds before processing
        await new Promise(resolve => setTimeout(resolve, 7000));

        // Get stored details
        const storedDetails = localStorage.getItem('stbCheckoutDetails');
        const paymentInitiated = localStorage.getItem('stbPaymentInitiated');

        if (!storedDetails || !paymentInitiated) {
          throw new Error('Payment session expired or invalid');
        }

        // Store payment data
        const paymentData = {
          amount: "20.00",
          date: new Date().toISOString(),
          id: searchParams.get('payment_intent') || 'pi_unknown',
          transactionId: searchParams.get('payment_intent') || 'pi_unknown'
        };

        // Restore session data
        sessionStorage.setItem('stbCheckoutDetails', storedDetails);
        sessionStorage.setItem('stbPaymentData', JSON.stringify(paymentData));

        // Clean up localStorage
        localStorage.removeItem('stbCheckoutDetails');
        localStorage.removeItem('stbPaymentInitiated');

        setIsProcessing(false);

        // Add small delay before redirect to show the "Redirecting..." message
        await new Promise(resolve => setTimeout(resolve, 2000));

        navigate('/checkout/upload-docs', { 
          state: { 
            paymentData,
            verificationStatus: 'Manual'
          }
        });

      } catch (error) {
        console.error('Payment success handling failed:', error);
        toast({
          title: "Error",
          description: "Failed to process payment confirmation",
          variant: "destructive"
        });
        navigate('/checkout/details');
      }
    };

    handlePaymentSuccess();
  }, [navigate, searchParams, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-radialSunny from-[#FFD447] via-[#FFEFE2] to-white bg-grain">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center space-y-6">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-midnight">
              ✅ Payment Successful!
            </h1>
            <div className="space-y-3">
              <p className="text-lg font-medium text-sunny-orange">
                You're officially in, sunshine! 🌞✈️
              </p>
              <p className="font-medium text-midnight mt-4">
                🚨 Next step: Let's verify your student status to unlock your digital ISIC card.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sunny-orange mt-6">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
            <span className="text-sm">
              {isProcessing ? "Processing your verification..." : "Redirecting to verification..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaySuccessPage;