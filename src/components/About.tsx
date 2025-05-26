
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookUser, Camera } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-white to-[#FEF7CD]/30 relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <Card className="overflow-hidden shadow-xl border-none transform rotate-2">
              <CardContent className="p-0">
                <div className="bg-[#ff77a0] p-8 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <BookUser className="h-8 w-8" />
                    <span className="font-handwritten text-xl">Travel Philosophy</span>
                  </div>
                  <h3 className="text-xl font-display mb-4">OUR MISSION</h3>
                  <blockquote className="text-lg md:text-xl border-l-4 border-white pl-4 font-medium">
                    "Our mission is to help students travel smarter, explore confidently, and feel connected while discovering the world—fostering multicultural exchange to promote understanding, empathy, and global peace."
                  </blockquote>
                  
                  <div className="mt-6 polaroid transform -rotate-3 inline-block">
                    <Camera className="h-6 w-6" />
                    <p className="text-center font-handwritten text-xs">Capture moments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="order-1 md:order-2">
            <span className="inline-block bg-[#FEF7CD] text-sm px-4 py-1 rounded-full transform rotate-1">
              <span className="font-handwritten text-[#F97316]">ABOUT US</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-2 mb-6 transform -rotate-1 inline-block bg-[#FEC6A1]/60 px-4 py-1 rounded-lg">
              WE'RE YOUR TRAVEL BESTIE
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Student Travel Buddy isn't just another travel blog or discount app. It's a smarter, more soulful way to travel — with a real plan, real perks, and a real buddy by your side.
              </p>
              <p className="font-handwritten text-lg text-[#F97316]">
                Inspired by countless adventures across 30+ countries, we created a digital avatar named Sunny, your travel bestie in the form of a fluffy mascot with a glowing aura and nonstop good vibes.
              </p>
              <p>
                With our personalized quiz, you'll get a travel plan tailored to you. With your official ISIC card, you'll unlock global student perks. With our guides and planners, you'll land in any city ready to move like a local — not a lost tourist.
              </p>
              
              <div className="mt-4 bg-[#FEF7CD]/40 p-4 rounded-lg border border-[#FEC6A1]/20 transform rotate-1">
                <p className="font-handwritten text-center text-[#F97316]">
                  "Not just a travel app. A travel bestie." ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
