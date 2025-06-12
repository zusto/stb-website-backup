import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star, Clock, Users, MapPin, DollarSign, Heart, Plane, Globe, Camera } from 'lucide-react';
import SunnyMascot from '@/components/SunnyMascot';
import { Link } from 'react-router-dom';
import WaveDivider from '@/components/WaveDivider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FlyerPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-fixed bg-radialSunny from-[#FFD447] via-[#FFEFE2] to-white bg-grain text-midnight overflow-hidden">
        {/* Film grain texture overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
        
        {/* Launch Badge */}
        <div className="absolute top-4 right-4 sunny-tag bg-sunny-gradient text-white px-4 py-2 rounded-full transform hover:rotate-12 transition-all shadow-xl animate-pulse z-20">
          <span className="font-bold text-sm">🚀 WE ARE JUST LAUNCHING!</span>
        </div>

        {/* Hook Section - Attention Grabber */}
        <section className="relative py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display text-sunny-orange-dark mb-6">
              PLANNING TO TRAVEL THIS YEAR <span className="text-sunny-yellow-dark">AS A STUDENT?</span>
            </h1>
            
            <div className="sunny-card bg-sunny-gradient text-white p-6 mb-6 transform hover:-rotate-1 transition-all sunny-wiggle">
              <h2 className="text-3xl font-bold mb-4">
                DO NOT MISS OUT ON THESE MASSIVE DISCOUNTS!
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-6">
                <div className="text-2xl font-bold">Save $200+ per week</div>
                <div className="text-2xl font-bold">30% OFF Launch Price</div>
                <div className="text-2xl font-bold">Limited Time Only!</div>
              </div>
            </div>

            <div className="sunny-card bg-sunny-yellow text-sunny-orange-dark p-4 transform hover:rotate-1 transition-all">
              <h3 className="text-2xl font-bold">
                ⚡ STOP wasting money on tourist traps and overpriced everything!
              </h3>
            </div>
          </div>
        </section>

        <WaveDivider />

        {/* Pain Points Grid */}
        <section className="py-12 px-4 bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-display text-sunny-orange-dark mb-8 text-center">
              TIRED OF THESE STUDENT TRAVEL STRUGGLES?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Planning Headache */}
              <div className="sunny-card transform hover:rotate-1 transition-all sunny-wiggle">
                <div className="text-center">
                  <div className="w-16 h-16 bg-sunny-orange-light/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-sunny-orange-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-sunny-orange-dark mb-2">PLANNING OVERWHELM?</h3>
                  <div className="text-2xl font-bold text-sunny-orange mb-2">✅ WE SOLVES THIS!</div>
                  <p className="text-gray-700 mb-4">Personalized itineraries, hidden gems, and insider tips from real students worldwide!</p>
                  <div className="sunny-badge">
                    Save 10+ hours of research
                  </div>
                </div>
              </div>

              {/* Budget Restrictions */}
              <div className="sunny-card transform hover:-rotate-1 transition-all sunny-wiggle">
                <div className="text-center">
                  <div className="w-16 h-16 bg-sunny-yellow-light/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-sunny-orange-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-sunny-orange-dark mb-2">BROKE STUDENT BUDGET?</h3>
                  <div className="text-2xl font-bold text-sunny-orange mb-2">✅ SAVE $200+ PER WEEK!</div>
                  <p className="text-gray-700 mb-4">Official ISIC card + exclusive student discounts on everything you need!</p>
                  <div className="sunny-badge">
                    Up to 50% off everything
                  </div>
                </div>
              </div>

              {/* Solo Travel Fear */}
              <div className="sunny-card transform hover:rotate-1 transition-all sunny-wiggle">
                <div className="text-center">
                  <div className="w-16 h-16 bg-sunny-yellow-pale rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-sunny-orange-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-sunny-orange-dark mb-2">TRAVELING SOLO & SCARED?</h3>
                  <div className="text-2xl font-bold text-sunny-orange mb-2">✅ JOIN OUR COMMUNITY!</div>
                  <p className="text-gray-700 mb-4">Connect with 5,000+ verified students in community groups worldwide!</p>
                  <div className="sunny-badge">
                    Never travel alone again
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WaveDivider />

        {/* Savings Showcase */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display text-sunny-orange-dark mb-6">
              LOOK AT THESE INSANE SAVINGS!
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="sunny-card sunny-bounce">
                <div className="text-center">
                  <img alt="ISIC Logo" className="h-16 mx-auto mb-4" src="/lovable-uploads/b5a79eba-f98b-4e5f-9717-ff8fce4cc79a.png" />
                  <h3 className="text-2xl font-bold text-sunny-orange-dark mb-2">OFFICIAL ISIC CARD</h3>
                  <div className="text-3xl font-bold text-sunny-orange mb-2">Save up to 50%</div>
                  <p className="text-gray-700">On flights, accommodation, food, museums, and entertainment worldwide!</p>
                </div>
              </div>
              
              <div className="sunny-card sunny-bounce" style={{
              animationDelay: '0.2s'
            }}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-sunny-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plane className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-sunny-orange-dark mb-2">SUNNY AI PLANNING</h3>
                  <div className="text-3xl font-bold text-sunny-orange mb-2">Save $200+/week</div>
                  <p className="text-gray-700">Avoid tourist traps, find local gems, and get insider student rates!</p>
                </div>
              </div>
            </div>

            <div className="sunny-card bg-sunny-gradient text-white">
              <h3 className="text-2xl font-bold mb-2">LAUNCH SPECIAL: 30% OFF!</h3>
              <div className="flex justify-center items-center gap-4 mb-2">
                <div className="text-lg line-through opacity-75">$29/year</div>
                <div className="text-4xl font-bold">$20/year</div>
                <div className="bg-white text-sunny-orange px-3 py-1 rounded-full text-sm font-bold">LIMITED TIME!</div>
              </div>
              <p className="text-xl">Join while we're launching at this special price!</p>
            </div>
          </div>
        </section>

        <WaveDivider />

        {/* Solution Overview */}
        <section className="py-12 px-4 bg-white/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display text-sunny-orange-dark mb-4">
              ONE MEMBERSHIP. EVERYTHING YOU NEED.
            </h2>
            <div className="sunny-card bg-sunny-gradient text-white mb-8">
              <h3 className="text-2xl font-bold mb-2">INTRODUCING: FULLTIMER</h3>
              <p className="text-lg">The only student travel membership you'll ever need</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {["☀️ Personalized travel planning", "💳 Official ISIC card with global discounts", "🗺️ Hidden gems maps & local recommendations", "👥 City community groups & student meetups", "📱 24/7 travel support & emergency help", "🎒 Travel prep checklists & packing guides", "🏠 Verified accommodation recommendations", "🎉 Exclusive events & group trip opportunities"].map((benefit, index) => <div key={index} className="sunny-card flex items-center gap-3 hover:scale-105 transition-all">
                  <Check className="w-6 h-6 text-sunny-orange shrink-0" />
                  <span className="text-left font-medium">{benefit}</span>
                </div>)}
            </div>
          </div>
        </section>

        <WaveDivider />

        {/* Strong CTA with Pricing */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="sunny-card">
              <h2 className="text-4xl font-display text-sunny-orange-dark mb-6 hover:-rotate-1 transition-all">
                START YOUR ADVENTURE TODAY!
              </h2>
              
              <div className="mb-8">
                <div className="text-2xl font-bold text-gray-800 mb-2">Get FULLTIMER membership for</div>
                <div className="flex justify-center items-center gap-4 mb-4">
                  <div className="text-2xl text-gray-500 line-through">$29</div>
                  <div className="text-5xl font-bold text-sunny-orange">$20</div>
                  <div className="text-lg text-gray-600">/year</div>
                </div>
                <div className="text-lg text-gray-600 mb-4">One payment • Lifetime of adventures</div>
                <div className="sunny-tag bg-sunny-orange-light text-sunny-orange-dark inline-block font-bold">
                  🔥 30% OFF Launch Special - Limited Time!
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
                <Link to="/checkout">
                  <Button className="sunny-button text-xl font-bold px-12 py-6 hover:scale-105 transition-all">
                    <Users className="w-6 h-6 mr-2" />
                    JOIN FULLTIMER NOW
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
                </Link>

                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white p-4 rounded-lg border-2 border-sunny-orange-light shadow-sm">
                    <div className="flex items-center justify-center w-32 h-32 bg-white rounded border">
                      <img 
                        src="/lovable-uploads/1f781ab9-025b-4e22-9174-975611b14701.png" 
                        alt="QR Code to join checkout" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Quick checkout with your phone
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-sunny-yellow" />
                  <span>5,000+ happy students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-sunny-orange" />
                  <span>Amazing discounts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-sunny-orange" />
                  <span>Trusted community</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WaveDivider />

        {/* What is Student Travel Buddy - With Sunny and Dominika */}
        <section className="py-12 px-4 bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-display text-sunny-orange-dark mb-6">
              WHAT IS <span className="text-sunny-yellow-dark">STUDENT TRAVEL BUDDY?</span>
            </h2>
            
            <div className="sunny-card mb-8">
              <h3 className="text-xl font-bold text-sunny-orange-dark mb-4">
                THE ULTIMATE PLATFORM FOR STUDENT TRAVELERS
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                Your AI-powered companion Sunny + Global student community + Official ISIC card with massive discounts
              </p>
              <div className="flex justify-center items-center gap-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-sunny-orange" />
                  <span className="font-medium">5,000+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-sunny-orange" />
                  <span className="font-medium">$200+ Savings/Week</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="w-6 h-6 text-sunny-orange" />
                  <span className="font-medium">AI Trip Planning</span>
                </div>
              </div>
            </div>

            {/* Sunny and Dominika Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Sunny Side */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 mb-4">
                  <SunnyMascot size="lg" travelStyle="adventure" className="sunny-bounce" />
                  <div className="bg-sunny-yellow text-sunny-orange-dark px-3 py-1 rounded-full text-sm font-bold transform hover:rotate-12 transition-all max-w-[180px]">
                    I'm Sunny, your new travel buddy! ✨
                  </div>
                </div>
              </div>

              {/* Dominika Side */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 mb-4">
                  <img alt="Dominika - Founder of Student Travel Buddy" className="rounded-full shadow-xl w-24 h-24 border-2 border-white object-cover" src="/lovable-uploads/c38cdfa9-d9f7-4717-89e4-6cce94569408.jpg" />
                  <div className="flex flex-col items-start">
                    <h3 className="text-lg font-display text-sunny-orange-dark mb-2">
                      MEET <span className="text-sunny-yellow-dark">DOMINIKA</span>
                    </h3>
                    <div className="text-sm text-gray-700 mb-2">
                      Founder & Fellow Student Traveler
                    </div>
                    <div className="sunny-badge transform hover:rotate-3 transition-all">
                      Your travel sister ✨
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-2xl font-bold text-sunny-orange-dark mb-2">
                www.studenttravelbuddy.com
              </div>
              <p className="text-gray-600">Your gateway to affordable student travel</p>
            </div>
          </div>
        </section>

        <WaveDivider />

        {/* Ambassador Program Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="sunny-card bg-sunny-yellow-light border-2 border-sunny-orange-light transform hover:rotate-1 transition-all">
              <h3 className="text-2xl font-display text-sunny-orange-dark mb-3">
                BECOME A <span className="text-sunny-yellow-dark">SUNSHINE LEADER!</span>
              </h3>
              <p className="text-lg mb-4">
                Are you passionate about travel and helping fellow students? Join our ambassador program!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 justify-center">
                  <Star className="w-5 h-5 text-sunny-orange" />
                  <span className="font-medium">Lead your city's community</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Camera className="w-5 h-5 text-sunny-orange" />
                  <span className="font-medium">Get paid & perks</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Users className="w-5 h-5 text-sunny-orange" />
                  <span className="font-medium">Free membership</span>
                </div>
              </div>
              <Link to="/ambassador-application">
                <Button className="bg-sunny-orange hover:bg-sunny-orange-dark text-white font-bold px-6 py-2 rounded-full transform hover:scale-105 transition-all">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FlyerPage;