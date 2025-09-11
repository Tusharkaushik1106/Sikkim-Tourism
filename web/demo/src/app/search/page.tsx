import SearchBox from '@/components/search-box';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white py-12">
      <div className="container mx-auto px-4">
        <a href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </a>
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          Monastery Search
        </h1>
        <p className="text-center text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
          Discover the hidden treasures and sacred spaces of monasteries across India
        </p>
        <SearchBox />
      </div>
    </div>
  );
}