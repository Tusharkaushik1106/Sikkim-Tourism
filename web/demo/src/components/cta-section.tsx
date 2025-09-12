"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiDownload, FiArrowRight } from 'react-icons/fi'
import AnimatedButton from './animated-button'
import Image from 'next/image'

export default function CtaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  }

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background and decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
      
      <div className="absolute inset-0">
        <Image
          src="/images/monastery-pattern-bg.svg"
          alt="Monastery pattern"
          fill
          className="opacity-10 object-cover"
          priority // Fix Next.js warning for background images
        />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-20">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute top-0 left-0 w-full h-full"
          fill="currentColor"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            className="fill-white dark:fill-gray-900 opacity-20" 
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            className="fill-white dark:fill-gray-900 opacity-10" 
          />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 transform rotate-180">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute top-0 left-0 w-full h-full"
          fill="currentColor"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            className="fill-white dark:fill-gray-900 opacity-20" 
          />
        </svg>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-heading text-3xl font-bold sm:text-4xl mb-6 text-white"
          >
            Experience Sikkim&apos;s Sacred Heritage
          </motion.h2>
          
          <motion.p 
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="text-lg text-white text-opacity-90 mb-10"
          >
            Explore monasteries through virtual tours, plan your visit with our interactive map, 
            or download our mobile app for an enhanced on-site experience.
          </motion.p>
          
          <motion.div 
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <AnimatedButton 
              href="/virtual-tours" 
              variant="ghost" 
              size="lg"
              icon={<FiArrowRight />}
              className="backdrop-blur-md"
            >
              Start Virtual Tour
            </AnimatedButton>
            
            <AnimatedButton 
              href="/app" 
              variant="ghost"
              size="lg"
              icon={<FiDownload />}
              className="backdrop-blur-md"
            >
              Download Mobile App
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
