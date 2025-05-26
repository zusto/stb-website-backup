
import React from 'react';
import { Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface PastGigsFieldProps {
  control: Control<AmbassadorFormValues>;
}

const PastGigsField: React.FC<PastGigsFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="pastGigs"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="text-gray-700 font-semibold">
            Past Ambassador / Volunteer Gigs (Optional)
          </FormLabel>
          <FormControl>
            <Textarea placeholder="List any relevant experiences..." {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PastGigsField;
