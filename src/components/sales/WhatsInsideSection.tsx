
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Calendar, Users, MapPin, CreditCard, BookOpen, MessageSquare, Video, Clock } from 'lucide-react';

const WhatsInsideSection = () => {
  const features = [
    {
      icon: <CreditCard className="h-6 w-6 text-[#F97316]" />,
      title: "Official ISIC Student Card",
      description: "Access to 150,000+ student discounts worldwide on travel, food, museums, and more"
    },
    {
      icon: <MapPin className="h-6 w-6 text-[#F97316]" />,
      title: "Personalized Hidden Gems Maps",
      description: "City-specific maps curated by local students showing the best non-touristy spots"
    },
    {
      icon: <Users className="h-6 w-6 text-[#F97316]" />,
      title: "City-Based WhatsApp Groups",
      description: "Connect with other student travelers in real-time at your destination"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-[#F97316]" />,
      title: "24/7 Travel Support Chat",
      description: "Get help with flight cancellations, hostel issues, or safety concerns anytime"
    },
    {
      icon: <Video className="h-6 w-6 text-[#F97316]" />,
      title: "Bi-Weekly Community Zoom Calls",
      description: "Connect with fellow travelers, share tips, and get personalized advice from Dominika"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-[#F97316]" />,
      title: "Budget Travel Mini-Courses",
      description: "Learn flight hacking, accommodation tricks, and smart spending strategies"
    },
    {
      icon: <Calendar className="h-6 w-6 text-[#F97316]" />,
      title: "Seasonal Group Trips",
      description: "Optional meet-ups in different cities with special group rates"
    },
    {
      icon: <Clock className="h-6 w-6 text-[#F97316]" />,
      title: "Lifetime Access",
      description: "All resources, updates, and community access for as long as you're a student"
    }
  ];
  
  const partnerLogos = [
    {
      name: "ISIC Logo",
      imageSrc: "/lovable-uploads/fce2b689-f403-4f89-9f79-0091c0c3be6f.png",
      website: "https://www.isic.org/"
    },
    {
      name: "UNESCO Logo",
      imageSrc: "/lovable-uploads/43eabef1-8bb9-46f7-b153-0a0c02087110.png",
      website: "https://www.unesco.org/"
    },
    {
      name: "University Partners",
      imageSrc: "/lovable-uploads/6d788043-5bb0-4bd1-aee1-41c5cedd3162.png",
      website: "https://www.studentclearinghouse.org/"
    }
  ];
  
  return (
    <section className="py-16 bg-white relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display inline-block bg-[#FEC6A1] px-6 py-2 rounded-lg transform rotate-1">
              THE DEETS: HERE'S WHAT YOU GET
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 bg-[#FEF7CD]/20 p-5 rounded-lg">
                <div className="shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button className="stb-button text-lg flex items-center justify-center gap-2 mx-auto">
              Get Started Today
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <p className="mt-4 text-sm text-gray-600">
              <span className="font-handwritten text-base">Limited offer!</span> Only 24 spots remaining at this price
            </p>
          </div>
          
          <div className="mt-12 flex justify-center items-center gap-8 flex-wrap">
            {partnerLogos.map((partner, index) => (
              <a 
                key={index} 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-opacity"
              >
                <img 
                  src={partner.imageSrc} 
                  alt={partner.name} 
                  className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity" 
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsInsideSection;
