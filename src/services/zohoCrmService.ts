interface StudentRecord {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  dateOfBirth: string;
  isStudent: boolean;
  college?: string;
  automaticVerification: 'Verified' | 'Failed' | 'Not Applicable';
  manualDocuments?: string[];
  verificationDate: string;
  agreedToTerms: boolean;
  consentGiven: boolean;
}

interface DocumentUploadResponse {
  url: string;
  name: string;
}

export class ZohoCRMService {
  private baseUrl: string;

  constructor() {
    // Make sure this matches your backend URL
    this.baseUrl = 'http://localhost:3000';
  }

  async createStudentRecord(studentData: any, paymentData: any) {
    try {
      console.log('📤 Sending to Zoho:', { studentData, paymentData }); // Add logging

      const response = await fetch(`${this.baseUrl}/api/zoho/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...studentData,
          paymentData: {
            amount: paymentData?.amount,
            date: paymentData?.date,
            paymentId: paymentData?.id,
            transactionId: paymentData?.transactionId
          }
        })
      });

      // Log raw response for debugging
      const responseText = await response.text();
      console.log('📥 Raw response:', responseText);

      // Parse JSON only if response is not empty
      const data = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        console.error('❌ API Error Response:', data);
        throw new Error(data.error || 'Failed to create Zoho record');
      }

      console.log('✅ Zoho record created:', data);
      return data;

    } catch (error) {
      console.error('❌ ZohoCRM Service Error:', error);
      throw error;
    }
  }

  private async uploadFile(file: File): Promise<DocumentUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      return await response.json();
    } catch (error) {
      console.error('❌ File upload error:', error);
      throw error;
    }
  }

  async createStudentRecordWithDocuments(data: any) {
    try {
      console.log('📤 Sending to Zoho:', data);

      const response = await fetch(`${this.baseUrl}/api/zoho/students/with-documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Add response logging
      const responseText = await response.text();
      console.log('📥 Raw response:', responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
      }

      // Try to parse JSON only if it's valid
      try {
        const result = JSON.parse(responseText);
        return result;
      } catch (e) {
        console.error('❌ Invalid JSON response:', responseText);
        throw new Error('Server returned invalid JSON');
      }
    } catch (error) {
      console.error('❌ ZohoCRM Service Error:', error);
      throw error;
    }
  }
}