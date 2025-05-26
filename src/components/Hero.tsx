
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, MapPin, Sun } from 'lucide-react';
import SunnyMascot from './SunnyMascot';
import MiniSignUpForm from './MiniSignUpForm';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  return <section id="hero" className="relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/4 z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 z-0"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div className="inline-block mb-2 md:mb-4 self-center md:self-start">
              <div className="bg-sunny-orange text-white px-4 py-1.5 rounded-full font-medium text-sm shadow-sm sunny-wiggle">
                @STUDENTTRAVELBUDDYOFFICIAL
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display">
              TRAVEL <span className="text-sunny-yellow-dark">BRIGHTER.</span> SPEND <span className="text-sunny-orange">SMARTER.</span>
            </h1>
            
            <p className="text-lg md:text-2xl font-handwritten text-sunny-orange sunny-bounce">
              The ultimate travel sidekick for students - with Sunny by your side!
            </p>
            
            <p className="text-lg">
              Join thousands of students saving on average <span className="font-bold text-sunny-orange">$200+ per week</span> while traveling with our exclusive membership perks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
              <Button className="bg-sunny-gradient text-white font-bold rounded-full px-8 py-6 h-auto shadow-md hover:shadow-lg hover:-translate-y-1 transition-all group" onClick={() => {
              const quizElement = document.getElementById('quiz');
              if (quizElement) {
                quizElement.scrollIntoView({
                  behavior: 'smooth'
                });
              }
            }}>
                Find Your Travel Style
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" className="rounded-full border-sunny-orange text-sunny-orange hover:bg-sunny-orange/10 h-auto py-3 group" onClick={() => {
              const sunshineClubSection = document.getElementById('sunshine-club');
              if (sunshineClubSection) sunshineClubSection.scrollIntoView({
                behavior: 'smooth'
              });
            }}>
                <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" /> Join The Sunshine Club
              </Button>
            </div>

            <div className="flex justify-center md:justify-start items-center gap-3 mt-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-sunny-yellow flex items-center justify-center text-xs">🌞</div>
                <div className="w-8 h-8 rounded-full bg-sunny-orange-light flex items-center justify-center text-xs">✈️</div>
                <div className="w-8 h-8 rounded-full bg-sunny-yellow-dark flex items-center justify-center text-xs">👋</div>
              </div>
              <p className="text-sm">Joined by <span className="font-bold text-sunny-orange">5,000+</span> student travelers</p>
            </div>
            
            {/* Popular Destinations */}
            <div className="mt-4 bg-white/70 backdrop-blur-sm p-3 rounded-2xl shadow-sm hidden md:block">
              <p className="font-medium text-sm mb-2">Popular Student Destinations Trending in 2025:</p>
              <div className="flex flex-wrap gap-2">
                {["Cancún", "Paris", "London", "Rome", "Barcelona", "LA", "NY", "Chicago", "Honolulu", "Dublin", "Tokyo"].map(city => <span key={city} className="bg-sunny-yellow-pale px-2 py-1 rounded-full text-xs flex items-center gap-1 border border-sunny-yellow-light">
                    <MapPin className="h-3 w-3 text-sunny-orange" /> {city}
                  </span>)}
              </div>
            </div>
          </div>
          
          <div className="relative flex flex-col items-center justify-center">
            {/* Top caption text - "You pack the snacks, I'll plan the vibe" */}
            <div className="mb-4 transform -rotate-3 z-10">
              <p className="font-handwritten text-lg text-sunny-orange text-center bg-white/80 px-4 py-2 rounded shadow-sm">
                "You pack the snacks, I'll plan the vibe" ☀️
              </p>
            </div>
            
            {/* Sunny character in smaller white frame */}
            <div className="bg-white/80 p-3 md:p-4 rounded-md shadow-lg transform rotate-2 mb-4">
              <div className="relative">
                <div className="flex justify-center" style={{
                  width: isMobile ? '280px' : '320px',
                  height: isMobile ? '280px' : '320px'
                }}>
                  <SunnyMascot size="xl" travelStyle="fashion" className="sunny-bounce" />
                </div>
              </div>
            </div>
            
            {/* "Meet Sunny" caption below the frame */}
            <div className="mb-6 text-center">
              <p className="font-handwritten text-xl text-gray-800">
                meet SUNNY your new travel BESTIE!
              </p>
            </div>
          </div>
        </div>
        
        {/* Mini signup form moved below the grid */}
        <div className="mt-8 mb-8">
          <MiniSignUpForm />
        </div>
        
        {/* Bottom decorative elements */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm">
            <Sun className="h-5 w-5 text-sunny-yellow-dark sunny-spin" />
            <span className="font-medium text-sunny-orange-dark">Start your sunny adventure today!</span>
          </div>
        </div>
      </div>
    </section>;
};

export default Hero;
