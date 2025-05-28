import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
async function exchangeCode(code) {
    try {
        console.log('Exchanging code:', code);
        const params = new URLSearchParams({
            code,
            grant_type: 'authorization_code',
            client_id: process.env.ZOHO_CLIENT_ID,
            client_secret: process.env.ZOHO_CLIENT_SECRET,
            redirect_uri: process.env.ZOHO_REDIRECT_URI
        });
        const response = await fetch('https://accounts.zoho.eu/oauth/v2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
        const data = await response.json();
        console.log('Full Response:', data);
        if (data.error) {
            throw new Error(`Token exchange failed: ${data.error}`);
        }
        if (data.refresh_token) {
            // Now TypeScript knows refresh_token exists on data
            console.log(`ZOHO_REFRESH_TOKEN=${data.refresh_token}`);
        }
        return data;
    }
    catch (error) {
        console.error('Exchange failed:', error);
    }
}
// Replace this with your new authorization code
const code = process.argv[2];
if (!code) {
    console.error('Please provide the authorization code as an argument');
    process.exit(1);
}
exchangeCode(code);
