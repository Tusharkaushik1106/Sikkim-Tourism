"use client"

import React from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiMapPin, FiInfo, FiExternalLink, FiEye } from 'react-icons/fi'
import GoogleStreetViewEmbed from '@/components/google-street-view-embed'
import GooglePhotos360 from '@/components/google-photos-360'

export default function RankaTourPage() {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  
  // Map embed for location overview
  const mapEmbed = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.906928295704!2d88.6700!3d27.3202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a2d4c1b8d7f9%3A0x9d0e8b5ab1f5f1b7!2sRanka%20Monastery!5e0!3m2!1sen!2sin!4v${Date.now()}`

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-teal-500/10" />
        <div className="container-custom pt-28 pb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/virtual-tours" 
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors mb-6"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Virtual Tours
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl">
                🏛️
              </div>
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold">Ranka Monastery</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">Lingdum Monastery • 360° Virtual Experience</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              Discover the serene Ranka (Lingdum) Monastery, a modern architectural marvel that beautifully blends 
              traditional Tibetan design with contemporary elements. Experience the peaceful atmosphere and stunning 
              mountain views through our interactive 360° Street View.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 360° Viewer */}
      <div className="container-custom pb-16">
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
          {/* Preview Section */}
          <div className="p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl">
              🏛️
            </div>
            <h2 className="font-heading text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Experience Ranka Monastery in 360°
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Click the button below to open an immersive full-screen 360° Street View experience. 
              Explore the modern architecture and peaceful surroundings of this beautiful monastery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <GoogleStreetViewEmbed
                lat={27.3202}
                lng={88.6700}
                heading={60}
                pitch={5}
                fov={80}
                title="Ranka Monastery - 360° Virtual Tour"
                buttonText="Open 360° Experience"
                buttonStyle="primary"
                className="w-full sm:w-auto"
                showMultipleViews={true}
                viewpoints={[
                  {
                    id: 'main-entrance',
                    name: 'Main Entrance',
                    lat: 27.3202,
                    lng: 88.6700,
                    heading: 60,
                    pitch: 5,
                    fov: 80,
                    description: 'Main entrance to Ranka Monastery'
                  },
                  {
                    id: 'modern-architecture',
                    name: 'Modern Architecture',
                    lat: 27.3205,
                    lng: 88.6698,
                    heading: 120,
                    pitch: 0,
                    fov: 90,
                    description: 'Contemporary design elements'
                  },
                  {
                    id: 'mountain-views',
                    name: 'Mountain Views',
                    lat: 27.3199,
                    lng: 88.6703,
                    heading: 300,
                    pitch: 20,
                    fov: 100,
                    description: 'Stunning Himalayan mountain views'
                  },
                  {
                    id: 'peaceful-gardens',
                    name: 'Peaceful Gardens',
                    lat: 27.3203,
                    lng: 88.6701,
                    heading: 180,
                    pitch: -5,
                    fov: 85,
                    description: 'Serene meditation gardens'
                  },
                  {
                    id: 'traditional-elements',
                    name: 'Traditional Elements',
                    lat: 27.3201,
                    lng: 88.6699,
                    heading: 45,
                    pitch: 10,
                    fov: 75,
                    description: 'Traditional Tibetan architectural features'
                  }
                ]}
              />
              
              <a
                href="https://www.google.com/maps/place/Ranka+Monastery"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto justify-center"
              >
                <FiExternalLink className="h-5 w-5" />
                Open in Google Maps
              </a>
            </div>
          </div>
          
          {/* Map Preview */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="font-heading text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Location Overview
              </h3>
              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <iframe
                  src={mapEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        {/* Google Photos 360° Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
            <div className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-3xl">
                📸
              </div>
              <h2 className="font-heading text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Google Photos 360° Gallery
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Explore additional 360° photos and user-contributed content from Google Photos. 
                These immersive images showcase the modern architecture and serene beauty of Ranka Monastery.
              </p>
              
              <GooglePhotos360
                location="Ranka Monastery"
                lat={27.3202}
                lng={88.6700}
                className="w-full"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
              <FiEye className="h-5 w-5 text-primary" />
              How to Navigate
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Click and drag to look around in 360°</li>
              <li>• Use mouse wheel or pinch to zoom in/out</li>
              <li>• Click on blue dots to move to different viewpoints</li>
              <li>• Use keyboard arrows for navigation</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
              <FiInfo className="h-5 w-5 text-secondary" />
              About Ranka Monastery
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Modern monastery built in 2000s</li>
              <li>• Blend of traditional and contemporary architecture</li>
              <li>• Stunning views of the Himalayan mountains</li>
              <li>• Peaceful retreat for meditation and study</li>
            </ul>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  )
}


