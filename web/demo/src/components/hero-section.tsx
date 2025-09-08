"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import LordIconButton from './lord-icon-button'
import FeatureCard from './feature-card'

// Updated monastery background images with high-quality sources
const bgImages = [
  'https://images.unsplash.com/photo-1514897575457-c4db467cf78e?q=80&w=1920&h=1080&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1610361418971-8752f7d57e5a?q=80&w=1920&h=1080&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1623867084079-7018a2f6ce56?q=80&w=1920&h=1080&fit=crop&ixlib=rb-4.0.3',
]

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === bgImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 6000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image carousel */}
      {bgImages.map((img, index) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ 
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 0 : -10
          }}
        >
          <Image
            src={img}
            alt={`Sikkim monastery ${index + 1}`}
            fill
            priority
            className="object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/50" />
        </div>
      ))}

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]">
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 0.2, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-32 right-5"
        >
          <Image 
            src="https://static.vecteezy.com/system/resources/previews/011/571/519/original/mandala-circle-pattern-tibetan-mandala-decorative-ornament-free-png.png" 
            width={220} 
            height={220} 
            alt="Decorative mandala" 
            className="opacity-30 dark:opacity-20"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-40 left-0"
        >
          <Image 
            src="https://www.transparentpng.com/thumb/flag/buddhism-prayer-flags-png-clipart-LePHFc.png" 
            width={350} 
            height={70} 
            alt="Prayer flags" 
            className="opacity-40 dark:opacity-25"
          />
        </motion.div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                top: `${35 + i * 10}%`,
                left: `${10 + i * 12}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start min-h-[calc(100vh-8rem)]">
            {/* Main Content Column */}
            <div className="pt-4 pb-20 lg:pt-8 lg:pb-24 max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-white space-y-8"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2"
                >
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 shadow-lg">
                    <div className="relative">
                      <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                    </div>
                    <span className="text-sm font-medium tracking-wide">Digital Heritage Initiative</span>
                  </div>
                </motion.div>
                
                {/* Main Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="space-y-6"
                >
                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                    Explore Sikkim&apos;s
                    <br />
                    <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                      Sacred Monasteries
                    </span>
                  </h1>
                  
                  <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                </motion.div>
                
                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-xl text-gray-100 leading-relaxed max-w-lg font-light"
                >
                  Immerse yourself in the rich cultural heritage of over{' '}
                  <span className="font-semibold text-primary">200 monasteries</span>{' '}
                  through virtual tours, interactive maps, and digital archives.
                </motion.p>
                
                {/* CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 pt-6"
                >
                  <LordIconButton 
                    href="/virtual-tours" 
                    variant="primary"
                    size="lg"
                    icon="https://cdn.lordicon.com/tdrtiskw.json"
                  >
                    Start Virtual Tour
                  </LordIconButton>
                  
                  <LordIconButton 
                    href="/about" 
                    variant="secondary"
                    size="lg"
                    icon="https://cdn.lordicon.com/nocovwne.json"
                  >
                    Learn More
                  </LordIconButton>
                </motion.div>
                
                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex items-center justify-start gap-12 pt-12"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">200+</div>
                    <div className="text-sm text-gray-300">Monasteries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">5K+</div>
                    <div className="text-sm text-gray-300">Artifacts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">12</div>
                    <div className="text-sm text-gray-300">Languages</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Visual Elements Column */}
            <div className="relative hidden lg:flex justify-end">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative w-full max-w-md"
              >
                {/* Floating cards with monastery features */}
                <div className="space-y-4">
                  <FeatureCard 
                    title="360° Virtual Tours"
                    description="Immersive monastery exploration"
                    icon="🏛️"
                    delay={0.8}
                  />
                  <FeatureCard 
                    title="Digital Archives"
                    description="Ancient manuscripts & murals"
                    icon="📜"
                    delay={1}
                  />
                  <FeatureCard 
                    title="Interactive Maps"
                    description="Geo-located monastery finder"
                    icon="🗺️"
                    delay={1.2}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Image indicator dots */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center space-x-2">
        {bgImages.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentImageIndex
                ? 'bg-white w-6'
                : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
