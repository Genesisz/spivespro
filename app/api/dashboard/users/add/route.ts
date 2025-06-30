import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import bcrypt from 'bcryptjs';

interface SessionUser {
  role?: string;
  email?: string;
  name?: string;
}

export async function POST(request: Request) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user as SessionUser).role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      fullName,
      email,
      role,
      position = '',
      club = '',
      country = '',
    } = body;

    // Input validation
    if (!fullName || !email || !role) {
      return NextResponse.json({
        error: 'Required fields are missing',
        details: 'Full name, email, and role are required',
      }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('registrations');

    // Check if email already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    // Hash the password (using email as default password)
    const hashedPassword = await bcrypt.hash(email, 10);

    // Create new user
    const result = await collection.insertOne({
      fullName,
      email,
      role,
      position,
      club,
      country,
      password: hashedPassword,
      createdAt: new Date(),
      isProfileComplete: false,
      step: 1,
    });

    return NextResponse.json({
      message: 'User created successfully',
      id: result.insertedId,
    }, { status: 201 });

  } catch (error) {
    console.error('Add user error:', error);
    return NextResponse.json({ 
      error: 'Failed to create user',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 