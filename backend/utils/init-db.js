const database = require('./database');
const bcrypt = require('bcrypt');

// Sample data for database seeding
const sampleServices = [
  {
    name: 'House Cleaning',
    category: 'cleaning',
    description: 'Professional house cleaning service',
    basePrice: 500,
    duration: 120,
    isActive: true,
    tags: ['cleaning', 'house', 'professional'],
    requirements: ['Basic cleaning supplies provided', 'Access to all rooms'],
    popularity: 95
  },
  {
    name: 'Plumbing Repair',
    category: 'plumbing',
    description: 'Expert plumbing repair and maintenance',
    basePrice: 800,
    duration: 90,
    isActive: true,
    tags: ['plumbing', 'repair', 'maintenance'],
    requirements: ['Access to affected area', 'May require follow-up visit'],
    popularity: 88
  },
  {
    name: 'Electrical Work',
    category: 'electrical',
    description: 'Safe and certified electrical services',
    basePrice: 900,
    duration: 75,
    isActive: true,
    tags: ['electrical', 'wiring', 'safety'],
    requirements: ['Licensed electrician only', 'Safety gear provided'],
    popularity: 82
  },
  {
    name: 'Garden Maintenance',
    category: 'gardening',
    description: 'Complete garden care and landscaping',
    basePrice: 600,
    duration: 180,
    isActive: true,
    tags: ['gardening', 'landscaping', 'maintenance'],
    requirements: ['Garden tools provided', 'Weather dependent'],
    popularity: 75
  },
  {
    name: 'House Painting',
    category: 'painting',
    description: 'Interior and exterior painting services',
    basePrice: 1200,
    duration: 480,
    isActive: true,
    tags: ['painting', 'interior', 'exterior'],
    requirements: ['Paint and supplies included', 'Multi-day project'],
    popularity: 70
  },
  {
    name: 'Child Care',
    category: 'babysitting',
    description: 'Reliable and experienced babysitting',
    basePrice: 400,
    duration: 240,
    isActive: true,
    tags: ['childcare', 'babysitting', 'reliable'],
    requirements: ['Background check completed', 'CPR certified'],
    popularity: 90
  },
  {
    name: 'Home Cooking',
    category: 'cooking',
    description: 'Personal chef and meal preparation',
    basePrice: 700,
    duration: 120,
    isActive: true,
    tags: ['cooking', 'chef', 'meals'],
    requirements: ['Kitchen access required', 'Ingredients provided by client'],
    popularity: 68
  }
];

const sampleUsers = [
  {
    firstname: 'John',
    lastname: 'Smith',
    email: 'john.smith@example.com',
    password: 'password123',
    phone: '+1234567890',
    role: 'user',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipcode: '10001'
    },
    isActive: true
  },
  {
    firstname: 'Sarah',
    lastname: 'Johnson',
    email: 'sarah.johnson@example.com',
    password: 'password123',
    phone: '+1234567891',
    role: 'user',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: '90210'
    },
    isActive: true
  }
];

const sampleWorkers = [
  {
    firstname: 'Mike',
    lastname: 'Wilson',
    email: 'mike.wilson@example.com',
    password: 'password123',
    phone: '+1234567892',
    role: 'worker',
    skill: 'Cleaning',
    experience: 5,
    bio: 'Professional cleaner with 5 years of experience',
    charge: 600,
    description: '5 years of experience in professional cleaning',
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipcode: '60601'
    },
    isActive: true,
    isAvailable: true,
    rating: 4.8,
    completedJobs: 156
  },
  {
    firstname: 'Lisa',
    lastname: 'Brown',
    email: 'lisa.brown@example.com',
    password: 'password123',
    phone: '+1234567893',
    role: 'worker',
    skill: 'Plumbing',
    experience: 8,
    bio: 'Expert plumber specializing in residential repairs',
    charge: 800,
    description: '8 years of experience in residential plumbing',
    address: {
      street: '321 Cedar Rd',
      city: 'Houston',
      state: 'TX',
      zipcode: '77001'
    },
    isActive: true,
    isAvailable: true,
    rating: 4.9,
    completedJobs: 203
  },
  {
    firstname: 'David',
    lastname: 'Garcia',
    email: 'david.garcia@example.com',
    password: 'password123',
    phone: '+1234567894',
    role: 'worker',
    skill: 'Electrical',
    experience: 6,
    bio: 'Licensed electrician with commercial and residential experience',
    charge: 900,
    description: '6 years of experience in electrical work',
    address: {
      street: '555 Elm St',
      city: 'Phoenix',
      state: 'AZ',
      zipcode: '85001'
    },
    isActive: true,
    isAvailable: true,
    rating: 4.7,
    completedJobs: 128
  },
  {
    firstname: 'Emma',
    lastname: 'Davis',
    email: 'emma.davis@example.com',
    password: 'password123',
    phone: '+1234567895',
    role: 'worker',
    skill: 'Gardening',
    experience: 4,
    bio: 'Passionate gardener with expertise in landscaping',
    charge: 600,
    description: '4 years of experience in garden maintenance',
    address: {
      street: '777 Maple Ave',
      city: 'Seattle',
      state: 'WA',
      zipcode: '98101'
    },
    isActive: true,
    isAvailable: true,
    rating: 4.6,
    completedJobs: 89
  },
  {
    firstname: 'James',
    lastname: 'Martinez',
    email: 'james.martinez@example.com',
    password: 'password123',
    phone: '+1234567896',
    role: 'worker',
    skill: 'Painting',
    experience: 7,
    bio: 'Professional painter specializing in interior design',
    charge: 1000,
    description: '7 years of experience in house painting',
    address: {
      street: '999 Birch Ln',
      city: 'Miami',
      state: 'FL',
      zipcode: '33101'
    },
    isActive: true,
    isAvailable: true,
    rating: 4.8,
    completedJobs: 174
  },
  {
    firstname: 'Amy',
    lastname: 'Taylor',
    email: 'amy.taylor@example.com',
    password: 'password123',
    phone: '+1234567897',
    role: 'worker',
    skill: 'Babysitting',
    experience: 3,
    bio: 'Experienced childcare provider with early childhood education background',
    charge: 600,
    description: '3 years of experience in childcare',
    address: {
      street: '333 Spruce St',
      city: 'Denver',
      state: 'CO',
      zipcode: '80201'
    },
    isActive: true,
    isAvailable: true,
    rating: 4.9,
    completedJobs: 95
  },
  {
    firstname: 'Robert',
    lastname: 'Anderson',
    email: 'robert.anderson@example.com',
    password: 'password123',
    phone: '+1234567898',
    role: 'worker',
    skill: 'Cooking',
    experience: 6,
    bio: 'Personal chef with culinary school training',
    charge: 800,
    description: '6 years of experience in professional cooking',
    address: {
      street: '666 Willow Dr',
      city: 'Boston',
      state: 'MA',
      zipcode: '02101'
    },
    isActive: true,
    isAvailable: true,
    rating: 4.7,
    completedJobs: 112
  }
];

