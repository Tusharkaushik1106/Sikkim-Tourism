import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Location {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function BookRideForm() {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = (method: string) => {
    // Simulate payment processing
    setPaymentSuccess(true);
    setTimeout(() => {
      window.location.href = '/booking-confirmation';
    }, 1500);
  };

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`);
          if (!response.ok) {
            setPickup({
              address: `Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}`,
              coordinates: { lat: latitude, lng: longitude }
            });
            return;
          }
          const data = await response.json();
          setPickup({
            address: data.address || `Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}`,
            coordinates: { lat: latitude, lng: longitude }
          });
        } catch {
          setPickup({
            address: `Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}`,
            coordinates: { lat: latitude, lng: longitude }
          });
        }
      });
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto p-6"
    >
      <div className="space-y-6">
        

        {currentStep === 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Payment Details</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                  <p className="text-3xl font-bold text-primary">₹299</p>
                </div>
                <div className="space-y-3">
                  <button 
                    onClick={() => handlePayment('upi')}
                    className="w-full p-4 bg-white dark:bg-gray-700 border rounded-xl flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">UPI Payment</span>
                    </div>
                    <span className="text-xl">→</span>
                  </button>
                  <button 
                    onClick={() => handlePayment('card')}
                    className="w-full p-4 bg-white dark:bg-gray-700 border rounded-xl flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">Card Payment</span>
                    </div>
                    <span className="text-xl">→</span>
                  </button>
                  <button 
                    onClick={() => handlePayment('cash')}
                    className="w-full p-4 bg-white dark:bg-gray-700 border rounded-xl flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">Cash Payment</span>
                    </div>
                    <span className="text-xl">→</span>
                  </button>
                </div>
              </div>
              {paymentSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-center font-medium rounded-lg"
                >
                  Payment successful! Redirecting...
                </motion.div>
              )}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 py-3 border rounded-lg font-medium"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}