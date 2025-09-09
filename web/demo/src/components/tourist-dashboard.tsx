'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Booking {
  id: number;
  eventId: string;
  participantName: string;
  email: string;
  phone: string;
  numberOfParticipants: number;
  totalAmount: number;
  bookingStatus: string;
  paymentStatus: string;
  bookingDate: string;
  eventDate: string;
  paymentId: string;
}

interface Event {
  id: string;
  title: string;
  location: string;
  time?: string;
}

export default function TouristDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [events, setEvents] = useState<{[key: string]: Event}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingsAndEvents();
  }, []);

  const fetchBookingsAndEvents = async () => {
    try {
      // Fetch bookings
      const bookingsResponse = await fetch('/api/bookings');
      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData.bookings || []);

      // Fetch events details
      const eventsResponse = await fetch('/api/events');
      const eventsData = await eventsResponse.json();
      
      const eventsMap: {[key: string]: Event} = {};
      if (eventsData && Array.isArray(eventsData)) {
        eventsData.forEach((event: Event) => {
          eventsMap[event.id] = event;
        });
      }
      setEvents(eventsMap);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your cultural experience bookings</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't made any bookings yet. Explore our cultural calendar to find amazing experiences!
            </p>
            <a
              href="/calendar"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Browse Events
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => {
              const event = events[booking.eventId];
              
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {event ? event.title : `Event #${booking.eventId}`}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{new Date(booking.eventDate).toLocaleDateString()}</span>
                          </div>
                          {event?.time && (
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span>{event.time}</span>
                            </div>
                          )}
                          {event?.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.bookingStatus)}`}>
                          {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                        </span>
                        {getStatusIcon(booking.bookingStatus)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Booking Details</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><span className="font-medium">Booking ID:</span> #{booking.id}</p>
                          <p><span className="font-medium">Participant:</span> {booking.participantName}</p>
                          <p><span className="font-medium">Email:</span> {booking.email}</p>
                          <p><span className="font-medium">Phone:</span> {booking.phone}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Event Details</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users size={16} />
                            <span>{booking.numberOfParticipants} participant(s)</span>
                          </div>
                          <p><span className="font-medium">Booked on:</span> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Payment Information</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><span className="font-medium">Total Amount:</span> ₹{booking.totalAmount}</p>
                          <div className="flex items-center gap-2">
                            <CreditCard size={16} />
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              booking.paymentStatus === 'paid' 
                                ? 'bg-green-100 text-green-800' 
                                : booking.paymentStatus === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                            </span>
                          </div>
                          {booking.paymentId && (
                            <p className="text-xs">
                              <span className="font-medium">Payment ID:</span> {booking.paymentId}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {booking.bookingStatus === 'confirmed' && (
                          <p>✓ Your booking is confirmed. You'll receive event details via email.</p>
                        )}
                        {booking.bookingStatus === 'pending' && (
                          <p>⏳ Your booking is being processed. You'll be notified once confirmed.</p>
                        )}
                        {booking.bookingStatus === 'cancelled' && (
                          <p>❌ This booking has been cancelled. Refund will be processed if applicable.</p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {booking.bookingStatus === 'confirmed' && (
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Download Ticket
                          </button>
                        )}
                        {booking.bookingStatus === 'pending' && (
                          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}