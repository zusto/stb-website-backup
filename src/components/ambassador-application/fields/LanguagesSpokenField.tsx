
import React from 'react';
import { Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface LanguagesSpokenFieldProps {
  control: Control<AmbassadorFormValues>;
}

const LanguagesSpokenField: React.FC<LanguagesSpokenFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="languagesSpoken"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="text-gray-700 font-semibold">
            Languages Spoken
          </FormLabel>
          <FormControl>
            <Textarea placeholder="e.g., English, Spanish, French" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LanguagesSpokenField;
