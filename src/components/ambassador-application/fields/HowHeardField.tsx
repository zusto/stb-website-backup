
import React from 'react';
import { Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface HowHeardFieldProps {
  control: Control<AmbassadorFormValues>;
}

const HowHeardField: React.FC<HowHeardFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="howHeard"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="text-gray-700 font-semibold">
            How Did You Hear About Us?
          </FormLabel>
          <FormControl>
            <Textarea placeholder="e.g., Friend, Instagram, University event, Online search" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HowHeardField;
