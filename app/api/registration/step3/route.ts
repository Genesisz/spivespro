import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, selectedPositions } = body;

    // Input validation
    if (!id || !Array.isArray(selectedPositions) || selectedPositions.length !== 4) {
      return new Response(
        JSON.stringify({
          error: 'Required fields are missing',
          details: 'id and 4 selected positions are required',
        }),
        { status: 400 },
      );
    }
    return new Response(
      JSON.stringify({ message: 'Step 3 data saved', id }),
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