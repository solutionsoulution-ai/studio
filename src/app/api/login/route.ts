
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PASSWORD = process.env.APP_PASSWORD;
const COOKIE_NAME = 'neofonds-auth';

export async function POST(req: NextRequest) {
  if (!PASSWORD) {
    console.error('APP_PASSWORD environment variable is not set.');
    return new NextResponse('Configuration error.', { status: 500 });
  }

  try {
    const { password } = await req.json();

    if (password === PASSWORD) {
      // Set a cookie to remember the user is authenticated
      const response = NextResponse.json({ success: true });
      response.cookies.set(COOKIE_NAME, 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      return response;
    } else {
      // Return an error for incorrect password
      return new NextResponse('Incorrect password.', { status: 401 });
    }
  } catch (error) {
    return new NextResponse('Invalid request.', { status: 400 });
  }
}
