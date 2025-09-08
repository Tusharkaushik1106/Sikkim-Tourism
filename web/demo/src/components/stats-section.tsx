"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { id: 1, value: '200+', label: 'Monasteries' },
  { id: 2, value: '5,000+', label: 'Digital Artifacts' },
  { id: 3, value: '12', label: 'Languages Supported' },
  { id: 4, value: '100K+', label: 'Monthly Visitors' }
]

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  return (
    <div ref={ref} className="bg-primary py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : { scale: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white font-heading"
              >
                {stat.value}
              </motion.div>
              <div className="mt-2 text-sm md:text-base font-medium text-white text-opacity-80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
