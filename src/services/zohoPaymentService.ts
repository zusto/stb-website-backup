interface PaymentRecord {
  First_Name: string;
  Email: string;
  Amount: number;
  Payment_Date: string;
  Payment_ID: string;
  Transaction_ID: string;
  Payment_Status: 'Success' | 'Failed';
}

class ZohoPaymentService {
  async createPaymentRecord(payment: PaymentRecord): Promise<void> {
    try {
      const response = await fetch('/api/zoho/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment)
      });

      if (!response.ok) {
        throw new Error('Failed to create payment record in Zoho CRM');
      }

      console.log('💫 Zoho CRM payment record created');
    } catch (error) {
      console.error('❌ Zoho payment record creation failed:', error);
      throw error;
    }
  }
}

export const zohoPayments = new ZohoPaymentService();