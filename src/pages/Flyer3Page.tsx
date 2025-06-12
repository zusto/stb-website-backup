
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Flyer3Page = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full">
        {/* First Image - Full Screen */}
        <div className="w-full h-screen">
          <img 
            src="/lovable-uploads/20b8ff21-d347-450e-80b1-003347fe39d4.png" 
            alt="Flyer Front" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Second Image - Full Screen */}
        <div className="w-full h-screen">
          <img 
            src="/lovable-uploads/fd339e72-2f36-4b6f-9071-dd2e975119a6.png" 
            alt="Flyer Back" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Flyer3Page;