
import React from 'react';
import { Sparkles } from 'lucide-react';

const StarDust = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse-gentle" />
    </div>
  );
};

export default StarDust;
