
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbassadorApplicationForm from '@/components/ambassador-application/AmbassadorApplicationForm'; // Updated import path
import WaveDivider from '@/components/WaveDivider';

const AmbassadorApplicationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navbar />
      <div className="my-4 md:my-8 lg:my-12"></div>
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <AmbassadorApplicationForm />
      <div className="mt-10 md:mt-14"> </div>
      </main>
      <WaveDivider />
      <Footer />
    </div>
  );
};

export default AmbassadorApplicationPage;
