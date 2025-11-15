#!/usr/bin/env node

const http = require('http');

function testEndpoint(endpoint, method = 'GET', data = null) {
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

async function runTests() {
  const tests = [
    { name: 'Health Check', endpoint: '/health' },
    { name: 'Workers List', endpoint: '/api/workers' },
    { name: 'Services List', endpoint: '/api/services' },
    { name: 'Service Categories', endpoint: '/api/services/categories/all' },
    { name: 'Popular Services', endpoint: '/api/services/trending/popular' },
  ];

  console.log('🧪 Testing TaskTurf Backend API Endpoints\n');
  console.log('=' .repeat(50));

  for (const test of tests) {
    try {
      console.log(`\n🔍 Testing: ${test.name}`);
      console.log(`📡 ${test.method || 'GET'} ${test.endpoint}`);
      
      const result = await testEndpoint(test.endpoint, test.method, test.data);
      
      if (result.status >= 200 && result.status < 300) {
        console.log(`✅ SUCCESS (${result.status})`);
        if (result.data && typeof result.data === 'object') {
          if (result.data.success !== undefined) {
            console.log(`   Success: ${result.data.success}`);
          }
          if (result.data.count !== undefined) {
            console.log(`   Count: ${result.data.count}`);
          }
          if (result.data.message) {
            console.log(`   Message: ${result.data.message}`);
          }
        }
      } else {
        console.log(`❌ ERROR (${result.status})`);
        if (result.data && result.data.message) {
          console.log(`   Error: ${result.data.message}`);
        }
      }
      
    } catch (error) {
      console.log(`💥 FAILED: ${error.error || error.message}`);
    }
  }

  console.log('\n' + '=' .repeat(50));
  console.log('🏁 Test completed!');
}

runTests().catch(console.error);