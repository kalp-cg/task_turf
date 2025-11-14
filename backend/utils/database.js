const { MongoClient } = require('mongodb');

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      // Use environment variables or fallback to direct URI
      const mongoURI = process.env.MONGODB_URI || "mongodb+srv://kalppatelcodinggita:kalp5121@cluster0.uowgl.mongodb.net/";
      const dbName = process.env.DB_NAME || "taskturf";
      
      console.log('Connecting to MongoDB...');
      this.client = new MongoClient(mongoURI);
      
      await this.client.connect();
      this.db = this.client.db(dbName);
      console.log(`✅ Connected to MongoDB database: ${dbName}`);
      
      return this.db;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error('Database not initialized. Call connect() first.');
    }
    return this.db;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      console.log('📴 MongoDB connection closed');
    }
  }
}

module.exports = new Database();
