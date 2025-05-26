import React from 'react';
import { UserCheck, Mail, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SunnyMascot from './SunnyMascot';

const SignUp = () => {
  // partnerLogos array removed from here
  return <section id="signup" className="py-16 bg-gradient-to-b from-white to-[#ffeea6]/60 relative">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        
        {/* Newsletter Section Removed */}

        {/* Partner Logos section removed from here */}
        {/* The section below has been removed:
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">Trusted partners and affiliations</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {partnerLogos.map((partner, index) => <a key={index} href={partner.website} target="_blank" rel="noopener noreferrer" className="transition-opacity">
                <img alt={partner.name} className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity" src={partner.imageSrc} />
              </a>)}
          </div>
        </div>
        */}
      </div>
    </section>;
};
export default SignUp;
