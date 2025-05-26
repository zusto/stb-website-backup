
import React from 'react';

interface WaveDividerProps {
  flip?: boolean;
  hidden?: boolean;
}

const WaveDivider = ({ flip = false, hidden = true }: WaveDividerProps) => {
  if (hidden) return null;

  return (
    <div className={`w-full overflow-hidden ${flip ? 'transform rotate-180' : ''}`}>
      <svg 
        viewBox="0 0 1440 100" 
        className="block w-full h-[64px] sm:h-[100px] relative -mt-px"
        preserveAspectRatio="none"
        fill="#FFEFE2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0,32L48,48C96,64,192,96,288,96C384,96,480,64,576,48C672,32,768,32,864,48C960,64,1056,96,1152,96C1248,96,1344,64,1392,48L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          opacity="0.8"
        ></path>
      </svg>
    </div>
  );
};


export default WaveDivider;


