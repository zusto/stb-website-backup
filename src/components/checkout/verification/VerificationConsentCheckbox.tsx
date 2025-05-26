
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom'; // Import Link

interface VerificationConsentCheckboxProps {
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  label?: React.ReactNode; // Changed to React.ReactNode to allow Link component
  disabled?: boolean;
}

const VerificationConsentCheckbox: React.FC<VerificationConsentCheckboxProps> = ({
  isChecked,
  onCheckedChange,
  id = "verification-consent",
  label, // Label will be constructed below
  disabled = false,
}) => {
  const defaultLabel = (
    <>
      I have read and agree to the{' '}
      <Link 
        to="/student-verification-consent" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-sunny-orange hover:text-sunny-orange-dark underline"
        onClick={(e) => e.stopPropagation()} // Prevents checkbox from toggling when link is clicked
      >
        Student Status Verification Consent
      </Link>
      .
    </>
  );

  return (
    <div className="flex items-start space-x-2 mt-4"> {/* Changed to items-start for better alignment with multi-line text */}
      <Checkbox id={id} checked={isChecked} onCheckedChange={onCheckedChange} disabled={disabled} className="mt-1" /> {/* Added mt-1 for alignment */}
      <Label htmlFor={id} className="text-sm font-normal text-gray-700">
        {label || defaultLabel} <span className="text-red-500">*</span>
      </Label>
    </div>
  );
};

export default VerificationConsentCheckbox;
