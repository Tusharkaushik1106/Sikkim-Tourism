'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle, Calendar, Clock, MapPin, Users, CreditCard, Download, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BookingConfirmation() {
  const searchParams = useSearchParams();
  const [booking, setBooking] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookingData = searchParams.get('booking');
    if (bookingData) {
      try {
        const parsedBooking = JSON.parse(decodeURIComponent(bookingData));
        setBooking(parsedBooking);
        
        // Fetch event details
        fetch(`/api/events?id=${parsedBooking.eventId}`)
          .then(res => res.json())
          .then(data => {
            if (data.event) {
              setEvent(data.event);
            }
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching event:', error);
            setLoading(false);
          });
      } catch (error) {
        console.error('Error parsing booking data:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your booking confirmation...</p>
        </div>
      </div>
    );
  }

  if (!booking || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">The booking information could not be retrieved.</p>
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

  const handleDownloadTicket = () => {
    // In a real implementation, this would generate a PDF ticket
    alert('Ticket download functionality would be implemented here with PDF generation');
  };

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: `Booking Confirmed - ${event.title}`,
        text: `I just booked ${event.title} for ${new Date(event.date).toLocaleDateString()}!`,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Booking link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Your booking has been successfully confirmed. You will receive an email confirmation shortly.
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
                {event.time && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">{event.time}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{event.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{booking.numberOfParticipants} participant(s)</span>
                </div>
              </div>
            </div>

            {/* Booking Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="font-medium">#{booking.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Participant Name</p>
                  <p className="font-medium">{booking.participantName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{booking.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{booking.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Payment Successful</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Payment ID</p>
                  <p className="font-medium">{booking.paymentId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Amount Paid</p>
                  <p className="font-medium">₹{booking.totalAmount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Date</p>
                  <p className="font-medium">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          {booking.specialRequirements && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Special Requirements</h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded">{booking.specialRequirements}</p>
            </div>
          )}

          {/* What's Included */}
          {event.includes && event.includes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What's Included</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {event.includes.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={handleDownloadTicket}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={20} />
            Download Ticket
          </button>
          <button
            onClick={handleShareBooking}
            className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Share2 size={20} />
            Share Booking
          </button>
          <Link
            href="/calendar"
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Calendar size={20} />
            Browse More Events
          </Link>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Information</h3>
          <ul className="space-y-1 text-yellow-700 text-sm">
            <li>• Please arrive 15 minutes before the scheduled time</li>
            <li>• Bring a valid photo ID for verification</li>
            <li>• Check weather conditions and dress appropriately</li>
            <li>• Cancellation allowed up to 24 hours before the event</li>
            <li>• Contact us at support@sikkimtourism.com for any queries</li>
          </ul>
        </div>
      </div>
    </div>
  );
}