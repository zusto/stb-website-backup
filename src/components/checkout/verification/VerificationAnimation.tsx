import React from 'react';
import { CheckCircle, XCircle, Shield } from 'lucide-react';

interface VerificationAnimationProps {
  isSuccess: boolean;
  message: string;
}

const VerificationAnimation: React.FC<VerificationAnimationProps> = ({ isSuccess, message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center animate-scale-in">
        <Shield className={`h-24 w-24 mx-auto mb-4 animate-pulse-gentle ${
          isSuccess ? 'text-green-500' : 'text-red-500'
        }`} />
        <h2 className="text-2xl font-bold text-sunny-orange-dark mb-2">
          {isSuccess ? 'Verification Successful!' : 'Verification Failed'}
        </h2>
        <p className="text-gray-700">{message}</p>
        {isSuccess ? (
          <CheckCircle className="h-10 w-10 text-green-500 mx-auto mt-4" />
        ) : (
          <XCircle className="h-10 w-10 text-red-500 mx-auto mt-4" />
        )}
      </div>
    </div>
  );
};

export default VerificationAnimation;