
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const ModuleBreakdownSection = () => {
  const [openModule, setOpenModule] = useState<number | null>(0);
  
  const modules = [
    {
      title: "TRAVEL PLANNING MASTERY",
      content: "Build your confidence with our step-by-step system for planning any trip without overwhelm. You'll learn how to research destinations effectively, create flexible itineraries, and use our proprietary decision-making framework to cut through information overload. Includes our Budget Allocation Worksheet and Destination Research Template to make planning a breeze."
    },
    {
      title: "BUDGET HACKING ESSENTIALS",
      content: "Discover how to stretch your student budget further than you ever thought possible. We'll show you how to find flight deals nobody else sees, secure accommodations at local prices, and eat well without breaking the bank. You'll get access to our Flight Deal Alert System, Student Discount Database, and Budget Tracking Tool that has saved students an average of $200/week while traveling."
    },
    {
      title: "AUTHENTIC EXPERIENCES & CONNECTIONS",
      content: "Learn how to break away from tourist traps and create meaningful travel experiences. This module shows you how to connect with locals, find hidden gems, and create memories that last a lifetime. You'll receive our Local Connection Scripts, Cultural Respect Guidelines, and exclusive access to our City Ambassador Network who can show you their hometown through a student's eyes."
    },
    {
      title: "TRAVEL SAFETY & LOGISTICS",
      content: "Feel confident and prepared for anything your journey throws your way. From navigating unfamiliar transportation systems to handling emergencies abroad, this module covers everything you need to know about staying safe and solving problems on the road. Includes our Safety Checklist, Essential Apps Guide, and Emergency Response Templates that help you handle any situation."
    }
  ];
  
  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };
  
  return (
    <section className="py-16 relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display inline-block bg-[#FEC6A1] px-6 py-2 rounded-lg transform -rotate-1">
              TAKE A PEEK INTO THE MODULES
            </h2>
            <p className="text-lg text-[#F97316] mt-4">
              Each module is designed to tackle a specific challenge students face when traveling
            </p>
          </div>
          
          <div className="space-y-4 mb-10">
            {modules.map((module, index) => (
              <div key={index} className="border border-[#FEC6A1]/30 rounded-lg overflow-hidden bg-white">
                <button 
                  className="w-full flex justify-between items-center p-5 text-left bg-[#FEF7CD]/30 hover:bg-[#FEF7CD]/50"
                  onClick={() => toggleModule(index)}
                >
                  <h3 className="text-xl font-bold">MODULE {index + 1}: {module.title}</h3>
                  {openModule === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {openModule === index && (
                  <div className="p-5">
                    <p className="text-gray-700">{module.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button className="stb-button text-lg flex items-center justify-center gap-2 mx-auto">
              I Want Access To All Modules
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleBreakdownSection;
