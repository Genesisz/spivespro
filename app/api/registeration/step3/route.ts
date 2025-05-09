import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, selectedPositions } = body;

    // Input validation
    if (!id || !Array.isArray(selectedPositions) || selectedPositions.length !== 4) {
      return new Response(
        JSON.stringify({
          error: 'Required fields are missing',
          details: 'id and 4 selected positions are required',
        }),
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('registrations');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { step: 3, selectedPositions, updatedAt: new Date() } }
    );

    return new Response(
      JSON.stringify({ message: 'Step 3 data saved', id }),
      { status: 201 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to save registration data',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
} 