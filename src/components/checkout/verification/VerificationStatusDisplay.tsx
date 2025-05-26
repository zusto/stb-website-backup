
import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { VerificationStatus } from '@/hooks/useVerification';

interface VerificationStatusDisplayProps {
  status: VerificationStatus;
  errorMessage?: string;
  isLoadingSchools?: boolean;
  schoolsError?: string | null;
}

const VerificationStatusDisplay: React.FC<VerificationStatusDisplayProps> = ({
  status,
  errorMessage,
  isLoadingSchools,
  schoolsError,
}) => {
  if (status === "error" && errorMessage) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-6" role="alert">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <p className="font-bold">Verification Error</p>
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    );
  }
  if (status === "success") {
    return (
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-6" role="alert">
        <div className="flex">
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
          <div>
            <p className="font-bold">Verified! 🎉</p>
            <p>Welcome aboard Student Travel Buddy! Sunny is generating your digital ISIC right now. Keep an eye on your email—and peek at your spam folder just in case—for the login instructions and welcome letter.</p>
          </div>
        </div>
      </div>
    );
  }
  if (status === "manual_required") {
     return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-6" role="alert">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
          <div>
            <p className="font-bold">Manual Verification Required</p>
            <p>{errorMessage || "Please proceed to upload your documents for manual verification."}</p>
          </div>
        </div>
      </div>
    );
  }
  if (status === "idle" || status === "loading") {
       // This message is more about the overall page state before submission or during verification
       // Form-specific errors are handled by the hook setting errorMessage and status to "error"
       const showInitialMessage = status === 'idle' && !errorMessage;
       if (showInitialMessage || isLoadingSchools || schoolsError) {
           return (
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 my-6" role="alert">
                <p className="font-bold">Student Verification</p>
                {isLoadingSchools && <p className="mt-2">Loading school list...</p>}
                {schoolsError && <p className="mt-2 text-red-600">{schoolsError}</p>}
                {!isLoadingSchools && !schoolsError && showInitialMessage && (
                    <p>Please select your school and provide consent to proceed with verification.</p>
                )}
              </div>
           );
       }
  }
  return null;
};

export default VerificationStatusDisplay;
