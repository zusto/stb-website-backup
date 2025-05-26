
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Camera } from 'lucide-react';

const Ambassadors = () => {
  return (
    <section id="ambassadors" className="py-16 bg-gradient-to-b from-[#FEF7CD]/30 to-white relative overflow-hidden">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <div className="polaroid transform rotate-2 shadow-xl max-w-md mx-auto">
              <img 
                src="/lovable-uploads/38c8baea-c639-49d2-8de8-d70bfadeee89.png" 
                alt="When you can't find the sunshine, be the sunshine" 
                className="retro-filter"
              />
              <p className="text-center font-handwritten text-[#F97316] pt-2">Summer '25 memories ☀️</p>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="transform -rotate-1">
              <h2 className="text-3xl md:text-4xl font-display mb-4 inline-block bg-[#FEC6A1]/60 px-6 py-2 rounded-lg">
                AMBASSADOR PROGRAM
              </h2>
            </div>
            
            <div className="flex items-center mb-6 mt-4">
              <p className="text-xl font-handwritten text-[#F97316]">
                Are you an experienced student traveler or do you want to encourage others to travel?
              </p>
              <Globe className="ml-2 h-6 w-6 text-[#F97316] animate-bounce-light" />
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md mb-8 transform rotate-1 border border-[#FEC6A1]/40">
              <h3 className="text-xl font-bold mb-4 text-[#F97316]">Share Your Journey. Inspire Others.</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#F97316] font-bold">•</span>
                  <span>Share your travel experiences with fellow students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97316] font-bold">•</span>
                  <span>Build a community of like-minded explorers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97316] font-bold">•</span>
                  <span>Get exclusive ambassador perks and rewards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97316] font-bold">•</span>
                  <span>Access to special events and networking opportunities</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <Button className="bg-[#F97316] hover:bg-[#fe4c02] text-white font-bold text-lg px-8 py-6 rounded-full transform rotate-1 flex items-center gap-2">
                <Camera className="h-5 w-5" /> Join The Program
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <img 
            src="/lovable-uploads/1d39cf1b-6f89-4e28-8f7d-accc791146e8.png" 
            alt="Join" 
            className="h-20 mx-auto mb-4 transform -rotate-3"
          />
          <p className="text-lg italic font-handwritten text-[#F97316]">Become part of our global sunshine community!</p>
          
          {/* Add decorative elements */}
          <div className="absolute bottom-10 right-10 hidden md:block">
            <div className="bg-[#FEF7CD] p-4 rounded-full shadow-lg transform rotate-12">
              <span className="text-2xl">🌞</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ambassadors;
