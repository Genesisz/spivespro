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
    const registrationsCollection = db.collection('registrations');
    const usersCollection = db.collection('users');

    // Check if email already exists in either collection
    const existingRegistration = await registrationsCollection.findOne({ email });
    const existingUser = await usersCollection.findOne({ email });
    
    if (existingRegistration || existingUser) {
      return new Response(
        JSON.stringify({ error: 'Email already exists' }),
        { status: 409 },
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await registrationsCollection.insertOne({
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