const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const database = require('./database');

const services = [
  'Cleaning', 'Plumbing', 'Electrical', 'Babysitting', 
  'Gardening', 'Cooking', 'Painting', 'Carpentry',
  'Home Repair', 'Tutoring', 'Pet Care', 'Moving',
  'Laundry', 'Car Wash', 'Photography', 'Massage'
];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata',
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
];

const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
  'Ananya', 'Diya', 'Saanvi', 'Aadhya', 'Kavya', 'Pihu', 'Avni', 'Myra', 'Kiara', 'Aisha',
  'Ravi', 'Suresh', 'Prakash', 'Rajesh', 'Amit', 'Sandeep', 'Vikash', 'Manish', 'Deepak', 'Ashok',
  'Priya', 'Sunita', 'Meera', 'Kavita', 'Neha', 'Pooja', 'Rekha', 'Sonia', 'Nisha', 'Geeta'
];

const lastNames = [
  'Sharma', 'Patel', 'Singh', 'Kumar', 'Verma', 'Gupta', 'Jain', 'Agarwal', 'Shah', 'Reddy',
  'Nair', 'Rao', 'Iyer', 'Bansal', 'Chopra', 'Mehta', 'Malhotra', 'Joshi', 'Mishra', 'Tiwari'
];

const generateRandomData = () => {
  return {
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    service: services[Math.floor(Math.random() * services.length)]
  };
};

