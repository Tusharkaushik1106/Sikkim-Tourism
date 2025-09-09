export default function BookingHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Cultural Experience</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and book authentic Sikkimese cultural experiences
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Browse Events</h3>
            <p className="text-gray-600 mb-4">Explore our cultural calendar and find the perfect experience for you.</p>
            <a
              href="/calendar"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Calendar
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">My Bookings</h3>
            <p className="text-gray-600 mb-4">View and manage your existing bookings and reservations.</p>
            <a
              href="/bookings"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              View Bookings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}