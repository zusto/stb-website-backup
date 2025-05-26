import { enableFetchMocks } from 'jest-fetch-mock';

// Enable fetch mocks
enableFetchMocks();

// Set up environment variables for tests
process.env.ZOHO_CLIENT_ID = 'test-client-id';
process.env.ZOHO_CLIENT_SECRET = 'test-client-secret';
process.env.ZOHO_REFRESH_TOKEN = 'test-refresh-token';
process.env.ZOHO_API_DOMAIN = 'https://www.zohoapis.eu';