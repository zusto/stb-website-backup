
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ArrowRight, Quote, Link } from 'lucide-react';
import SunnyMascot from './SunnyMascot';
import { Button } from '@/components/ui/button';

const Testimonials = () => {
  const testimonials = [{
    quote: "Get the ISIC. Your student ID from a University in the US could be worthless over there, they don't know if it is authentic or not. Think of the ISIC as an internationally recognized version of your student ID. I find it interesting that a study abroad program would not give you an idea, but either way I get the ISIC.",
    author: "cloudjocky",
    location: "Reddit",
    color: "bg-sunny-yellow-pale",
    rotation: "rotate-2",
    emoji: "🌎",
    link: "https://www.reddit.com/r/travel/comments/rw6kd2/going_to_freiburg_im_breisgau_what_are_your/?utm_source=chatgpt.com"
  }, {
    quote: "We secured the ISIC for our trip to Europe. Many places offering discounts want to see that card. It paid off right away for private tours in five cities, saving us nearly $60. I was told to ask for student discounts everywhere as they often don't advertise it.",
    author: "Cruiser from Florida",
    location: "Cruise Critic",
    color: "bg-sunny-orange-pale",
    rotation: "rotate-0",
    emoji: "💰",
    link: "https://boards.cruisecritic.com/topic/1958979-isic-international-student-identity-card/?utm_source=chatgpt.com"
  }, {
    quote: "The ISIC card is definitely worthwhile. Both my kids used it in Italy, France and England and saved money on travel and attractions. Any other student card does not work for discounts.",
    author: "Fodors User",
    location: "Fodors Forum",
    color: "bg-sunny-peach",
    rotation: "-rotate-2",
    emoji: "💳",
    link: "https://www.fodors.com/community/europe/student-isic-card-helpful-569802/?utm_source=chatgpt.com"
  }, {
    quote: "In many (most?) countries you won't get student discounts for e.g. transport/event/entrance tickets unless you can prove you are a student. Afaik, if you're a 'foreigner' only an ISIC card will do that.",
    author: "Reddit User",
    location: "Reddit",
    color: "bg-sunny-yellow-light",
    rotation: "rotate-1",
    emoji: "🎫",
    link: "https://www.reddit.com/r/travel/comments/rw6kd2/going_to_freiburg_im_breisgau_what_are_your/?utm_source=chatgpt.com"
  }, {
    quote: "The discount is pretty significant and the sites add up so definitely worth bringing some proof of being a student.",
    author: "TripAdvisor User",
    location: "TripAdvisor Forum",
    color: "bg-sunny-orange-light",
    rotation: "-rotate-1",
    emoji: "🏛️",
    link: "https://www.tripadvisor.com/ShowTopic-g294201-i9404-k14196204-Student_Discounts_using_ISIC_Card_Is_it_worth-Cairo_Cairo_Governorate.html"
  }, {
    quote: "This app and student card have been very helpful to get tickets, hotel and transportation discounts all over Europe.",
    author: "App Store Review",
    location: "App Store",
    color: "bg-sunny-yellow-pale",
    rotation: "rotate-2",
    emoji: "📱",
    link: ""
  }];
  
  return <section className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-sunny-soft z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full sunny-dot-pattern opacity-20 z-0"></div>
      
      <div className="inner relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block stb-blob bg-white p-4 shadow-sm transform -rotate-2 mb-2">
            <h2 className="text-3xl md:text-4xl font-display text-sunny-orange m-0">REAL STUDENTS. REAL DISCOUNTS.</h2>
          </div>
          
          <div className="bg-sunny-yellow-light inline-block px-4 py-1 rounded-full mt-3">
            <span className="font-handwritten text-lg text-sunny-orange-dark">The proof is in the adventures ✈️</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {testimonials.map((testimonial, index) => <Card key={index} className={`${testimonial.color} border-none shadow-lg transform ${testimonial.rotation} transition-transform hover:-translate-y-2 duration-300`}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 relative">
                  <div className="absolute -right-2 -top-2 bg-sunny-orange text-white rounded-full h-8 w-8 flex items-center justify-center rotate-12 shadow-sm">
                    <Quote className="h-4 w-4" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-sunny-yellow-dark text-sunny-yellow-dark" />)}
                  </div>
                  
                  <blockquote className="text-xl font-medium leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <div className="flex items-center">
                        <p className="text-sm text-sunny-orange-dark">{testimonial.location}</p>
                        {testimonial.link && <a href={testimonial.link} target="_blank" rel="noopener noreferrer" className="ml-1 text-sunny-orange hover:text-sunny-orange-dark transition-colors" aria-label="View original post">
                            <Link className="h-3 w-3" />
                          </a>}
                      </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm sunny-bounce">
                      {testimonial.emoji}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="sunny-bounce" style={{
            animationDelay: "0.3s"
          }}>
              <SunnyMascot size="sm" travelStyle="adventure" />
            </div>
            <p className="font-handwritten text-xl text-sunny-orange">Join these happy travelers!</p>
          </div>
          
          <Button className="bg-sunny-gradient text-white font-bold rounded-full px-6 py-3 h-auto shadow-md hover:shadow-lg hover:-translate-y-1 transition-all group">
            See More Success Stories
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>;
};

export default Testimonials;
