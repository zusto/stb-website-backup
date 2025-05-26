
import React from 'react';
import { Play } from 'lucide-react';

const VideoSection = () => {
  return (
    <section className="py-16 bg-white relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Countdown Timer */}
          <div className="bg-[#FEC6A1]/30 p-4 rounded-lg mb-8 inline-block">
            <p className="font-bold text-[#F97316]">Special Launch Offer Ends In:</p>
            <div className="flex gap-4 justify-center mt-2">
              <div className="bg-white p-2 rounded-lg w-16">
                <p className="text-2xl font-bold text-[#F97316]">02</p>
                <p className="text-xs">Days</p>
              </div>
              <div className="bg-white p-2 rounded-lg w-16">
                <p className="text-2xl font-bold text-[#F97316]">18</p>
                <p className="text-xs">Hours</p>
              </div>
              <div className="bg-white p-2 rounded-lg w-16">
                <p className="text-2xl font-bold text-[#F97316]">45</p>
                <p className="text-xs">Minutes</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-display mb-6">
            See how Sunny transformed student travel for thousands like you
          </h2>
          
          {/* Video Placeholder */}
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 p-4 rounded-full cursor-pointer hover:bg-white transition-colors">
                <Play className="h-12 w-12 text-[#F97316]" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <p className="text-sm bg-white/80 px-2 py-1 rounded">1:45</p>
            </div>
          </div>
          
          <p className="text-lg italic text-gray-600 max-w-2xl mx-auto">
            "In this quick video, Dominika explains how Student Travel Buddy started from her own travel struggles and grew into a community that's saving students money while creating authentic experiences."
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
