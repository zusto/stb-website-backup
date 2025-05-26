
import React from 'react';
import { Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface PreferredDestinationsFieldProps {
  control: Control<AmbassadorFormValues>;
}

const PreferredDestinationsField: React.FC<PreferredDestinationsFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="preferredDestinations"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="text-gray-700 font-semibold">
            Preferred Destinations (if not guiding current location)
          </FormLabel>
          <FormControl>
            <Textarea placeholder="List a few destinations you'd love to guide for, e.g., Paris, Rome, Tokyo" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormDescription className="text-xs text-gray-500">
            This field is required if you are not guiding your current abroad location.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PreferredDestinationsField;
