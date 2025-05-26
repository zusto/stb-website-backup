import dotenv from 'dotenv';
dotenv.config();

async function verifyCredentials() {
  const credentials = {
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    refresh_token: process.env.ZOHO_REFRESH_TOKEN
  };

  console.log('Verifying Zoho credentials format:');
  console.log('Client ID format:', credentials.client_id?.startsWith('1000.'));
  console.log('Client Secret length:', credentials.client_secret?.length);
  console.log('Refresh Token format:', credentials.refresh_token?.startsWith('1000.'));
}

verifyCredentials();