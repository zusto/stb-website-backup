
import React from 'react';
import { Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Link } from 'react-router-dom';
import { BasicDetailsFormValues } from '../basicDetailsSchema';

interface TermsAgreementFieldProps {
  control: Control<BasicDetailsFormValues>;
}

const TermsAgreementField: React.FC<TermsAgreementFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="agreedToTerms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              I agree to the <Link to="/terms-and-conditions" target="_blank" className="text-sunny-orange hover:underline">Terms & Conditions</Link> and <Link to="/privacy-policy" target="_blank" className="text-sunny-orange hover:underline">Privacy Policy</Link>. *
            </FormLabel>
            <FormDescription>
              You must tick the declaration to continue.
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsAgreementField;
