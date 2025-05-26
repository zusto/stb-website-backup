
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SunnyMascot from '@/components/SunnyMascot';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-20 relative">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative" style={{ width: '150px', height: '150px' }}>
              <SunnyMascot size="lg" travelStyle="fashion" className="sunny-bounce" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-display mb-6 transform -rotate-1">
            WELCOME! SAY HELLO TO YOUR STUDENT TRAVEL COMPANION
          </h1>
          
          <div className="space-y-3 mb-6">
            <p className="text-lg md:text-xl text-[#F97316]">
              Tired of overpriced tourist traps and finding yourself alone in unfamiliar places?
            </p>
            <p className="text-lg md:text-xl text-[#F97316]">
              Ready to explore the world authentically while saving money as a student?
            </p>
            <p className="text-lg md:text-xl text-[#F97316]">
              Want a travel buddy who gets both your budget AND your vibe?
            </p>
          </div>
          
          <div className="flex justify-center mb-6">
            <Button className="stb-button text-lg flex items-center justify-center gap-2 mx-auto">
              Join The Sunshine Club
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 md:gap-8">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#F97316]">5,000+</p>
              <p className="text-xs md:text-sm text-gray-600">Happy Students</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#F97316]">30+</p>
              <p className="text-xs md:text-sm text-gray-600">Countries Covered</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#F97316]">$200</p>
              <p className="text-xs md:text-sm text-gray-600">Avg. Weekly Savings</p>
            </div>
            
            <div className="flex justify-center items-center gap-4 md:gap-6">
              <img src="/lovable-uploads/fce2b689-f403-4f89-9f79-0091c0c3be6f.png" alt="ISIC Logo" className="h-8 md:h-12 object-contain" />
              <img src="/lovable-uploads/43eabef1-8bb9-46f7-b153-0a0c02087110.png" alt="UNESCO Logo" className="h-6 md:h-10 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
