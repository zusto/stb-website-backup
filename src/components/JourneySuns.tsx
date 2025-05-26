import React, { useState, useEffect } from 'react';
import { ArrowRight, Sun } from 'lucide-react';
import SunnyMascot from './SunnyMascot';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';
const JourneySuns = () => {
  // State to track the active step
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useIsMobile();

  // Auto-advance steps every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => prev === 3 ? 0 : prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Journey steps with orange/yellow colors and standardized text lengths
  const steps = [{
    title: "JOIN",
    desc: "Get verified student status & ISIC card",
    emoji: "🎓",
    color: "bg-gradient-to-br from-[#FFD600] to-[#FF7A00]",
    icon: "sun"
  }, {
    title: "PLAN",
    desc: "Access discounts & custom itineraries",
    emoji: "🗺️",
    color: "bg-gradient-to-br from-[#FF9900] to-[#FF7A00]",
    icon: "sun"
  }, {
    title: "TRAVEL",
    desc: "Explore new places with confidence",
    emoji: "✈️",
    color: "bg-gradient-to-br from-[#FFCC00] to-[#FF5500]",
    icon: "sun"
  }, {
    title: "SHARE",
    desc: "Connect with students worldwide",
    emoji: "👋",
    color: "bg-gradient-to-br from-[#FFB347] to-[#FF7A00]",
    icon: "sun"
  }];

  // Get appropriate message based on the active step
  const getMascotMessage = () => {
    switch (activeStep) {
      case 0:
        return "Start your journey 🎓";
      case 1:
        return "Let's plan 🗺️";
      case 2:
        return "Adventure awaits ✈️";
      case 3:
        return "Share your experiences 👋";
      default:
        return "Let's go! ☀️";
    }
  };
  return <div className="mb-20 md:mb-24 max-w-4xl mx-auto py-6 px-4 relative overflow-hidden">
      {/* Enhanced background pattern for more visual interest */}
      <div className="absolute inset-0 sunny-dot-pattern opacity-10 z-0"></div>
      
      <div className="text-center mb-8 relative z-10">
        <h3 className="sunny-heading text-2xl md:text-3xl font-bold mb-3 tracking-wide">
          YOUR TRAVEL JOURNEY
        </h3>
        <p className="text-[#1e1e1e]/70 mb-2 max-w-md mx-auto">How The Sunshine Club works in 4 simple steps</p>
        
        
        {/* Added wave divider right under the heading */}
        
      </div>
      
      {/* Added increased padding-top on mobile to better accommodate the mascot */}
      <div className="relative pt-20 md:pt-4">
        {/* Sun path - enhanced connecting line with gradient */}
        <div className="absolute top-14 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFD600] via-[#FF9900] to-[#FF7A00] rounded-full shadow-sm"></div>
        
        {/* Journey steps with improved spacing and interactive elements */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => <div key={index} className={`flex flex-col items-center relative z-10 w-1/4 py-5 transition-all duration-300 ${activeStep === index ? 'transform scale-105' : ''}`}>
              <div className={`journey-sun h-12 w-12 md:h-16 md:w-16 mb-4 cursor-pointer transition-all duration-300 hover:scale-110`} onClick={() => setActiveStep(index)}>
                <div className={`journey-sun-icon h-full w-full ${step.color} ${activeStep === index ? 'shine-bigger' : ''} 
                    text-lg font-bold text-white flex items-center justify-center rounded-full
                    ${activeStep !== index ? 'opacity-80 hover:opacity-100' : ''}`}>
                  <Sun className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-white ${activeStep === index ? 'sunny-pulse' : ''}`} />
                  
                  {/* ISIC logo for the first step only with improved positioning */}
                  {index === 0 && <div className={`absolute ${isMobile ? '-bottom-6 -right-6 w-14 h-14' : '-bottom-8 -right-8 w-20 h-20'} flex items-center justify-center sunny-bounce`}>
                      <img src="/lovable-uploads/6006eeef-3bc0-4c25-ac79-febaff57500f.png" alt="ISIC Logo" className="w-full h-full object-contain" style={{
                  filter: "drop-shadow(0 0 3px rgba(255,255,255,0.9))"
                }} />
                    </div>}
                </div>
              </div>
              
              <div className={`text-center transition-all duration-500 ${activeStep === index ? 'opacity-100' : 'opacity-70'}`}>
                <h4 className="font-bold text-base md:text-xl mb-1">{step.title}</h4>
                <p className="text-xs md:text-sm max-w-[100px] md:max-w-[140px] mx-auto leading-tight">{step.desc}</p>
              </div>
              
              {/* Enhanced arrow between steps */}
              {index < steps.length - 1 && <div className="hidden md:flex absolute -right-3 top-14 transform -translate-y-1/2 z-0 sunny-pulse" style={{
            animationDelay: `${index * 0.5}s`
          }}>
                  <ArrowRight className="h-6 w-6 text-[#FF7A00]" />
                </div>}
            </div>)}
        </div>
        
        {/* Sunny mascot positioned at the active step with sunny-float animation and text positioned near hand */}
        <div className={`absolute transition-all duration-500 ease-in-out z-20 sunny-float ${isMobile ? 'w-full flex justify-center' : ''}`} style={{
        left: isMobile ? '0' : `calc(${activeStep * 25}% + 8%)`,
        top: isMobile ? '-45px' : '-40px',
        transform: isMobile ? 'none' : 'translateX(-50%)'
      }}>
          {/* Use the surfing Sunny mascot image with better animations */}
          <div className="relative">
            <img src="/lovable-uploads/6f9cda72-0b19-42a8-b4b8-d9dc5ef40816.png" alt="Sunny mascot surfing" className={`w-auto ${isMobile ? 'h-20' : 'h-24'} object-contain transition-transform hover:scale-105 duration-300`} style={{
            filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))"
          }} />
            
            {/* Text-only message positioned right next to Sunny's hand, with improved wrapping support */}
            <div className="absolute font-handwritten text-sunny-orange text-sm md:text-base leading-tight" style={{
            zIndex: 30,
            textAlign: 'center',
            // Further optimized positioning to be right next to Sunny's hand
            top: isMobile ? '15px' : '18px',
            right: isMobile ? '-90px' : '-105px',
            maxWidth: isMobile ? '80px' : '90px',
            textShadow: '0 1px 2px rgba(255,255,255,0.5)'
          }}>
              {getMascotMessage()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced SVG rays with better animations - THIS BLOCK IS REMOVED
       <div className="hidden md:block">
        <svg className="absolute left-0 right-0 top-8 w-full" xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 0 800 100" style={{
        zIndex: -1
       }}>
          <path className="sun-ray sun-ray-delay-1" d="M50,50 C150,20 250,80 350,50" stroke="#FFD600" strokeWidth="2" fill="none" />
          <path className="sun-ray" d="M150,50 C250,10 350,90 450,50" stroke="#FF9900" strokeWidth="2" fill="none" />
          <path className="sun-ray sun-ray-delay-2" d="M250,50 C350,20 450,80 550,50" stroke="#FFB347" strokeWidth="2" fill="none" />
          <path className="sun-ray" d="M350,50 C450,10 550,90 650,50" stroke="#FF7A00" strokeWidth="2" fill="none" />
        </svg>
       </div>
       */}
    </div>;
};
export default JourneySuns;