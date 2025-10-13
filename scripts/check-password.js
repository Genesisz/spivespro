const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gospive:gospive@gospive.yznxj8u.mongodb.net/?retryWrites=true&w=majority&appName=gospive';
const MONGODB_DB = process.env.MONGODB_DB || 'testing';

async function checkUserPassword(email, testPassword) {
  if (!email || !testPassword) {
    console.log('❌ Please provide both email and test password');
    return;
  }

  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(MONGODB_DB);
    const usersCollection = db.collection('users');
    
    // Find the user
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('\n👤 Found user:');
    console.log(`  - Email: ${user.email}`);
    console.log(`  - Has password hash: ${!!user.password}`);
    
    if (user.password) {
      // Test password verification
      const isValid = await bcrypt.compare(testPassword, user.password);
      console.log(`\n🔐 Password verification result:`);
      console.log(`  - Password matches: ${isValid}`);
      
      // For debugging, create a new hash with the same password
      const newHash = await bcrypt.hash(testPassword, 10);
      console.log(`\n🔍 Hash comparison:`);
      console.log(`  - Stored hash: ${user.password}`);
      console.log(`  - New hash with same password: ${newHash}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n🔒 Database connection closed');
  }
}

// Get email and test password from command line arguments
const [email, testPassword] = process.argv.slice(2);
checkUserPassword(email, testPassword).catch(console.error);