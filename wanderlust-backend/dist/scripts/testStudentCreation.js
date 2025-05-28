import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
async function testCreateStudent() {
    try {
        const testData = {
            firstName: "Test",
            lastName: "Student",
            email: "test@example.com",
            dateOfBirth: "2000-01-01",
            college: "Test University",
            automaticVerification: "Not Applicable"
        };
        const response = await fetch('https://studenttravelbuddy.com/api/zoho/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });
        const data = await response.json();
        console.log('Response:', JSON.stringify(data, null, 2));
    }
    catch (error) {
        console.error('Test failed:', error);
    }
}
testCreateStudent();
