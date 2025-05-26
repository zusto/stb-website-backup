import React from 'react';
import { Globe, Star, Camera, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StarDust from '@/components/effects/StarDust';

const Ambassador = () => {
  return (
    <section id="ambassador" className="py-16 bg-gradient-to-t from-[#FEF7CD]/60 to-white relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        {/* "AMBASSADORS" HEADER */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-[#F97316] mb-3">
            <UsersRound className="h-5 w-5" />
            <span>Meet Our Stars</span>
          </div>
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-display mb-4 relative z-10 bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FDAD32] text-transparent drop-shadow-sm animate-pulse-gentle">
              AMBASSADORS
            </h2>
            
            <StarDust className="-top-4 -left-2" />
            <StarDust className="-top-2 -right-3" />
            <StarDust className="bottom-0 left-1/4" />
            <StarDust className="top-1/2 right-1/4" />
            <StarDust className="bottom-2 right-10" />
            
            <span className="absolute -top-6 right-0 text-yellow-300 animate-float">✨</span>
            <span className="absolute -bottom-4 left-4 text-yellow-400 animate-bounce-subtle">⭐</span>
            <span className="absolute top-1/3 -right-8 text-yellow-300 animate-spin-slow text-sm">✨</span>
            
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-orange-300/20 blur-lg -z-10 transform scale-110"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="flex flex-col h-full">
            <img alt="When you can't find the sunshine, be the sunshine" className="rounded-lg shadow-lg transform rotate-3" src="/lovable-uploads/4e8ca135-6b1c-4114-955b-e29bc9a85a77.png" />
            <div className="mt-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-display text-[#F97316] mb-4">Ambassador Program</h3>
              <p className="text-xl mb-2">
                Are you an experienced student traveler or do you want to encourage others to travel? <Globe className="inline h-5 w-5 text-[#F97316]" />
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-[#FEF7CD]/40 p-6 rounded-lg border border-[#FEC6A1]/30 transform -rotate-1">
              <h3 className="text-2xl font-handwritten text-[#F97316] mb-4">The Sunshine Leaders</h3>
              
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-[#F97316] shrink-0 mt-1" />
                  <p>As a sunshine leader you will be in charge of a specific city or in some cases country</p>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-[#F97316] shrink-0 mt-1" />
                  <p>You will have creative freedom to organize community events and meet ups</p>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-[#F97316] shrink-0 mt-1" />
                  <p>You will share reels/pictures/tips</p>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-[#F97316] shrink-0 mt-1" />
                  <p>You can get warm CV referral</p>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-[#F97316] shrink-0 mt-1" />
                  <p>Help create new local and relevant deals for students</p>
                </li>
              </ul>

              <div className="mt-8 bg-white p-4 rounded-lg">
                <p className="font-medium text-gray-800">Get your membership free and get paid for sustaining and growing your sunshine local group</p>
                <p className="mt-2 font-medium text-gray-800">Get direct connection with the core team of Student Travel Buddy</p>
              </div>

              <div className="mt-6 flex justify-end">
                <div className="inline-block bg-[#FEF7CD] p-3 rounded-lg shadow-lg transform rotate-12">
                  <p className="font-handwritten text-[#F97316]">APPLY NOW</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-lg border border-[#FEC6A1]/30">
              <h4 className="font-bold text-lg text-[#F97316] mb-3">When You Focus on the Good, the Good Gets Better</h4>
              <p className="text-gray-700">Join a global network of student travel enthusiasts making cultural exchange and international friendship accessible to everyone.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 md:mt-16 w-full">
          <Link to="/ambassador-application">
            <Button className="stb-button flex items-center gap-2 bg-[#F97316] hover:bg-[#fe4c02] text-white font-bold text-base sm:text-lg md:text-xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 rounded-full transform hover:scale-105 transition-transform">
              <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
              Become our ambassador today! Apply here
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Ambassador;
