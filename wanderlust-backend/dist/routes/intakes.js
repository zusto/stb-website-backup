import express from 'express';
import { getZohoAccessToken } from '../utils/zoho.js';
import { formatZohoDateTime } from '../utils/dateUtils.js';
import { sendToSlack } from '../utils/slackNotifier.js';
const router = express.Router();
// Debug logging middleware
router.use('*', (req, res, next) => {
    console.log('🎯 Intakes Route Hit:', {
        method: req.method,
        path: req.path,
        body: req.body,
        timestamp: new Date().toISOString()
    });
    next();
});
router.post('/submit', async (req, res) => {
    try {
        console.log('📝 Received intake submission:', req.body);
        const accessToken = await getZohoAccessToken();
        const now = new Date();
        const response = await fetch('https://www.zohoapis.eu/crm/v2/Intakes', {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [{
                        Name: req.body.First_Name,
                        Middle_Name: req.body.Middle_Name || '',
                        Last_Name: req.body.Last_Name,
                        Date_of_Birth: req.body.Date_of_Birth,
                        Email: req.body.Email,
                        Mobile: req.body.Mobile,
                        Submission_Date: formatZohoDateTime(now),
                        Lead_Source: req.body.Lead_Source || 'ISIC Card Application'
                    }]
            })
        });
        const result = await response.json();
        await sendToSlack('Intake Form Submission', {
            Name: req.body.First_Name,
            Middle_Name: req.body.Middle_Name || '',
            Last_Name: req.body.Last_Name,
            Date_of_Birth: req.body.Date_of_Birth,
            Email: req.body.Email,
            Mobile: req.body.Mobile,
            Submission_Date: formatZohoDateTime(now),
            Lead_Source: req.body.Lead_Source || 'ISIC Card Application'
        });
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error('❌ Intakes submission error:', error);
        // Don't expose error details in production
        res.status(500).json({
            success: false,
            error: process.env.NODE_ENV === 'production'
                ? 'Failed to submit intake form'
                : error instanceof Error
                    ? error.message
                    : 'Unknown error occurred'
        });
    }
});
export default router;
