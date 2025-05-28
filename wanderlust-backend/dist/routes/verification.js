import express from 'express';
import fetch from 'node-fetch';
export const verificationRouter = express.Router();
verificationRouter.post('/token', async (req, res) => {
    try {
        const data = await getAccessToken();
        res.json({ access_token: data.access_token });
    }
    catch (error) {
        console.error('Error in token endpoint:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
async function getAccessToken() {
    // Pre-encoded credentials string that we know works
    const credentials = 'MG9hMmU2NGwwdzkwN1VvY1IwaDg6dERpNDZoanFaTHhJTzZYaHZPamY0ZmxOWHZPZzdObVJLSENLcHJXeFZKVVlPQUQ3dHZZZ2pZM24zQUI0VXQ4bw==';
    const response = await fetch('https://id.demo.studentclearinghouse.org/oauth2/ausnsnbp1duL7tEPi0h7/v1/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'scope': 'vs.api.insights'
        })
    });
    if (!response.ok) {
        const errorData = await response.text();
        console.error('Token request failed:', errorData);
        throw new Error(`Failed to get access token: ${errorData}`);
    }
    return response.json();
}
async function verifyStudent(token, payload) {
    // Format date to YYYYMMDD
    const formattedDOB = payload.dateOfBirth.replace(/-/g, '');
    const verificationPayload = {
        accountId: "10052763",
        requestId: `stb-${Date.now()}`,
        firstName: payload.firstName.toUpperCase(),
        lastName: payload.lastName.toUpperCase(),
        middleName: payload.middleName?.toUpperCase() || '',
        dateOfBirth: formattedDOB,
        consentObtained: true,
        terms: "Y",
        endClient: "STB Testing"
    };
    console.log('Sending verification payload:', JSON.stringify(verificationPayload, null, 2));
    const response = await fetch('https://verify.demo.studentclearinghouse.org/api/vs/static/insights/v3/a2/submit-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(verificationPayload)
    });
    if (!response.ok) {
        const errorData = await response.text();
        console.error('Verification request failed:', errorData);
        throw new Error(`Student verification failed: ${errorData}`);
    }
    return response.json();
}
// Add new endpoint for verification
verificationRouter.post('/verify', async (req, res) => {
    try {
        const studentData = req.body;
        const { dateOfBirth, college } = req.body;
        console.log('🔍 Checking verification for:', { dateOfBirth, college });
        // Calculate age
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        // If under 17, need manual verification
        if (age <= 17) {
            console.log('👶 Student is underage, needs manual verification');
            return res.json({
                success: true,
                status: 'Manual',
                message: 'Manual verification required'
            });
        }
        // First get the access token
        const { access_token } = await getAccessToken();
        // Then verify the student
        const verificationResult = await verifyStudent(access_token, studentData);
        res.json(verificationResult);
    }
    catch (error) {
        console.error('Error in verify endpoint:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
