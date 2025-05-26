
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BasicDetailsFormValues } from '../basicDetailsSchema';

interface DateOfBirthFieldProps {
  control: Control<BasicDetailsFormValues>;
}

const DateOfBirthField: React.FC<DateOfBirthFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="dateOfBirth"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date of Birth *</FormLabel>
          <FormControl>
            <Input type="date" {...field} max={new Date().toISOString().split("T")[0]} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateOfBirthField;
