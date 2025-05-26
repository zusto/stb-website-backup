
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface CollegeUniversityFieldProps {
  control: Control<AmbassadorFormValues>;
}

const CollegeUniversityField: React.FC<CollegeUniversityFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="collegeUniversity"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="text-gray-700 font-semibold">
            College / University + State
          </FormLabel>
          <FormControl>
            <Input placeholder="e.g., University of Texas at Austin" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CollegeUniversityField;
