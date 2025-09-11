"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi'

const testimonials = [
  {
    id: 1,
    content: "Monastery360 has revolutionized how we preserve and share our cultural heritage with the world. The digital archives feature has been instrumental in documenting our ancient manuscripts.",
    name: "Lama Dorje Rinpoche",
    role: "Head Monk, Rumtek Monastery",
    avatar: "https://www.hrw.org/sites/default/files/styles/embed_xxl/public/media_2025/04/202504asia_tibet_humkar.jpg?itok=f57bd5BL"
  },
  {
    id: 2,
    content: "As a researcher studying Buddhist art, the high-resolution images and virtual tours provided by Monastery360 have been invaluable resources for my work.",
    name: "Dr. Sarah Thompson",
    role: "Art Historian, University of Oxford",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=150&h=150&fit=crop"
  },
  {
    id: 3,
    content: "The virtual tour feature allowed me to explore Sikkim's monasteries from my home in Australia. The experience was so immersive that it inspired me to plan an actual visit.",
    name: "Michael Chen",
    role: "Tourist from Melbourne",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop"
  }
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="bg-primary bg-opacity-10 text-primary p-3 rounded-full mb-4"
          >
            <FiMessageSquare className="h-6 w-6" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-3xl font-bold sm:text-4xl"
          >
            What People Are Saying
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
          >
            Hear from monks, researchers, and visitors about their experiences with Monastery360
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-lg shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 mb-6">
                  <Image
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <p className="text-lg md:text-xl italic mb-6 text-gray-700 dark:text-gray-300">
                  "{testimonials[current].content}"
                </p>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {testimonials[current].name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonials[current].role}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            {/* Indicator dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current ? "w-8 bg-primary" : "w-2 bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