async function createIndexes() {
  try {
    const db = database.getDb();
    
    console.log('Creating database indexes...');
    
    // Users collection indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ phone: 1 });
    await db.collection('users').createIndex({ "address.city": 1, "address.state": 1 });
    
    // Workers collection indexes
    await db.collection('workers').createIndex({ email: 1 }, { unique: true });
    await db.collection('workers').createIndex({ skill: 1 });
    await db.collection('workers').createIndex({ isAvailable: 1 });
    await db.collection('workers').createIndex({ rating: -1 });
    await db.collection('workers').createIndex({ "address.city": 1, "address.state": 1 });
    
    // Services collection indexes
    await db.collection('services').createIndex({ category: 1 });
    await db.collection('services').createIndex({ name: "text", description: "text" });
    await db.collection('services').createIndex({ popularity: -1 });
    await db.collection('services').createIndex({ basePrice: 1 });
    
    // Bookings collection indexes
    await db.collection('bookings').createIndex({ userId: 1 });
    await db.collection('bookings').createIndex({ workerId: 1 });
    await db.collection('bookings').createIndex({ serviceId: 1 });
    await db.collection('bookings').createIndex({ status: 1 });
    await db.collection('bookings').createIndex({ createdAt: -1 });
    await db.collection('bookings').createIndex({ scheduledDate: 1 });
    
    // User preferences collection indexes
    await db.collection('user_preferences').createIndex({ userId: 1 }, { unique: true });
    
    console.log('✅ Database indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
    throw error;
  }
}

async function seedData() {
  try {
    const db = database.getDb();
    
    console.log('Seeding database with sample data...');
    
    // Check if data already exists
    const usersCount = await db.collection('users').countDocuments();
    const workersCount = await db.collection('workers').countDocuments();
    const servicesCount = await db.collection('services').countDocuments();
    
    if (usersCount > 0 || workersCount > 0 || servicesCount > 0) {
      console.log('⚠️  Database already contains data. Skipping seeding.');
      return;
    }
    
    // Hash passwords for users and workers
    const saltRounds = 12;
    
    // Seed services
    for (const service of sampleServices) {
      service.createdAt = new Date();
      service.updatedAt = new Date();
    }
    await db.collection('services').insertMany(sampleServices);
    console.log(`✅ Inserted ${sampleServices.length} services`);
    
    // Seed users
    for (const user of sampleUsers) {
      user.password = await bcrypt.hash(user.password, saltRounds);
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.lastLogin = null;
    }
    await db.collection('users').insertMany(sampleUsers);
    console.log(`✅ Inserted ${sampleUsers.length} users`);
    
    // Seed workers
    for (const worker of sampleWorkers) {
      worker.password = await bcrypt.hash(worker.password, saltRounds);
      worker.createdAt = new Date();
      worker.updatedAt = new Date();
      worker.lastLogin = null;
    }
    await db.collection('workers').insertMany(sampleWorkers);
    console.log(`✅ Inserted ${sampleWorkers.length} workers`);
    
    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing TaskTurf database...');
    
    // Connect to database
    await database.connect();
    
    // Create indexes
    await createIndexes();
    
    // Seed sample data
    await seedData();
    
    console.log('✅ Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    // Close the connection
    await database.close();
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('🎉 Database setup complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database setup failed:', error);
      process.exit(1);
    });
}

module.exports = {
  initializeDatabase,
  createIndexes,
  seedData
};