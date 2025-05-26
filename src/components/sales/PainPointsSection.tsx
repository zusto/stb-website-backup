
import React from 'react';

const PainPointsSection = () => {
  const painPoints = [
    "You feel overwhelmed trying to plan trips on your own, drowning in endless options and confusing information",
    "You're tired of overpaying for tourist traps that leave you disappointed and wondering where the 'real' experiences are",
    "You struggle to find budget-friendly options that don't sacrifice the quality of your travel experience",
    "You worry about safety and feeling isolated when traveling to new places alone",
    "You're frustrated by the lack of student-specific travel resources that understand your unique needs and budget constraints",
    "You're anxious about making costly mistakes or getting scammed when booking accommodations or activities"
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#FEF7CD]/40 relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display inline-block bg-[#FEC6A1] px-6 py-2 rounded-lg transform rotate-1">
              DOES THIS SOUND LIKE YOU?
            </h2>
          </div>
          
          <ul className="space-y-4">
            {painPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-[#F97316] text-xl">•</span>
                <p className="text-lg">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
