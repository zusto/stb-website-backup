
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface HoursCommitmentFieldProps {
  control: Control<AmbassadorFormValues>;
}

const HoursCommitmentField: React.FC<HoursCommitmentFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="hoursCommitment"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="text-gray-700 font-semibold">
            Hours Per Week Commitment
          </FormLabel>
          <FormControl>
            <Input placeholder="e.g., 5-10 hours" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HoursCommitmentField;
