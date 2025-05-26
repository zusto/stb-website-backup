
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { XCircle, AlertTriangle } from 'lucide-react';

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <AlertTriangle className="h-24 w-24 text-red-500 mb-6" />
        <h1 className="text-4xl font-display text-sunny-orange-dark mb-4">Payment Canceled</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-md">
          It looks like your payment process was canceled or encountered an issue.
        </p>
        <XCircle className="h-16 w-16 text-red-400 mb-8" />
        <p className="text-gray-600 mb-4">
          If you faced any problems, please try again or contact support.
        </p>
        <div className="flex space-x-4">
          <Link to="/checkout">
            <Button variant="outline" className="border-sunny-orange text-sunny-orange hover:bg-sunny-yellow-pale hover:text-sunny-orange-dark">
              Try Again
            </Button>
          </Link>
          <Link to="/">
            <Button className="stb-button">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentCancelPage;
