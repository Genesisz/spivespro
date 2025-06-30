import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';

interface SessionUser {
  role?: string;
  email?: string;
  name?: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || (session.user as SessionUser).role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Fetch recent players (non-admin, non-coach users)
    const recentPlayers = await db.collection('registrations')
      .find({
        role: { $nin: ['admin', 'coach'] }
      })
      .project({
        fullName: 1,
        position: 1,
        club: 1,
        country: 1,
        uploadedImageUrl: 1,
        createdAt: 1,
        dateOfBirth: 1,
        stats: 1,
        scoutingStatus: 1
      })
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();

    // Transform the data to match the frontend interface
    const transformedPlayers = recentPlayers.map(player => ({
      id: player._id.toString(),
      name: player.fullName || 'Unknown Player',
      position: player.position || 'Unknown',
      age: player.dateOfBirth 
        ? new Date().getFullYear() - new Date(player.dateOfBirth).getFullYear()
        : 18, // Default age if not available
      country: player.country || 'Unknown',
      club: player.club || 'No Club',
      rating: player.stats?.rating || Math.floor(Math.random() * 3) + 7, // Default rating between 7-9
      image: player.uploadedImageUrl || '',
      joinedDate: player.createdAt || new Date().toISOString(),
      status: player.scoutingStatus || 'active'
    }));

    return NextResponse.json({ players: transformedPlayers });
  } catch (error) {
    console.error('Recent players fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent players' },
      { status: 500 }
    );
  }
} 