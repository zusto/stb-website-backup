
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface AbroadLocationFieldProps {
  control: Control<AmbassadorFormValues>;
}

const AbroadLocationField: React.FC<AbroadLocationFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="abroadLocation"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="text-gray-700 font-semibold">
            Abroad Location
          </FormLabel>
          <FormControl>
            <Input placeholder="e.g., Barcelona, Spain" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AbroadLocationField;
