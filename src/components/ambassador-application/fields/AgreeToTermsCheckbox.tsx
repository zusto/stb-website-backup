
import React from 'react';
import { Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';
import { Link } from 'react-router-dom';

interface AgreeToTermsCheckboxProps {
  control: Control<AmbassadorFormValues>;
}

const AgreeToTermsCheckbox: React.FC<AgreeToTermsCheckboxProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="agreeToTerms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-white/50 border-amber-300/50 mt-6 pt-6 border-t border-amber-300/70">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} id="termsCheckbox" />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel htmlFor="termsCheckbox" className="text-gray-700 font-semibold">
              I agree to the <Link to="/ambassador-terms" target="_blank" className="text-sunny-orange hover:underline">Ambassador Terms & Conditions</Link> and <Link to="/privacy-policy" target="_blank" className="text-sunny-orange hover:underline">Privacy Policy</Link>. *
            </FormLabel>
            <FormDescription className="text-xs text-gray-500">
              Please review these documents before proceeding with your application.
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AgreeToTermsCheckbox;
