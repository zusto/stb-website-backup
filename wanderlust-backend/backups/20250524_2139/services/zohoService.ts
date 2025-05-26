import fetch from 'node-fetch';

interface ZohoTokenResponse {
  access_token: string;
  expires_in: number;
}

export class ZohoService {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  private async getAccessToken(): Promise<string> {
    if (!this.accessToken || Date.now() >= this.tokenExpiry) {
      const response = await fetch('https://accounts.zoho.eu/oauth/v2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
          client_id: process.env.ZOHO_CLIENT_ID!,
          client_secret: process.env.ZOHO_CLIENT_SECRET!,
          grant_type: 'refresh_token'
        })
      });

      const data = await response.json() as ZohoTokenResponse;
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000);
    }
    return this.accessToken;
  }

  async createStudent(studentData: any): Promise<any> {
    const token = await this.getAccessToken();
    
    const response = await fetch(`${process.env.ZOHO_API_DOMAIN}/crm/v2/Students`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [{
          Name: `${studentData.firstName} ${studentData.lastName}`,
          First_Name: studentData.firstName,
          Last_Name: studentData.lastName,
          Email: studentData.email,
          Date_of_Birth: studentData.dateOfBirth,
          College: studentData.college || '',
          Manual_Documents: studentData.documents?.join(', ') || '',
          Verification_Status: 'Manual Verification Required'
        }]
      })
    });

    return response.json();
  }
}