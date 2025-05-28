import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
async function testZohoCRM() {
    try {
        // First, get an access token
        console.log('Getting access token...');
        const tokenResponse = await fetch('https://accounts.zoho.eu/oauth/v2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                refresh_token: process.env.ZOHO_REFRESH_TOKEN,
                client_id: process.env.ZOHO_CLIENT_ID,
                client_secret: process.env.ZOHO_CLIENT_SECRET,
                grant_type: 'refresh_token'
            })
        });
        const tokenData = await tokenResponse.json();
        if (tokenData.error) {
            throw new Error(`Token error: ${tokenData.error}`);
        }
        console.log('Access token received:', tokenData.access_token.substring(0, 10) + '...');
        // Test CRM access by creating a test record
        console.log('\nTesting CRM access...');
        const crmResponse = await fetch(`${process.env.ZOHO_API_DOMAIN}/crm/v2/Students`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${tokenData.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [{
                        Name: 'Test Student',
                        Email: 'test@example.com',
                        First_Name: 'Test',
                        Last_Name: 'Student'
                    }]
            })
        });
        const crmData = await crmResponse.json();
        console.log('\nCRM Response:', JSON.stringify(crmData, null, 2));
    }
    catch (error) {
        console.error('Test failed:', error);
    }
}
testZohoCRM();
