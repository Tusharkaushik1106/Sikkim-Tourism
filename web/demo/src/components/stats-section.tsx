"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const stats = [
  { id: 1, value: '200+', label: 'Monasteries' },
  { id: 2, value: '5,000+', label: 'Digital Artifacts' },
  { id: 3, value: '12', label: 'Languages Supported' },
  { id: 4, value: '100K+', label: 'Monthly Visitors' }
]

function scrambleValue(finalValue: string, progress: number) {
  // Only scramble numbers, keep suffixes like '+' or 'K'
  const match = finalValue.match(/^([\d,]+)(.*)$/)
  if (!match) return finalValue
  const [_, digits, suffix] = match
  if (progress < 1) {
    // Generate random digits with same length
    let scrambled = digits.replace(/\d/g, () => Math.floor(Math.random() * 10).toString())
    return scrambled + suffix
  }
  return finalValue
}

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [loading, setLoading] = useState(true)
  const [scrambleProgress, setScrambleProgress] = useState(Array(stats.length).fill(0))

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setLoading(false), 1200)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  useEffect(() => {
    if (!loading) {
      let frame = 0
      const totalFrames = 24
      const interval = setInterval(() => {
        frame++
        setScrambleProgress(prev =>
          prev.map((p, i) => Math.min(1, frame / totalFrames - i * 0.08))
        )
        if (frame >= totalFrames + stats.length * 2) clearInterval(interval)
      }, 32)
      return () => clearInterval(interval)
    }
  }, [loading])

  return (
    <div
      ref={ref}
      className="relative py-16"
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #6366f1 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative blurred circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-400 opacity-30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 opacity-30 rounded-full blur-3xl pointer-events-none" />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 32px 0 rgba(99,102,241,0.25)",
                filter: "brightness(1.15)"
              }}
              className="text-center bg-white bg-opacity-5 rounded-xl p-8 shadow-lg transition-all duration-300 cursor-pointer group"
            >
              {/* Loading shimmer animation */}
              {loading ? (
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-16 h-10 bg-white bg-opacity-20 rounded-lg mb-2" />
                  <div className="w-24 h-4 bg-white bg-opacity-10 rounded" />
                </div>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                    className="text-4xl md:text-5xl font-bold text-white font-heading group-hover:text-indigo-200 transition-colors"
                  >
                    {scrambleValue(stat.value, scrambleProgress[index])}
                  </motion.div>
                  <div className="mt-2 text-sm md:text-base font-medium text-white text-opacity-80 group-hover:text-indigo-100 transition-colors">
                    {stat.label}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
