
import React from 'react';
import { TravelQuizStepSharedProps } from '../TravelQuizTypes';
import { Q4_CATEGORIES, gradientBtn } from '../TravelQuizConstants';

export const TravelQuizStep4Categories: React.FC<TravelQuizStepSharedProps> = ({ answers, update }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">4️⃣ Big spending categories</h2>
      <p className="text-sm mb-2 text-gray-600">Pick a couple – this helps tailor savings!</p>
      <div className="grid grid-cols-2 gap-4">
        {Q4_CATEGORIES.map((c) => (
          <button 
            key={c} 
            className={`p-3 rounded-2xl border capitalize ${answers.cats.includes(c) ? `${gradientBtn} text-white` : "bg-white border-gray-300 hover:bg-gray-50"}`} 
            onClick={() => {
              const newCats = answers.cats.includes(c) ? answers.cats.filter((x) => x !== c) : [...answers.cats, c];
              update("cats", newCats);
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </>
  );
};
