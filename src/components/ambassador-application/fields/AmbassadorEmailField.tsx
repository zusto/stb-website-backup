
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail } from 'lucide-react';
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface AmbassadorEmailFieldProps {
  control: Control<AmbassadorFormValues>;
}

const AmbassadorEmailField: React.FC<AmbassadorEmailFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="flex items-center text-gray-700 font-semibold">
            <Mail className="h-5 w-5 mr-2 text-[#F97316]" />
            Best Email
          </FormLabel>
          <FormControl>
            <Input type="email" placeholder="your.email@example.com" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AmbassadorEmailField;
