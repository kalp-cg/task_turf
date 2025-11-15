#!/usr/bin/env node

const http = require('http');

function makeRequest(endpoint, method = 'GET', data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: endpoint,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data && method !== 'GET') {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ 
            status: res.statusCode, 
            data: parsed,
            endpoint: endpoint,
            method: method
          });
        } catch (e) {
          resolve({ 
            status: res.statusCode, 
            data: body,
            endpoint: endpoint,
            method: method,
            error: 'Failed to parse JSON'
          });
        }
      });
    });

    req.on('error', (e) => {
      reject({ 
        endpoint: endpoint, 
        method: method, 
        error: e.message 
      });
    });

    if (data && method !== 'GET') {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function testAuthentication() {
  console.log('🔐 Testing TaskTurf Authentication System\n');
  console.log('=' .repeat(50));

  // Test data
  const testUser = {
    firstname: 'John',
    lastname: 'Doe', 
    email: 'john.doe.test@example.com',
    password: 'testpass123',
    phone: '+1234567890',
    address: {
      street: '123 Test St',
      city: 'Test City',
      state: 'TS',
      zipcode: '12345'
    }
  };

  const testWorker = {
    firstname: 'Jane',
    lastname: 'Smith',
    email: 'jane.smith.test@example.com', 
    password: 'testpass123',
    phone: '+1234567891',
    address: {
      street: '456 Worker Ave',
      city: 'Worker City',
      state: 'WS',
      zipcode: '54321'
    },
    skill: 'Cleaning',
    experience: 3,
    bio: 'Professional cleaner with 3 years experience'
  };

  let userToken = null;
  let workerToken = null;

  try {
    // 1. Test User Registration
    console.log('\n📝 Testing User Registration');
    console.log('POST /api/auth/register/user');
    const userReg = await makeRequest('/api/auth/register/user', 'POST', testUser);
    
    if (userReg.status === 201) {
      console.log('✅ User registration successful');
      userToken = userReg.data.token;
      console.log(`   Token received: ${userToken ? 'Yes' : 'No'}`);
      console.log(`   User ID: ${userReg.data.user?.id || 'N/A'}`);
    } else {
      console.log(`❌ User registration failed (${userReg.status})`);
      console.log(`   Error: ${userReg.data.message || 'Unknown error'}`);
    }

    // 2. Test Worker Registration  
    console.log('\n👷 Testing Worker Registration');
    console.log('POST /api/auth/register/worker');
    const workerReg = await makeRequest('/api/auth/register/worker', 'POST', testWorker);
    
    if (workerReg.status === 201) {
      console.log('✅ Worker registration successful');
      workerToken = workerReg.data.token;
      console.log(`   Token received: ${workerToken ? 'Yes' : 'No'}`);
      console.log(`   Worker ID: ${workerReg.data.worker?.id || 'N/A'}`);
      console.log(`   Charge: $${workerReg.data.worker?.charge || 'N/A'}`);
    } else {
      console.log(`❌ Worker registration failed (${workerReg.status})`);
      console.log(`   Error: ${workerReg.data.message || 'Unknown error'}`);
    }

    // 3. Test User Login
    console.log('\n🔑 Testing User Login');
    console.log('POST /api/auth/login');
    const userLogin = await makeRequest('/api/auth/login', 'POST', {
      email: testUser.email,
      password: testUser.password
    });

    if (userLogin.status === 200) {
      console.log('✅ User login successful');
      console.log(`   Role: ${userLogin.data.user?.role || 'N/A'}`);
      console.log(`   Name: ${userLogin.data.user?.firstname} ${userLogin.data.user?.lastname}`);
    } else {
      console.log(`❌ User login failed (${userLogin.status})`);
      console.log(`   Error: ${userLogin.data.message || 'Unknown error'}`);
    }

    // 4. Test Worker Login
    console.log('\n🔧 Testing Worker Login');
    console.log('POST /api/auth/login');
    const workerLogin = await makeRequest('/api/auth/login', 'POST', {
      email: testWorker.email,
      password: testWorker.password
    });

    if (workerLogin.status === 200) {
      console.log('✅ Worker login successful');
      console.log(`   Role: ${workerLogin.data.user?.role || 'N/A'}`);
      console.log(`   Skill: ${workerLogin.data.user?.skill || 'N/A'}`);
    } else {
      console.log(`❌ Worker login failed (${workerLogin.status})`);
      console.log(`   Error: ${workerLogin.data.message || 'Unknown error'}`);
    }

    // 5. Test Protected Route with User Token
    if (userToken) {
      console.log('\n👤 Testing Protected Route (User Profile)');
      console.log('GET /api/profile');
      const profile = await makeRequest('/api/profile', 'GET', null, userToken);
      
      if (profile.status === 200) {
        console.log('✅ Profile access successful');
        console.log(`   User role: ${profile.data.user?.role || 'N/A'}`);
        console.log(`   User email: ${profile.data.user?.email || 'N/A'}`);
      } else {
        console.log(`❌ Profile access failed (${profile.status})`);
        console.log(`   Error: ${profile.data.message || 'Unknown error'}`);
      }
    }

  } catch (error) {
    console.log(`💥 Test failed: ${error.error || error.message}`);
  }

  console.log('\n' + '=' .repeat(50));
  console.log('🏁 Authentication testing completed!');
}

testAuthentication().catch(console.error);