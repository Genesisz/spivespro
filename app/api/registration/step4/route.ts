import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface RegistrationDoc {
  _id?: ObjectId;
  role?: string;
  [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, uploadedImageUrl, uploadedImagePublicId, uploadedFileName } = body;

    // Input validation - only require id and image URL
    if (!id) {
      return new Response(
        JSON.stringify({
          error: 'Required fields are missing',
          details: 'id is required',
        }),
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();
    const registrationsCollection = db.collection('registrations');
    const usersCollection = db.collection('users');
    const registration = await registrationsCollection.findOne({ _id: new ObjectId(id) });
    
    if (!registration) {
      return new Response(
        JSON.stringify({
          error: 'Registration not found',
          details: 'No registration found with the provided ID',
        }),
        { status: 404 },
      );
    }

    // Prepare the final user data
    // Prepare the final user data with a concrete type (avoid `any`)
    const userData: RegistrationDoc & {
      step: number;
      updatedAt: Date;
      isProfileComplete: boolean;
      uploadedImageUrl?: string;
      uploadedImagePublicId?: string;
      uploadedFileName?: string;
    } = {
      ...registration,
      step: 4,
      updatedAt: new Date(),
      isProfileComplete: true,
      role: (registration as RegistrationDoc)?.role || 'user'
    };

    // Add image data if provided
    if (uploadedImageUrl) {
      userData.uploadedImageUrl = uploadedImageUrl;
      userData.uploadedImagePublicId = uploadedImagePublicId;
    }

    // Add file data if provided
    if (uploadedFileName) {
      userData.uploadedFileName = uploadedFileName;
    }

    // Remove the _id field to avoid conflicts when inserting
    delete userData._id;

    // Move the data to users collection and remove from registrations
    const userInsertResult = await usersCollection.insertOne(userData);
    
    if (userInsertResult.insertedId) {
      // Remove from registrations collection
      await registrationsCollection.deleteOne({ _id: new ObjectId(id) });
    }

    return new Response(
      JSON.stringify({ 
        message: 'Registration completed and user created', 
        userId: userInsertResult.insertedId,
        uploadedImageUrl: uploadedImageUrl || null
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Step 4 API error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to save registration data',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
}