
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FaqsSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "Do I need to be currently enrolled as a student to join?",
      answer: "Yes, the Sunshine Club is specifically for active students. You'll need to verify your student status to activate your ISIC card and access all benefits. We accept various forms of verification, including student IDs, enrollment letters, or tuition receipts."
    },
    {
      question: "How does the ISIC card work? Is it a physical or digital card?",
      answer: "You'll receive both a digital ISIC card (available immediately after verification) and a physical card mailed to your address. The ISIC card gives you access to 150,000+ student discounts worldwide on transportation, accommodations, food, museums, and more. Simply show your card at participating locations or use the ISIC app to access digital discounts."
    },
    {
      question: "What if I'm traveling to a country not covered in your resources?",
      answer: "While we have specific detailed guides for 30+ popular student destinations, our general travel principles, discount networks, and community support extend worldwide. Plus, you can request a custom guide for any destination through our monthly resource update system, and we'll prioritize creating resources for locations with member interest."
    },
    {
      question: "I'm not very experienced with travel. Is this still for me?",
      answer: "Absolutely! The Sunshine Club is designed for students at all experience levels. Our step-by-step modules start with the basics and build up to advanced travel strategies. Many of our most successful members had never traveled independently before joining. Our supportive community and 24/7 assistance ensure you'll never feel lost or overwhelmed."
    },
    {
      question: "How is this different from just using free travel blogs and resources?",
      answer: "While free resources can be helpful, they're often generic, outdated, or focused on travelers with different needs and budgets than students. The Sunshine Club provides student-specific guidance, verified up-to-date information, personalized support, exclusive discounts through ISIC, and a community of like-minded travelers. Our members save an average of $200/week on travel costs through our resources and discounts."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 30-day satisfaction guarantee. If you participate in the program, complete at least one module, and don't find value, we'll refund your purchase. Simply email our team with brief feedback about why it wasn't a fit for you."
    },
    {
      question: "Can I use the WhatsApp groups and community features if I'm shy or traveling solo?",
      answer: "Definitely! Many of our members are solo travelers or initially shy about connecting. Our community is known for being welcoming and supportive. You can participate as much or as little as you like, and we have specific resources and meetups designed for solo travelers to connect comfortably."
    }
  ];
  
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  return (
    <section className="py-16 relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display inline-block bg-[#FEC6A1] px-6 py-2 rounded-lg transform -rotate-1">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-[#FEC6A1]/30 rounded-lg overflow-hidden bg-white">
                <button 
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-[#FEF7CD]/20"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  {openFaq === index ? <ChevronUp className="h-5 w-5 shrink-0" /> : <ChevronDown className="h-5 w-5 shrink-0" />}
                </button>
                
                {openFaq === index && (
                  <div className="p-5 pt-0 border-t border-[#FEC6A1]/10">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-xl mb-6">Still have questions? We're happy to help!</p>
            <Button className="bg-[#F97316] hover:bg-[#fe4c02] text-white font-bold">
              Contact Support
            </Button>
          </div>
          
          <div className="mt-16 max-w-xl mx-auto bg-[#FDE1D3]/40 p-6 rounded-lg shadow-md border border-[#FEC6A1]/30">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-[#F97316]">Stay Updated</h3>
              <p className="text-gray-700">Get travel tips, exclusive deals, and destination inspiration</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 border border-[#FEC6A1] rounded-md"
                />
              </div>
              <Button className="bg-[#F97316] hover:bg-[#fe4c02] text-white font-bold">
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              By subscribing, you agree to receive marketing emails. You can unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqsSection;
