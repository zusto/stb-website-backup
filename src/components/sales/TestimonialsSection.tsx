
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialsSectionProps {
  type: 'primary' | 'secondary';
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ type }) => {
  const primaryTestimonials = [
    {
      quote: "Sunny helped me find a €15 train deal — in 2 minutes. Legend.",
      highlight: "Found incredible deals I never would have discovered on my own!",
      author: "Emma L.",
      location: "Berlin",
      image: "/lovable-uploads/c38cdfa9-d9f7-4717-89e4-6cce94569408.jpg"
    },
    {
      quote: "Used my card for 5 discounts in 1 day. Trip = made.",
      highlight: "Saved so much money with exclusive student discounts!",
      author: "Jamal K.",
      location: "London",
      image: "/lovable-uploads/c38cdfa9-d9f7-4717-89e4-6cce94569408.jpg"
    },
    {
      quote: "The guide felt like it was written for me. Because it was.",
      highlight: "Personalized travel recommendations that actually fit my style!",
      author: "Sofia M.",
      location: "Barcelona",
      image: "/lovable-uploads/c38cdfa9-d9f7-4717-89e4-6cce94569408.jpg"
    }
  ];
  
  const secondaryTestimonials = [
    {
      quote: "I was worried about traveling solo, but the WhatsApp groups connected me with other students instantly.",
      highlight: "Made instant friends through the community groups!",
      author: "Tyler J.",
      location: "Chicago",
      image: "/lovable-uploads/c38cdfa9-d9f7-4717-89e4-6cce94569408.jpg"
    },
    {
      quote: "Got stuck in Paris with a cancelled flight. The live chat support walked me through everything and saved my trip.",
      highlight: "The support team literally saved my entire trip!",
      author: "Mia P.",
      location: "Sydney",
      image: "/lovable-uploads/c38cdfa9-d9f7-4717-89e4-6cce94569408.jpg"
    },
    {
      quote: "My budget was tight, but I still got to see all the 'must visits' plus hidden gems locals love.",
      highlight: "Experienced both tourist highlights and secret local spots!",
      author: "David T.",
      location: "Toronto",
      image: "/lovable-uploads/c38cdfa9-d9f7-4717-89e4-6cce94569408.jpg"
    }
  ];
  
  const testimonials = type === 'primary' ? primaryTestimonials : secondaryTestimonials;
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#FEF7CD]/40 relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block transform -rotate-2 relative">
            <h2 className="text-3xl md:text-4xl font-display inline-block bg-[#FEC6A1] px-6 py-2 rounded-lg">
              {type === 'primary' ? 'CLIENT LOVE NOTES:' : 'MORE SATISFIED CLIENTS:'}
            </h2>
          </div>
          <p className="text-xl italic text-[#F97316] mt-4 max-w-2xl mx-auto">
            "{testimonials[0].highlight}"
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-12">
          <Carousel>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className={`h-full ${type === 'primary' ? 'bg-[#FDE1D3]/50' : 'bg-[#FEF7CD]/50'} p-6 rounded-lg border border-white/20 shadow-lg transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                    <div className="flex flex-col gap-4 relative">
                      <div className="absolute -right-2 -top-2 bg-[#F97316] text-white rounded-full h-8 w-8 flex items-center justify-center rotate-12">
                        "
                      </div>
                      
                      <div className="mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-16 h-16 object-cover rounded-full border-2 border-white"
                        />
                      </div>
                      
                      <blockquote className="text-lg font-medium leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div>
                        <p className="font-bold">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                      </div>
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
    </section>
  );
};

export default TestimonialsSection;
