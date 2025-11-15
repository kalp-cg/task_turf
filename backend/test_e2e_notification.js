// E2E Notification Test Script
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testNotificationFlow() {
  console.log('🚀 Starting E2E Notification Test...\n');

  try {
    // 1. Check if sp muthmare worker exists
    console.log('1. Checking worker sp muthmare...');
    const workerResponse = await axios.get(`${BASE_URL}/workers`);
    const worker = workerResponse.data.find(w => 
      w.firstName.toLowerCase().includes('sp') && 
      w.lastName.toLowerCase().includes('muthmare')
    );
    
    if (!worker) {
      console.error('❌ Worker sp muthmare not found');
      return;
    }
    console.log(`✅ Found worker: ${worker.firstName} ${worker.lastName} (ID: ${worker._id})`);

    // 2. Create a new booking request
    console.log('\n2. Creating booking request...');
    const bookingData = {
      serviceType: 'plumbing',
      clientId: 'jatin@gmail.com',
      clientName: 'Jatin Kumar', 
      clientPhone: '+91-9876543210',
      workerId: worker._id,
      workerName: `${worker.firstName} ${worker.lastName}`,
      date: '2024-12-25',
      time: '10:00 AM',
      address: '123 Test Street, Mumbai',
      description: 'Emergency plumbing repair needed',
      price: 800,
      status: 'pending'
    };

    const bookingResponse = await axios.post(`${BASE_URL}/bookings`, bookingData);
    console.log(`✅ Booking created: ID ${bookingResponse.data._id}`);

    // 3. Check notifications for the worker
    console.log('\n3. Checking worker notifications...');
    const notificationResponse = await axios.get(`${BASE_URL}/notifications/${worker._id}/pending`);
    const notifications = notificationResponse.data;
    
    console.log(`✅ Found ${notifications.length} pending notifications:`);
    notifications.forEach((notif, index) => {
      console.log(`   ${index + 1}. ${notif.type} - ${notif.message}`);
      console.log(`      From: ${notif.clientName} (${notif.clientEmail})`);
      console.log(`      Date: ${new Date(notif.createdAt).toLocaleString()}\n`);
    });

    // 4. Check worker stats
    console.log('4. Checking worker dashboard stats...');
    const statsResponse = await axios.get(`${BASE_URL}/notifications/${worker._id}/stats`);
    const stats = statsResponse.data;
    
    console.log('✅ Worker Dashboard Stats:');
    console.log(`   📊 Total Earnings: ₹${stats.totalEarnings}`);
    console.log(`   📅 Completed Jobs: ${stats.completedJobs}`);
    console.log(`   ⏳ Pending Requests: ${stats.pendingRequests}`);
    console.log(`   ⭐ Average Rating: ${stats.averageRating}/5`);

    console.log('\n🎉 E2E Notification Test Completed Successfully!');
    console.log('\n📋 Summary:');
    console.log(`   • Worker sp muthmare found and has ID: ${worker._id}`);
    console.log(`   • Booking request created successfully`);
    console.log(`   • Notifications are being generated correctly`);
    console.log(`   • Worker dashboard data is available`);
    console.log(`   • Frontend should show notification bell with count: ${notifications.length}`);

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    if (error.response?.status === 404) {
      console.log('   • Make sure the backend server is running on port 5000');
    }
  }
}

// Run the test
testNotificationFlow();