"use client"

import React from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiMapPin, FiInfo, FiExternalLink, FiEye } from 'react-icons/fi'

export default function RankaTourPage() {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  
  // Map embed for location overview
  const mapEmbed = "https://www.google.com/maps?q=27.331414784198095,88.57905120963814&z=16&output=embed"

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 via-transparent to-transparent dark:from-gray-800/40" />
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
              <div className="w-14 h-14 rounded-xl bg-gray-900/90 dark:bg-white/10 flex items-center justify-center text-white">
                <span className="text-lg">🏛️</span>
              </div>
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold">Ranka Monastery</h1>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">Lingdum Monastery • Simple 360° & Map</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              Explore the location on the map and browse a small set of 360° views when available. Clean layout, quick to load, easy to use.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 360° Viewer - Embedded Google Street View */}
      <div className="container-custom pb-16">
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
          {/* Preview Section */}
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gray-900/90 dark:bg-white/10 flex items-center justify-center text-white">
              <span className="text-lg">Map</span>
            </div>
            <h2 className="font-heading text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Location Map
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Street View imagery for Ranka Monastery is limited here. Use the interactive map below to explore the area and get directions.
            </p>

            <div className="w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-4">
              <iframe
                src={mapEmbed}
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Ranka Monastery - Map"
              />
            </div>

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

        {/* Ranka Monastery - Google 360° Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
            <div className="p-6">
              <h3 className="font-heading text-lg font-semibold mb-4 text-gray-900 dark:text-white">Ranka Monastery - Google 360° Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/streetview?key=${key}&location=27.331414784198095,88.57905120963814&heading=20&pitch=0&fov=80&source=default`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ranka Monastery - 360 View A"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/streetview?key=${key}&location=27.331414784198095,88.57905120963814&heading=140&pitch=5&fov=80&source=default`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ranka Monastery - 360 View B"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/streetview?key=${key}&location=27.331414784198095,88.57905120963814&heading=300&pitch=-5&fov=80&source=default`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ranka Monastery - 360 View C"
                  />
                </div>
              </div>
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
              <FiEye className="h-5 w-5 text-gray-500" />
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
              <FiInfo className="h-5 w-5 text-gray-500" />
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