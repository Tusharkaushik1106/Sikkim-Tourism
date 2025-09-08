"use client"

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

interface RotatingPrayerWheelProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function RotatingPrayerWheel({
  size = 'md',
  className = '',
}: RotatingPrayerWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const controls = useAnimation()
  
  // Define sizes
  const sizes = {
    sm: 60,
    md: 100,
    lg: 150
  }
  
  const wheelSize = sizes[size]
  
  const handleClick = () => {
    setIsSpinning(true)
    controls.start({
      rotate: 1080,
      transition: { 
        duration: 4,
        ease: "easeOut"
      }
    }).then(() => {
      setIsSpinning(false)
    })
  }
  
  // Slow perpetual motion
  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        duration: 60,
        ease: "linear",
        repeat: Infinity
      }
    })
  }, [controls])

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`} 
      style={{ width: wheelSize, height: wheelSize }}
    >
      {/* Prayer wheel */}
      <motion.div
        animate={controls}
        className="cursor-pointer select-none"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src="/images/prayer-wheel.svg"
          alt="Buddhist prayer wheel"
          width={wheelSize}
          height={wheelSize}
          priority
        />
      </motion.div>
      
      {/* Om mani padme hum mantra text that appears when spinning */}
      {isSpinning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/4"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg shadow-lg">
            <p className="text-xs font-semibold text-primary">
              Om Mani Padme Hum
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
