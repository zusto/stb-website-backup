
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BasicDetailsFormValues } from '../basicDetailsSchema';

interface MobileFieldProps {
  control: Control<BasicDetailsFormValues>;
}

const MobileField: React.FC<MobileFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="mobile"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Mobile Number</FormLabel>
          <FormControl>
            <Input type="tel" placeholder="+1 555 123 4567 (Optional)" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MobileField;
