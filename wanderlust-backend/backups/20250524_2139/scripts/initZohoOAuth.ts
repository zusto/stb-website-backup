import dotenv from 'dotenv';
dotenv.config();

function generateAuthURL() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.ZOHO_CLIENT_ID!,
    scope: 'ZohoCRM.modules.ALL',
    access_type: 'offline',
    prompt: 'consent',
    redirect_uri: process.env.ZOHO_REDIRECT_URI!
  });

  const authURL = `https://accounts.zoho.com/oauth/v2/auth?${params.toString()}`;
  console.log('\nOpen this URL in your browser to start OAuth flow:');
  console.log(authURL);
}

generateAuthURL();