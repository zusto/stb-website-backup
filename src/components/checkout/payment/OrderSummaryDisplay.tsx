
import React from 'react';

const OrderSummaryDisplay: React.FC = () => {
  return (
    <div className="bg-sunny-yellow-extralight p-6 rounded-lg border border-sunny-yellow">
      <h3 className="text-lg font-semibold text-sunny-orange-dark mb-2">Order Summary</h3>
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">Student Travel Buddy - FullTimer Plan</span>
        <span className="font-bold text-xl text-sunny-orange">$20.00</span>
      </div>
      <p className="text-xs text-gray-600">One-time payment for 1-year access.</p>
    </div>
  );
};

export default OrderSummaryDisplay;
