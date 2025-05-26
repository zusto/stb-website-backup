
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Map } from 'lucide-react';
import SunnyMascot from '@/components/SunnyMascot';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="stb-page-container min-h-screen">
      <Navbar />
      
      <div className="relative py-24">
        <div className="container px-4 h-[60vh] flex flex-col items-center justify-center">
          <div className="mb-6">
            <SunnyMascot 
              size="lg" 
              withText={true} 
              message="Oops! Looks like we took a wrong turn!" 
              travelStyle="adventure"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display mb-4 text-sunny-orange">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Page Not Found</h2>
          
          <p className="text-lg max-w-md text-center mb-8">
            The page you're looking for doesn't exist or has been moved to another URL.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-sunny-gradient hover:bg-sunny-orange-dark">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="border-sunny-orange text-sunny-orange">
              <Link to="/sales">
                <Map className="mr-2 h-5 w-5" />
                Explore Our Offerings
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
