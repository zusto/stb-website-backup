import express from 'express';
import fetch from 'node-fetch';
import { schools } from '../data/schoolsList.js';
// Cache token
let cachedToken = null;
let tokenExpiry = 0;
// Helper functions
function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
function formatZohoDateTime(date) {
    try {
        // Get timezone offset
        const tzOffset = -date.getTimezoneOffset();
        const tzHours = Math.floor(Math.abs(tzOffset) / 60)
            .toString()
            .padStart(2, '0');
        const tzMinutes = (Math.abs(tzOffset) % 60).toString().padStart(2, '0');
        const tzSign = tzOffset >= 0 ? '+' : '-';
        // Format date parts
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        // Combine in ISO8601 format with timezone
        const formatted = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${tzSign}${tzHours}:${tzMinutes}`;
        console.log('📅 Formatted DateTime:', {
            original: date,
            formatted: formatted
        });
        return formatted;
    }
    catch (error) {
        console.error('❌ DateTime formatting error:', error);
        // Return current date in correct format as fallback
        const now = new Date();
        return now.toISOString().replace(/Z$/, '+00:00');
    }
}
async function getZohoAccessToken() {
    if (cachedToken && Date.now() < tokenExpiry) {
        return cachedToken;
    }
    const response = await fetch('https://accounts.zoho.eu/oauth/v2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            refresh_token: process.env.ZOHO_REFRESH_TOKEN,
            client_id: process.env.ZOHO_CLIENT_ID,
            client_secret: process.env.ZOHO_CLIENT_SECRET,
            grant_type: 'refresh_token'
        })
    });
    const data = await response.json();
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + ((data.expires_in - 300) * 1000);
    return data.access_token;
}
const router = express.Router();
router.post('/students', async (req, res) => {
    try {
        console.log('📦 Raw request body:', req.body);
        // Get college name
        const collegeCode = req.body.college;
        const school = schools.find(s => s.code === collegeCode);
        const collegeName = school?.name || 'Unknown College';
        // Extract verification status directly from request
        const verificationStatus = req.body.verificationStatus || 'Manual';
        console.log('🔍 Verification Status:', {
            received: verificationStatus,
            college: { code: collegeCode, name: collegeName }
        });
        // Create Zoho record
        const studentData = {
            Name: `${req.body.firstName} ${req.body.lastName}`.trim(),
            First_Name: req.body.firstName,
            Middle_Name: req.body.middleName || '',
            Last_Name: req.body.lastName,
            Email: req.body.email,
            Mobile_Number: req.body.mobile || '',
            Date_of_Birth: req.body.dateOfBirth,
            College: collegeName,
            Verification_Status: verificationStatus, // Use the status directly
            Verification_Date: formatZohoDateTime(new Date()),
            Manual_Documents: req.body.documents?.join(', ') || ''
        };
        console.log('📤 Final Zoho payload:', studentData);
        // Make Zoho API call
        const accessToken = await getZohoAccessToken();
        const zohoResponse = await fetch(`${process.env.ZOHO_API_DOMAIN}/crm/v2/Students`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [studentData] })
        });
        const result = await zohoResponse.json();
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error('❌ Error creating Zoho record:', error);
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});
// Add new endpoint for document submissions
// Update the determineVerificationStatus function return type
function determineVerificationStatus(verificationResponse) {
    try {
        console.log('📦 Checking enrollment status in:', verificationResponse);
        // For under 17
        if (calculateAge(verificationResponse.dateOfBirth) <= 17) {
            return 'Manual';
        }
        // Check if we have enrollment details
        if (!verificationResponse?.enrollmentDetails) {
            console.log('❌ No enrollment details found');
            return 'Failed';
        }
        // Check each enrollment's enrollmentData for status 'F'
        for (const enrollment of verificationResponse.enrollmentDetails) {
            if (!Array.isArray(enrollment.enrollmentData))
                continue;
            for (const record of enrollment.enrollmentData) {
                const status = record.enrollmentStatus?.trim().toUpperCase();
                console.log(`🔎 Checking status: "${status}"`);
                if (status === 'F') {
                    console.log('✅ Found Full-time status (F) → Verification PASSED');
                    return 'Verified';
                }
            }
        }
        console.log('❌ No Full-time status (F) found → Manual verification needed');
        return 'Manual';
    }
    catch (error) {
        console.error('❌ Verification check error:', error);
        return 'Manual'; // Default to manual on error
    }
}
router.post('/students/with-documents', async (req, res) => {
    try {
        const age = calculateAge(req.body.dateOfBirth);
        let verificationStatus;
        if (age <= 17) {
            verificationStatus = 'Manual';
            console.log('👶 Under 17 - Setting Manual status');
        }
        else if (req.body.verificationResponse) {
            // Check enrollment status for verification
            verificationStatus = determineVerificationStatus(req.body.verificationResponse);
            console.log('🔍 Verification result based on enrollment:', verificationStatus);
        }
        else {
            verificationStatus = 'Manual';
            console.log('📝 No verification attempted - Manual review');
        }
        // Get college name
        const collegeCode = req.body.college;
        const collegeName = schools.find((school) => school.code === collegeCode)?.name || 'Unknown College';
        // Get payment data
        const paymentData = req.body.payment || {};
        console.log('💰 Payment data:', paymentData);
        const studentData = {
            Name: `${req.body.firstName} ${req.body.lastName}`.trim(),
            First_Name: req.body.firstName,
            Middle_Name: req.body.middleName || '',
            Last_Name: req.body.lastName,
            Email: req.body.email,
            Mobile_Number: req.body.mobile,
            Date_of_Birth: req.body.dateOfBirth,
            College: collegeName,
            Verification_Status: verificationStatus,
            Verification_Date: formatZohoDateTime(new Date()),
            Payment_Amount: paymentData.amount || '',
            Payment_Date: paymentData.date || '',
            Payment_ID: paymentData.id || '',
            Transaction_ID: paymentData.transactionId || '',
            Manual_Documents: req.body.documents?.join(', ') || ''
        };
        // Log final payload
        console.log('📤 Zoho payload:', studentData);
        const accessToken = await getZohoAccessToken();
        const zohoResponse = await fetch(`${process.env.ZOHO_API_DOMAIN}/crm/v2/Students`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [studentData] })
        });
        const result = await zohoResponse.json();
        console.log('✅ Zoho API Response:', result);
        if (!zohoResponse.ok) {
            throw new Error(`Zoho API Error: ${JSON.stringify(result)}`);
        }
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error('❌ Document submission error:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create record'
        });
    }
});
export default router;
