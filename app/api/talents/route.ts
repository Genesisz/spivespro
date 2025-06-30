import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

const ITEMS_PER_PAGE = 10;

interface TalentQuery {
  role: { $in: string[] };
  foot?: string;
  position?: string;
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
  }>;
  dateOfBirth?: {
    $gte: Date;
    $lte: Date;
  };
}



export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const powerFoot = searchParams.get('powerFoot');
    const position = searchParams.get('position');
    const search = searchParams.get('search');
    const ageRange = searchParams.get('age');

    const { db } = await connectToDatabase();
    const collection = db.collection('registrations');

    // Build query filters
    const query: TalentQuery = {
      role: { $in: ['user', 'admin'] } // Include both users and admins
    };

    if (powerFoot) {
      query.foot = powerFoot;
    }

    if (position) {
      query.position = position;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { club: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
      ];
    }

    if (ageRange) {
      const [min, max] = ageRange === '20+' 
        ? [20, 100] 
        : ageRange.split('-').map(Number);

      const today = new Date();
      const minDate = new Date(today.getFullYear() - max - 1, today.getMonth(), today.getDate());
      const maxDate = new Date(today.getFullYear() - min, today.getMonth(), today.getDate());

      query.dateOfBirth = {
        $gte: minDate,
        $lte: maxDate,
      };
    }

    // Get total count for pagination
    const total = await collection.countDocuments(query);

    // Fetch paginated results
    const users = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .toArray();

    // Transform data to match frontend interface
    const talents = users.map(user => {
      const birthDate = new Date(user.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return {
        ...user,
        age
      };
    });

    return NextResponse.json({
      talents,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / ITEMS_PER_PAGE)
    });

  } catch (error) {
    console.error('Error in talents API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch talents' },
      { status: 500 }
    );
  }
} 