import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from "@/components/ui/card";
import { Sun, ArrowRight, DollarSign } from 'lucide-react';

const Templates = () => {
  // Countdown timer state
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
  
  // Membership plans data
  const plans = [{
    name: "FullTimer",
    price: "$20",
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

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container px-4 py-16 md:px-6 max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/" className="text-[#FF7A00] hover:underline mr-2">← Back to Home</Link>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display mb-8 text-center">Membership Comparison</h1>
        
        {/* All Membership Options */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-[#fdad32] to-[#fe4c02] px-6 py-2 rounded-lg mb-4 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white mr-2" />
              <h2 className="text-3xl md:text-4xl font-display mb-0 text-white">MEMBERSHIP PLANS</h2>
            </div>
            <p className="text-xl text-[#fe4c02] font-medium">Choose the perfect plan for your student adventures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* FullTimer highlighted prominently */}
            <Card className="border-2 border-[#fdad32] shadow-xl relative overflow-hidden scale-105 z-10">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#fdad32] to-[#fe4c02] text-white font-bold px-4 py-2 rounded-bl-md">
                BEST VALUE
              </div>
              
              <div className="absolute top-0 left-0 right-0 bg-[#e93546] text-white text-center py-2">
                <div className="flex items-center justify-center gap-1">
                  <Sun className="h-4 w-4" />
                  <span className="font-bold">ONLY {plans[0].spotsLeft} SPOTS LEFT</span>
                </div>
              </div>
              
              <div className="pt-12 px-6 pb-6 bg-gradient-to-b from-[#ffeea6]/30 to-white">
                <div className="bg-white p-4 rounded-lg border border-[#fdad32]/30 mb-6">
                  <h3 className="font-display text-3xl text-[#fdad32] mb-1">FULLTIMER</h3>
                  <p className="text-gray-800 font-medium mb-2">The Complete Student Travel Experience</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-[#fdad32]">{plans[0].price}</span>
                    <span className="ml-2 text-gray-500 line-through">{plans[0].originalPrice}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 font-medium">
                  Unlock <span className="text-[#fe4c02]">ALL student travel perks</span> plus exclusive access to special events & VIP support
                </p>
                
                <ul className="space-y-3 mb-6 bg-white p-4 rounded-lg border border-[#fdad32]/30">
                  {Object.entries(plans[0].features).map(([key, enabled]) => enabled ? (
                    <li key={key} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#fdad32] shrink-0 mt-0.5" />
                      <span className="font-medium">{featureLabels[key]}</span>
                    </li>
                  ) : null)}
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#fe4c02] shrink-0 mt-0.5" />
                    <span className="font-medium text-[#fe4c02]">30% OFF for limited time!</span>
                  </li>
                </ul>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="text-sm bg-[#FEF7CD] p-2 rounded-lg text-[#F97316] font-medium">
                    Best choice for most students!
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-[#fdad32] to-[#fe4c02] hover:brightness-105 text-white font-bold text-lg py-6 rounded-full">
                  GET FULLTIMER NOW
                </Button>
              </div>
            </Card>

            {/* PartTimer shown second */}
            <Card className="border border-gray-200 relative overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-display mb-2">{plans[1].name}</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#fdad32]">{plans[1].price}</span>
                </div>
                <p className="text-gray-600 mb-6 text-sm">{plans[1].description}</p>
                
                <ul className="space-y-2 mb-8 text-sm">
                  {Object.entries(plans[1].features).filter(([_, enabled]) => enabled).slice(0, 5).map(([key]) => (
                    <li key={key} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#fdad32] shrink-0 mt-0.5" />
                      <span>{featureLabels[key]}</span>
                    </li>
                  ))}
                  <li className="text-gray-500 text-sm">+ 5 more features</li>
                </ul>
                
                <Button className="w-full bg-[#fdad32] hover:bg-[#fe4c02] text-white font-bold text-sm rounded-full">Coming soon</Button>
              </CardContent>
            </Card>
            
            {/* FreeTimer shown last & smallest */}
            <Card className="border border-gray-200 relative overflow-hidden opacity-80">
              <CardContent className="p-6">
                <h3 className="text-xl font-display mb-2">{plans[2].name}</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#fdad32]">{plans[2].price}</span>
                </div>
                <p className="text-gray-600 mb-6 text-sm">{plans[2].description}</p>
                
                <ul className="space-y-2 mb-8 text-sm">
                  {Object.entries(plans[2].features).map(([key, enabled]) => enabled ? (
                    <li key={key} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#fdad32] shrink-0 mt-0.5" />
                      <span>{featureLabels[key]}</span>
                    </li>
                  ) : null)}
                </ul>
                
                <Button className="w-full bg-[#ffeea6] hover:bg-[#fdad32] text-[#fe4c02] font-bold text-sm rounded-full">
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Membership comparison table */}
        <div className="mt-12 bg-white rounded-lg p-6 border border-[#fdad32]/20 shadow-sm">
          <h3 className="text-xl font-bold mb-4">Compare All Features</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Benefits</TableHead>
                  <TableHead className="bg-gradient-to-r from-[#fdad32]/20 to-[#fe4c02]/20">FullTimer</TableHead>
                  <TableHead>PartTimer</TableHead>
                  <TableHead>FreeTimer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(featureLabels).map(([key, label]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{label}</TableCell>
                    <TableCell className="text-center bg-[#fdad32]/10">
                      {plans[0].features[key] ? <CheckCircle className="h-5 w-5 mx-auto text-[#fdad32]" /> : <span className="text-gray-300">—</span>}
                    </TableCell>
                    <TableCell className="text-center">
                      {plans[1].features[key] ? <CheckCircle className="h-5 w-5 mx-auto text-[#fdad32]" /> : <span className="text-gray-300">—</span>}
                    </TableCell>
                    <TableCell className="text-center">
                      {plans[2].features[key] ? <CheckCircle className="h-5 w-5 mx-auto text-[#fdad32]" /> : <span className="text-gray-300">—</span>}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-medium">Price</TableCell>
                  <TableCell className="text-center bg-[#fdad32]/10">
                    <span className="line-through text-gray-400">$29</span>{" "}
                    <span className="font-bold">$20</span>
                  </TableCell>
                  <TableCell className="text-center">$19</TableCell>
                  <TableCell className="text-center">Free</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link to="/">
              <Button className="bg-gradient-to-r from-[#fdad32] to-[#fe4c02] hover:brightness-105 text-white font-bold">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Templates;
