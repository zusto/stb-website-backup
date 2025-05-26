import dotenv from 'dotenv';
dotenv.config();

console.log('Verifying Zoho configuration:');
console.log('ZOHO_REFRESH_TOKEN:', process.env.ZOHO_REFRESH_TOKEN?.substring(0, 10) + '...');
console.log('ZOHO_API_DOMAIN:', process.env.ZOHO_API_DOMAIN);