
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface School {
  value: string;
  label: string;
}

interface SchoolSelectFieldProps {
  selectedSchool: string;
  onSchoolChange: (value: string) => void;
  schools: School[];
  label?: string;
  placeholder?: string;
  id?: string;
  disabled?: boolean; // Added disabled prop
}

const SchoolSelectField: React.FC<SchoolSelectFieldProps> = ({
  selectedSchool,
  onSchoolChange,
  schools,
  label = "Select your School/College",
  placeholder = "Choose your institution...",
  id = "school-select",
  disabled = false, // Added disabled prop with default
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={selectedSchool} onValueChange={onSchoolChange} disabled={disabled}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {schools.length === 0 && disabled && <SelectItem value="loading" disabled>Loading schools...</SelectItem>}
          {schools.length === 0 && !disabled && <SelectItem value="no-schools" disabled>No schools available.</SelectItem>}
          {schools.map((school) => (
            <SelectItem key={school.value} value={school.value}>
              {school.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SchoolSelectField;
