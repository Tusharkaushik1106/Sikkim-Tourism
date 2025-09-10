import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Booking } from '@/models';

// Fallback to in-memory storage if MongoDB is not available
let fallbackBookings: any[] = [];
let bookingIdCounter = 1;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('eventId');
  const userId = searchParams.get('userId');

  try {
    await dbConnect();
    
    let filter: any = {};
    if (eventId) filter.eventId = eventId;
    if (userId) filter.userId = userId;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Database error, using fallback:', error);
    
    // Fallback to in-memory storage
    let filteredBookings = fallbackBookings;
    if (eventId) {
      filteredBookings = filteredBookings.filter(booking => booking.eventId === eventId);
    }
    if (userId) {
      filteredBookings = filteredBookings.filter(booking => booking.userId === userId);
    }
    return NextResponse.json({ bookings: filteredBookings });
  }
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
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);

    try {
      console.log('Attempting to connect to MongoDB...');
      await dbConnect();
      console.log('MongoDB connected, creating booking...');
      
      const newBooking = new Booking({
        eventId,
        userId,
        participantName,
        email,
        phone,
        numberOfParticipants,
        totalAmount,
        eventDate,
        specialRequirements: specialRequirements || ''
      });

      console.log('Saving booking to database:', {
        eventId,
        participantName,
        email,
        totalAmount
      });

      const savedBooking = await newBooking.save();
      console.log('Booking saved successfully:', savedBooking._id);

      return NextResponse.json({ 
        booking: {
          id: savedBooking._id.toString(),
          eventId: savedBooking.eventId,
          userId: savedBooking.userId,
          participantName: savedBooking.participantName,
          email: savedBooking.email,
          phone: savedBooking.phone,
          numberOfParticipants: savedBooking.numberOfParticipants,
          totalAmount: savedBooking.totalAmount,
          bookingStatus: savedBooking.bookingStatus,
          paymentStatus: savedBooking.paymentStatus,
          bookingDate: savedBooking.createdAt || savedBooking.bookingDate,
          eventDate: savedBooking.eventDate,
          specialRequirements: savedBooking.specialRequirements,
          paymentId: savedBooking.paymentId
        },
        message: 'Booking created successfully in MongoDB' 
      }, { status: 201 });

    } catch (dbError) {
      console.error('Database error details:', dbError);
      console.log('Falling back to in-memory storage...');
      
      // Fallback to in-memory storage
      const newBooking = {
        id: bookingIdCounter++,
        eventId,
        userId,
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

      fallbackBookings.push(newBooking);

      return NextResponse.json({ 
        booking: newBooking,
        message: 'Booking created successfully' 
      }, { status: 201 });
    }

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

    try {
      await dbConnect();
      
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        updateData,
        { new: true }
      );

      if (!updatedBooking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        booking: updatedBooking,
        message: 'Booking updated successfully'
      });

    } catch (dbError) {
      console.error('Database error, using fallback:', dbError);
      
      // Fallback to in-memory storage
      const bookingIndex = fallbackBookings.findIndex(booking => booking.id === bookingId);
      
      if (bookingIndex === -1) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }

      fallbackBookings[bookingIndex] = { ...fallbackBookings[bookingIndex], ...updateData };

      return NextResponse.json({
        booking: fallbackBookings[bookingIndex],
        message: 'Booking updated successfully'
      });
    }

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}