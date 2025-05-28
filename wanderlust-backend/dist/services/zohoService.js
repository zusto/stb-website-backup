import fetch from 'node-fetch';
export class ZohoService {
    constructor() {
        this.accessToken = null;
        this.tokenExpiry = 0;
    }
    async getAccessToken() {
        if (!this.accessToken || Date.now() >= this.tokenExpiry) {
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
            this.accessToken = data.access_token;
            this.tokenExpiry = Date.now() + (data.expires_in * 1000);
        }
        return this.accessToken;
    }
    async createStudent(student) {
        const token = await this.getAccessToken();
        const response = await fetch(`${process.env.ZOHO_API_DOMAIN}/crm/v2/Students`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [student] })
        });
        return response.json();
    }
}
