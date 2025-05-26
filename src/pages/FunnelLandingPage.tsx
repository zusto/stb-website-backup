
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SunnyMascot from '@/components/SunnyMascot';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Users, Star } from 'lucide-react';

const FunnelLandingPage = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Process submission logic would go here
  };

  const features = [
    "Unlock exclusive student travel discounts up to 60% off",
    "Join a community of 10,000+ student travelers",
    "Access to members-only destination guides & resources",
    "Weekly personalized travel recommendations",
    "Entry to monthly travel giveaways & contests",
    "Connect with travel buddies for your next adventure"
  ];

  const testimonials = [
    {
      name: "Alex K.",
      university: "UCLA",
      quote: "The Sunshine Club saved me over $400 on my spring break trip to Cancun!"
    },
    {
      name: "Mia T.",
      university: "NYU",
      quote: "I found my study abroad roommate through the community. Best decision ever!"
    },
    {
      name: "Jamal R.",
      university: "University of Michigan",
      quote: "Their city guides helped me discover hidden gems that weren't in any tourist book."
    }
  ];

  return (
    <div className="stb-page-container min-h-screen">
      <Navbar />

      <div className="relative">
        {/* Hero Section with bright yellow-orange gradient */}
        <div className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-sunny-yellow-light via-sunny-orange-light to-sunny-yellow">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block mb-6 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-sunny-orange-dark font-semibold flex items-center gap-2">
                    <Star className="h-5 w-5 text-sunny-orange" fill="currentColor" /> 
                    Limited time offer - 50% off for first 100 members!
                  </p>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-display mb-6 text-white drop-shadow-sm">
                  JOIN THE <span className="text-sunny-orange-dark">SUNSHINE CLUB</span>
                </h1>
                
                <p className="text-xl mb-8 text-white/90 max-w-xl">
                  The exclusive community for student travelers who want to explore the world with confidence, authenticity, and serious savings.
                </p>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="sunny-input flex-1 text-lg border-2 border-sunny-yellow-light focus:border-sunny-yellow"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-sunny-orange hover:bg-sunny-orange-dark text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
                
                <p className="text-sm text-white/70">
                  Already traveling with us? <a href="#login" className="underline font-medium">Sign in</a>
                </p>
              </div>
              
              <div className="flex-1 relative">
                <div className="relative z-10">
                  <SunnyMascot 
                    size="lg" 
                    className="mx-auto" 
                    withText={true}
                    message="Let's explore together! Join our sunny community of student travelers!" 
                    travelStyle="adventure"
                  />
                </div>
                <div className="absolute inset-0 bg-sunny-yellow/30 rounded-full blur-3xl -z-10 animate-pulse-gentle"></div>
              </div>
            </div>
          </div>
          
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="stb-wave-divider stb-wave-divider-bottom"></div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="relative py-16 bg-sunny-cream">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display mb-4 text-sunny-orange">
                EVERYTHING YOU NEED FOR AMAZING STUDENT TRAVEL
              </h2>
              <p className="text-lg text-sunny-orange-dark max-w-2xl mx-auto">
                The Sunshine Club gives you all the tools, resources, and community support to make your travel dreams a reality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border-2 border-sunny-yellow-light/50">
                  <div className="flex items-start gap-3">
                    <div className="bg-sunny-gradient rounded-full p-2 shrink-0">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-lg">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="relative py-16 bg-gradient-to-br from-sunny-yellow-pale to-sunny-orange-pale">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-10">
              <div className="inline-block bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full mb-4">
                <p className="text-sunny-orange font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" /> 
                  Join 10,000+ student travelers
                </p>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display mb-6 text-sunny-orange">
                STUDENTS LOVE THE SUNSHINE CLUB
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-md border-2 border-sunny-yellow-light/30 transform hover:-translate-y-1 transition-all">
                  <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="bg-sunny-gradient w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.university}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-sunny-orange-light/30 text-center">
              <h3 className="text-2xl font-display mb-4 text-sunny-orange">
                READY TO JOIN THE SUNSHINE?
              </h3>
              <p className="text-lg mb-6">
                Get access to exclusive discounts, a supportive community, and all the resources you need for incredible student travel experiences.
              </p>
              <Button className="bg-sunny-gradient text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
                Join the Sunshine Club Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="mt-4 text-sm text-gray-600">
                No credit card required to sign up
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FunnelLandingPage;
