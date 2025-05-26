
import React from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const BenefitsSection = () => {
  const isMobile = useIsMobile();
  return <section className="py-16 relative">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto text-center">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 sunshine-accent mb-3">
            <Star className="h-4 w-4" />
            <span>Why Join Us</span>
          </div>
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-display mb-6 relative z-10 bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FDAD32] text-transparent drop-shadow-sm animate-pulse-gentle">
              WHY STUDENTS LOVE US
            </h2>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-yellow-200/20 to-orange-300/20 blur-lg transform scale-110"></div>
            <span className="absolute -top-6 right-0 text-yellow-300 animate-float">✨</span>
            <span className="absolute -bottom-4 left-4 text-yellow-400 animate-bounce-subtle">⭐</span>
          </div>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join thousands of students who are transforming their travel experience with our community and resources
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefit Card 1 */}
          <div className="rounded-xl p-6 shadow-md border-2 border-[#FFD600]/30 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="mx-auto bg-gradient-to-br from-[#FFD600] to-[#F97316] w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Exclusive Access</h3>
            <p className="text-gray-600">
              Get insider tips and exclusive discounts only available to our community members
            </p>
          </div>
          
          {/* Benefit Card 2 */}
          <div className="rounded-xl p-6 shadow-md border-2 border-[#FFD600]/30 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="mx-auto bg-gradient-to-br from-[#FFD600] to-[#F97316] w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Save Money</h3>
            <p className="text-gray-600">Our members can save an average of $200/week when travelling with our exclusive student deals</p>
          </div>
          
          {/* Benefit Card 3 */}
          <div className="rounded-xl p-6 shadow-md border-2 border-[#FFD600]/30 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="mx-auto bg-gradient-to-br from-[#FFD600] to-[#F97316] w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Global Community</h3>
            <p className="text-gray-600">Connect with us through our Sunny avatar and peers from top universities worldwide for authentic travel experiences</p>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          
        </div>
      </div>
    </section>;
};

// List of universities to show the total count
const universities = ["Harvard", "Oxford", "MIT", "Stanford", "Yale", "Princeton", "Columbia", "Cambridge", "Berkeley", "Chicago", "UPenn", "Caltech", "Cornell", "Toronto", "NUS", "NTU", "HKUST", "Sydney", "Tsinghua", "UCLA", "NYU", "Duke", "Imperial", "ETH Zurich", "McGill", "ANU", "Tokyo", "Seoul", "Singapore"];
export default BenefitsSection;
