import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface DatabaseUser {
  _id: ObjectId;
  fullName?: string;
  position?: string;
  playerPosition?: string;
  club?: string;
  currentClub?: string;
  country?: string;
  nationality?: string;
  age?: number;
  dateOfBirth?: Date;
  uploadedImageUrl?: string;
  profileImage?: string;
  stats?: {
    pace?: number;
    shooting?: number;
    passing?: number;
    dribbling?: number;
    defending?: number;
    physical?: number;
    handling?: number;
    reflexes?: number;
    positioning?: number;
  };
  achievements?: Array<{ title: string; date: string }>;
  isContracted?: boolean;
  isScoutApproved?: boolean;
  isProfileComplete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

function determinePlayerStatus(player: DatabaseUser) {
  if (!player.isProfileComplete) return 'Incomplete';
  if (player.isContracted) return 'Contracted';
  if (player.isScoutApproved) return 'Available';
  return 'Pending';
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const decodedUsername = decodeURIComponent(username);

    const { db } = await connectToDatabase();
    const collection = db.collection('registration');

    const player = await collection.findOne<DatabaseUser>({ nickname: decodedUsername });

    if (!player) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }

    const playerStatus = determinePlayerStatus(player);

    return NextResponse.json({
      ...player,
      status: playerStatus
    });
  } catch (error) {
    console.error('Error fetching player:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
