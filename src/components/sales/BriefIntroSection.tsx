
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sun } from 'lucide-react';

const BriefIntroSection = () => {
  return (
    <section className="py-16 relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#FEC6A1] px-6 py-2 rounded-lg transform -rotate-1 mb-6 flex items-center justify-center">
            <Sun className="h-6 w-6 text-[#F97316] mr-2" />
            <h2 className="text-3xl md:text-4xl font-display mb-0">
              INTRODUCING THE SUNSHINE CLUB
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-[#F97316] mb-8 max-w-3xl mx-auto">
            A proven system to take student travelers from lost and overspending to confident and savvy – all with your unproblematic, worldly bestie ☀️ by your side
          </p>
          
          <Button className="stb-button text-lg flex items-center justify-center gap-2 mx-auto">
            Join The Sunshine Club
            <ArrowRight className="h-5 w-5" />
          </Button>
          
          <div className="mt-12">
            <img 
              src="/lovable-uploads/9aa14dc9-3d1b-4cd1-9028-93d4a960f2b2.png" 
              alt="Join The Sunshine Club" 
              className="mx-auto max-w-sm md:max-w-md rounded-lg shadow-lg transform -rotate-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BriefIntroSection;
