"use strict";
const clientId = '1000.CD0G9YCLEFJIN5XP67TB1RF2HW2MBP';
const scope = 'ZohoCRM.modules.ALL';
const redirectUri = 'https://studenttravelbuddy.com/api/zoho/callback';
const authUrl = `https://accounts.zoho.eu/oauth/v2/auth?scope=${scope}&client_id=${clientId}&response_type=code&access_type=offline&redirect_uri=${redirectUri}`;
console.log('Visit this URL to authorize:', authUrl);
