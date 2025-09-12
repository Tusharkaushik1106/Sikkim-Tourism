"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import LordIconButton from './lord-icon-button'
import FeatureCard from './feature-card'

// Updated monastery content with images and text
const heroContent = [
  {
    image: 'https://images.unsplash.com/photo-1573398643956-2b9e6ade3456?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Sacred Monasteries',
    // subtitle: '“Where silence speaks and history breathes.”',
    description: 'Immerse yourself in the rich cultural heritage of over 200 monasteries through virtual tours, interactive maps, and digital archives.',
    stats: [
      { value: '200+', label: 'Monasteries' },
      { value: '5K+', label: 'Artifacts' },
      { value: '12', label: 'Languages' }
    ]
  },
  {
    image: 'https://images.unsplash.com/photo-1686851205339-96576bb72d6f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Ancient Wisdom',
    subtitle: '“Every stone tells a story, every prayer echoes eternity.”',
    description: 'Discover centuries-old Buddhist teachings and practices preserved in manuscripts, murals, and architectural marvels across Sikkim.',
    stats: [
      { value: '800+', label: 'Years' },
      { value: '15+', label: 'Sects' },
      { value: '50+', label: 'Festivals' }
    ]
  },
  {
    image: 'https://images.unsplash.com/photo-1692759873514-6514e8b7696d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Living Heritage',
    subtitle: '“Tradition meets tomorrow in every sacred hall.”',
    description: 'Experience the vibrant monastic life through immersive digital experiences that connect ancient traditions with modern technology.',
    stats: [
      { value: '1000+', label: 'Monks' },
      { value: '24/7', label: 'Virtual Access' },
      { value: '4K', label: 'HD Quality' }
    ]
  }
]

function useCountUp(target: string | number, duration = 1200) {
  const [value, setValue] = useState(typeof target === 'number' ? 0 : '')
  useEffect(() => {
    let start = 0
    let end = typeof target === 'number' ? Number(target) : parseInt(target)
    if (isNaN(end)) {
      setValue(target)
      return
    }
    let startTime: number | null = null
    function animateCountUp(ts: number) {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const current = Math.floor(progress * (end - start) + start)
      setValue(current < end ? current : end)
      if (progress < 1) requestAnimationFrame(animateCountUp)
    }
    setValue(0)
    requestAnimationFrame(animateCountUp)
    // eslint-disable-next-line
  }, [target])
  return value
}

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentContent = heroContent[currentIndex]

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Content navigation dots with redesigned glassmorphism arrows */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center items-center space-x-8 pointer-events-auto">
        {/* Left Arrow */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => setCurrentIndex((currentIndex - 1 + heroContent.length) % heroContent.length)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/30 backdrop-blur-lg shadow-lg hover:bg-primary/30 transition-all duration-300 border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="rgba(255,255,255,0.18)" stroke="#fff" strokeWidth="2" />
            <path d="M19 10l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <animateTransform attributeName="transform" type="translate" values="0,0;-2,0;0,0" dur="1.2s" repeatCount="indefinite" />
            </path>
          </svg>
        </button>
        {/* Navigation Dots */}
        <div className="flex space-x-3">
          {heroContent.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-8 shadow-lg'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Right Arrow */}
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => setCurrentIndex((currentIndex + 1) % heroContent.length)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/30 backdrop-blur-lg shadow-lg hover:bg-primary/30 transition-all duration-300 border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="rgba(255,255,255,0.18)" stroke="#fff" strokeWidth="2" />
            <path d="M13 10l6 6-6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <animateTransform attributeName="transform" type="translate" values="0,0;2,0;0,0" dur="1.2s" repeatCount="indefinite" />
            </path>
          </svg>
        </button>
      </div>

      {/* Background image carousel */}
      {heroContent.map((content, index) => (
        <div
          key={content.image}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gray-900"
          style={{ 
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 0 : -10
          }}
        >
          <Image
            src={content.image}
            alt={`Sikkim monastery ${index + 1}`}
            fill
            priority
            className="object-cover object-center"
            style={{ backgroundColor: '#222' }}
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
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-40 left-0"
        >
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
                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight flex flex-wrap items-center gap-4">
                    Explore Sikkim&apos;s
                    <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent ml-3">
                      {currentContent.title}
                    </span>
                  </h1>
                  <div className="mt-2 text-lg italic text-accent font-medium">
                    {currentContent.subtitle}
                  </div>
                  
                  <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                </motion.div>
                
                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-xl text-gray-100 leading-relaxed max-w-lg font-light"
                >
                  {currentContent.description}
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
                  {currentContent.stats.map((stat, index) => {
                    // Extract numeric part for count-up
                    const numMatch = stat.value.match(/\d+/)
                    const numValue = numMatch ? parseInt(numMatch[0]) : stat.value
                    const animatedValue = useCountUp(numValue, 1200 + index * 300)
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.2, duration: 0.7, type: 'spring' }}
                        className="text-center bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 shadow-lg border border-white/20"
                      >
                        <div className="text-3xl font-bold text-primary">
                          {typeof animatedValue === 'number' ? `${animatedValue}${stat.value.replace(/\d+/,'')}` : stat.value}
                        </div>
                        <div className="text-sm text-gray-300">{stat.label}</div>
                      </motion.div>
                    )
                  })}
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
                    href="/virtual-tours"
                    delay={0.8}
                  />
                  <FeatureCard 
                    title="Digital Archives"
                    description="Ancient manuscripts & murals"
                    icon="📜"
                    href="/archive"
                    delay={1}
                  />
                  <FeatureCard 
                    title="Interactive Maps"
                    description="Geo-located monastery finder"
                    icon="🗺️"
                    href="/map"
                    delay={1.2}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
