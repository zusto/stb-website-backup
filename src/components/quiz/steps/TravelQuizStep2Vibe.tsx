
import React from 'react';
import { TravelQuizStepSharedProps } from '../TravelQuizTypes';
import { Q2_VIBES, gradientBtn } from '../TravelQuizConstants';

export const TravelQuizStep2Vibe: React.FC<TravelQuizStepSharedProps> = ({ answers, update }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">2️⃣ Pick your vibe</h2>
      <div className="grid grid-cols-2 gap-4">
        {Q2_VIBES.map((v) => (
          <button 
            key={v} 
            className={`p-3 rounded-2xl border ${answers.vibe === v ? `${gradientBtn} text-white` : "bg-white border-gray-300 hover:bg-gray-50"}`} 
            onClick={() => update("vibe", v)}
          >
            {v}
          </button>
        ))}
      </div>
    </>
  );
};
