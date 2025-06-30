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
    
    const totalUsers = await db.collection('registrations').countDocuments({});
    const totalCoaches = await db.collection('registrations').countDocuments({ role: 'coach' });
    const totalAdmins = await db.collection('registrations').countDocuments({ role: 'admin' });
    const recentUsers = await db.collection('registrations').countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    return NextResponse.json({
      totalUsers,
      totalCoaches,
      totalAdmins,
      recentUsers
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
} 