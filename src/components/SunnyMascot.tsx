
import React from 'react';
import { Backpack, Camera, Book, Map, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SunnyMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  message?: string;
  className?: string;
  travelStyle?: 'default' | 'beach' | 'cultural' | 'educational' | 'adventure' | 'fashion';
}

const SunnyMascot = ({
  size = 'md',
  withText = false,
  message,
  className = '',
  travelStyle = 'default'
}: SunnyMascotProps) => {
  const isMobile = useIsMobile();

  // Enhanced size mappings with 50% bigger avatar for xl size
  const sizeClasses = {
    sm: isMobile ? 'h-10 w-10' : 'h-12 w-12',
    md: isMobile ? 'h-16 w-16' : 'h-20 w-20',
    lg: isMobile ? 'h-24 w-24' : 'h-32 w-32',
    xl: isMobile ? 'h-60 w-60' : 'h-84 w-84' // Increased by 50% from h-40/w-40 to h-60/w-60 for mobile and h-56/w-56 to h-84/w-84 for desktop
  };

  // Travel style accessory with updated Gen Z design
  const renderAccessory = () => {
    const iconSize = size === 'xl' ? (isMobile ? 'h-5 w-5' : 'h-6 w-6') : (isMobile ? 'h-3 w-3' : 'h-4 w-4');
    const containerClass = size === 'xl' ? 'p-2' : 'p-1';
    
    switch (travelStyle) {
      case 'beach':
        return <div className={`absolute -top-${size === 'xl' ? '4' : '2'} -right-${size === 'xl' ? '3' : '1'} transform rotate-6 z-10`}>
            <div className={`bg-sunny-orange-light h-${size === 'xl' ? '5' : '3'} w-${size === 'xl' ? '10' : '7'} rounded-full`}></div>
            <div className={`bg-sunny-orange-light h-${size === 'xl' ? '8' : '5'} w-${size === 'xl' ? '14' : '10'} rounded-t-full -mt-1`}></div>
          </div>;
      case 'cultural':
        return <div className={`absolute -top-${size === 'xl' ? '3' : '1'} -right-${size === 'xl' ? '3' : '1'} z-10`}>
            <div className={`bg-sunny-yellow-light rounded-full ${containerClass}`}>
              <Camera className={`${iconSize} text-sunny-orange`} />
            </div>
          </div>;
      case 'educational':
        return <div className={`absolute -top-${size === 'xl' ? '3' : '1'} -right-${size === 'xl' ? '3' : '1'} z-10`}>
            <div className={`bg-sunny-yellow-light rounded-full ${containerClass}`}>
              <Book className={`${iconSize} text-sunny-orange`} />
            </div>
          </div>;
      case 'adventure':
        return <div className={`absolute -top-${size === 'xl' ? '3' : '1'} -right-${size === 'xl' ? '3' : '1'} z-10`}>
            <div className={`bg-sunny-yellow-light rounded-full ${containerClass}`}>
              <Backpack className={`${iconSize} text-sunny-orange`} />
            </div>
          </div>;
      case 'fashion':
        return <>
            {/* Pink Hat and Heart Glasses are now part of the image */}
            {/* Arms */}
          </>;
      default:
        return null;
    }
  };

  // Add sparkle effect for Gen Z dynamic feel with size adjustments
  const renderSparkles = () => {
    const smallIconSize = size === 'xl' ? (isMobile ? 'h-5 w-5' : 'h-6 w-6') : (isMobile ? 'h-3 w-3' : 'h-4 w-4');
    const tinyIconSize = size === 'xl' ? (isMobile ? 'h-4 w-4' : 'h-5 w-5') : (isMobile ? 'h-2 w-2' : 'h-3 w-3');
    
    return <>
        <div className={`absolute -top-${size === 'xl' ? '3' : '1'} -left-${size === 'xl' ? '3' : '1'} sunny-pulse`} style={{
        animationDelay: '0.5s'
      }}>
          <Sparkles className={`${smallIconSize} text-sunny-yellow`} />
        </div>
        <div className={`absolute -bottom-${size === 'xl' ? '3' : '1'} -right-${size === 'xl' ? '3' : '1'} sunny-pulse`} style={{
        animationDelay: '1s'
      }}>
          <Sparkles className={`${tinyIconSize} text-sunny-orange`} />
        </div>
      </>;
  };

  // Changed: Updated the container to ensure visibility on all formats
  return <div className={`flex ${withText ? 'flex-row items-center' : 'flex-col'} ${isMobile ? withText ? 'flex-col items-center' : 'items-center' : 'items-start'} gap-2 md:gap-4 ${className}`}>
      <div className="relative">
        {/* Updated Sunny image with glow effect */}
        <div className={`relative ${sizeClasses[size]} z-10`}>
          <div className={`absolute inset-0 bg-sunny-yellow/50 rounded-full blur-${size === 'xl' ? 'xl' : 'md'} sunny-pulse`}></div>
          
          {/* Base Sun with new fashion-style avatar - Updated to use the new image */}
          <div className="w-full h-full relative z-0">
            <img alt="Sunny mascot" className="w-full h-full object-contain" src="/lovable-uploads/26445152-6bec-4571-a696-f6672bb5b4b2.png" />
          </div>
          
          {/* Travel style accessories */}
          {renderAccessory()}
          
          {/* Add sparkle effect */}
          {renderSparkles()}
        </div>
      </div>
      
      {/* Speech bubble positioning - adjusted for larger avatar */}
      {withText && message && <div className={`sunny-speech-bubble ${isMobile ? 'sunny-speech-bubble-top text-xs md:text-sm' : 'sunny-speech-bubble-left text-sm'} ${size === 'xl' ? 'max-w-[180px] md:max-w-sm' : 'max-w-[120px] md:max-w-xs'} font-handwritten text-sunny-orange`}>
          {message}
        </div>}
    </div>;
};

export default SunnyMascot;
