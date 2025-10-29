
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('URL parameter is required', { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return new NextResponse(`Failed to fetch image: ${response.statusText}`, { status: response.status });
    }
    const blob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', blob.type);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(blob, { status: 200, headers });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Error fetching image.', { status: 500 });
  }
}
