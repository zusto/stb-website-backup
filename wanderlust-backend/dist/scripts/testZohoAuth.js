import dotenv from 'dotenv';
dotenv.config();
async function testAuth() {
    try {
        const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
        if (!refreshToken) {
            throw new Error('No refresh token found in environment');
        }
        const tokenData = await refreshAccessToken(refreshToken);
        // Validate response data
        if (!tokenData || !tokenData.access_token) {
            throw new Error('Invalid token response: ' + JSON.stringify(tokenData));
        }
        console.log('Token response:', tokenData);
        console.log('Successfully refreshed token:', {
            access_token: `${tokenData.access_token.slice(0, 10)}...`,
            expires_in: tokenData.expires_in,
            api_domain: tokenData.api_domain
        });
    }
    catch (error) {
        console.error('Auth test failed:', error);
        // Log environment variables (masked)
        console.log('Environment check:', {
            hasClientId: !!process.env.ZOHO_CLIENT_ID,
            hasClientSecret: !!process.env.ZOHO_CLIENT_SECRET,
            hasRefreshToken: !!process.env.ZOHO_REFRESH_TOKEN
        });
    }
}
testAuth();
export async function refreshAccessToken(refreshToken) {
    // implementation
    throw new Error('Not implemented');
}
