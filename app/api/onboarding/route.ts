// app/api/brochure/route.ts
import { google } from 'googleapis';


export async function POST(request: Request) {
  try {
    const { timestamp, email } =
      await request.json();
    console.log({email})
    // Input validation
    if (!email) {
      return new Response(
        JSON.stringify({
          error: 'Required fields are missing',
          details:
            'All fields (email, course) are required',
        }),
        { status: 400 },
      );
    }
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: (
          process.env.NEXT_GOOGLE_SERVICE_PRIVATE_KEY || ''
        ).replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log({auth})
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_URL;

    if (!spreadsheetId) {
      throw new Error('Spreadsheet ID is not configured');
    }

    // Updated range to match your sheet's structure: A to F (6 columns)
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Form Responses 1!A:C', // Updated to match your sheet name and correct column range
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            email, // Column B - Email
          ],
        ],
      },
    });

    if (response.status !== 200) {
      throw new Error(`Google Sheets API returned status ${response.status}`);
    }

    return new Response(
      JSON.stringify({
        message: 'Data added successfully to sheet',
        details: response.data,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log({error})
    return new Response(
      JSON.stringify({
        error: 'Failed to add data to Google Sheet',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
}