const generateWorkerData = async (index) => {
  const { firstName, lastName, city, service } = generateRandomData();
  const experience = Math.floor(Math.random() * 10) + 1;
  const hourlyRate = experience >= 7 ? 1200 + Math.floor(Math.random() * 800) 
                    : experience >= 4 ? 800 + Math.floor(Math.random() * 400)
                    : 500 + Math.floor(Math.random() * 300);
  
  const completedJobs = Math.floor(Math.random() * 50) + 5;
  const rating = Math.round((3.5 + Math.random() * 1.5) * 10) / 10;

  const workHistory = [];
  for (let i = 0; i < Math.min(5, completedJobs); i++) {
    const clientData = generateRandomData();
    workHistory.push({
      id: new ObjectId().toString(),
      clientName: `${clientData.firstName} ${clientData.lastName}`,
      serviceType: service,
      description: `Completed ${service.toLowerCase()} work with excellent quality and customer satisfaction.`,
      completedDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
      duration: Math.floor(Math.random() * 8) + 1,
      earnings: Math.floor(Math.random() * 2000) + 500,
      rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
      review: 'Excellent work quality and professional service.',
      location: clientData.city,
      createdAt: new Date()
    });
  }

  const addresses = [
    {
      id: new ObjectId().toString(),
      label: 'Home',
      street: `${Math.floor(Math.random() * 999) + 1} Main Street`,
      city: city,
      state: city === 'Mumbai' ? 'Maharashtra' 
            : city === 'Delhi' ? 'Delhi'
            : city === 'Bangalore' ? 'Karnataka'
            : city === 'Chennai' ? 'Tamil Nadu'
            : city === 'Kolkata' ? 'West Bengal'
            : city === 'Hyderabad' ? 'Telangana'
            : city === 'Pune' ? 'Maharashtra'
            : city === 'Ahmedabad' ? 'Gujarat'
            : city === 'Jaipur' ? 'Rajasthan'
            : 'Gujarat',
      zipcode: `${Math.floor(Math.random() * 90000) + 10000}`,
      isDefault: true,
      createdAt: new Date()
    }
  ];

  return {
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.worker${index}@taskturf.com`,
    firstName,
    lastName,
    phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    address: `${addresses[0].street}, ${addresses[0].city}`,
    addresses,
    role: 'worker',
    password: await bcrypt.hash('password123', 12),
    skills: [service],
    specializations: Math.random() > 0.5 ? [services[Math.floor(Math.random() * services.length)]] : [],
    experience,
    hourlyRate,
    rating,
    description: `Professional ${service.toLowerCase()} specialist with ${experience} years of experience. Committed to delivering high-quality service and customer satisfaction.`,
    completedJobs,
    totalEarnings: workHistory.reduce((sum, work) => sum + work.earnings, 0),
    isAvailable: Math.random() > 0.1,
    profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
    bio: `Experienced ${service.toLowerCase()} professional serving ${city} and surrounding areas.`,
    workHistory,
    reviews: workHistory.map(work => ({
      id: new ObjectId().toString(),
      clientName: work.clientName,
      rating: work.rating,
      comment: work.review,
      date: work.completedDate
    })),
    availability: {
      monday: { available: true, hours: '9:00-17:00' },
      tuesday: { available: true, hours: '9:00-17:00' },
      wednesday: { available: true, hours: '9:00-17:00' },
      thursday: { available: true, hours: '9:00-17:00' },
      friday: { available: true, hours: '9:00-17:00' },
      saturday: { available: Math.random() > 0.5, hours: Math.random() > 0.5 ? '10:00-16:00' : '' },
      sunday: { available: Math.random() > 0.7, hours: Math.random() > 0.7 ? '12:00-16:00' : '' }
    },
    isVerified: Math.random() > 0.2,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isActive: true
  };
};

const generateUserData = async (index) => {
  const { firstName, lastName, city } = generateRandomData();
  
  const bookingHistory = [];
  const numBookings = Math.floor(Math.random() * 10);
  let totalSpent = 0;

  for (let i = 0; i < numBookings; i++) {
    const workerData = generateRandomData();
    const cost = Math.floor(Math.random() * 2000) + 300;
    totalSpent += cost;
    
    bookingHistory.push({
      id: new ObjectId().toString(),
      workerName: `${workerData.firstName} ${workerData.lastName}`,
      serviceType: workerData.service,
      date: new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000),
      cost,
      status: Math.random() > 0.2 ? 'completed' : 'pending',
      rating: Math.random() > 0.3 ? Math.round((3.5 + Math.random() * 1.5) * 10) / 10 : null,
      createdAt: new Date()
    });
  }

  const addresses = [
    {
      id: new ObjectId().toString(),
      label: 'Home',
      street: `${Math.floor(Math.random() * 999) + 1} Residential Street`,
      city: city,
      state: city === 'Mumbai' ? 'Maharashtra' 
            : city === 'Delhi' ? 'Delhi'
            : city === 'Bangalore' ? 'Karnataka'
            : city === 'Chennai' ? 'Tamil Nadu'
            : city === 'Kolkata' ? 'West Bengal'
            : city === 'Hyderabad' ? 'Telangana'
            : city === 'Pune' ? 'Maharashtra'
            : city === 'Ahmedabad' ? 'Gujarat'
            : city === 'Jaipur' ? 'Rajasthan'
            : 'Gujarat',
      zipcode: `${Math.floor(Math.random() * 90000) + 10000}`,
      isDefault: true,
      createdAt: new Date()
    }
  ];

  // Some users have work addresses too
  if (Math.random() > 0.6) {
    addresses.push({
      id: new ObjectId().toString(),
      label: 'Work',
      street: `${Math.floor(Math.random() * 999) + 1} Business Avenue`,
      city: city,
      state: addresses[0].state,
      zipcode: `${Math.floor(Math.random() * 90000) + 10000}`,
      isDefault: false,
      createdAt: new Date()
    });
  }

  return {
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.user${index}@taskturf.com`,
    firstName,
    lastName,
    phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    address: `${addresses[0].street}, ${addresses[0].city}`,
    addresses,
    role: 'user',
    password: await bcrypt.hash('password123', 12),
    bookingHistory,
    favoriteWorkers: [],
    totalSpent,
    profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}User`,
    bio: `TaskTurf customer from ${city}. Looking for reliable service providers.`,
    isVerified: Math.random() > 0.3,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isActive: true
  };
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await database.connect();
    const db = database.getDb();
    const usersCollection = db.collection('users');

    console.log('🔍 Checking for existing seed data...');
    const existingSeedData = await usersCollection.findOne({ 
      email: { $regex: '@taskturf.com$' } 
    });

    if (existingSeedData) {
      console.log('⚠️  Seed data already exists. Cleaning up...');
      await usersCollection.deleteMany({ 
        email: { $regex: '@taskturf.com$' } 
      });
    }

    console.log('👷 Generating 20 worker profiles...');
    const workers = [];
    for (let i = 1; i <= 20; i++) {
      const workerData = await generateWorkerData(i);
      workers.push(workerData);
    }

    console.log('👥 Generating 20 user profiles...');
    const users = [];
    for (let i = 1; i <= 20; i++) {
      const userData = await generateUserData(i);
      users.push(userData);
    }

    console.log('💾 Inserting data into MongoDB...');
    const allUsers = [...workers, ...users];
    const result = await usersCollection.insertMany(allUsers);

    console.log(`✅ Successfully seeded database with:`);
    console.log(`   📊 ${workers.length} workers`);
    console.log(`   📊 ${users.length} users`);
    console.log(`   📊 Total: ${result.insertedCount} profiles`);

    // Log some sample data
    console.log('\n🔍 Sample Worker Data:');
    console.log(`   📧 Email: ${workers[0].email}`);
    console.log(`   👤 Name: ${workers[0].firstName} ${workers[0].lastName}`);
    console.log(`   🛠️  Service: ${workers[0].skills[0]}`);
    console.log(`   ⭐ Rating: ${workers[0].rating}`);
    console.log(`   💼 Completed Jobs: ${workers[0].completedJobs}`);

    console.log('\n🔍 Sample User Data:');
    console.log(`   📧 Email: ${users[0].email}`);
    console.log(`   👤 Name: ${users[0].firstName} ${users[0].lastName}`);
    console.log(`   📍 Location: ${users[0].addresses[0].city}`);
    console.log(`   💰 Total Spent: ₹${users[0].totalSpent}`);

    console.log('\n🔐 Test Login Credentials:');
    console.log('   Worker: testworker@example.com / password123');
    console.log('   User: testuser@example.com / password123');
    console.log('   Or any seeded email with password: password123');

    return {
      success: true,
      inserted: result.insertedCount,
      workers: workers.length,
      users: users.length
    };

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then((result) => {
      if (result.success) {
        console.log('\n🎉 Database seeding completed successfully!');
        process.exit(0);
      } else {
        console.error('\n💥 Database seeding failed!');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('💥 Unexpected error:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };