
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PositiveOutcomesSection = () => {
  const positiveOutcomes = [
    "You'll finally have clarity and confidence when planning trips, with insider knowledge that makes decision-making effortless",
    "You'll discover authentic, off-the-beaten-path experiences that create meaningful memories you'll treasure forever",
    "You'll effortlessly balance your budget while upgrading your travel experience, knowing exactly where to save and where to splurge",
    "You'll build genuine connections with fellow travelers and locals, creating a supportive network wherever you go",
    "You'll access exclusive student-specific resources and discounts that perfectly match your needs and interests",
    "You'll travel with peace of mind, protected by verified information and expert guidance that keeps you safe and secure"
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#FEF7CD]/40 to-white relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display inline-block bg-[#FEC6A1] px-6 py-2 rounded-lg transform -rotate-1">
              WELL, JUST IMAGINE IF...
            </h2>
          </div>
          
          <ul className="space-y-4 mb-10">
            {positiveOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-[#F97316] text-xl">✓</span>
                <p className="text-lg">{outcome}</p>
              </li>
            ))}
          </ul>
          
          <div className="text-center">
            <Button className="stb-button text-lg flex items-center justify-center gap-2 mx-auto">
              I Want This For My Travels
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-10 bg-[#FEF7CD]/60 p-6 rounded-lg text-center">
            <p className="text-xl md:text-2xl font-bold text-[#F97316]">
              WELL, YOU'RE IN LUCK...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PositiveOutcomesSection;
