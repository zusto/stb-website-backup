import { ZohoCRMService } from '../services/zohoCrmService';

async function testZohoIntegration() {
  const zohoService = new ZohoCRMService();
  
  try {
    const testStudentData = {
      firstName: "Test",
      lastName: "Student",
      middleName: "Middle",
      email: "test.student@example.com",
      dateOfBirth: "2000-01-01",
      isStudent: true,
      college: "Test University",
      automaticVerification: "Not Applicable" as const,
      verificationDate: new Date().toISOString(),
      agreedToTerms: true,
      consentGiven: true,
      manualDocuments: ["test_document.pdf"]
    };
    
    console.log('Creating test student record...');
    await zohoService.createStudentRecord(testStudentData);
    console.log('Test record created successfully!');
    
  } catch (error) {
    console.error('Test failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
}

// Run the test
testZohoIntegration();