const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gospive:gospive@gospive.yznxj8u.mongodb.net/?retryWrites=true&w=majority&appName=gospive';
const MONGODB_DB = process.env.MONGODB_DB || 'testing';

async function createAdminUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(MONGODB_DB);
    const usersCollection = db.collection('users');
    
    // Admin user details
    const adminEmail = 'admin@gospives.pro';
    const adminPassword = 'admin123'; // Change this to a secure password
    
    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists with email:', adminEmail);
      return;
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // Create admin user
    const adminUser = {
      fullName: 'System Administrator',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      club: 'Gospives',
      country: 'Nigeria',
      position: 'Admin',
      foot: 'Right',
      nickname: 'Admin',
      phoneNumber: '+234-000-000-0000',
      stateRegion: 'Lagos',
      dateOfBirth: '1990-01-01',
      isProfileComplete: true,
      step: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await usersCollection.insertOne(adminUser);
    
    if (result.insertedId) {
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email:', adminEmail);
      console.log('🔑 Password:', adminPassword);
      console.log('🆔 User ID:', result.insertedId);
      console.log('');
      console.log('⚠️  IMPORTANT: Change the default password after first login!');
    } else {
      console.log('❌ Failed to create admin user');
    }
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

// Run the script
createAdminUser().catch(console.error);