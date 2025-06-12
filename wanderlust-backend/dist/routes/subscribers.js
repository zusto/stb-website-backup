import { Router } from 'express';
import { getZohoAccessToken } from '../utils/zoho.js';
import fetch from 'node-fetch';
import { sendToSlack } from '../utils/slackNotifier.js';
const router = Router();
// Add counter at the top
let subscriberCounter = 0;
router.post('/subscribe', async (req, res) => {
    try {
        const { email, source } = req.body;
        console.log('📧 New subscription:', { email, source });
        // Increment counter
        subscriberCounter++;
        const accessToken = await getZohoAccessToken();
        // Create Zoho Lead with numbered subscriber
        const response = await fetch('https://www.zohoapis.eu/crm/v2/Subscribers', {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [{
                        Email: email,
                        Lead_Source: source || 'Website Subscription',
                        Name: `Subscriber_${subscriberCounter.toString().padStart(4, '0')}`, // e.g. Subscriber_0001
                        Description: `Subscribed via ${source}`
                    }]
            })
        });
        if (!response.ok) {
            throw new Error('Failed to create Zoho lead');
        }
        const result = await response.json();
        console.log('✅ Zoho lead created:', result);
        await sendToSlack('Newsletter Subscription', {
            Email: email,
            Lead_Source: source || 'Website Subscription',
            Name: `Subscriber_${subscriberCounter.toString().padStart(4, '0')}`, // e.g. Subscriber_0001
            Description: `Subscribed via ${source}`
        });
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error('❌ Subscription error:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to subscribe'
        });
    }
});
export default router;
