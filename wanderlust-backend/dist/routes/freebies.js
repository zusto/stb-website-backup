import { Router } from 'express';
import { getZohoAccessToken } from '../utils/zoho.js';
import fetch from 'node-fetch';
import { sendToSlack } from '../utils/slackNotifier.js';
const router = Router();
// Add diagnostic endpoint
router.get('/debug', (req, res) => {
    res.json({ message: 'Freebies router is mounted' });
});
// Add wildcard logging
router.use('*', (req, res, next) => {
    console.log('🎯 Freebies Route Hit:', {
        method: req.method,
        originalUrl: req.originalUrl,
        path: req.path,
        params: req.params,
        body: req.body
    });
    next();
});
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
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${tzSign}${tzHours}:${tzMinutes}`;
    }
    catch (error) {
        console.error('❌ DateTime formatting error:', error);
        return new Date().toISOString().replace(/Z$/, '+00:00');
    }
}
router.post('/submit', async (req, res) => {
    try {
        console.log('📝 Received freebie download:', req.body);
        const accessToken = await getZohoAccessToken();
        const now = new Date();
        // Add debug log for datetime format
        console.log('🕒 Formatted date:', formatZohoDateTime(now));
        const response = await fetch('https://www.zohoapis.eu/crm/v2/Freebies', {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [{
                        Name: req.body.Full_Name,
                        Email: req.body.Email,
                        Resource_Name: req.body.Resource_Name,
                        Resource_Link: req.body.Resource_Link,
                        Download_Date: formatZohoDateTime(now),
                        Lead_Source: 'Website Downloads'
                    }]
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Zoho API error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorText
            });
            throw new Error('Failed to create Zoho record');
        }
        const result = await response.json();
        await sendToSlack('Freebies Request', {
            Name: req.body.Full_Name,
            Email: req.body.Email,
            Resource_Name: req.body.Resource_Name,
            Resource_Link: req.body.Resource_Link,
            Download_Date: formatZohoDateTime(now),
            Lead_Source: 'Website Downloads'
        });
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
export default router;
