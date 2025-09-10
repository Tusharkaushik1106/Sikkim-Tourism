import { NextRequest, NextResponse } from 'next/server';

// Demo booking data - in production, this would be from a database
let bookings: any[] = [];
let bookingIdCounter = 1;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('eventId');
  const userId = searchParams.get('userId');

  let filteredBookings = bookings;

  if (eventId) {
    filteredBookings = filteredBookings.filter(booking => booking.eventId === eventId);
  }

  if (userId) {
    filteredBookings = filteredBookings.filter(booking => booking.userId === userId);
  }

  return NextResponse.json({ bookings: filteredBookings });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      eventId,
      participantName,
      email,
      phone,
      numberOfParticipants,
      eventDate,
      specialRequirements,
      pricePerPerson
    } = body;

    // Validation
    if (!eventId || !participantName || !email || !phone || !numberOfParticipants || !eventDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const totalAmount = numberOfParticipants * (pricePerPerson || 100);

    const newBooking = {
      id: bookingIdCounter++,
      eventId,
      userId: 'user_' + Math.random().toString(36).substr(2, 9),
      participantName,
      email,
      phone,
      numberOfParticipants,
      totalAmount,
      bookingStatus: 'pending',
      paymentStatus: 'pending',
      bookingDate: new Date().toISOString(),
      eventDate,
      specialRequirements: specialRequirements || '',
      paymentId: null
    };

    bookings.push(newBooking);

    return NextResponse.json({ 
      booking: newBooking,
      message: 'Booking created successfully' 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, ...updateData } = body;

    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    bookings[bookingIndex] = { ...bookings[bookingIndex], ...updateData };

    return NextResponse.json({
      booking: bookings[bookingIndex],
      message: 'Booking updated successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}