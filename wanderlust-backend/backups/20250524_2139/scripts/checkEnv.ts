console.log('Current ENV variables:', {
  ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID?.substring(0, 10) + '...',
  ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET?.substring(0, 10) + '...',
  ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN?.substring(0, 10) + '...'
});