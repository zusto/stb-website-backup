
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface HomeBaseUSFieldProps {
  control: Control<AmbassadorFormValues>;
}

const HomeBaseUSField: React.FC<HomeBaseUSFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="homeBaseUS"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="text-gray-700 font-semibold">
            Home Base in the U.S.
          </FormLabel>
          <FormControl>
            <Input placeholder="e.g., Austin, TX" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HomeBaseUSField;
