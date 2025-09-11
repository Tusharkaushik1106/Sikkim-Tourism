"use client"

import { FiMap, FiBook, FiHeadphones, FiCalendar, FiCamera, FiChevronRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import AnimatedButton from './animated-button'

const features = [
  {
    id: 1,
    name: 'Virtual Tours',
    description: 'Experience immersive 360° panoramic views of monastery interiors and surroundings with narrated walkthroughs.',
    icon: FiCamera,
    link: '/virtual-tours',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ79hd8Q7rZGHtObY4kJPKRKTOp6O6uYN-UZQ&s'
  },
  {
    id: 2,
    name: 'Interactive Map',
    description: 'Discover geo-tagged monastery locations with travel routes and nearby attractions.',
    icon: FiMap,
    link: '/map',
    image: 'https://imgcdn.stablediffusionweb.com/2024/5/2/6edba0dd-0d01-4ed8-b2b6-d4d543128256.jpg'
  },
  {
    id: 3,
    name: 'Digital Archives',
    description: 'Access scanned manuscripts, murals, and historical documents with AI-powered search.',
    icon: FiBook,
    link: '/archive',
    image: 'https://tripxl.com/blog/wp-content/uploads/2024/08/Sanga-Choeling-Monastery.jpg'
  },
  {
    id: 4,
    name: 'Smart Audio Guide',
    description: 'Use location-based audio guides with Bluetooth beacons and offline mode for remote areas.',
    icon: FiHeadphones,
    link: '/app',
    image: 'https://amuseapp.art/wp-content/uploads/2025/03/customer-chatbot-dialog-smartphone-screen-ai-artificial-intelligence-service-automation-technology-concept-1024x683.jpg'
  },
  {
    id: 5,
    name: 'Cultural Calendar',
    description: 'Stay updated with monastery events, festivals, and ritual schedules.',
    icon: FiCalendar,
    link: '/calendar',
    image: '/images/CulturalCalander.png'
  }
]

export default function FeatureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <section ref={ref} className="py-12 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-gray-900">
      <div className="container-custom relative">
        {/* Decorative elements
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <Image 
            src="/images/mandala-pattern.svg" 
            width={300} 
            height={300} 
            alt="Decorative mandala pattern" 
            className="absolute -top-20 -left-20 opacity-5 dark:opacity-[0.03]"
          />
          <Image 
            src="/images/buddha-silhouette.svg" 
            width={200} 
            height={200} 
            alt="Buddha silhouette" 
            className="absolute -bottom-20 -right-10 opacity-5 dark:opacity-[0.03]"
          />
        </div>
         */}
        <div className="text-center mb-16 relative z-10">
          <span className="inline-block text-4xl font-semibold text-orange-500 dark:text-orange-400 mb-2">
            Explore Our Features
          </span>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl text-gray-900 dark:text-white">
            Preserving Heritage Through Technology
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Monastery360 offers innovative tools to explore, learn about, and preserve Sikkim's monastery heritage.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-md mr-4">
                    <feature.icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white">{feature.name}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-5">{feature.description}</p>
                <AnimatedButton 
                  href={feature.link} 
                  variant="outline" 
                  size="sm"
                  icon={<FiChevronRight />}
                  className="mt-2"
                >
                  Explore
                </AnimatedButton>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
