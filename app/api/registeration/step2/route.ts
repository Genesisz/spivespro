import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, email, club, foot, position, password } = body;

    // Input validation
    if (!email || !club || !foot || !position || !password) {
      return new Response(
        JSON.stringify({
          error: 'Required fields are missing',
          details: 'All fields are required',
        }),
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('registrations');
    let result;
    if (id) {
      // Update existing registration
      result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { step: 2, email, club, foot, position, password, updatedAt: new Date() } }
      );
    } else {
      // Create new registration
      result = await collection.insertOne({
        step: 2,
        email,
        club,
        foot,
        position,
        password,
        createdAt: new Date(),
      });
    }

    let responseId = id;
    if ('insertedId' in result && result.insertedId) {
      responseId = result.insertedId;
    }
    return new Response(
      JSON.stringify({ message: 'Step 2 data saved', id: responseId }),
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