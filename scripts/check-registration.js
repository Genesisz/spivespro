const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gospive:gospive@gospive.yznxj8u.mongodb.net/?retryWrites=true&w=majority&appName=gospive';
const MONGODB_DB = process.env.MONGODB_DB || 'testing';

async function checkRegistration(email) {
  if (!email) {
    console.log('❌ Please provide an email address to check');
    return;
  }

  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(MONGODB_DB);
    const registrationsCollection = db.collection('registrations');
    const usersCollection = db.collection('users');
    
    // Check both collections
    const registration = await registrationsCollection.findOne({ email });
    const user = await usersCollection.findOne({ email });
    
    console.log('\n📊 Status for email:', email);
    
    if (registration) {
      console.log('\n📝 Found in registrations collection:');
      console.log(`  - Registration ID: ${registration._id}`);
      console.log(`  - Step: ${registration.step}`);
      console.log(`  - Created At: ${registration.createdAt}`);
      console.log(`  - Has Password: ${!!registration.password}`);
    } else {
      console.log('\n❌ Not found in registrations collection');
    }
    
    if (user) {
      console.log('\n👤 Found in users collection:');
      console.log(`  - User ID: ${user._id}`);
      console.log(`  - Profile Complete: ${user.isProfileComplete}`);
      console.log(`  - Role: ${user.role}`);
      console.log(`  - Has Password: ${!!user.password}`);
    } else {
      console.log('\n❌ Not found in users collection');
    }

    if (registration && user) {
      console.log('\n⚠️ Warning: Found in both collections!');
    } else if (!registration && !user) {
      console.log('\n❌ Not found in either collection');
    }

  } catch (error) {
    console.error('❌ Error checking registration:', error);
  } finally {
    await client.close();
    console.log('\n🔒 Database connection closed');
  }
}

// Get email from command line argument
const email = process.argv[2];
checkRegistration(email).catch(console.error);