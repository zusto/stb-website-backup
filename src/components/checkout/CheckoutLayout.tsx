import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutProgress from './CheckoutProgress';

interface CheckoutLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ children, currentStep, totalSteps }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="my-8 md:my-12 lg:my-16">
            <CheckoutProgress currentStep={currentStep} totalSteps={totalSteps} />
            <div className="mt-8 md:mt-12">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutLayout;
