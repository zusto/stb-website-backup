import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

interface ZohoTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

async function getZohoAccessToken(): Promise<string> {
  try {
    // Use EU-specific endpoint
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
    console.log('Token response:', data);

    if (data.error) {
      throw new Error(`Zoho API error: ${data.error_description || data.error}`);
    }

    if (!data.access_token) {
      throw new Error('No access token received');
    }

    return data.access_token;
  } catch (error) {
    console.error('Token generation failed:', error);
    throw error;
  }
}

interface ZohoStudent {
  Name: string;
  First_Name: string;
  Last_Name: string;
  Email: string;
  Date_of_Birth: string;
  College?: string;
  Automatic_Verification: string;
  Manual_Documents?: string;
}

router.post('/students', async (req, res) => {
  try {
    console.log('Creating student record with data:', req.body);
    
    const accessToken = await getZohoAccessToken();
    console.log('Got access token:', accessToken.substring(0, 10) + '...');

    // Format the data according to Zoho CRM fields
    const studentData = {
      Name: `${req.body.firstName} ${req.body.lastName}`,
      First_Name: req.body.firstName,
      Last_Name: req.body.lastName,
      Email: req.body.email,
      Date_of_Birth: req.body.dateOfBirth,
      College: req.body.college || '',
      Automatic_Verification: req.body.automaticVerification || 'Not Applicable'
    };

    console.log('Formatted student data:', studentData);

    const response = await fetch(`${process.env.ZOHO_API_DOMAIN}/crm/v2/Students`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: [studentData] })
    });

    const responseData = await response.json();
    console.log('Zoho CRM response:', responseData);

    if (!response.ok) {
      throw new Error(`Zoho CRM error: ${JSON.stringify(responseData)}`);
    }

    res.json(responseData);
  } catch (error) {
    console.error('Error in /students endpoint:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error 
    });
  }
});

router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code || typeof code !== 'string') {
      throw new Error('No authorization code received');
    }

    const tokenData = await getInitialAccessToken(code);
    
    // Store tokens securely (consider using a database)
    process.env.ZOHO_ACCESS_TOKEN = tokenData.access_token;
    process.env.ZOHO_REFRESH_TOKEN = tokenData.refresh_token;

    res.json({ success: true });
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

export { router as zohoRouter };

async function getInitialAccessToken(code: string) {
  if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET) {
    throw new Error('Missing Zoho credentials in environment variables');
  }

  const response = await fetch('https://accounts.zoho.eu/oauth/v2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: process.env.ZOHO_REDIRECT_URI || 'http://localhost:3000/api/zoho/callback'
    })
  });

  const data = await response.json() as {
    access_token?: string;
    refresh_token?: string;
    error?: string;
    error_description?: string;
  };

  if (data.error) {
    throw new Error(`Zoho token error: ${data.error_description || data.error}`);
  }

  if (!data.access_token || !data.refresh_token) {
    throw new Error('Invalid token response');
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token
  };
}

