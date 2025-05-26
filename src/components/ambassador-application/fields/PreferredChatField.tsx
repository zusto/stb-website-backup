
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail } from 'lucide-react'; // Using Mail as a generic communication icon
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface PreferredChatFieldProps {
  control: Control<AmbassadorFormValues>;
}

const PreferredChatField: React.FC<PreferredChatFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="preferredChat"
      render={({ field }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="flex items-center text-gray-700 font-semibold">
            <Mail className="h-5 w-5 mr-2 text-[#F97316]" />
            Preferred Chat Channel
          </FormLabel>
          <FormControl>
            <Input placeholder="e.g., WhatsApp, Email, Instagram DM" {...field} className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PreferredChatField;
