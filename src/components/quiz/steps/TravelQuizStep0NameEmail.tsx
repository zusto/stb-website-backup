
import React from 'react';
import { TravelQuizStepSharedProps } from '../TravelQuizTypes';

export const TravelQuizStep0NameEmail: React.FC<TravelQuizStepSharedProps> = ({ answers, update }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">👋 First things first</h2>
      <input 
        className="w-full p-3 border border-gray-300 rounded-2xl mb-3 focus:ring-sunny-orange focus:border-sunny-orange" 
        placeholder="First name" 
        value={answers.name} 
        onChange={(e) => update("name", e.target.value)} 
        aria-label="First name"
      />
      <input 
        className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-sunny-orange focus:border-sunny-orange" 
        type="email" 
        placeholder="Email" 
        value={answers.email} 
        onChange={(e) => update("email", e.target.value)} 
        aria-label="Email address"
      />
    </>
  );
};
