
import React from 'react';
import { Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface PayoutMethodFieldProps {
  control: Control<AmbassadorFormValues>;
}

const PayoutMethodField: React.FC<PayoutMethodFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="payoutMethod"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="text-gray-700 font-semibold">
            Preferred Payout Method
          </FormLabel>
          <FormControl>
            <Textarea placeholder="e.g., PayPal: your.email@example.com or Venmo: @yourusername" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PayoutMethodField;
