import { NextResponse } from 'next/server';
import { generateEventsForYear, CulturalEvent } from '@/lib/events';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Ensure no caching

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());

    // Generate events for the requested year dynamically
    let events: CulturalEvent[] = generateEventsForYear(year);

    // Filter by category if specified
    if (category && category !== 'All') {
      events = events.filter(event => event.category === category);
    }

    // Sort events by date for better organization
    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json(events, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error generating events:', error);
    return NextResponse.json({ error: 'Failed to generate events' }, { status: 500 });
  }
}
