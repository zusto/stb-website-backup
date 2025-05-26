import React, { useState, useEffect } from 'react';
import { Sun, ArrowRight, Check, Users, Globe, DollarSign, MessageCircle, Star, Video, Sparkles, Timer, UserRound, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import JourneySuns from './JourneySuns';
import { useIsMobile } from '@/hooks/use-mobile';
import SunnyMascot from './SunnyMascot';
import { Link } from 'react-router-dom';

// Star animation component
const StarDust = ({
  className
}: {
  className?: string;
}) => {
  return <div className={`absolute pointer-events-none ${className}`}>
      <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse-gentle" />
    </div>;
};
const SunshineClub = () => {
  const isMobile = useIsMobile();

  // Plans data for membership comparison - only keeping FullTimer for display
  const plan = {
    name: "FullTimer",
    price: "$20",
    originalPrice: "$29",
    description: "All-access pass for verified full-time students – perks, discounts, community events, and more.",
    features: {
      isicCard: true,
      // Moved to top
      itineraries: true,
      community: true,
      cityGuides: true,
      travelRules: true,
      localEvents: true,
      webinars: true,
      chatSupport: true,
      phoneSupport: true,
      newsletter: true
    },
    highlight: true
    // spotsLeft: "24" // No longer used for banner
  };
  const featureLabels = {
    isicCard: "ISIC Card & Exclusive Student Discounts (save $2-300/week)",
    itineraries: "Daily Itineraries When You Travel (Skip FOMO)",
    community: "Local Student Community Groups",
    cityGuides: "Student City Guides",
    travelRules: "10 Top Secret Non-Negotiable Student Travel Rules",
    localEvents: "Local Events",
    webinars: "Webinars",
    chatSupport: "Chat Support",
    phoneSupport: "Phone Support",
    newsletter: "Curated Newsletter"
  };

  // Define the order of features for display
  const orderedFeatureKeys: (keyof typeof featureLabels)[] = ['isicCard', 'itineraries', 'community', 'cityGuides', 'travelRules', 'localEvents', 'webinars', 'chatSupport', 'phoneSupport', 'newsletter'];

  // University logos and names mapping - updated with website URLs
  const universityLogos = [{
    name: "Harvard",
    logo: "/lovable-uploads/c856622f-59f3-4cd0-baa8-09350023937b.png",
    website: "https://www.harvard.edu"
  }, {
    name: "Oxford",
    logo: "/lovable-uploads/d28c8881-1159-4531-b72a-ceb919332f52.png",
    website: "https://www.ox.ac.uk"
  }, {
    name: "ETH Zurich",
    logo: "/lovable-uploads/bcb9c431-76ba-47f7-906e-c88f2aaf1d88.png",
    website: "https://ethz.ch/en.html"
  }, {
    name: "Stanford",
    logo: "/lovable-uploads/832dd1b4-4324-40a9-9c84-0a823be50f5a.png",
    website: "https://www.stanford.edu"
  }, {
    name: "Yale",
    logo: "/lovable-uploads/d3f54b62-f843-4732-8aae-27f9e7d51dda.png",
    website: "https://www.yale.edu"
  }, {
    name: "Princeton",
    logo: "/lovable-uploads/c8ee8c54-1ae7-490f-bbb8-75978c486431.png",
    website: "https://www.princeton.edu"
  }, {
    name: "Columbia",
    logo: "/lovable-uploads/544e57e6-94ce-4b89-b52a-9d1dabf9b0ea.png",
    website: "https://www.columbia.edu"
  }, {
    name: "Cambridge",
    logo: "/lovable-uploads/6fdda045-a019-489d-87a3-d823664a0cbf.png",
    website: "https://www.cam.ac.uk"
  }, {
    name: "Berkeley",
    logo: "/lovable-uploads/b66cce02-8ef6-42d3-8be3-fb538945490c.png",
    website: "https://www.berkeley.edu"
  }, {
    name: "Chicago",
    logo: "/lovable-uploads/5a230154-15a8-46a9-97f3-3d89677f6a3d.png",
    website: "https://www.uchicago.edu"
  }, {
    name: "UPenn",
    logo: "/lovable-uploads/698b81da-180a-47a2-b935-1dd063b0a8dc.png",
    website: "https://www.upenn.edu"
  }, {
    name: "Caltech",
    logo: "/lovable-uploads/2b49a586-03d5-49ba-855f-dd59e013ea82.png",
    website: "https://www.caltech.edu"
  }, {
    name: "Cornell",
    logo: "/lovable-uploads/5c2d377d-29d1-42e0-bd60-bd389a75fe7d.png",
    website: "https://www.cornell.edu"
  }, {
    name: "Toronto",
    logo: "/lovable-uploads/e60195a2-9edf-437e-b71d-99fed66fa308.png",
    website: "https://www.utoronto.ca"
  }, {
    name: "NUS",
    logo: "/lovable-uploads/67c190fc-8292-43b8-8383-b083e9313950.png",
    website: "https://nus.edu.sg"
  }, {
    name: "NTU",
    logo: "/lovable-uploads/2fd47381-217e-4a1d-b706-a5c716bf326c.png",
    website: "https://www.ntu.edu.sg"
  }, {
    name: "HKUST",
    logo: "/lovable-uploads/32931c6d-d22e-4947-8eb7-556c36bbdf1f.png",
    website: "https://hkust.edu.hk"
  }, {
    name: "Sydney",
    logo: "/lovable-uploads/befd5591-b9fd-40f1-b35e-1a1af3ef3ef3.png",
    website: "https://www.sydney.edu.au"
  }, {
    name: "Tsinghua",
    logo: "/lovable-uploads/6ea74ff7-ba75-4e2b-981f-bb9f813af6ed.png",
    website: "https://www.tsinghua.edu.cn/en/"
  }];

  // Keep the full list of universities for the counter
  const universities = ["Harvard", "Oxford", "MIT", "Stanford", "Yale", "Princeton", "Columbia", "Cambridge", "Berkeley", "Chicago", "UPenn", "Caltech", "Cornell", "Toronto", "NUS", "NTU", "HKUST", "Sydney", "Tsinghua", "UCLA", "NYU", "Duke", "Imperial", "ETH Zurich", "McGill", "ANU", "Tokyo", "Seoul", "Singapore"];
  const partnerLogos = [{
    name: "ISIC Logo",
    imageSrc: "/lovable-uploads/43907e87-ce60-45f2-a662-8f7e82bff4e8.png",
    website: "https://www.isic.org/"
  }, {
    name: "UNESCO Logo",
    imageSrc: "/lovable-uploads/241e9ec1-4a58-41c8-9ee9-bd701f46b2c7.png",
    website: "https://www.unesco.org/"
  }, {
    name: "University Partners",
    imageSrc: "/lovable-uploads/12acd66e-e6bb-4740-a251-d4f72ad2d5d8.png",
    website: "https://www.studentclearinghouse.org/"
  }];
  return <section id="sunshine-club" className="py-16 relative">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        {/* Modern Header with sparkly effects */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 sunshine-accent mb-3">
            <Sun className="h-4 w-4" />
            <span>Join our community</span>
          </div>
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-display mb-4 relative z-10 bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FDAD32] text-transparent drop-shadow-sm animate-pulse-gentle">
              THE SUNSHINE CLUB
            </h2>
            
            {/* Star dust animations positioned around the title */}
            <StarDust className="-top-4 -left-2" />
            <StarDust className="-top-2 -right-3" />
            <StarDust className="bottom-0 left-1/4" />
            <StarDust className="top-1/2 right-1/4" />
            <StarDust className="bottom-2 right-10" />
            
            {/* Extra star decoration */}
            <span className="absolute -top-6 right-0 text-yellow-300 animate-float">✨</span>
            <span className="absolute -bottom-4 left-4 text-yellow-400 animate-bounce-subtle">⭐</span>
            <span className="absolute top-1/3 -right-8 text-yellow-300 animate-spin-slow text-sm">✨</span>
            
            {/* Sun glow effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-orange-300/20 blur-lg -z-10 transform scale-110"></div>
          </div>
        </div>

        {/* Add Journey Suns Component Here */}
        <JourneySuns />

        {/* Key Benefits - Modern Cards with Orange Icons */}
        
        {/* Membership details section - Only showing FullTimer */}
        <div id="membership-details-section" className="mb-16"> {/* Added ID here */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-[#fdad32] to-[#fe4c02] px-6 py-2 rounded-lg mb-4 flex items-center justify-center">
              <Timer className="h-6 w-6 text-white mr-2" />
              <h2 className="text-3xl md:text-4xl font-display mb-0 text-white">MEMBERSHIP DETAILS</h2>
            </div>
            <p className="text-xl text-[#fe4c02] font-handwritten">The perfect plan for your student adventures</p>
          </div>

          <div className="max-w-md mx-auto mb-8">
            {/* FullTimer highlighted prominently */}
            <Card className="border-2 border-[#fdad32] shadow-xl relative overflow-hidden">
              {/* ... keep existing code (BEST VALUE badge, 30% OFF banner) */}
              
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#fdad32] to-[#fe4c02] text-white font-bold px-4 py-2 rounded-bl-md">
                BEST VALUE
              </div>
              
              <div className="absolute top-0 left-0 right-0 bg-[#e93546] text-white text-center py-2">
                <div className="flex items-center justify-center gap-1">
                  <Timer className="h-4 w-4" />
                  <span className="font-bold">30% OFF FOR LIMITED TIME</span>
                </div>
              </div>
              
              <div className="pt-12 px-6 pb-6 bg-gradient-to-b from-[#ffeea6]/30 to-white text-left">
                <div className="bg-white p-4 rounded-lg border border-[#fdad32]/30 mb-6">
                  <h3 className="font-display text-3xl text-[#fdad32] mb-1">{plan.name.toUpperCase()}</h3>
                  <p className="text-gray-800 font-medium mb-2">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-[#fdad32]">{plan.price}</span>
                    <span className="ml-2 text-gray-500 line-through">{plan.originalPrice}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 font-medium">
                  Unlock <span className="text-[#fe4c02]">ALL student travel perks</span> plus exclusive access to special events & VIP support.
                </p>
                
                <ul className="space-y-3 mb-6 bg-white p-4 rounded-lg border border-[#fdad32]/30">
                  {orderedFeatureKeys.map(key => plan.features[key] ? <li key={key} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#fdad32] shrink-0 mt-0.5" />
                      <span className="font-medium">{featureLabels[key]}</span>
                    </li> : null)}
                </ul>
                
                <div className="flex items-start mb-6">
                  <SunnyMascot withText message="Best choice for most students!" />
                </div>
                
                <Link to="/checkout">
                  <Button className="w-full bg-gradient-to-r from-[#fdad32] to-[#fe4c02] hover:brightness-105 text-white font-bold text-lg py-6 flex items-center justify-center gap-2 rounded-full">
                    <UserRound className="h-5 w-5" />
                    GET FULLTIMER NOW
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Membership comparison table removed, now appears in Templates.tsx */}

        {/* Bonus Section - Modernized */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">EXTRA BONUSES</h2>
            <p className="text-gray-600">Included with your membership</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-2 border-[#FFD600]/30 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-5 text-center">
                <div className="h-10 w-10 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">📱</span>
                </div>
                <h3 className="font-bold mb-1">Top Travel Apps</h3>
                <p className="text-sm text-gray-600">Essential apps for your trip</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-[#FFD600]/30 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-5 text-center">
                <div className="h-10 w-10 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-5 w-5 text-[#F97316]" />
                </div>
                <h3 className="font-bold mb-1">Exclusive Deals</h3>
                <p className="text-sm text-gray-600">Special student prices</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-[#FFD600]/30 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-5 text-center">
                <div className="h-10 w-10 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-5 w-5 text-[#F97316]" />
                </div>
                <h3 className="font-bold mb-1">Travel Confidence</h3>
                <p className="text-sm text-gray-600">Feel secure anywhere</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-[#FFD600]/30 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-5 text-center">
                <div className="h-10 w-10 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-3 text-lg">
                  <Video className="h-5 w-5 text-[#F97316]" />
                </div>
                <h3 className="font-bold mb-1">Live Webinars</h3>
                <p className="text-sm text-gray-600">Monthly Q&A sessions</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trusted By Section - Optimized for mobile and styled like the main header */}
        <div className="mb-16">
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-center ${isMobile ? 'gap-2' : 'gap-4'} mb-8 py-4 border-y-2 border-[#FFD600]/50`}>
            <div className="relative inline-block text-lg">
              <h2 className="font-bold font-display text-center bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FDAD32] text-transparent drop-shadow-sm animate-pulse-gentle text-base">
                IN COOPERATION WITH
              </h2>
              {/* Star dust animations for the heading */}
              <StarDust className="-top-2 -left-1" />
              <StarDust className="bottom-0 left-1/3" />
              {/* Extra star decoration */}
              <span className="absolute -top-4 right-0 text-yellow-300 animate-float">✨</span>
            </div>
            
            <img alt="ISIC Logo" className={`${isMobile ? 'w-4/5 my-2' : 'h-16'} object-contain`} src="/lovable-uploads/c0f8247c-d5d1-4768-9367-f6ba825e44ce.png" />
            
            <div className="relative inline-block">
              <h2 className="font-bold font-display text-center bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FDAD32] text-transparent drop-shadow-sm animate-pulse-gentle text-lg">TRUSTED BY THE STUDENTS FROM TOP GLOBAL UNIVERSITIES</h2>
              {/* Star dust animations for the heading */}
              <StarDust className="-top-2 -right-1" />
              <StarDust className="bottom-0 right-1/3" />
              {/* Extra star decoration */}
              <span className="absolute -bottom-4 left-2 text-yellow-400 animate-bounce-subtle">⭐</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 justify-center items-center">
            {universityLogos.slice(0, 18).map((uni, index) => <div key={index} className="university-stamp mx-auto">
                <a href={uni.website} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity" aria-label={`Visit ${uni.name} University website`}>
                  <img src={uni.logo} alt={`${uni.name} University`} className="w-full h-full object-contain p-1" />
                </a>
              </div>)}
          </div>

          {/* ADDED: Partner Logos Section */}
          <div className="mt-12 text-center">
            <p className="text-sm mb-4 font-normal text-black">Trusted partners and affiliations</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {partnerLogos.map((partner, index) => <a key={index} href={partner.website} target="_blank" rel="noopener noreferrer" className="transition-opacity">
                  <img alt={partner.name} className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity" src={partner.imageSrc} />
                </a>)}
            </div>
          </div>
        </div>

        {/* This is for you if section - modernized with icons */}
        <div className="mb-16 bg-white rounded-xl p-8 shadow-sm border-2 border-[#FFD600]/20">
          <h2 className="text-2xl font-bold text-center mb-8">THIS IS FOR YOU IF YOU...</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="space-y-4">
              <div className="feature-item">
                <div className="feature-icon">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p>Want to skip the headache of feeling overwhelmed when planning a trip</p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <p>Want to connect with peers and make new friends across the globe</p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                <p>Want to be part of a movement that supports student travel and cultural exchange</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="feature-item">
                <div className="feature-icon">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <p>Want to travel smart and get great experiences at the best prices</p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <p>Need support when you're excited or stressed about your trip</p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <p>Crave real stories and insider tips from people who understand student travel</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Centered button with added sunshine image */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to join the club?</h2>
          
          <div className="flex flex-col items-center mb-6">
            <img alt="Sunshine journey: you already have what it takes → soul full of sunshine → shine on" className="max-w-full md:max-w-2xl mx-auto h-auto mb-6" src="/lovable-uploads/94ed1008-5c66-45fa-a222-9c6edac9b1c7.png" />
          </div>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your adventure with fellow students who love to travel smarter, not harder.
          </p>
          
          <div className="flex justify-center">
            <Link to="/checkout">
              <Button className="stb-button text-lg flex items-center gap-2 mx-auto">
                Join The Sunshine Club
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default SunshineClub;
