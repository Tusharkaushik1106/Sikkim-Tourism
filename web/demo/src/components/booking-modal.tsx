'use client';

import { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, CreditCard, Loader2 } from 'lucide-react';

interface BookingModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (booking: any) => void;
}

export default function BookingModal({ event, isOpen, onClose, onBookingComplete }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [formData, setFormData] = useState({
    participantName: '',
    email: '',
    phone: '',
    numberOfParticipants: 1,
    specialRequirements: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [upiData, setUpiData] = useState({
    upiId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  if (!isOpen || !event) return null;

  const totalAmount = formData.numberOfParticipants * (event.price || 100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfParticipants' ? parseInt(value) || 1 : value
    }));
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpiData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateCardForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Card number validation
    const cardNumber = paymentData.cardNumber.replace(/\s/g, '');
    if (!cardNumber) {
      errors.cardNumber = 'Card number is required';
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      errors.cardNumber = 'Card number must be 13-19 digits';
    } else if (!/^\d+$/.test(cardNumber)) {
      errors.cardNumber = 'Card number must contain only digits';
    }

    // Cardholder name validation
    if (!paymentData.cardholderName.trim()) {
      errors.cardholderName = 'Cardholder name is required';
    } else if (paymentData.cardholderName.trim().length < 2) {
      errors.cardholderName = 'Name must be at least 2 characters';
    }

    // Expiry date validation
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!paymentData.expiryDate) {
      errors.expiryDate = 'Expiry date is required';
    } else if (!expiryRegex.test(paymentData.expiryDate)) {
      errors.expiryDate = 'Use MM/YY format';
    }

    // CVV validation
    if (!paymentData.cvv) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }

    return errors;
  };

  const validateUpiForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!upiData.upiId) {
      errors.upiId = 'UPI ID is required';
    } else if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(upiData.upiId)) {
      errors.upiId = 'Invalid UPI ID format (e.g., user@paytm)';
    }

    return errors;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    // Validate payment form
    const errors = paymentMethod === 'credit_card' ? validateCardForm() : validateUpiForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    setError('');
    setValidationErrors({});

    try {
      // Create booking
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          ...formData,
          eventDate: event.date,
          pricePerPerson: event.price || 100
        })
      });

      if (!bookingResponse.ok) {
        throw new Error('Failed to create booking');
      }

      const { booking } = await bookingResponse.json();

      // Process payment
      const paymentResponse = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          amount: totalAmount,
          paymentMethod: paymentMethod,
          cardDetails: paymentMethod === 'credit_card' ? paymentData : undefined,
          upiDetails: paymentMethod === 'upi' ? upiData : undefined
        })
      });

      const paymentResult = await paymentResponse.json();

      if (paymentResult.success) {
        // Update booking with payment details
        await fetch('/api/bookings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: booking.id,
            paymentStatus: 'paid',
            paymentId: paymentResult.paymentId,
            bookingStatus: 'confirmed'
          })
        });

        onBookingComplete({ ...booking, paymentId: paymentResult.paymentId });
        onClose();
        
        // Reset form
        setStep(1);
        setFormData({
          participantName: '',
          email: '',
          phone: '',
          numberOfParticipants: 1,
          specialRequirements: ''
        });
        setPaymentData({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardholderName: ''
        });
      } else {
        setError(paymentResult.message || 'Payment failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 1 ? 'Book Your Experience' : 'Payment Details'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Event Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-2 text-gray-900">{event.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-gray-500" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-gray-500" />
                  <span>{event.time}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-gray-500" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="participantName"
                      value={formData.participantName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Participants *
                    </label>
                    <select
                      name="numberOfParticipants"
                      value={formData.numberOfParticipants}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                      required
                    >
                      {[...Array(Math.min(10, event.availableSlots || 10))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i + 1 === 1 ? 'Person' : 'People'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="Any dietary restrictions, accessibility needs, etc."
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    ₹{event.price || 100} × {formData.numberOfParticipants} participant(s)
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Continue to Payment
                </button>
              </>
            ) : (
              <>
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Select Payment Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 bg-white">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={paymentMethod === 'credit_card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">Credit/Debit Card</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, RuPay</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 bg-white">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">UPI</div>
                        <div className="text-sm text-gray-600">PhonePe, Paytm, GPay</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Forms */}
                {paymentMethod === 'credit_card' ? (
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentInputChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 ${
                          validationErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {validationErrors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.cardNumber}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardholderName"
                        value={paymentData.cardholderName}
                        onChange={handlePaymentInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 ${
                          validationErrors.cardholderName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {validationErrors.cardholderName && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.cardholderName}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentInputChange}
                          placeholder="MM/YY"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 ${
                            validationErrors.expiryDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                          required
                        />
                        {validationErrors.expiryDate && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentInputChange}
                          placeholder="123"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 ${
                            validationErrors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                          required
                        />
                        {validationErrors.cvv && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID *
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={upiData.upiId}
                        onChange={handleUpiInputChange}
                        placeholder="yourname@paytm / yourname@phonepe / yourname@gpay"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 ${
                          validationErrors.upiId ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {validationErrors.upiId && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.upiId}</p>
                      )}
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">How to pay with UPI:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>1. Enter your UPI ID above</li>
                        <li>2. Click "Pay Now" to initiate payment</li>
                        <li>3. Complete payment in your UPI app</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-gray-900">Amount to Pay:</span>
                    <span className="text-gray-900">₹{totalAmount}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        {paymentMethod === 'upi' ? 'Pay with UPI' : 'Pay Now'}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}