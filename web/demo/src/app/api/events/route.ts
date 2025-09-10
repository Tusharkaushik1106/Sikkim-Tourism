import { NextResponse } from 'next/server';
import { generateEventsForYear, CulturalEvent } from '@/lib/events';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Ensure no caching

// In-memory booking storage for demo
let bookings: any[] = [];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
    const eventId = searchParams.get('id');

    // Generate events for the requested year dynamically
    let events: CulturalEvent[] = generateEventsForYear(year);

    // Add booking-related properties to events
    events = events.map(event => {
      // Only add booking properties to Sikkim events
      const isSikkimEvent = event.location?.toLowerCase().includes('sikkim') || 
                           event.title?.toLowerCase().includes('sikkim') ||
                           event.description?.toLowerCase().includes('sikkim');
      
      if (isSikkimEvent) {
        return {
          ...event,
          price: Math.floor(Math.random() * 200) + 50, // Random price between 50-250
          maxParticipants: Math.floor(Math.random() * 30) + 20, // Random capacity 20-50
          availableSlots: Math.floor(Math.random() * 25) + 15, // Random available slots
          duration: ['2 hours', '4 hours', '6 hours', '8 hours'][Math.floor(Math.random() * 4)],
          includes: [
            'Professional guide',
            'Traditional refreshments',
            'Cultural souvenirs',
            'Photo opportunities',
            'Certificate of participation'
          ].slice(0, Math.floor(Math.random() * 3) + 2),
          difficulty: ['Easy', 'Moderate', 'Challenging'][Math.floor(Math.random() * 3)],
          ageLimit: ['All ages welcome', '12+ years', '18+ years'][Math.floor(Math.random() * 3)]
        };
      }
      
      return event; // Return original event for non-Sikkim events
    });

    // If requesting a specific event
    if (eventId) {
      const event = events.find(event => event.id === eventId);
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }
      return NextResponse.json({ event });
    }

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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { eventId, availableSlots } = body;

    // In a real app, you would update the database
    // For demo purposes, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Event updated successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}
