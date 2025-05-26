import { BasicDetails } from '@/types/checkout';

interface VerificationResponse {
  status: {
    code: string;
    severity: string;
    message: string;
  };
  enrollmentDetails: Array<{
    currentEnrollmentStatus: string;
    officialSchoolName: string;
  }>;
}

// Add this new interface
interface VerificationPayload {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  middleName?: string;
}

// Add these utility functions at the top of the file
async function generateCodeVerifier(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64URLEncode(new Uint8Array(digest));
}

function base64URLEncode(buffer: Uint8Array): string {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const verificationService = {
  async getAccessToken(): Promise<string> {
    try {
      const response = await fetch('http://localhost:3000/api/verification/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get token from server');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw new Error('Failed to get verification access token');
    }
  },

  async handleAuthCallback(code: string): Promise<string> {
    try {
      const clientId = '0oa2e64l0w907UocR0h8';
      const redirectUri = 'http://localhost:8080/auth/callback';
      const codeVerifier = sessionStorage.getItem('code_verifier');

      if (!codeVerifier) {
        throw new Error('No code verifier found');
      }

      const response = await fetch('https://id.demo.studentclearinghouse.org/oauth2/ausnsnbp1duL7tEPi0h7/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'grant_type': 'authorization_code',
          'client_id': clientId,
          'code_verifier': codeVerifier,
          'code': code,
          'redirect_uri': redirectUri
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Token request failed:', errorText);
        throw new Error(`Token request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw new Error('Failed to get access token');
    }
  },

  async verifyStudent(token: string, studentData: VerificationPayload) {
    const response = await fetch('http://localhost:3000/api/verification/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    });

    const data = await response.json();
    return data; // Return full response
  }
};