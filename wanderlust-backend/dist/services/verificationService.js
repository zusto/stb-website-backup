import { ZohoService } from './zohoService.js';
export class VerificationService {
    constructor() {
        this.zohoService = new ZohoService();
    }
    async handleManualVerification(data) {
        try {
            // Create Zoho CRM record
            const studentRecord = {
                First_Name: data.firstName,
                Last_Name: data.lastName,
                Email: data.email,
                Date_of_Birth: data.dateOfBirth,
                College: data.college || '',
                Automatic_Verification: 'Manual Verification Required',
                Manual_Documents: data.documents?.join(', ') || '',
                Verification_Date: new Date().toISOString()
            };
            const crmResponse = await this.zohoService.createStudent(studentRecord);
            console.log('Zoho CRM record created:', crmResponse);
            return {
                success: true,
                crmRecordId: crmResponse.data?.[0]?.details?.id
            };
        }
        catch (error) {
            console.error('Manual verification error:', error);
            throw error;
        }
    }
}
