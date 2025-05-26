
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentPageErrorProps {
  error: string;
}

const PaymentPageError: React.FC<PaymentPageErrorProps> = ({ error }) => {
  const navigate = useNavigate();
  return (
    <div className="text-center py-10">
      <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
      <h2 className="mt-2 text-xl font-semibold text-gray-900">Error Loading Page</h2>
      <p className="mt-1 text-sm text-gray-600">{error}</p>
      <Button onClick={() => navigate('/checkout/details')} className="mt-6 stb-button">
        Go Back to Details
      </Button>
    </div>
  );
};

export default PaymentPageError;
