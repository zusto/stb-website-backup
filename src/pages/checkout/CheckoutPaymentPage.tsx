import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '@/lib/stripe';

import { PaymentResponse } from '@/components/checkout/payment/StripePaymentForm';
import CheckoutLayout from '@/components/checkout/CheckoutLayout';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { BasicDetails } from '@/types/checkout';
import StripePaymentForm from '@/components/checkout/payment/StripePaymentForm';
import PaymentPageError from '@/components/checkout/payment/PaymentPageError';
import PaymentPageLoading from '@/components/checkout/payment/PaymentPageLoading';
import PaymentSuccessAnimation from '@/components/checkout/payment/PaymentSuccessAnimation';

const CheckoutPaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [basicDetails, setBasicDetails] = useState<BasicDetails | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [showPaymentAnimation, setShowPaymentAnimation] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedDetails = sessionStorage.getItem('stbCheckoutDetails');
    if (storedDetails) {
      try {
        const parsedDetails = JSON.parse(storedDetails);
        setBasicDetails(parsedDetails);
      } catch (e) {
        console.error("Failed to parse details from session storage", e);
        setPageError("Could not retrieve your details. Please go back and try again.");
      }
    } else {
      setPageError("No details found. Please start from the first step.");
    }
  }, []);

  const calculateAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handlePaymentSuccess = async (response: PaymentResponse): Promise<void> => {
    try {
      // Store payment data
      const paymentData = {
        amount: response.amount,
        date: new Date().toISOString(),
        id: response.paymentId,
        transactionId: response.transactionId
      };
      
      // Get student data from checkout details
      const checkoutDetails = sessionStorage.getItem('stbCheckoutDetails');
      if (!checkoutDetails) {
        throw new Error('Your details are missing. Please go back and try again.');
      }

      const studentData = JSON.parse(checkoutDetails);
      console.log('📝 Student data retrieved:', studentData);

      // Calculate age using the existing function
      const age = calculateAge(studentData.dateOfBirth);
      console.log('🎂 Age calculated:', age);

      // Store payment data
      sessionStorage.setItem('stbPaymentData', JSON.stringify(paymentData));
      console.log('💰 Payment data stored:', paymentData);

      // Navigate based on age
      if (age <= 17) {
        console.log('👶 Redirecting to docs (underage)');
        navigate('/checkout/upload-docs', { 
          state: { 
            paymentData,
            verificationStatus: 'Manual'
          }
        });
      } else {
        console.log('🧑 Redirecting to verification (adult)');
        navigate('/checkout/verify');
      }

    } catch (error) {
      console.error('❌ Payment success handler error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Payment processing failed',
        variant: "destructive",
      });
    }
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (pageError) {
    return <PaymentPageError error={pageError} />;
  }

  if (!basicDetails) {
    return <PaymentPageLoading />;
  }

  if (showPaymentAnimation) {
    return <PaymentSuccessAnimation />;
  }

  return (
    <CheckoutLayout currentStep={2} totalSteps={3}>
      <div className="max-w-3xl mx-auto w-full space-y-6">
        {/* Back Link */}
        <Link 
          to="/checkout/details" 
          className="text-sunny-orange hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-sm" />
          Back to Your Details
        </Link>

        {/* Page Title */}
        <h1 className="text-3xl font-display text-sunny-orange-dark">
          Step 2: Secure Payment
        </h1>

        {/* Your Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sunny-orange-dark">Your Information</CardTitle>
          </CardHeader>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium">{basicDetails?.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium">{basicDetails?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{basicDetails?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">
                {basicDetails?.dateOfBirth && formatDate(basicDetails.dateOfBirth)}
              </p>
            </div>
          </div>
        </Card>

        {/* Order Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sunny-orange-dark">Order Summary</CardTitle>
          </CardHeader>
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1"> {/* Changed to flex-col and smaller gap */}
                <span className="font-medium">Student Travel Buddy - FullTimer</span>
                <span className="text-sm text-gray-500">
                  One-time payment for 1-year access
                </span>
              </div>
              <span className="font-bold text-sunny-orange-dark">$20.00</span>
            </div>
          </div>
        </Card>

        {/* Payment Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-sunny-orange-dark" />
              Payment Details
            </CardTitle>
            <CardDescription>
              Complete your payment securely with Stripe
            </CardDescription>
          </CardHeader>
          <div className="p-6">
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                amount={20.00}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                isProcessing={isProcessingPayment}
                setIsProcessing={setIsProcessingPayment}
              />
            </Elements>
          </div>
        </Card>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutPaymentPage;