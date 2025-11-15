const axios = require('axios');

async function testWorkerRegistration() {
  const testData = {
    firstname: 'Test',
    lastname: 'Worker',
    email: 'testworker@example.com',
    password: 'password123',
    phone: '+1234567890',
    address: '123 Test Street, Test City',
    skill: 'Plumbing',
    experience: 3
  };

  try {
    console.log('🧪 Testing worker registration with data:', testData);
    
    const response = await axios.post('http://localhost:5000/api/auth/register/worker', testData);
    console.log('✅ Success:', response.data);
  } catch (error) {
    console.log('❌ Error status:', error.response?.status);
    console.log('❌ Error message:', error.response?.data?.message);
    console.log('❌ Validation errors:', error.response?.data?.errors);
  }
}

testWorkerRegistration();