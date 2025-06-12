
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star, Clock, Users, MapPin, DollarSign, Heart, Plane, Globe, Camera } from 'lucide-react';
import SunnyMascot from '@/components/SunnyMascot';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Flyer2Page = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-fixed bg-radialSunny from-[#FFD447] via-[#FFEFE2] to-white bg-grain text-midnight overflow-hidden">
        {/* Film grain texture overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
        
        {/* FRONT FLYER SECTION */}
        <section className="relative min-h-screen py-8 px-4 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-sunny-orange-dark mb-8 leading-tight">
              PLANNING TO TRAVEL THIS YEAR <span className="text-sunny-yellow-dark">AS A STUDENT?</span>
            </h1>
            
            {/* Large Sunny Mascot */}
            <div className="flex justify-center mb-8">
              <SunnyMascot size="xl" travelStyle="fashion" className="sunny-bounce" />
            </div>

            {/* Save Money Callout */}
            <div className="sunny-card bg-sunny-gradient text-white p-8 mb-8 transform hover:-rotate-1 transition-all sunny-wiggle max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                SAVE $200+ PER WEEK
              </h2>
              <div className="text-xl font-bold">AVOID TOURIST TRAPS!</div>
            </div>

            {/* Save up to 50% */}
            <div className="sunny-card bg-sunny-yellow text-sunny-orange-dark p-6 mb-8 transform hover:rotate-1 transition-all max-w-xl mx-auto">
              <h3 className="text-3xl font-bold">
                Save up to 50% on everything!
              </h3>
            </div>

            {/* Pricing Section with QR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
              {/* Pricing */}
              <div className="sunny-card bg-white">
                <h3 className="text-2xl font-bold text-sunny-orange-dark mb-4">
                  SPECIAL LAUNCH PRICE
                </h3>
                <div className="flex justify-center items-center gap-4 mb-4">
                  <div className="text-2xl text-gray-500 line-through">Reg. $29</div>
                  <div className="text-5xl font-bold text-sunny-orange">$20</div>
                  <div className="text-lg text-gray-600">/year</div>
                </div>
                <div className="sunny-tag bg-sunny-orange-light text-sunny-orange-dark font-bold">
                  🔥 30% OFF - Limited Time!
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-6 rounded-lg border-2 border-sunny-orange-light shadow-lg">
                  <div className="flex items-center justify-center w-32 h-32 bg-white rounded border">
                    <img 
                      src="/lovable-uploads/1f781ab9-025b-4e22-9174-975611b14701.png" 
                      alt="QR Code to join" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="text-lg font-bold text-sunny-orange-dark">
                  SCAN TO JOIN NOW!
                </div>
              </div>
            </div>

            {/* 4 Benefits Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="sunny-card text-center p-4">
                <img alt="ISIC Logo" className="h-12 mx-auto mb-2" src="/lovable-uploads/b5a79eba-f98b-4e5f-9717-ff8fce4cc79a.png" />
                <div className="text-sm font-bold text-sunny-orange-dark">OFFICIAL ISIC CARD</div>
              </div>
              <div className="sunny-card text-center p-4">
                <MapPin className="w-8 h-8 text-sunny-orange mx-auto mb-2" />
                <div className="text-sm font-bold text-sunny-orange-dark">NO TOURIST TRAPS</div>
              </div>
              <div className="sunny-card text-center p-4">
                <Users className="w-8 h-8 text-sunny-orange mx-auto mb-2" />
                <div className="text-sm font-bold text-sunny-orange-dark">TRAVEL BUDDIES</div>
              </div>
              <div className="sunny-card text-center p-4">
                <Plane className="w-8 h-8 text-sunny-orange mx-auto mb-2" />
                <div className="text-sm font-bold text-sunny-orange-dark">AI PLANNING</div>
              </div>
            </div>
          </div>
        </section>

        {/* BACK FLYER SECTION */}
        <section className="relative min-h-screen py-8 px-4 bg-white/90 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            {/* Sunshine Club Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-6xl font-display text-sunny-orange-dark mb-4">
                SUNSHINE CLUB
              </h2>
              <div className="sunny-card bg-sunny-gradient text-white p-6 transform hover:-rotate-1 transition-all">
                <h3 className="text-3xl font-bold mb-2">BECOME A MEMBER</h3>
                <p className="text-xl">Join 5,000+ students worldwide!</p>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-sunny-orange-dark mb-6 text-center">HOW IT WORKS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="sunny-card text-center">
                  <div className="w-12 h-12 bg-sunny-gradient rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
                  <h4 className="font-bold text-sunny-orange-dark mb-2">SIGN UP</h4>
                  <p className="text-sm text-gray-700">Join our community and get your ISIC card</p>
                </div>
                <div className="sunny-card text-center">
                  <div className="w-12 h-12 bg-sunny-gradient rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
                  <h4 className="font-bold text-sunny-orange-dark mb-2">PLAN WITH SUNNY</h4>
                  <p className="text-sm text-gray-700">Get personalized travel recommendations</p>
                </div>
                <div className="sunny-card text-center">
                  <div className="w-12 h-12 bg-sunny-gradient rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
                  <h4 className="font-bold text-sunny-orange-dark mb-2">SAVE & TRAVEL</h4>
                  <p className="text-sm text-gray-700">Enjoy massive discounts and connect with students</p>
                </div>
              </div>
            </div>

            {/* What You Get - Benefits Checklist */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-sunny-orange-dark mb-6 text-center">WHAT YOU GET</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "☀️ Personalized travel planning with Sunny AI",
                  "💳 Official ISIC card with global discounts",
                  "🗺️ Hidden gems maps & local recommendations",
                  "👥 City community groups & student meetups",
                  "📱 24/7 travel support & emergency help",
                  "🎒 Travel prep checklists & packing guides",
                  "🏠 Verified accommodation recommendations",
                  "🎉 Exclusive events & group trip opportunities"
                ].map((benefit, index) => (
                  <div key={index} className="sunny-card flex items-center gap-3 hover:scale-105 transition-all">
                    <Check className="w-6 h-6 text-sunny-orange shrink-0" />
                    <span className="text-left font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ambassador Program */}
            <div className="sunny-card bg-sunny-yellow-light border-2 border-sunny-orange-light mb-8">
              <div className="flex items-center gap-4 mb-4">
                <SunnyMascot size="md" travelStyle="adventure" />
                <div>
                  <h3 className="text-xl font-bold text-sunny-orange-dark">BECOME A SUNSHINE LEADER!</h3>
                  <p className="text-gray-700">Lead your city's community & earn rewards</p>
                </div>
              </div>
              <Link to="/ambassador-application">
                <Button className="bg-sunny-orange hover:bg-sunny-orange-dark text-white font-bold">
                  Apply as Ambassador
                </Button>
              </Link>
            </div>

            {/* Website URL and QR */}
            <div className="text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-sunny-orange-dark mb-2">
                    www.studenttravelbuddy.com
                  </div>
                  <p className="text-gray-600">Your gateway to affordable student travel</p>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white p-4 rounded-lg border-2 border-sunny-orange-light shadow-sm">
                    <div className="flex items-center justify-center w-24 h-24 bg-white rounded border">
                      <img 
                        src="/lovable-uploads/1f781ab9-025b-4e22-9174-975611b14701.png" 
                        alt="QR Code to website" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Scan to visit website
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Flyer2Page;