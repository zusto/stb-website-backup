
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone } from 'lucide-react';
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface AmbassadorMobileFieldProps {
  control: Control<AmbassadorFormValues>;
}

const AmbassadorMobileField: React.FC<AmbassadorMobileFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="mobile"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="flex items-center text-gray-700 font-semibold">
            <Phone className="h-5 w-5 mr-2 text-[#F97316]" />
            Mobile (SMS / WhatsApp OK)
          </FormLabel>
          <FormControl>
            <Input type="tel" placeholder="e.g., +1 555-123-4567" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AmbassadorMobileField;
