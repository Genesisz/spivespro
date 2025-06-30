import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface RegistrationUpdateData {
  step: number;
  updatedAt: Date;
  uploadedImageUrl?: string;
  uploadedImagePublicId?: string;
  uploadedFileName?: string;
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
    const collection = db.collection('registrations');
    
    // Prepare update data
    const updateData: RegistrationUpdateData = {
      step: 4,
      updatedAt: new Date()
    };

    // Only add image data if URL is provided
    if (uploadedImageUrl) {
      updateData.uploadedImageUrl = uploadedImageUrl;
      updateData.uploadedImagePublicId = uploadedImagePublicId;
    }

    // Only add file data if filename is provided
    if (uploadedFileName) {
      updateData.uploadedFileName = uploadedFileName;
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({
          error: 'Registration not found',
          details: 'No registration found with the provided ID',
        }),
        { status: 404 },
      );
    }

    return new Response(
      JSON.stringify({ 
        message: 'Step 4 data saved', 
        id,
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