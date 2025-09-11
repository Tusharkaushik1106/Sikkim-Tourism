"use client"

import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiMapPin, FiCamera, FiCompass, FiEye } from 'react-icons/fi'

export default function VirtualToursPage() {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="container-custom pt-28 pb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                360° Virtual Tours
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Immerse yourself in the sacred beauty of Sikkim's monasteries through interactive 360° Street View experiences. 
              Explore every corner, feel the spiritual atmosphere, and plan your visit with confidence.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <FiEye className="h-4 w-4" />
                <span>Interactive 360° Views</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCompass className="h-4 w-4" />
                <span>Google Street View</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCamera className="h-4 w-4" />
                <span>High-Quality Imagery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Monastery Tours Grid */}
      <div className="container-custom pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/virtual-tours/rumtek" className="group block">
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="p-8 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xl">
                      🏛️
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">Rumtek Monastery</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Dharma Chakra Centre</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Explore the magnificent Rumtek Monastery, the seat of the Karmapa lineage. 
                    Experience the grandeur of Tibetan Buddhist architecture and the peaceful monastery grounds.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <FiMapPin className="h-4 w-4" />
                        <span>Gangtok, Sikkim</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCamera className="h-4 w-4" />
                        <span>360° Street View</span>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-primary text-white rounded-lg font-semibold group-hover:bg-primary-dark transition-colors">
                      Explore Now
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/virtual-tours/ranka" className="group block">
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="p-8 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl">
                      🏛️
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">Ranka Monastery</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Lingdum Monastery</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Discover the serene Ranka (Lingdum) Monastery, a modern architectural marvel. 
                    Experience the blend of traditional Tibetan design with contemporary elements.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <FiMapPin className="h-4 w-4" />
                        <span>Ranka, Sikkim</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCamera className="h-4 w-4" />
                        <span>360° Street View</span>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-primary text-white rounded-lg font-semibold group-hover:bg-primary-dark transition-colors">
                      Explore Now
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">Why Choose Our Virtual Tours?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the monasteries like never before with our immersive 360° technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <FiEye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Immersive Experience</h3>
              <p className="text-gray-600 dark:text-gray-300">Look around in all directions with smooth 360° navigation</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <FiCompass className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Google Street View</h3>
              <p className="text-gray-600 dark:text-gray-300">Powered by Google's high-quality Street View imagery</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <FiCamera className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">High Resolution</h3>
              <p className="text-gray-600 dark:text-gray-300">Crystal clear imagery for the best viewing experience</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  )
}


