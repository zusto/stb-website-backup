import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Added import
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// Removed Globe, kept other necessary icons
import { Compass, Sun, MapPin, ArrowRight, Sparkles, Star, Heart, Instagram, Facebook, Youtube, Phone, Mail } from 'lucide-react'; 
import SunnyMascot from './SunnyMascot';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    {
      platformName: 'Instagram',
      handle: '@studenttravelbuddyofficial',
      href: 'https://www.instagram.com/studenttravelbuddyofficial',
      icon: <Instagram className="h-5 w-5" />, // Reduced size
      bgColor: 'bg-white/50 backdrop-blur-sm',
      textColor: 'text-sunny-orange-dark',
      hoverEffect: 'hover:scale-105 hover:rotate-[-2deg] hover:bg-white/70',
      iconBgColor: 'bg-sunny-yellow/50 group-hover:bg-sunny-yellow/70',
      emoji: '📸'
    },
    {
      platformName: 'Facebook',
      handle: '@studenttravelbuddyofficial',
      href: 'https://www.facebook.com/studenttravelbuddyofficial',
      icon: <Facebook className="h-5 w-5" />, // Reduced size
      bgColor: 'bg-white/50 backdrop-blur-sm',
      textColor: 'text-sunny-orange-dark',
      hoverEffect: 'hover:scale-105 hover:rotate-[2deg] hover:bg-white/70',
      iconBgColor: 'bg-sunny-yellow/50 group-hover:bg-sunny-yellow/70',
      emoji: '👍'
    },
    {
      platformName: 'YouTube',
      handle: '@studenttravelbuddyofficial',
      href: 'https://www.youtube.com/@studenttravelbuddyofficial',
      icon: <Youtube className="h-5 w-5" />, // Reduced size
      bgColor: 'bg-white/50 backdrop-blur-sm',
      textColor: 'text-sunny-orange-dark',
      hoverEffect: 'hover:scale-105 hover:rotate-[-1deg] hover:bg-white/70',
      iconBgColor: 'bg-sunny-yellow/50 group-hover:bg-sunny-yellow/70',
      emoji: '📺'
    },
    {
      platformName: 'TikTok',
      handle: '@studenttravelbuddy.com',
      href: 'https://www.tiktok.com/@studenttravelbuddy.com',
      icon: (
        <span className="flex items-center justify-center h-5 w-5"> {/* Adjusted parent span size */}
          <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5"> {/* Icon color will be inherited */}
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.5.09 1.53.03 3.08-.12 4.6-.95-.12-1.9-.36-2.79-.71a10.21 10.21 0 01-2.64-1.79c-.99-1.08-1.67-2.47-1.81-3.97-.13-.04-.26-.08-.39-.12zm-2.99 5.88c.13 2.04 1.01 3.94 2.42 5.24 1.4 1.3 3.33 1.96 5.34 1.78v3.81c-.88.12-1.76.17-2.64.17-2.38 0-4.69-1.02-6.33-2.7-1.64-1.67-2.56-3.9-2.56-6.23.01-1.46.02-2.93.01-4.39h3.8Z" />
          </svg>
        </span>
      ),
      bgColor: 'bg-white/50 backdrop-blur-sm',
      textColor: 'text-sunny-orange-dark',
      accentClasses: '', // Removed TikTok specific shadow
      hoverEffect: 'hover:scale-105 hover:skew-y-[-2deg] hover:bg-white/70',
      iconBgColor: 'bg-sunny-yellow/50 group-hover:bg-sunny-yellow/70',
      emoji: '🎶'
    },
  ];

  const exploreLinks = [
    { name: 'Travel Styles', icon: <Compass className="h-4 w-4" />, href: '/#quiz' },
    { name: 'Free Resources', icon: <Star className="h-4 w-4" />, href: '/freebies' }, // Placeholder
    { name: 'About Us', icon: <Sun className="h-4 w-4" />, href: '/#backstory' },
    { name: 'Sunshine Club', icon: <Sparkles className="h-4 w-4" />, href: '/#sunshine-club' } // Added Sunshine Club
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        setIsSubmitting(true);
        const response = await axios.post('https://studenttravelbuddy.com/api/subscribers/subscribe', {
          email,
          source: 'Footer Form'
        });

        if (response.data.success) {
          toast({
            title: "Success!",
            description: "You're now part of the Sunshine Club!",
          });
          setEmail('');
        }
      } catch (error) {
        console.error('❌ Subscription error:', error);
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

   return (
    <footer className="relative overflow-hidden py-8 sm:py-12 bg-sunny-gradient text-midnight">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-film-grain opacity-10 mix-blend-multiply pointer-events-none"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-sunny-yellow/10 rounded-full blur-xl opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-40 sm:w-80 h-40 sm:h-80 bg-sunny-orange/5 rounded-full blur-2xl opacity-70 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <SunnyMascot size="sm" />
              <span className="font-display text-lg sm:text-xl text-sunny-orange-dark">STUDENT TRAVEL BUDDY</span>
            </div>
            <p className="font-handwritten text-xl text-midnight">
              Travel brighter. Spend smarter.
            </p>
            
            <div className="mt-4">
              <div className="bg-white/40 inline-block px-4 sm:px-5 py-2 rounded-full font-medium text-sunny-orange-dark backdrop-blur-sm text-sm sm:text-base">
                @STUDENTTRAVELBUDDYOFFICIAL
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-display text-base sm:text-lg text-sunny-orange-dark mb-4 transform -rotate-2 inline-block bg-white/40 px-3 py-1 rounded-lg backdrop-blur-sm">
              EXPLORE
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="text-midnight hover:text-sunny-orange transition-colors flex items-center gap-2 group text-sm sm:text-base">
                    <span className="bg-white/50 p-1.5 rounded-full group-hover:bg-white/70 transition-colors">
                      {item.icon}
                    </span> 
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section - Fixed alignment */}
          <div>
            <h3 className="font-display text-base sm:text-lg text-sunny-orange-dark mb-4 transform rotate-1 inline-block bg-white/40 px-3 py-1 rounded-lg backdrop-blur-sm">
              CONTACT US
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-midnight">
                <span className="bg-white/50 p-2 rounded-full mt-0.5 flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm sm:text-base">Phone</p>
                  <a href="tel:+12136323638" className="text-sm hover:text-sunny-orange transition-colors break-all">
                    +1 213 632 3638
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-midnight">
                <span className="bg-white/50 p-2 rounded-full mt-0.5 flex-shrink-0">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm sm:text-base">Email</p>
                  <a href="mailto:hello@studenttravelbuddy.com" className="text-sm hover:text-sunny-orange transition-colors break-all">
                    hello@studenttravelbuddy.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-display text-base sm:text-lg text-sunny-orange-dark mb-4 transform -rotate-1 inline-block bg-white/40 px-3 py-1 rounded-lg backdrop-blur-sm">
              SUNSHINE CLUB
            </h3>
            <p className="mb-4 font-handwritten text-base sm:text-lg text-midnight">Get exclusive travel drops and tips!</p>
            <form className="flex flex-col gap-3">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/70 border border-sunny-orange-light/50 focus-visible:ring-2 focus-visible:ring-sunny-orange text-midnight placeholder:text-sunny-orange-dark/70 rounded-xl backdrop-blur-sm h-10 sm:h-auto" 
              />
              <Button className="bg-sunny-yellow hover:bg-sunny-yellow-light text-sunny-orange-dark font-bold rounded-xl flex items-center gap-2 group h-10 sm:h-auto">
                Join Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>

        {/* Social Links Section - Mobile optimized */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-sunny-orange-dark/20">
          <h4 className="font-display text-base sm:text-lg text-sunny-orange-dark mb-4 sm:mb-6 text-center">
            CONNECT WITH US
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-300 ease-in-out group transform hover:-translate-y-1 ${item.bgColor} ${item.textColor} ${item.hoverEffect}`}
              >
                <span className={`flex items-center justify-center h-8 w-8 rounded-lg shadow-sm group-hover:scale-110 transition-transform ${item.iconBgColor}`}>
                  {item.icon}
                </span>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-display text-xs uppercase tracking-wider truncate">{item.platformName} {item.emoji}</span>
                  <span className="font-handwritten text-sm truncate">{item.handle}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-sunny-orange-dark/20 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-midnight opacity-80 text-center md:text-left">© {new Date().getFullYear()} Student Travel Buddy. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/terms-and-conditions" className="text-sm text-midnight opacity-80 hover:text-sunny-orange transition-colors">Terms</Link>
            <Link to="/privacy-policy" className="text-sm text-midnight opacity-80 hover:text-sunny-orange transition-colors">Privacy</Link>
          </div>
        </div>
        
        {/* Fun Section */}
        <div className="mt-6 sm:mt-8 text-center p-4 sm:p-5 bg-white/30 rounded-3xl backdrop-blur-sm border border-sunny-orange-light/30 relative overflow-hidden">
          <div className="absolute inset-0 sunny-dot-pattern opacity-10 pointer-events-none"></div>
          <div className="relative z-10">
            <p className="font-handwritten text-xl sm:text-2xl text-sunny-orange-dark mb-2">Drop a "☀️" in the comments</p>
            <p className="text-midnight text-sm sm:text-base">...and unlock our secret travel hack guide!</p>
            
            <div className="mt-3 flex justify-center gap-2 text-sunny-orange">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 sunny-pulse" />
              <Star className="h-4 w-4 sm:h-5 sm:w-5 sunny-pulse" style={{ animationDelay: "0.3s" }} />
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 sunny-pulse" style={{ animationDelay: "0.6s" }} />
            </div>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 hidden lg:block sunny-bounce">
          <div className="bg-white/40 backdrop-blur-sm p-2 sm:p-3 rounded-xl text-sunny-orange-dark transform rotate-6 border border-sunny-orange-light/20">
            <p className="font-handwritten text-base sm:text-lg">Summer '25 ☀️</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;