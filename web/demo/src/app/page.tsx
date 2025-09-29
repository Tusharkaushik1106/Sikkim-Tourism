import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import FeatureSection from '@/components/feature-section'
import StatsSection from '@/components/stats-section'
import TestimonialsSection from '@/components/testimonials-section'

import Footer from '@/components/footer'

import ChatbotPopup from '@/components/chatbot-popup';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <Header />
      <div className="pt-0">
        <HeroSection />
        <FeatureSection />
        <StatsSection />
        <TestimonialsSection />
        
      </div>

      {/* <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          Welcome to Monastery360
        </h1>
        <p className="text-xl text-center mb-8 text-gray-300">
          Discover and explore monasteries in immersive 360°
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="/map"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10">View Map</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="/search"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-full overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10">Search Sacred Spaces</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div> */}

      <ChatbotPopup />
      <Footer />
    </div>
  )
}
