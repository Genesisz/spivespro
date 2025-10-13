const { MongoClient } = require('mongodb');

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gospive:gospive@gospive.yznxj8u.mongodb.net/?retryWrites=true&w=majority&appName=gospive';
const MONGODB_DB = process.env.MONGODB_DB || 'testing';

async function deleteUser(email) {
  if (!email) {
    console.log('❌ Please provide an email address');
    return;
  }

  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(MONGODB_DB);
    const usersCollection = db.collection('users');
    const registrationsCollection = db.collection('registrations');
    
    // Check both collections first
    const user = await usersCollection.findOne({ email });
    const registration = await registrationsCollection.findOne({ email });
    
    console.log('\n📊 Current status:');
    if (user) {
      console.log(`  - Found in users collection (ID: ${user._id})`);
    } else {
      console.log('  - Not found in users collection');
    }
    
    if (registration) {
      console.log(`  - Found in registrations collection (ID: ${registration._id})`);
    } else {
      console.log('  - Not found in registrations collection');
    }

    // Delete from both collections to ensure clean slate
    const userResult = await usersCollection.deleteOne({ email });
    const regResult = await registrationsCollection.deleteOne({ email });
    
    console.log('\n🗑️ Deletion results:');
    console.log(`  - Users collection: ${userResult.deletedCount} record(s) removed`);
    console.log(`  - Registrations collection: ${regResult.deletedCount} record(s) removed`);
    
    if (userResult.deletedCount > 0 || regResult.deletedCount > 0) {
      console.log('\n✅ Successfully deleted user data');
      console.log('You can now proceed with a new registration');
    } else {
      console.log('\n⚠️ No records found to delete');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n🔒 Database connection closed');
  }
}

// Get email from command line argument
const email = process.argv[2];
deleteUser(email).catch(console.error);