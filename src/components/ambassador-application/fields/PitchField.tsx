
import React from 'react';
import { Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Edit } from 'lucide-react'; // Was Briefcase, changed to Edit (allowed)
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface PitchFieldProps {
  control: Control<AmbassadorFormValues>;
}

const PitchField: React.FC<PitchFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="pitch"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="flex items-center text-gray-700 font-semibold">
            <Edit className="h-5 w-5 mr-2 text-[#F97316]" />
            Your 30-second Pitch – Why You?
          </FormLabel>
          <FormControl>
            <Textarea placeholder="Tell us why you'd be a great ambassador (approx. 250 words)" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormDescription className="text-xs text-gray-500">Max 1500 characters.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PitchField;
