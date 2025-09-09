import { NextRequest, NextResponse } from 'next/server';

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

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Demo payment success/failure logic (90% success rate)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      const paymentId = paymentMethod === 'upi' 
        ? 'upi_' + Math.random().toString(36).substr(2, 15)
        : 'pay_' + Math.random().toString(36).substr(2, 15);
      
      return NextResponse.json({
        success: true,
        paymentId,
        transactionId: 'txn_' + Math.random().toString(36).substr(2, 12),
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

  // Demo payment status lookup
  return NextResponse.json({
    paymentId,
    status: 'completed',
    amount: 1000,
    currency: 'INR',
    timestamp: new Date().toISOString()
  });
}