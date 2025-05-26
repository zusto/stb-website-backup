
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface LeadSourceHiddenFieldProps {
  control: Control<AmbassadorFormValues>;
}

const LeadSourceHiddenField: React.FC<LeadSourceHiddenFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="leadSource"
      render={({ field }) => (
        <FormItem className="hidden">
          <FormControl>
            <Input type="hidden" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default LeadSourceHiddenField;
