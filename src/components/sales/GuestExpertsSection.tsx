
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GuestExpertsSection = () => {
  const experts = [
    {
      name: "Max Chen",
      title: "Budget Flight Specialist",
      description: "Former airline employee turned flight hacking expert, Max has helped students save over $500,000 on airfare. His specialized techniques for finding hidden deals and maximizing student discounts have been featured in Travel + Leisure and Budget Travel guides.",
      image: "/lovable-uploads/c38cdfa9-d9f7-4717-89e4-6cce94569408.jpg"
    },
    {
      name: "Priya Sharma",
      title: "Cultural Immersion Coach",
      description: "Anthropologist and travel writer who has lived with local families in 15 countries. Priya specializes in helping travelers move beyond surface-level tourism and build meaningful connections abroad. Her work on respectful cultural exchange has been recognized by UNESCO.",
      image: "/lovable-uploads/c38cdfa9-d9f7-4717-89e4-6cce94569408.jpg"
    },
    {
      name: "Miguel Alvarez",
      title: "Digital Nomad & Tech Expert",
      description: "Tech entrepreneur who has worked remotely from 25+ countries while studying online. Miguel shares essential tools, apps, and workflows for staying connected, productive, and secure while traveling. Featured in Forbes 30 Under 30 for his travel productivity platform.",
      image: "/lovable-uploads/c38cdfa9-d9f7-4717-89e4-6cce94569408.jpg"
    }
  ];
  
  return (
    <section className="py-16 relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-display inline-block bg-[#FEC6A1] px-6 py-2 rounded-lg transform -rotate-1">
              MEET THE GUEST EXPERTS
            </h2>
            <p className="text-lg text-[#F97316] mt-4">
              Each expert brings specialized knowledge from their area of travel expertise
            </p>
          </div>
          
          <div className="relative px-12">
            <Carousel>
              <CarouselContent>
                {experts.map((expert, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-md h-full border border-[#FEC6A1]/20 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4 w-24 h-24 rounded-full overflow-hidden border-2 border-[#FEC6A1]">
                          <img 
                            src={expert.image}
                            alt={expert.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <h3 className="font-bold text-xl mb-1">{expert.name}</h3>
                        <p className="text-[#F97316] font-medium mb-4">{expert.title}</p>
                        <p className="text-gray-700 text-sm">{expert.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestExpertsSection;
