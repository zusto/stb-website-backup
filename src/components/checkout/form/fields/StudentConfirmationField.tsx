
import React from 'react';
import { Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { BasicDetailsFormValues } from '../basicDetailsSchema';

interface StudentConfirmationFieldProps {
  control: Control<BasicDetailsFormValues>;
}

const StudentConfirmationField: React.FC<StudentConfirmationFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="isStudent"
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
              I confirm I am currently a full-time student and understand this fee is non-refundable. *
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};

export default StudentConfirmationField;
