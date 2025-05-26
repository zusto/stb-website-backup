
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MockStripeForm: React.FC = () => {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number</Label>
          <Input id="cardNumber" type="text" placeholder="•••• •••• •••• ••••" className="stb-input mt-1" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">Expiry Date</Label>
            <Input id="expiryDate" type="text" placeholder="MM / YY" className="stb-input mt-1" />
          </div>
          <div>
            <Label htmlFor="cvc" className="text-sm font-medium text-gray-700">CVC</Label>
            <Input id="cvc" type="text" placeholder="•••" className="stb-input mt-1" />
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center">This is a mock form for demonstration purposes.</p>
      </CardContent>
    </Card>
  );
};

export default MockStripeForm;
