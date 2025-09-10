import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  userId: { type: String, required: true },
  participantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  numberOfParticipants: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  bookingStatus: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  bookingDate: { type: Date, default: Date.now },
  eventDate: { type: String, required: true },
  specialRequirements: { type: String, default: '' },
  paymentId: { type: String, default: null }
}, {
  timestamps: true
});

const PaymentSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  paymentId: { type: String, required: true, unique: true },
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'upi'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  // Card details (encrypted/masked for security)
  cardDetails: {
    lastFourDigits: String,
    cardType: String,
    cardholderName: String
  },
  // UPI details
  upiDetails: {
    upiId: String
  },
  paymentDate: { type: Date, default: Date.now },
  paymentGatewayResponse: { type: Object, default: {} }
}, {
  timestamps: true
});

export const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
export const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);