const { MongoClient, ObjectId } = require('mongodb');

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gospive:gospive@gospive.yznxj8u.mongodb.net/?retryWrites=true&w=majority&appName=gospive';
const MONGODB_DB = process.env.MONGODB_DB || 'testing';

async function testRegistrationFlow() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(MONGODB_DB);
    const registrationsCollection = db.collection('registrations');
    const usersCollection = db.collection('users');
    
    // Check counts before
    const regCountBefore = await registrationsCollection.countDocuments();
    const userCountBefore = await usersCollection.countDocuments();
    console.log(`\n📊 Before migration:`);
    console.log(`  - Registrations: ${regCountBefore}`);
    console.log(`  - Users: ${userCountBefore}`);
    
    // Find a registration to migrate
    const testRegistration = await registrationsCollection.findOne({});
    
    if (!testRegistration) {
      console.log('❌ No registrations found to test migration');
      return;
    }
    
    console.log(`\n📝 Found test registration: ${testRegistration._id}`);
    console.log(`  - Email: ${testRegistration.email}`);
    console.log(`  - Step: ${testRegistration.step}`);
    
    // Simulate step 4 completion (what the API does)
    const userData = {
      ...testRegistration,
      step: 4,
      updatedAt: new Date(),
      isProfileComplete: true,
      role: testRegistration.role || 'user',
      uploadedImageUrl: 'test-image.jpg',
      uploadedFileName: 'test-file.pdf'
    };
    
    // Remove _id to avoid conflicts
    delete userData._id;
    
    // Insert into users and remove from registrations
    const userInsertResult = await usersCollection.insertOne(userData);
    
    if (userInsertResult.insertedId) {
      await registrationsCollection.deleteOne({ _id: testRegistration._id });
      console.log(`✅ Migration successful!`);
      console.log(`  - New user ID: ${userInsertResult.insertedId}`);
    }
    
    // Check counts after
    const regCountAfter = await registrationsCollection.countDocuments();
    const userCountAfter = await usersCollection.countDocuments();
    console.log(`\n📊 After migration:`);
    console.log(`  - Registrations: ${regCountAfter} (${regCountBefore - regCountAfter} moved)`);
    console.log(`  - Users: ${userCountAfter} (${userCountAfter - userCountBefore} added)`);
    
    // Verify the migrated user
    const migratedUser = await usersCollection.findOne({ _id: userInsertResult.insertedId });
    if (migratedUser) {
      console.log(`\n✅ Migrated user verification:`);
      console.log(`  - Email: ${migratedUser.email}`);
      console.log(`  - Role: ${migratedUser.role}`);
      console.log(`  - Profile Complete: ${migratedUser.isProfileComplete}`);
      console.log(`  - Step: ${migratedUser.step}`);
      console.log(`  - Has Image: ${!!migratedUser.uploadedImageUrl}`);
    }
    
  } catch (error) {
    console.error('❌ Registration flow test error:', error);
  } finally {
    await client.close();
    console.log('\n🔒 Database connection closed');
  }
}

// Run the test
testRegistrationFlow().catch(console.error);