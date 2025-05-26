import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

interface ZohoTokenResponse {
  access_token?: string;
  refresh_token?: string;
  error?: string;
  api_domain?: string;
}

async function testConnection() {
  try {
    console.log('Testing Zoho API connection...');
    console.log('Using refresh token:', process.env.ZOHO_REFRESH_TOKEN?.substring(0, 10) + '...');

    const response = await fetch('https://accounts.zoho.eu/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        scope: 'ZohoCRM.modules.ALL'
      })
    });

    const data = await response.json() as ZohoTokenResponse;
    
    if (data.error) {
      console.error('API Error:', data.error);
      console.log('\nEnvironment variables check:');
      console.log('ZOHO_CLIENT_ID:', !!process.env.ZOHO_CLIENT_ID);
      console.log('ZOHO_CLIENT_SECRET:', !!process.env.ZOHO_CLIENT_SECRET);
      console.log('ZOHO_REFRESH_TOKEN:', !!process.env.ZOHO_REFRESH_TOKEN);
      return;
    }

    console.log('Connection successful!');
    console.log('Access token received:', data.access_token?.substring(0, 10) + '...');
    console.log('API Domain:', data.api_domain || 'https://www.zohoapis.eu');
  } catch (error) {
    console.error('Connection test failed:', error);
  }
}

testConnection();