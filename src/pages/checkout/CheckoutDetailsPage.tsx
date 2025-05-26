
import React, { useEffect } from 'react';
import CheckoutLayout from '@/components/checkout/CheckoutLayout';
import BasicDetailsForm from '@/components/checkout/BasicDetailsForm';
import { Link } from 'react-router-dom';

const CheckoutDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CheckoutLayout currentStep={1} totalSteps={4}> {/* Updated totalSteps */}
      <Link to="/checkout" className="text-sunny-orange hover:underline mb-6 inline-block">
        &larr; Back to Order Summary
      </Link>
      <h1 className="text-3xl font-display text-sunny-orange-dark mb-6">
        Step 1: Tell Us About You
      </h1>
      <BasicDetailsForm />
    </CheckoutLayout>
  );
};

export default CheckoutDetailsPage;
