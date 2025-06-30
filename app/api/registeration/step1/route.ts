import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      dateOfBirth,
      nickname,
      phoneNumber,
      country,
      stateRegion,
      email,
      club,
      foot,
      position,
      password,
    } = body;

    // Input validation
    if (!fullName || !dateOfBirth || !nickname || !phoneNumber || !country || !stateRegion || !email || !club || !foot || !position || !password) {
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

    // Check if email already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Email already exists' }),
        { status: 409 },
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await collection.insertOne({
      step: 1,
      fullName,
      dateOfBirth,
      nickname,
      phoneNumber,
      country,
      stateRegion,
      email,
      club,
      foot,
      position,
      password: hashedPassword, // Store hashed password
      role: 'user', // Default role for registrations
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: 'Registration data saved', id: result.insertedId }),
      { status: 201 },
    );
  } catch (error) {
    console.log({error})
    return new Response(
      JSON.stringify({
        error: 'Failed to save registration data',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
} 