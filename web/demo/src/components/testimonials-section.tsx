"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  return (
    <section
      ref={ref}
      className="py-16 relative bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] dark:from-[#1e293b] dark:to-[#312e81] transition-colors duration-700"
    >
      {/* Animated gradient overlay */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.7, backgroundPosition: "0% 50%" }}
        animate={{ opacity: 1, backgroundPosition: "100% 50%" }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "linear-gradient(120deg, #f3f4f6 0%, #c7d2fe 100%)",
          backgroundSize: "200% 200%",
          opacity: 0.5
        }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0.5, backgroundPosition: "100% 50%" }}
        animate={{ opacity: 0.7, backgroundPosition: "0% 50%" }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        className="pointer-events-none absolute inset-0 z-0 dark:block hidden"
        style={{
          background: "linear-gradient(120deg, #1e293b 0%, #6366f1 100%)",
          backgroundSize: "200% 200%",
          opacity: 0.4
        }}
      />
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4 rounded-full mb-4 shadow-lg flex items-center justify-center"
          >
            <FiMessageSquare className="h-10 w-10 text-white drop-shadow-lg" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            What People Are Saying
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-200 max-w-2xl"
          >
            Hear from monks, researchers, and visitors about their experiences with <span className="font-semibold text-indigo-500 dark:text-indigo-300">Monastery360</span>
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.015, boxShadow: "0 8px 32px rgba(99,102,241,0.08)" }}
                className="bg-white/90 dark:bg-gray-900/90 p-8 md:p-10 rounded-2xl shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="relative h-20 w-20 mb-6"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0 rounded-full ring-4 ring-indigo-100 dark:ring-indigo-400/30" />
                    <Image
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </motion.div>
                  <p className="text-xl sm:text-2xl italic mb-6 text-gray-800 dark:text-gray-100 font-serif leading-relaxed">
                    "{testimonials[current].content}"
                  </p>
                  <div className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">
                    {testimonials[current].name}
                  </div>
                  <div className="text-base text-gray-500 dark:text-gray-400 font-medium mt-1">
                    {testimonials[current].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.12, backgroundColor: "#e0e7ff" }}
              className="p-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:shadow transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="h-5 w-5 text-indigo-500" />
            </motion.button>
            {/* Indicator dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrent(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === current
                      ? "w-8 bg-indigo-400 shadow"
                      : "w-2 bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.12, backgroundColor: "#e0e7ff" }}
              className="p-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:shadow transition-all duration-200"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="h-5 w-5 text-indigo-500" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
