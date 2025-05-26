
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Check, CheckCircle, Timer, UserRound, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SunnyMascot from './SunnyMascot';

const Offering = () => {
  const plans = [{
    name: "FullTimer",
    price: "$19",
    originalPrice: "$29",
    description: "All-access pass for verified full-time students – perks, discounts, community events, and more.",
    features: {
      newsletter: true,
      travelRules: true,
      cityGuides: true,
      isicCard: true,
      chatSupport: true,
      phoneSupport: true,
      itineraries: true,
      webinars: true,
      community: true,
      localEvents: true
    },
    highlight: true,
    spotsLeft: "24"
  }, {
    name: "PartTimer",
    price: "$19",
    description: "Great for part-time students – flexible perks and partial access tailored to your schedule.",
    features: {
      newsletter: true,
      travelRules: true,
      cityGuides: true,
      isicCard: false,
      chatSupport: true,
      phoneSupport: false,
      itineraries: true,
      webinars: true,
      community: true,
      localEvents: true
    },
    highlight: false
  }, {
    name: "FreeTimer",
    price: "Free",
    description: "Stay in the loop with our newsletter – updates, offers, and student stories straight to your inbox.",
    features: {
      newsletter: true,
      travelRules: false,
      cityGuides: false,
      isicCard: false,
      chatSupport: false,
      phoneSupport: false,
      itineraries: false,
      webinars: false,
      community: false,
      localEvents: false
    }
  }];
  
  const featureLabels = {
    newsletter: "Curated Newsletter",
    travelRules: "10 Top Secret Non-Negotiable Student Travel Rules",
    cityGuides: "Student City Guides",
    isicCard: "ISIC Card & Exclusive Student Discounts (save $2-300/week)",
    chatSupport: "Chat Support",
    phoneSupport: "Phone Support",
    itineraries: "Daily Itineraries When You Travel (Skip FOMO)",
    webinars: "Webinars",
    community: "Local Student Community Groups",
    localEvents: "Local Events"
  };
  
  return <section id="offering" className="py-16 relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="inner">
        {/* Content goes here */}
      </div>
    </section>;
};

export default Offering;
