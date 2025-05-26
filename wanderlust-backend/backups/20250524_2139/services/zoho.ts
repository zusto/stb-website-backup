import { ZohoResponse } from '../types/zoho';

// Type guard to validate response
function isZohoResponse(data: unknown): data is ZohoResponse {
  return (
    typeof data === 'object' && 
    data !== null && 
    'data' in data &&
    Array.isArray((data as ZohoResponse).data)
  );
}

export async function fetchZohoData() {
    try {
        const baseUrl = 'https://www.zohoapis.com/crm/v2';
        const endpoint = '/Students'; // or other endpoints like /contacts, /accounts, etc.
        const accessToken = process.env.ZOHO_ACCESS_TOKEN;

        const response = await fetch(`${baseUrl}${endpoint}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        
        const data: unknown = await response.json();
        
        if (!isZohoResponse(data)) {
            throw new Error('Invalid Zoho API response format');
        }
        
        return data.data;
    } catch (error) {
        console.error('Zoho API error:', error);
        throw error;
    }
}