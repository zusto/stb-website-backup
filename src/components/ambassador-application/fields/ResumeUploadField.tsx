
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileText } from 'lucide-react';
import { AmbassadorFormValues } from '../ambassadorApplicationSchema';

interface ResumeUploadFieldProps {
  control: Control<AmbassadorFormValues>;
}

const ResumeUploadField: React.FC<ResumeUploadFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="resume"
      render={({ field: { onChange, onBlur, value, ref, ...restField } }) => (
        <FormItem className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-amber-300/50">
          <FormLabel className="flex items-center text-gray-700 font-semibold">
            <FileText className="h-5 w-5 mr-2 text-[#F97316]" />
            Upload Résumé (PDF)
          </FormLabel>
          <FormControl>
            <Input
              type="file"
              accept=".pdf"
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.files)}
              ref={ref}
              name={restField.name}
              className="border-gray-300 focus:border-[#F97316] focus:ring-[#F97316] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F97316]/20 file:text-[#F97316] hover:file:bg-[#F97316]/30"
            />
          </FormControl>
          <FormDescription className="text-xs text-gray-500">Max 5MB. PDF format only.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ResumeUploadField;
