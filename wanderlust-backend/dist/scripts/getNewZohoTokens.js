import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
async function getNewTokens(code) {
    try {
        const response = await fetch('https://accounts.zoho.eu/oauth/v2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                code,
                grant_type: 'authorization_code',
                client_id: process.env.ZOHO_CLIENT_ID,
                client_secret: process.env.ZOHO_CLIENT_SECRET,
                redirect_uri: process.env.ZOHO_REDIRECT_URI
            })
        });
        const data = await response.json();
        if (data.refresh_token) {
            console.log('\nAdd these to your .env file:');
            console.log(`ZOHO_REFRESH_TOKEN=${data.refresh_token}`);
            console.log(`ZOHO_API_DOMAIN=https://www.zohoapis.eu`);
        }
        else {
            console.error('Error:', data);
        }
    }
    catch (error) {
        console.error('Failed to get tokens:', error);
    }
}
const code = process.argv[2];
if (!code) {
    console.error('Please provide the authorization code');
    process.exit(1);
}
getNewTokens(code);
