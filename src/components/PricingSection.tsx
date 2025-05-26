import React, { useState, useEffect } from 'react';
import { ArrowRight, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  // State for the countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Effect for countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.days === 0 && prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }
        let newSeconds = prevTime.seconds - 1;
        let newMinutes = prevTime.minutes;
        let newHours = prevTime.hours;
        let newDays = prevTime.days;
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }
        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return <section id="pricing-section" className="py-16 relative">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        {/* Modern Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 sunshine-accent mb-3">
            <Sun className="h-4 w-4" />
            <span>Choose your plan</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display mb-4">MEMBERSHIP OPTIONS</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join the Sunshine Club with our premium plan
          </p>
        </div>

        {/* Pricing Section - Only show FullTimer */}
        <div className="max-w-md mx-auto mb-16">
          {/* Fulltimer Pricing */}
          <div className="pricing-card pricing-card-highlight border-2">
            <div className="pricing-card-accent"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-[#FF7A00]">Full Timer</h3>
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 font-bold">SPECIAL OFFER</Badge>
            </div>
            
            <div className="flex items-baseline mb-2">
              <span className="text-gray-400 line-through mr-2 text-xl">$29</span>
              <span className="text-4xl font-bold text-[#F97316]">$20</span>
              <span className="text-gray-600 ml-1">/year</span>
            </div>
            
            {/* Simplified countdown timer */}
            <div className="flex items-center gap-1 mb-6 text-sm p-2 bg-[#FEF7CD] rounded-lg">
              <Sun className="h-4 w-4 text-[#F97316]" />
              <span>Limited time:</span>
              <span className="countdown-digit">{timeLeft.days.toString().padStart(2, '0')}</span>:
              <span className="countdown-digit">{timeLeft.hours.toString().padStart(2, '0')}</span>:
              <span className="countdown-digit">{timeLeft.minutes.toString().padStart(2, '0')}</span>:
              <span className="countdown-digit">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              Requires verification of full-time student status
            </p>
            
            <Link to="/checkout" className="w-full">
              <Button className="w-full bg-gradient-to-r from-[#FFD600] to-[#FF7A00] hover:brightness-105 text-white font-bold text-lg py-6">Choose Fulltimer</Button>
            </Link>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to join the club?</h2>
          
          {/* Add the sunshine image here */}
          <div className="flex flex-col items-center mb-6">
            <img alt="Sunshine journey: you already have what it takes → soul full of sunshine → shine on" className="max-w-full md:max-w-2xl mx-auto h-auto mb-6" src="/lovable-uploads/6553e5b2-6432-482a-b526-b7cfad42c154.png" />
          </div>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your adventure with fellow students who love to travel smarter, not harder.
          </p>
          
          <div className="flex justify-center">
            <Link to="/checkout">
              <Button className="stb-button text-lg flex items-center gap-2 mx-auto py-3 px-6 md:py-4 md:px-8">
                Join The Sunshine Club
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default PricingSection;
