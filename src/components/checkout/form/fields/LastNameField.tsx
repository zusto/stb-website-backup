
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BasicDetailsFormValues } from '../basicDetailsSchema';

interface LastNameFieldProps {
  control: Control<BasicDetailsFormValues>;
}

const LastNameField: React.FC<LastNameFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name *</FormLabel>
          <FormControl>
            <Input placeholder="Doe" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LastNameField;
