
import React from 'react';
import { TravelQuizStepSharedProps } from '../TravelQuizTypes';
import { Q3_STYLE, gradientBtn } from '../TravelQuizConstants';

export const TravelQuizStep3Style: React.FC<TravelQuizStepSharedProps> = ({ answers, update }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">3️⃣ Budget style</h2>
      <div className="flex flex-col gap-3">
        {Q3_STYLE.map((s) => (
          <button 
            key={s} 
            className={`p-3 rounded-2xl border ${answers.style === s ? `${gradientBtn} text-white` : "bg-white border-gray-300 hover:bg-gray-50"}`} 
            onClick={() => update("style", s)}
          >
            {s}
          </button>
        ))}
      </div>
    </>
  );
};
