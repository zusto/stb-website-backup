import { Router } from 'express';
import { getZohoAccessToken } from '../utils/zoho.js';
import fetch from 'node-fetch';
const router = Router();
// Add the date formatting functions
function formatZohoDateTime(date) {
    try {
        const tzOffset = -date.getTimezoneOffset();
        const tzHours = Math.floor(Math.abs(tzOffset) / 60)
            .toString()
            .padStart(2, '0');
        const tzMinutes = (Math.abs(tzOffset) % 60).toString().padStart(2, '0');
        const tzSign = tzOffset >= 0 ? '+' : '-';
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${tzSign}${tzHours}:${tzMinutes}`;
    }
    catch (error) {
        console.error('❌ DateTime formatting error:', error);
        return new Date().toISOString().replace(/Z$/, '+00:00');
    }
}
router.post('/submit', async (req, res) => {
    try {
        const { answers, calculations } = req.body;
        console.log('🎯 Quiz route hit:', {
            path: '/api/quiz/submit',
            answers,
            calculations
        });
        const accessToken = await getZohoAccessToken();
        const now = new Date();
        // Handle categories properly
        const spendingCategories = answers.cats || '';
        const zohoData = {
            data: [{
                    Name: answers.name || 'Anonymous',
                    Email: answers.email || '',
                    Destination: answers.dest || '',
                    Travel_Vibe: answers.vibe || '',
                    Budget_Style: answers.style || '',
                    Spending_Categories: spendingCategories, // Already formatted string from frontend
                    Group_Size: answers.group || 'Solo',
                    Quiz_Date: formatZohoDateTime(now)
                }]
        };
        console.log('📤 Sending to Zoho:', zohoData);
        const response = await fetch('https://www.zohoapis.eu/crm/v2/Quizzers', {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(zohoData)
        });
        // Add response logging
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Zoho API error:', {
                status: response.status,
                body: errorText
            });
            throw new Error('Failed to store quiz data');
        }
        const result = await response.json();
        console.log('✅ Quiz data stored in Zoho:', result);
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error('❌ Quiz submission error:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to submit quiz'
        });
    }
});
export default router;
