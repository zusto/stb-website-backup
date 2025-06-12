import express from 'express';
import { Router } from 'express';
import { getZohoAccessToken } from '../utils/zoho.js';
import fetch from 'node-fetch';
import { sendToSlack } from '../utils/slackNotifier.js';

const router = Router();

// Helper function for Zoho date format
function formatZohoDateTime(date: Date): string {
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
  } catch (error) {
    console.error('❌ DateTime formatting error:', error);
    // Return current date in correct format as fallback
    const now = new Date();
    return now.toISOString().replace(/Z$/, '+00:00');
  }
}

function formatZohoDate(dateStr: string): string {
  // Convert DD-MM-YYYY to YYYY-MM-DD
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
}

router.post('/apply', async (req, res) => {
  try {
    console.log('📝 Received application:', req.body);

    const accessToken = await getZohoAccessToken();
    const now = new Date();

    const response = await fetch('https://www.zohoapis.eu/crm/v2/Ambassadors', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [{
          Name: req.body.fullName,
          Email: req.body.email,
          Mobile: req.body.mobile,
          Date_of_Birth: formatZohoDate(req.body.birthday),
          Home_Base: req.body.homeBaseUS,
          College: req.body.collegeUniversity,
          Abroad_Location: req.body.abroadLocation,
          Guide_Current_Location: req.body.guideLocation,
          Preferred_Destinations: req.body.preferredDestinations || '',
          Pitch: req.body.pitch,
          Payout_Method: req.body.payoutMethod,
          Instagram: req.body.instagramHandle || '',
          TikTok: req.body.tiktokHandle || '',
          YouTube: req.body.youtubeLink || '',
          Hours_Commitment: req.body.hoursCommitment,
          Languages: req.body.languagesSpoken,
          Portfolio: req.body.portfolioLink || '',
          How_Heard: req.body.howHeard,
          Past_Gigs: req.body.pastGigs || '',
          Preferred_Chat: req.body.preferredChat,
          Leade_Source: "website-ambassador-form", // Default value
          Application_Date: formatZohoDateTime(now), // Format date properly
          Status: 'New'
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
    console.log('✅ Zoho response:', result);

    // Add Slack notification
    await sendToSlack('Ambassador Application', {
          Name: req.body.fullName,
          Email: req.body.email,
          Mobile: req.body.mobile,
          Date_of_Birth: formatZohoDate(req.body.birthday),
          Home_Base: req.body.homeBaseUS,
          College: req.body.collegeUniversity,
          Abroad_Location: req.body.abroadLocation,
          Guide_Current_Location: req.body.guideLocation,
          Preferred_Destinations: req.body.preferredDestinations || '',
          Pitch: req.body.pitch,
          Payout_Method: req.body.payoutMethod,
          Instagram: req.body.instagramHandle || '',
          TikTok: req.body.tiktokHandle || '',
          YouTube: req.body.youtubeLink || '',
          Hours_Commitment: req.body.hoursCommitment,
          Languages: req.body.languagesSpoken,
          Portfolio: req.body.portfolioLink || '',
          How_Heard: req.body.howHeard,
          Past_Gigs: req.body.pastGigs || '',
          Preferred_Chat: req.body.preferredChat,
          Leade_Source: "website-ambassador-form", // Default value
          Application_Date: formatZohoDateTime(now), // Format date properly
          Status: 'New'
    });

    res.json({ success: true, data: result });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;