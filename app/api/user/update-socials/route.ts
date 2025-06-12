import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { connectToDatabase } from '@/lib/db';

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log({session})
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log({body})
    const { instagram, twitter, facebook, linkedin, tiktok } = body;

    // Validate URLs if provided
    const urlPattern = /^https?:\/\/.+/;
    const validateUrl = (url: string, platform: string) => {
      if (url && !urlPattern.test(url)) {
        throw new Error(`Invalid ${platform} URL`);
      }
    };

    validateUrl(instagram, 'Instagram');
    validateUrl(twitter, 'Twitter');
    validateUrl(facebook, 'Facebook');
    validateUrl(linkedin, 'LinkedIn');
    validateUrl(tiktok, 'TikTok');

    // Update the user in the database
    const { db } = await connectToDatabase();
    const collection = db.collection('registrations');
    
    const updateData = {
      'socials.instagram': instagram || '',
      'socials.twitter': twitter || '',
      'socials.facebook': facebook || '',
      'socials.linkedin': linkedin || '',
      'socials.tiktok': tiktok || '',
      updatedAt: new Date()
    };

    const result = await collection.updateOne(
      { email: session.user.email },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // For now, return success
    return NextResponse.json({
      success: true,
      message: 'Social media updated successfully',
      socials: { 
        instagram: instagram || '', 
        twitter: twitter || '', 
        facebook: facebook || '', 
        linkedin: linkedin || '',
        tiktok: tiktok || ''
      }
    });
  } catch (error: any) {
    console.error('Error updating socials:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update social media' },
      { status: 500 }
    );
  }
}
