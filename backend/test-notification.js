const database = require('./utils/database');
const { ObjectId } = require('mongodb');

async function findWorkerAndCreateBooking() {
  try {
    await database.connect();
    const db = database.getDb();
    const usersCollection = db.collection('users');
    
    // Find sp muthamare worker
    const worker = await usersCollection.findOne({
      role: 'worker',
      $or: [
        { firstName: { $regex: 'sp', $options: 'i' } },
        { lastName: { $regex: 'muthmare', $options: 'i' } },
        { email: 'sujal@gmail.com' }
      ]
    });
    
    if (!worker) {
      console.log('❌ Worker sp muthamare not found');
      return;
    }
    
    console.log('✅ Found worker:', worker.firstName, worker.lastName, '- ID:', worker._id);
    
    // Create test booking with jatin@gmail.com
    const bookingsCollection = db.collection('bookings');
    const notificationsCollection = db.collection('notifications');

    const bookingData = {
      service: 'Cleaning',
      serviceType: 'Cleaning',
      workerId: worker._id,
      workerName: `${worker.firstName} ${worker.lastName}`,
      userDetails: {
        name: 'Jatin Kumar',
        phone: '+1234567891',
        email: 'jatin@gmail.com'
      },
      address: '456 Test Avenue, Delhi',
      date: new Date('2025-11-17'),
      time: '15:00',
      description: 'Regular house cleaning service',
      estimatedCost: 1500,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const bookingResult = await bookingsCollection.insertOne(bookingData);
    console.log('✅ Test booking created for jatin@gmail.com:', bookingResult.insertedId);

    // Create notification for worker
    const notification = {
      recipientId: worker._id,
      type: 'booking_request',
      title: 'New Cleaning booking request',
      message: 'You have a new booking request from Jatin Kumar',
      data: {
        bookingId: bookingResult.insertedId,
        service: 'Cleaning',
        address: '456 Test Avenue, Delhi',
        date: '2025-11-17',
        time: '15:00',
        customerName: 'Jatin Kumar',
        customerPhone: '+1234567891',
        estimatedCost: 1500
      },
      isRead: false,
      createdAt: new Date()
    };

    const notificationResult = await notificationsCollection.insertOne(notification);
    console.log('✅ Notification created:', notificationResult.insertedId);

    await database.close();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

findWorkerAndCreateBooking();