import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SunshineClub from '@/components/SunshineClub';
import Offering from '@/components/Offering';
import TravelQuiz from '@/components/TravelQuiz';
import Testimonials from '@/components/Testimonials';
import BackStory from '@/components/BackStory';
import HowStarted from '@/components/HowStarted';
import Ambassador from '@/components/Ambassador';
import SignUp from '@/components/SignUp';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';
import BenefitsSection from '@/components/BenefitsSection';
import WaveDivider from '@/components/WaveDivider';
import { Plane } from 'lucide-react';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Scrolls to the top when the component mounts or path changes (without hash)
    // Handles specific hash scrolling for sections after navigation
    const { hash } = location;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Only scroll to top if there's no hash, to avoid overriding hash scrolling
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return <div className="min-h-screen">
      <Navbar />

      <div className="relative">
        {/* Hero section */}
        <div className="relative">
          <Hero />
          <WaveDivider />
        </div>
        
        {/* New Quiz Header Section */}
        <div className="py-10 md:py-16 text-center bg-transparent"> {/* Updated background class */}
          <div className="inline-block relative my-6 md:my-8">
            <div className="bg-gradient-to-r from-sunny-yellow to-sunny-orange px-6 py-3 md:px-8 md:py-4 rounded-2xl shadow-lg md:rounded-full">
              <h2 className="text-2xl md:text-4xl font-bold text-white tracking-wide uppercase">
                Student Travel Style Quiz
              </h2>
            </div>
            <div className="absolute -top-3 -right-3 md:-top-2 md:-right-4 bg-white p-2 rounded-full shadow-md">
              <Plane className="h-5 w-5 md:h-6 md:w-6 text-sunny-orange" />
            </div>
          </div>
          <p className="text-md md:text-xl text-sunny-orange-dark font-handwritten px-4">
            Discover your travel vibe + unlock exclusive perks!
          </p>
        </div>
        
        {/* Travel Quiz section */}
        <div id="quiz" className="relative">
          <TravelQuiz />
          <WaveDivider />
        </div>
        
        {/* Benefits Section */}
        <div className="relative">
          <BenefitsSection />
          <WaveDivider />
        </div>
        
        {/* Sunshine Club section */}
        <div id="sunshine-club" className="relative">
          <SunshineClub />
          <WaveDivider />
        </div>
        
        {/* Offering section */}
        <div className="relative">
          <Offering />
          <WaveDivider />
        </div>
        
        {/* Testimonials section */}
        <div className="relative">
          <Testimonials />
          <WaveDivider />
        </div>
        
        {/* Features section - This block is now removed as Features is part of HowStarted */}
        {/* 
        <div className="relative">
          <Features />
          <WaveDivider />
        </div> 
        */}
        
        {/* BackStory section */}
        <div id="backstory" className="relative">
          <BackStory />
          <WaveDivider />
        </div>
        
        {/* HowStarted section (now includes Features) */}
        <div className="relative">
          <HowStarted />
          <WaveDivider />
        </div>
        
        {/* Ambassador section */}
        <div id="ambassador" className="relative">
          <Ambassador />
          <WaveDivider />
        </div>
        
        {/* SignUp section */}
        <div className="relative">
          <SignUp />
          <WaveDivider />
        </div>
        
        {/* Pricing Section */}
        <div className="relative">
          <PricingSection />
          <WaveDivider />
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>;
};
export default Index;
