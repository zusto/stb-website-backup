import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PayCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-radialSunny from-[#FFD447] via-[#FFEFE2] to-white bg-grain">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center space-y-6">
          <XCircle className="w-16 h-16 mx-auto text-red-500" />
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-midnight">
              ❌ Oops! Payment Didn't Go Through
            </h1>
            <div className="space-y-3">
              <p className="text-lg text-sunny-orange">
                No worries, sunshine — sometimes tech just needs a sec. 🌥️💳
              </p>
              <p className="text-gray-700">
                Your Student Travel Buddy membership isn't active yet, but you're super close to unlocking epic travel perks and student discounts. 💛✈️
              </p>
              <p className="text-gray-700">
                👉 Try again with another payment method, or check your card details and give it another go.
              </p>
              <p className="text-gray-600">
                Still stuck? We're here to help — email us at{' '}
                <a href="mailto:hello@studenttravelbuddy.com" className="text-sunny-orange hover:underline">
                  hello@studenttravelbuddy.com
                </a>{' '}
                anytime.
              </p>
              <p className="text-midnight font-medium">
                Let's get you back on the travel track! 🚀🌍
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout/payment')}
            className="bg-sunny-orange text-white px-8 py-3 rounded-lg hover:bg-sunny-orange-dark transition-colors font-medium"
          >
            Try Payment Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayCancelPage;