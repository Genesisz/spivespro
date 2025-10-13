const { MongoClient } = require('mongodb');

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gospive:gospive@gospive.yznxj8u.mongodb.net/?retryWrites=true&w=majority&appName=gospive';
const MONGODB_DB = process.env.MONGODB_DB || 'testing';

async function checkDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB successfully');
    
    const db = client.db(MONGODB_DB);
    
    // Check collections
    const collections = await db.listCollections().toArray();
    console.log('\n📂 Available collections:');
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // Check users collection
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log(`\n👥 Users collection: ${userCount} documents`);
    
    if (userCount > 0) {
      const sampleUser = await usersCollection.findOne({});
      console.log('📄 Sample user structure:');
      console.log('  - _id:', sampleUser._id);
      console.log('  - email:', sampleUser.email);
      console.log('  - role:', sampleUser.role);
      console.log('  - fullName:', sampleUser.fullName);
      console.log('  - isProfileComplete:', sampleUser.isProfileComplete);
    }
    
    // Check registrations collection
    const registrationsCollection = db.collection('registrations');
    const regCount = await registrationsCollection.countDocuments();
    console.log(`\n📝 Registrations collection: ${regCount} documents`);
    
    // Check admin user specifically
    const adminUser = await usersCollection.findOne({ email: 'admin@gospives.pro' });
    if (adminUser) {
      console.log('\n🔑 Admin user found:');
      console.log('  - Email:', adminUser.email);
      console.log('  - Role:', adminUser.role);
      console.log('  - Profile Complete:', adminUser.isProfileComplete);
    } else {
      console.log('\n❌ Admin user not found!');
    }
    
  } catch (error) {
    console.error('❌ Database check error:', error);
  } finally {
    await client.close();
    console.log('\n🔒 Database connection closed');
  }
}

// Run the check
checkDatabase().catch(console.error);