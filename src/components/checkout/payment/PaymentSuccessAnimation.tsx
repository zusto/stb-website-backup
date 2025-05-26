
import React from 'react';
import { CheckCircle, Zap } from 'lucide-react'; // Using Zap for a "Sunny" feel

const PaymentSuccessAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center animate-scale-in">
        <Zap className="h-24 w-24 text-sunny-orange mx-auto mb-4 animate-pulse-gentle" />
        <h2 className="text-2xl font-bold text-sunny-orange-dark mb-2">Payment Successful!</h2>
        <p className="text-gray-700">High-five, Sunny! ☀️</p>
        <CheckCircle className="h-10 w-10 text-green-500 mx-auto mt-4" />
      </div>
    </div>
  );
};

export default PaymentSuccessAnimation;
