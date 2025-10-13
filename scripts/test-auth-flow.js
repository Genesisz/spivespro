const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gospive:gospive@gospive.yznxj8u.mongodb.net/?retryWrites=true&w=majority&appName=gospive';
const MONGODB_DB = process.env.MONGODB_DB || 'testing';

async function testAuthFlow() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(MONGODB_DB);
    const usersCollection = db.collection('users');
    
    // Test admin user credentials
    const adminEmail = 'admin@gospives.pro';
    const adminPassword = 'admin123';
    
    console.log('\n🔐 Testing admin authentication flow...');
    
    // Find admin user
    const adminUser = await usersCollection.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('❌ Admin user not found!');
      return;
    }
    
    console.log('✅ Admin user found in database');
    console.log(`  - Email: ${adminUser.email}`);
    console.log(`  - Role: ${adminUser.role}`);
    console.log(`  - Full Name: ${adminUser.fullName}`);
    
    // Test password verification
    const isPasswordValid = await bcrypt.compare(adminPassword, adminUser.password);
    
    if (isPasswordValid) {
      console.log('✅ Admin password verification successful');
    } else {
      console.log('❌ Admin password verification failed');
      return;
    }
    
    // Test user structure for session
    console.log('\n📋 User object structure for session:');
    const sessionUser = {
      id: adminUser._id.toString(),
      email: adminUser.email,
      role: adminUser.role,
      fullName: adminUser.fullName,
      isProfileComplete: adminUser.isProfileComplete
    };
    console.log(JSON.stringify(sessionUser, null, 2));
    
    // Test role validation
    if (sessionUser.role === 'admin') {
      console.log('✅ Admin role validation passed');
    } else {
      console.log('❌ Admin role validation failed');
    }
    
    // Test other users for dashboard
    const allUsers = await usersCollection.find({}).toArray();
    console.log(`\n👥 Total users in database: ${allUsers.length}`);
    
    allUsers.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.email} (${user.role}) - Complete: ${user.isProfileComplete}`);
    });
    
    // Test stats that dashboard would show
    const totalUsers = await usersCollection.countDocuments({});
    const totalAdmins = await usersCollection.countDocuments({ role: 'admin' });
    const totalCoaches = await usersCollection.countDocuments({ role: 'coach' });
    const totalPlayers = await usersCollection.countDocuments({ role: { $nin: ['admin', 'coach'] } });
    
    console.log('\n📊 Dashboard stats:');
    console.log(`  - Total Users: ${totalUsers}`);
    console.log(`  - Admins: ${totalAdmins}`);
    console.log(`  - Coaches: ${totalCoaches}`);
    console.log(`  - Players: ${totalPlayers}`);
    
  } catch (error) {
    console.error('❌ Auth flow test error:', error);
  } finally {
    await client.close();
    console.log('\n🔒 Database connection closed');
  }
}

// Run the test
testAuthFlow().catch(console.error);