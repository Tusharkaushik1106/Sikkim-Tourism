import { NextResponse } from 'next/server';

const FLASK_API_URL = process.env.FLASK_API_URL;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    if (!FLASK_API_URL) {
      console.error('FLASK_API_URL is not defined in environment variables.');
      return NextResponse.json({ error: 'Server misconfiguration: FLASK_API_URL missing.' }, { status: 500 });
    }

    let response;
    try {
      response = await fetch(FLASK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ query })
      });
    } catch (fetchError) {
      console.error('Error connecting to Flask API:', fetchError);
      return NextResponse.json({ error: 'Could not connect to backend API.' }, { status: 502 });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Flask API returned ${response.status}: ${errorText}`);
      return NextResponse.json({ error: `Flask API error: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}