import { SPEND_PROFILES, CATEGORY_WEIGHTS, DISCOUNT_RATES } from './TravelQuizConstants';
import { getDestData } from './TravelQuizData';

export const calc = (answers: any) => {
  const { costFactor } = getDestData(answers.dest);
  const base = SPEND_PROFILES[answers.style] * costFactor;
  const breakdown: {[key: string]: {spend: string, save: string}} = {};
  let saveTotal = 0;

  Object.keys(CATEGORY_WEIGHTS).forEach((c) => {
    const spend = base * CATEGORY_WEIGHTS[c];
    const save = spend * DISCOUNT_RATES[c];
    breakdown[c] = { 
      spend: spend.toFixed(0), 
      save: save.toFixed(0) 
    };
    saveTotal += save;
  });

  return { 
    base: base.toFixed(0), 
    breakdown, 
    saveTotal: saveTotal.toFixed(0) 
  };
};