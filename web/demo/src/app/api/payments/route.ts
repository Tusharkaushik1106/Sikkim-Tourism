import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Payment } from '@/models';

// Payment validation functions
const validateCardNumber = (cardNumber: string): boolean => {
  // Remove spaces and check if it's numeric
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cleaned)) return false;
  
  // Check length (13-19 digits for most cards)
  if (cleaned.length < 13 || cleaned.length > 19) return false;
  
  // Luhn algorithm for card validation
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

const validateExpiryDate = (expiryDate: string): boolean => {
  // Check format MM/YY
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expiryDate)) return false;
  
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expYear = parseInt(year);
  const expMonth = parseInt(month);
  
  // Check if card is not expired
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return false;
  }
  
  return true;
};

const validateCVV = (cvv: string): boolean => {
  // CVV should be 3 or 4 digits
  return /^\d{3,4}$/.test(cvv);
};

const validateUpiId = (upiId: string): boolean => {
  // UPI ID format: username@bank
  const regex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
  return regex.test(upiId);
};

const validateCardholderName = (name: string): boolean => {
  // Name should contain only letters, spaces, and common punctuation
  const regex = /^[a-zA-Z\s.'-]{2,50}$/;
  return regex.test(name.trim());
};

// Demo payment processing - simulates Stripe/Razorpay/PayPal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, amount, paymentMethod, cardDetails, upiDetails } = body;

    // Validate required fields
    if (!bookingId || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required payment fields' },
        { status: 400 }
      );
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0 || amount > 100000) {
      return NextResponse.json(
        { error: 'Invalid payment amount' },
        { status: 400 }
      );
    }

    // Validate payment method specific fields
    if (paymentMethod === 'credit_card') {
      if (!cardDetails) {
        return NextResponse.json(
          { error: 'Card details are required for credit card payments' },
          { status: 400 }
        );
      }

      const { cardNumber, expiryDate, cvv, cardholderName } = cardDetails;

      // Validate card number
      if (!cardNumber || !validateCardNumber(cardNumber)) {
        return NextResponse.json(
          { error: 'Invalid card number. Please check and try again.' },
          { status: 400 }
        );
      }

      // Validate expiry date
      if (!expiryDate || !validateExpiryDate(expiryDate)) {
        return NextResponse.json(
          { error: 'Invalid expiry date. Please use MM/YY format and ensure card is not expired.' },
          { status: 400 }
        );
      }

      // Validate CVV
      if (!cvv || !validateCVV(cvv)) {
        return NextResponse.json(
          { error: 'Invalid CVV. Please enter 3 or 4 digits.' },
          { status: 400 }
        );
      }

      // Validate cardholder name
      if (!cardholderName || !validateCardholderName(cardholderName)) {
        return NextResponse.json(
          { error: 'Invalid cardholder name. Please enter a valid name.' },
          { status: 400 }
        );
      }
    } else if (paymentMethod === 'upi') {
      if (!upiDetails || !upiDetails.upiId) {
        return NextResponse.json(
          { error: 'UPI ID is required for UPI payments' },
          { status: 400 }
        );
      }

      // Validate UPI ID
      if (!validateUpiId(upiDetails.upiId)) {
        return NextResponse.json(
          { error: 'Invalid UPI ID format. Please enter a valid UPI ID (e.g., user@paytm)' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid payment method. Only credit_card and upi are supported.' },
        { status: 400 }
      );
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Demo payment success/failure logic (90% success rate)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      const paymentId = paymentMethod === 'upi' 
        ? 'upi_' + Math.random().toString(36).substr(2, 15)
        : 'pay_' + Math.random().toString(36).substr(2, 15);
      
      const transactionId = 'txn_' + Math.random().toString(36).substr(2, 12);
      
      // Prepare payment data for database
      const paymentData: any = {
        bookingId,
        paymentId,
        transactionId,
        amount,
        paymentMethod,
        paymentStatus: 'completed',
        paymentDate: new Date()
      };

      // Add method-specific details
      if (paymentMethod === 'credit_card' && cardDetails) {
        paymentData.cardDetails = {
          lastFourDigits: cardDetails.cardNumber.slice(-4),
          cardType: 'Unknown', // In real implementation, detect card type
          cardholderName: cardDetails.cardholderName
        };
      } else if (paymentMethod === 'upi' && upiDetails) {
        paymentData.upiDetails = {
          upiId: upiDetails.upiId
        };
      }

      // Save to MongoDB
      try {
        console.log('Attempting to save payment to MongoDB...');
        await dbConnect();
        console.log('MongoDB connected, creating payment record...');
        
        const payment = new Payment(paymentData);
        const savedPayment = await payment.save();
        console.log('Payment saved successfully:', savedPayment._id);
      } catch (dbError) {
        console.error('Failed to save payment to database:', dbError);
        console.error('Payment data that failed to save:', paymentData);
        // Continue with response even if DB save fails
      }
      
      return NextResponse.json({
        success: true,
        paymentId,
        transactionId,
        amount,
        currency: 'INR',
        status: 'completed',
        paymentMethod,
        timestamp: new Date().toISOString(),
        message: paymentMethod === 'upi' ? 'UPI payment processed successfully' : 'Payment processed successfully'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Payment failed',
        errorCode: paymentMethod === 'upi' ? 'UPI_TRANSACTION_FAILED' : 'PAYMENT_DECLINED',
        message: paymentMethod === 'upi' 
          ? 'UPI transaction failed. Please try again.' 
          : 'Your payment could not be processed. Please try again.'
      }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

// Get payment status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get('paymentId');

  if (!paymentId) {
    return NextResponse.json(
      { error: 'Payment ID is required' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const payment = await Payment.findOne({ paymentId });
    
    if (payment) {
      return NextResponse.json({
        paymentId: payment.paymentId,
        status: payment.paymentStatus,
        amount: payment.amount,
        currency: 'INR',
        timestamp: payment.paymentDate.toISOString()
      });
    }
  } catch (error) {
    console.error('Database error:', error);
  }

  // Fallback response if not found in database
  return NextResponse.json({
    paymentId,
    status: 'completed',
    amount: 1000,
    currency: 'INR',
    timestamp: new Date().toISOString()
  });
}