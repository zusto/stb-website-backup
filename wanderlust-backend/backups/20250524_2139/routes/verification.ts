import express from 'express';
import fetch from 'node-fetch';
import { VerificationService } from '../services/verificationService';
import { ZohoService } from '../services/zohoService';

export const verificationRouter = express.Router();
const verificationService = new VerificationService();
const zohoService = new ZohoService();

verificationRouter.post('/token', async (req, res) => {
  try {
    const data = await getAccessToken() as TokenResponse;
    res.json({ access_token: data.access_token });
  } catch (error: unknown) {
    console.error('Error in token endpoint:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

async function getAccessToken(): Promise<TokenResponse> {
  // Pre-encoded credentials string that we know works
  const credentials = 'MG9hMmU2NGwwdzkwN1VvY1IwaDg6dERpNDZoanFaTHhJTzZYaHZPamY0ZmxOWHZPZzdObVJLSENLcHJXeFZKVVlPQUQ3dHZZZ2pZM24zQUI0VXQ4bw==';

  const response = await fetch('https://id.demo.studentclearinghouse.org/oauth2/ausnsnbp1duL7tEPi0h7/v1/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`
    },
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'scope': 'vs.api.insights'
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Token request failed:', errorData);
    throw new Error(`Failed to get access token: ${errorData}`);
  }

  return response.json() as Promise<TokenResponse>;
}

interface TokenResponse {
  access_token: string;
}

interface VerificationPayload {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  middleName?: string;
}

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

async function verifyStudent(token: string, payload: VerificationPayload): Promise<VerificationResponse> {
  // Format date to YYYYMMDD
  const formattedDOB = payload.dateOfBirth.replace(/-/g, '');

  const verificationPayload = {
    accountId: "10052763",
    requestId: `stb-${Date.now()}`,
    firstName: payload.firstName.toUpperCase(),
    lastName: payload.lastName.toUpperCase(),
    middleName: payload.middleName?.toUpperCase() || '',
    dateOfBirth: formattedDOB,
    consentObtained: true,
    terms: "Y",
    endClient: "STB Testing"
  };

  console.log('Sending verification payload:', JSON.stringify(verificationPayload, null, 2));

  const response = await fetch('https://verify.demo.studentclearinghouse.org/api/vs/static/insights/v3/a2/submit-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(verificationPayload)
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Verification request failed:', errorData);
    throw new Error(`Student verification failed: ${errorData}`);
  }

  return response.json() as Promise<VerificationResponse>;
}

// Add new endpoint for verification
verificationRouter.post('/verify', async (req, res) => {
  try {
    const studentData = req.body as VerificationPayload;
    
    // First get the access token
    const { access_token } = await getAccessToken();
    
    // Then verify the student
    const verificationResult = await verifyStudent(access_token, studentData);
    
    res.json(verificationResult);
  } catch (error: unknown) {
    console.error('Error in verify endpoint:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

verificationRouter.post('/upload-docs', async (req, res) => {
  try {
    const { studentData, documents } = req.body;
    
    // Create CRM record
    const crmResponse = await zohoService.createStudent({
      ...studentData,
      documents: documents.map((doc: any) => doc.filename)
    });

    console.log('Zoho CRM Record Created:', crmResponse);

    res.json({
      success: true,
      message: 'Documents uploaded and CRM record created',
      crmRecordId: crmResponse.data?.[0]?.details?.id
    });

  } catch (error) {
    console.error('Upload docs error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});