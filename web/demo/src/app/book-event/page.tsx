'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingModal from '@/components/booking-modal';
import { Calendar, Clock, MapPin, Users, Star, ArrowLeft, Ticket } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get('eventId');
  
  const [event, setEvent] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (eventId) {
      fetchEvent(eventId);
    } else {
      setLoading(false);
    }
  }, [eventId]);

  const fetchEvent = async (id: string) => {
    try {
      const response = await fetch(`/api/events?id=${id}`);
      const data = await response.json();
      
      if (data.event) {
        setEvent(data.event);
      } else {
        setError('Event not found');
      }
    } catch (error) {
      setError('Failed to fetch event details');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingComplete = (booking: any) => {
    // Redirect to confirmation page
    const bookingData = encodeURIComponent(JSON.stringify(booking));
    router.push(`/booking-confirmation?booking=${bookingData}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested event could not be found.'}</p>
          <Link
            href="/calendar"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Calendar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/calendar"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calendar
          </Link>
        </div>

        {/* Event Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Event Header */}
          <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-700">
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="relative h-full flex items-center justify-center text-center p-6">
              <div>
                <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {event.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {event.title}
                </h1>
                <p className="text-xl text-white opacity-90">
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          {/* Event Info */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Left Column - Event Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div className='text-black'>
                      <p className="font-medium">Date</p>
                      <p className="text-gray-600">{new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>

                  {event.time && (
                    <div className="flex items-center gap-3 text-black">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-gray-600">{event.time}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-black">Location</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>

                  {event.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-black">Duration</p>
                        <p className="text-gray-600">{event.duration}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-black">Availability</p>
                      <p className="text-gray-600">
                        {event.availableSlots} of {event.maxParticipants} slots available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Booking Info */}
              <div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ₹{event.price}
                    </div>
                    <p className="text-gray-600">per person</p>
                  </div>

                  {event.availableSlots > 0 ? (
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Ticket size={20} />
                      Book Now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Sold Out
                    </button>
                  )}

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <span className="font-medium">{event.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Age Limit:</span>
                      <span className="font-medium">{event.ageLimit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            {event.includes && event.includes.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {event.includes.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Information</h3>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Please arrive 15 minutes before the scheduled time</li>
                <li>• Bring a valid photo ID for verification</li>
                <li>• Cancellation allowed up to 24 hours before the event</li>
                <li>• Weather-dependent events may be rescheduled</li>
                <li>• Contact support for any special requirements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        <BookingModal
          event={event}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          onBookingComplete={handleBookingComplete}
        />
      </div>
    </div>
  );
}