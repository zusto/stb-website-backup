export interface BasicDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobile?: string;
  isStudent: boolean;
  agreedToTerms: boolean;
}

export interface VerificationData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  schoolIdentifier?: string; // OPEID or manual text from verification step
}
