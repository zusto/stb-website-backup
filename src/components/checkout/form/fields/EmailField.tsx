
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BasicDetailsFormValues } from '../basicDetailsSchema';

interface EmailFieldProps {
  control: Control<BasicDetailsFormValues>;
}

const EmailField: React.FC<EmailFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email Address *</FormLabel>
          <FormControl>
            <Input type="email" placeholder="tay@uni.edu" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailField;
