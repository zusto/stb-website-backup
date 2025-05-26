export interface VerificationResponse {
  enrollmentDetails?: Array<{
    enrollmentData?: Array<{
      enrollmentStatus: string;
    }>;
  }>;
}