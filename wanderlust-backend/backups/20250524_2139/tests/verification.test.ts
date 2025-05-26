import { jest } from '@jest/globals';
import { VerificationService } from '../services/verificationService';
const fetchMock = require('jest-fetch-mock');

describe('VerificationService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('creates Zoho CRM record for manual verification', async () => {
    fetchMock.mockResponses(
      [
        JSON.stringify({ access_token: 'test-token', expires_in: 3600 }),
        { status: 200 }
      ],
      [
        JSON.stringify({ data: [{ details: { id: 'test-record-123' } }] }),
        { status: 200 }
      ]
    );

    const service = new VerificationService();
    const testData = {
      firstName: 'Test',
      lastName: 'Student',
      email: 'test@example.com',
      dateOfBirth: '2000-01-01',
      college: 'Test University',
      documents: ['transcript.pdf', 'id.pdf']
    };

    const result = await service.handleManualVerification(testData);
    
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.success).toBeTruthy();
    expect(result.crmRecordId).toBe('test-record-123');
  });
});