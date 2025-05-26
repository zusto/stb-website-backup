
import React from 'react';
import { Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface GuideLocationCheckboxProps {
  control: Control<AmbassadorFormValues>;
}

const GuideLocationCheckbox: React.FC<GuideLocationCheckboxProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="guideLocation"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-white/50 border-amber-300/50">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} id="guideLocationCheckbox" />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel htmlFor="guideLocationCheckbox" className="text-gray-700 font-semibold">
              Do you want to guide students to this abroad location?
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GuideLocationCheckbox;
