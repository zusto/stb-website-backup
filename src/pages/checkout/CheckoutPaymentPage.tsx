import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CreditCard, ArrowLeft } from 'lucide-react';

import CheckoutLayout from '@/components/checkout/CheckoutLayout';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BasicDetails } from '@/types/checkout';
import PaymentPageError from '@/components/checkout/payment/PaymentPageError';
import PaymentPageLoading from '@/components/checkout/payment/PaymentPageLoading';
import { trackEvent as trackGAEvent } from '@/utils/analytics';
import { trackEvent as trackPixelEvent } from '@/utils/metaPixel';

const CheckoutPaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [basicDetails, setBasicDetails] = useState<BasicDetails | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);

  useEffect(() => {
    // Store checkout details in localStorage instead of sessionStorage
    // This ensures data persists after redirect from Stripe
    const storedDetails = sessionStorage.getItem('stbCheckoutDetails');
    if (storedDetails) {
      try {
        const parsedDetails = JSON.parse(storedDetails);
        setBasicDetails(parsedDetails);
        // Store in localStorage for persistence
        localStorage.setItem('stbCheckoutDetails', storedDetails);
      } catch (e) {
        console.error("Failed to parse details", e);
        setPageError("Could not retrieve your details. Please try again.");
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

  const handleStripeRedirect = () => {
    // Track payment initiation in both GA and Meta Pixel
    trackGAEvent('Checkout', 'InitiateCheckout');
    trackPixelEvent('InitiateCheckout', {
      content_name: 'Student Travel Buddy - FullTimer',
      value: 20.00,
      currency: 'USD'
    });
    
    localStorage.setItem('stbPaymentInitiated', new Date().toISOString());
    
    
    // Add both success and cancel URLs
    window.location.href = `https://buy.stripe.com/14AbJ3faaeku73V8iF3AY00?client_reference_id=${basicDetails?.email}&prefilled_email=${basicDetails?.email}&success_url=${encodeURIComponent(`${window.location.origin}/checkout/payment/success`)}&cancel_url=${encodeURIComponent(`${window.location.origin}/checkout/payment/cancel`)}`;
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
              Click below to complete your payment securely with Stripe
            </CardDescription>
          </CardHeader>
          <div className="p-6">
            <button
              onClick={handleStripeRedirect}
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Join & Save Now - $20
            </button>
          </div>
        </Card>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutPaymentPage;