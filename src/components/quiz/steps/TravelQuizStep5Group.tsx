import React from 'react';
import axios from 'axios';
import { TravelQuizStepSharedProps } from '../TravelQuizTypes';
import { Q5_GROUP, gradientBtn } from '../TravelQuizConstants';
import { calc } from '../TravelQuizLogic';

export const TravelQuizStep5Group: React.FC<TravelQuizStepSharedProps> = ({ answers, update }) => {
  const handleGroupSelect = (groupSize: string) => {
    update("group", groupSize);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">5️⃣ Squad size</h2>
      <div className="grid grid-cols-2 gap-4">
        {Q5_GROUP.map((g) => (
          <button 
            key={g} 
            className={`p-3 rounded-2xl border ${
              answers.group === g ? `${gradientBtn} text-white` : "bg-white border-gray-300 hover:bg-gray-50"
            }`} 
            onClick={() => handleGroupSelect(g)}
          >
            {g}
          </button>
        ))}
      </div>
    </>
  );
};
