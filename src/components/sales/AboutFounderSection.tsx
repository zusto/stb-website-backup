
import React from 'react';

const AboutFounderSection = () => {
  const credentials = [
    "Visited 30+ countries across 5 continents",
    "Studied abroad in 3 different countries",
    "Featured in Student Travel Magazine",
    "Built a community of 5,000+ student travelers",
    "Partnered with ISIC and UNESCO",
    "Helped students save $1M+ on travel expenses"
  ];

  return (
    <section id="about" className="py-16 relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display inline-block bg-[#FEC6A1] px-6 py-2 rounded-lg transform rotate-1">
              HEY THERE, I'M DOMINIKA!
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="polaroid transform rotate-3 mb-4">
                <img 
                  alt="Dominika - Student Travel Expert" 
                  className="w-full h-auto object-cover retro-filter" 
                  src="/lovable-uploads/c38cdfa9-d9f7-4717-89e4-6cce94569408.jpg" 
                />
                <p className="text-center font-handwritten mt-2">Exploring the world one budget hack at a time!</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg">
                I didn't just grow up traveling — I grew up learning how to <span className="text-[#F97316] font-medium">live anywhere</span> on a student budget. From exploring Australia at 15 to studying in the U.S. and Norway, I discovered that travel wasn't just about taking photos — it was about finding authentic experiences without going broke.
              </p>
              
              <p className="text-lg">
                After witnessing countless students wasting money on tourist traps and missing out on real connections, I created Student Travel Buddy to share everything I've learned. Now, our community helps thousands of students travel smarter, spend less, and experience more.
              </p>
              
              <div className="bg-[#FEF7CD]/40 p-4 rounded-lg mt-4">
                <h3 className="font-bold text-lg mb-2">A Few Travel Credentials:</h3>
                <ul className="space-y-2">
                  {credentials.map((credential, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-[#F97316]">✓</span>
                      <span>{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounderSection;
