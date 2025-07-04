import { NextRequest } from 'next/server';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ theme_id: string }> }
) {
  const { theme_id } = await params;
  const apiUrl = `${API_BASE_URL}/themes/download/${theme_id}`;
  const res = await fetch(apiUrl);

  if (!res.ok) {
    return new Response('Theme not found', { status: 404 });
  }

  // Pass through headers for file download
  const headers = new Headers(res.headers);
  return new Response(res.body, {
    status: res.status,
    headers,
  });
} 