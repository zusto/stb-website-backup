import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const CtaPricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<'upfront' | 'payment-plan'>('upfront');
  
  const benefits = [
    "Official ISIC Student Card with worldwide discounts",
    "Full access to all travel modules and courses",
    "City WhatsApp groups and student community",
    "24/7 travel support and emergency assistance",
    "Hidden gems maps and local recommendations",
    "Bi-weekly community calls and networking",
    "Seasonal group trips with special rates (optional)",
    "Lifetime access to all resources and updates"
  ];
  
  return (
    <section className="py-16 relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#F97316] px-6 py-2 rounded-lg transform -rotate-1 mb-6">
            <h2 className="text-3xl md:text-4xl font-display text-white mb-0">
              JOIN THE SUNSHINE CLUB TODAY
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Don't waste money on tourist traps or miss out on the authentic student travel experience you deserve
          </p>
          
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-[#FEC6A1]/20 mb-10">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8">
              <button 
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${selectedPlan === 'upfront' ? 'bg-[#FEC6A1]/30 border-[#F97316]' : 'bg-white border-[#FEC6A1] hover:border-[#F97316]/70'}`}
                onClick={() => setSelectedPlan('upfront')}
              >
                <h3 className="text-lg md:text-xl font-bold mb-1">UPFRONT PAYMENT (SAVE 10%)</h3>
                <p className="text-2xl md:text-3xl font-bold text-[#F97316] mb-2">$99</p>
                <p className="text-sm text-gray-600">One-time payment</p>
              </button>
              
              <button 
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${selectedPlan === 'payment-plan' ? 'bg-[#FEC6A1]/30 border-[#F97316]' : 'bg-white border-[#FEC6A1] hover:border-[#F97316]/70'}`}
                onClick={() => setSelectedPlan('payment-plan')}
              >
                <h3 className="text-lg md:text-xl font-bold mb-1">PAYMENT PLAN</h3>
                <p className="text-2xl md:text-3xl font-bold text-[#F97316] mb-2">$55 × 2</p>
                <p className="text-sm text-gray-600">Two monthly payments</p>
              </button>
            </div>
            
            <div className="mb-8 text-left">
              <h3 className="font-bold text-lg md:text-xl mb-4">Everything You'll Get:</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start md:items-center gap-3">
                    <Check className="h-5 w-5 text-[#F97316] shrink-0 mt-1 md:mt-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-3 bg-[#FEF7CD]/60 rounded-lg">
                <p className="font-handwritten text-[#F97316] text-center md:text-left">
                  "Don't forget! Your ISIC card alone can save you $200+ on a typical trip."
                </p>
              </div>
            </div>
            
            <Link to="/checkout" className="w-full">
              <Button className="w-full stb-button text-lg flex items-center justify-center gap-2 py-3 px-6 md:py-4 md:px-8">
                <UserRound className="h-5 w-5" />
                Get Started with {selectedPlan === 'upfront' ? 'Upfront Payment' : 'Payment Plan'}
              </Button>
            </Link>
            
            <p className="text-center text-sm text-gray-600 pt-4">
              <span className="font-handwritten text-base">Limited offer!</span> Only 24 spots remaining at this price
            </p>
          </div>
          
          <div className="bg-[#FEF7CD]/40 p-4 rounded-lg inline-block">
            <p className="text-[#F97316] font-medium">
              Important: After checkout, you'll need to verify your student status to activate your ISIC card
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaPricingSection;
