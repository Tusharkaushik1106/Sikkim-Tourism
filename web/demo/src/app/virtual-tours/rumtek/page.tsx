"use client"

import React from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiMapPin, FiInfo, FiExternalLink, FiEye } from 'react-icons/fi'

export default function RumtekTourPage() {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  
  // Map embed for location overview - Updated coordinates for Rumtek
  const mapEmbed = `https://www.google.com/maps?q=27.290384029445423,88.56139015184537&z=16&output=embed`

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container-custom pt-28 pb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/virtual-tours" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 mb-6"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Virtual Tours
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gray-900/90 dark:bg-white/10 flex items-center justify-center text-white">
                <span className="text-lg">🏛️</span>
              </div>
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold">Tawang Monastery</h1>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">A serene monastery in Sikkim • Explore in 360°</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              Discover the courtyard and surrounding structures through simple, fast 360° views. Click and drag to look around; use the on‑screen arrows to move.
            </p>
          </motion.div>
        </div>
      </div>


      {/* 360° Viewer - Embedded Google Street View (Tawang) */}
      <div className="container-custom pb-16">
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
          {/* Preview Section */}
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 flex items-center justify-center text-white transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl">360°</span>
            </div>
            <h2 className="font-heading text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">Immersive Street View Tour</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Experience the grandeur of Rumtek Monastery through high-quality 360° panoramas. Navigate between viewpoints to explore the sacred spaces.
            </p>
            
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/streetview?key=${key}&location=27.290384029445423,88.56139015184537&heading=120&pitch=5&fov=80`}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rumtek Monastery - Street View 360"
                />
              </div>

              <a
                href="https://www.google.com/maps/place/Tawang+Monastery"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto justify-center"
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

        {/* Tawang Monastery - Google 360 Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
            <div className="p-6">
              <h3 className="font-heading text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tawang Monastery - Google 360° Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/streetview?key=${key}&location=27.586982875406544,91.85773014991224&heading=20&pitch=0&fov=80&source=default`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Tawang Monastery - View A"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/streetview?key=${key}&location=27.586982875406544,91.85773014991224&heading=140&pitch=5&fov=80&source=default`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Tawang Monastery - View B"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/streetview?key=${key}&location=27.586982875406544,91.85773014991224&heading=300&pitch=-5&fov=80&source=default`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Tawang Monastery - View C"
                  />
                </div>
                
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">Use the viewers to navigate between connected 360° photos, including interior scenes when available.</p>
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
              About Tawang Monastery (Sikkim)
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• One of the significant monasteries located in Sikkim</li>
              <li>• Explore 360° views via Street View embeds above</li>
              <li>• Respect local customs and maintain silence in sacred areas</li>
              <li>• Best experienced early morning or late afternoon</li>
            </ul>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  )
}


