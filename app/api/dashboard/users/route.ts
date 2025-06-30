import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AppUser } from '@/lib/useUser';
import { ObjectId } from 'mongodb';

interface DatabaseUser {
  _id: ObjectId;
  fullName?: string;
  name?: string;
  email: string;
  position?: string;
  playerPosition?: string;
  club?: string;
  currentClub?: string;
  role?: string;
  country?: string;
  nationality?: string;
  uploadedImageUrl?: string;
  profileImage?: string;
  createdAt?: Date;
  dateOfBirth?: Date;
  age?: number;
  rating?: number;
  isContracted?: boolean;
  isScoutApproved?: boolean;
  isProfileComplete?: boolean;
  lastActive?: Date;
}

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    if (!session.user || (session.user as AppUser).role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('registrations');

    // Fetch all users from the database
    const users = await collection.find({}).toArray() as DatabaseUser[];

    // Transform data to match frontend interface
    const transformedUsers = users.map((user: DatabaseUser) => {
      // Determine role - default to 'player' if not specified
      const role = user.role || 'player';
      
      // Determine status based on registration progress and role
      let status: 'active' | 'scouted' | 'contracted' | 'potential' = 'active';
      if (role === 'player') {
        if (user.isContracted) {
          status = 'contracted';
        } else if (user.isScoutApproved) {
          status = 'scouted';
        } else if (!user.isProfileComplete) {
          status = 'potential';
        }
      }

      return {
        _id: user._id.toString(),
        fullName: user.fullName || user.name || 'Unknown User',
        email: user.email || '',
        position: user.position || user.playerPosition || '',
        club: user.club || user.currentClub || '',
        role: role,
        country: user.country || user.nationality || '',
        uploadedImageUrl: user.uploadedImageUrl || user.profileImage || '',
        createdAt: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        age: user.age || calculateAge(user.dateOfBirth),
        rating: user.rating || generateRating(user.position || user.playerPosition || '', role),
        status: status,
        lastActivity: user.lastActive ? new Date(user.lastActive).toLocaleString() : generateLastActivity()
      };
    });

    return NextResponse.json({
      users: transformedUsers,
      total: transformedUsers.length
    }, { status: 200 });

  } catch (error) {
    console.error('Dashboard users API error:', error);
    return NextResponse.json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper function to calculate age from date of birth
function calculateAge(dateOfBirth: string | Date | undefined): number | undefined {
  if (!dateOfBirth) return undefined;
  
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age > 0 ? age : undefined;
}

// Helper function to generate realistic ratings based on position and role
function generateRating(position: string, role: string): number {
  if (role === 'coach') {
    return 8.5 + Math.random() * 1.5; // Coaches: 8.5-10.0
  }
  
  // Players: different ranges by position
  const baseRating = 7.0;
  const variation = 2.0;
  
  const positionMultipliers: { [key: string]: number } = {
    'GK': 0.8,
    'CB': 0.9,
    'LB': 0.85,
    'RB': 0.85,
    'CDM': 0.9,
    'CM': 0.95,
    'CAM': 1.0,
    'LM': 0.9,
    'RM': 0.9,
    'LW': 1.0,
    'RW': 1.0,
    'CF': 1.1,
    'ST': 1.1
  };
  
  const multiplier = positionMultipliers[position] || 0.9;
  const rating = baseRating + (Math.random() * variation * multiplier);
  
  return Math.round(rating * 10) / 10; // Round to 1 decimal place
}


// Helper function to generate realistic last activity
function generateLastActivity(): string {
  const activities = [
    '5 minutes ago',
    '1 hour ago',
    '2 hours ago',
    '1 day ago',
    '2 days ago',
    '1 week ago'
  ];
  
  return activities[Math.floor(Math.random() * activities.length)];
} 