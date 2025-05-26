
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sales/HeroSection';
import BriefIntroSection from '@/components/sales/BriefIntroSection';
import PainPointsSection from '@/components/sales/PainPointsSection';
import PositiveOutcomesSection from '@/components/sales/PositiveOutcomesSection';
import VideoSection from '@/components/sales/VideoSection';
import WhoItsForSection from '@/components/sales/WhoItsForSection';
import AboutFounderSection from '@/components/sales/AboutFounderSection';
import TestimonialsSection from '@/components/sales/TestimonialsSection';
import GuestExpertsSection from '@/components/sales/GuestExpertsSection';
import ModuleBreakdownSection from '@/components/sales/ModuleBreakdownSection';
import WhatsInsideSection from '@/components/sales/WhatsInsideSection';
import CtaPricingSection from '@/components/sales/CtaPricingSection';
import FaqsSection from '@/components/sales/FaqsSection';
import Footer from '@/components/Footer';
import JourneySuns from '@/components/JourneySuns';

const SalesPage = () => {
  return (
    <div className="stb-page-container min-h-screen">
      <Navbar />
      
      <div className="relative">
        {/* Hero section with base gradient */}
        <div className="relative">
          <HeroSection />
          {/* Wave divider after Hero */}
          <div className="stb-wave-divider stb-wave-divider-bottom"></div>
        </div>
        
        {/* Brief Intro section with gradient 1 */}
        <div className="relative stb-section-gradient-1">
          <BriefIntroSection />
          <div className="stb-wave-divider stb-wave-divider-bottom"></div>
        </div>
        
        {/* Pain Points section with gradient 2 */}
        <div className="relative stb-section-gradient-2">
          <PainPointsSection />
        </div>
        
        {/* Positive Outcomes section with gradient 1 */}
        <div className="relative stb-section-gradient-1">
          <div className="stb-wave-divider stb-wave-divider-top"></div>
          <PositiveOutcomesSection />
          <div className="stb-wave-divider stb-wave-divider-bottom"></div>
        </div>
        
        {/* Journey Map interactive section */}
        <div className="relative stb-section-gradient-3">
          <JourneySuns />
        </div>
        
        {/* Video section with gradient 4 */}
        <div className="relative stb-section-gradient-4">
          <div className="stb-wave-divider stb-wave-divider-top"></div>
          <VideoSection />
        </div>
        
        {/* Who It's For section with gradient 1 */}
        <div className="relative stb-section-gradient-1">
          <WhoItsForSection />
          <div className="stb-wave-divider stb-wave-divider-bottom"></div>
        </div>
        
        {/* About Founder section with gradient 2 */}
        <div className="relative stb-section-gradient-2">
          <AboutFounderSection />
        </div>
        
        {/* Testimonials section with gradient 1 */}
        <div className="relative stb-section-gradient-1">
          <div className="stb-wave-divider stb-wave-divider-top"></div>
          <TestimonialsSection type="primary" />
        </div>
        
        {/* Guest Experts section with gradient 3 */}
        <div className="relative stb-section-gradient-3">
          <GuestExpertsSection />
          <div className="stb-wave-divider stb-wave-divider-bottom"></div>
        </div>
        
        {/* Module Breakdown section with gradient 2 */}
        <div className="relative stb-section-gradient-2">
          <ModuleBreakdownSection />
        </div>
        
        {/* What's Inside section with gradient 1 */}
        <div className="relative stb-section-gradient-1">
          <div className="stb-wave-divider stb-wave-divider-top"></div>
          <WhatsInsideSection />
          <div className="stb-wave-divider stb-wave-divider-bottom"></div>
        </div>
        
        {/* More Testimonials */}
        <div className="relative stb-section-gradient-3">
          <TestimonialsSection type="secondary" />
          <div className="stb-wave-divider stb-wave-divider-bottom"></div>
        </div>
        
        {/* CTA Pricing section with gradient 4 */}
        <div className="relative stb-section-gradient-4">
          <CtaPricingSection />
        </div>
        
        {/* FAQs section with gradient 1 */}
        <div className="relative stb-section-gradient-1">
          <div className="stb-wave-divider stb-wave-divider-top"></div>
          <FaqsSection />
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default SalesPage;
