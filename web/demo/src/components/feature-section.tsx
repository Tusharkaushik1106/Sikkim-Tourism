"use client"

import { FiMap, FiBook, FiHeadphones, FiCalendar, FiCamera, FiChevronRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import AnimatedButton from './animated-button'
import Marquee from 'react-fast-marquee';

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
    <section ref={ref} className="relative py-12 overflow-hidden">
      {/* Out-of-box animated gradient background with floating glass blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full animate-gradient bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#a1c4fd] dark:from-[#232526] dark:via-[#414345] dark:to-[#485563]" />
        {/* Floating glass blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/30 backdrop-blur-xl rounded-full shadow-2xl animate-blob1" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/30 backdrop-blur-xl rounded-full shadow-2xl animate-blob2" />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-orange-200/30 dark:bg-orange-900/30 backdrop-blur-xl rounded-full shadow-2xl animate-blob3" />
      </div>
      <style jsx>{`
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientMove 18s ease infinite;
        }
        @keyframes gradientMove {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
        .animate-blob1 {
          animation: blobMove1 14s ease-in-out infinite alternate;
        }
        .animate-blob2 {
          animation: blobMove2 18s ease-in-out infinite alternate;
        }
        .animate-blob3 {
          animation: blobMove3 16s ease-in-out infinite alternate;
        }
        @keyframes blobMove1 {
          0% {transform: translateY(0) scale(1);}
          100% {transform: translateY(-40px) scale(1.1);}
        }
        @keyframes blobMove2 {
          0% {transform: translateX(0) scale(1);}
          100% {transform: translateX(-60px) scale(1.05);}
        }
        @keyframes blobMove3 {
          0% {transform: translate(-50%, -50%) scale(1);}
          100% {transform: translate(-60%, -60%) scale(1.15);}
        }
      `}</style>
      <div className="container-custom relative z-10">
        {/* News ticker headline and subheading */}
        <div className="mb-10">
          <Marquee gradient={false} speed={60} className="text-4xl font-bold text-orange-600 dark:text-orange-400 py-2">
            Explore Our Features &nbsp;|&nbsp; Preserving Heritage Through Technology &nbsp;|&nbsp; Monastery360 offers innovative tools to explore, learn about, and preserve Sikkim's monastery heritage. &nbsp;
          </Marquee>
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
              className="bg-white/60 dark:bg-gray-900/60 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl backdrop-blur-lg border border-white/30 dark:border-gray-700/30"
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
                <p className="text-gray-700 dark:text-gray-300 mb-5">{feature.description}</p>
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
