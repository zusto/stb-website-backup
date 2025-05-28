import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
// Cache token
let cachedToken = null;
let tokenExpiry = 0;
export async function getZohoAccessToken() {
    try {
        // Return cached token if still valid
        if (cachedToken && tokenExpiry > Date.now()) {
            return cachedToken;
        }
        // Get new token using refresh token
        const params = new URLSearchParams({
            refresh_token: process.env.ZOHO_REFRESH_TOKEN,
            client_id: process.env.ZOHO_CLIENT_ID,
            client_secret: process.env.ZOHO_CLIENT_SECRET,
            grant_type: 'refresh_token'
        });
        const response = await fetch('https://accounts.zoho.eu/oauth/v2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
        if (!response.ok) {
            throw new Error(`Zoho token error: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(`Zoho API error: ${data.error}`);
        }
        // Cache the token
        cachedToken = data.access_token;
        tokenExpiry = Date.now() + ((data.expires_in - 60) * 1000); // Expire 1 minute early
        console.log('🔑 New Zoho token acquired');
        return data.access_token;
    }
    catch (error) {
        console.error('❌ Zoho token error:', error);
        throw error;
    }
}
