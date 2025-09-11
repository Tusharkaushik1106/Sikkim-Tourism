"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  href: string
  delay?: number
  className?: string
}

export default function FeatureCard({
  title,
  description,
  icon,
  href,
  delay = 0,
  className
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, x: 40, rotate: -8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
      transition={{
        delay,
        duration: 0.7,
        type: "spring",
        stiffness: 120,
        damping: 14
      }}
      whileHover={{
        scale: 1.07,
        rotate: 2,
        boxShadow: "0 8px 32px 0 rgba(255,107,53,0.15), 0 1.5px 8px 0 rgba(46,134,171,0.10)",
        transition: { type: "spring", stiffness: 300 }
      }}
      className={cn(
        'relative group',
        className
      )}
    >
      <Link href={href}>
        {/* Card background with glassmorphism effect */}
        <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-orange-500/20 transition-shadow duration-300">
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            initial={{ opacity: 0.7, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 6,
              ease: "linear"
            }}
            style={{
              border: '3px solid',
              borderImage: 'linear-gradient(120deg, #FF6B35 0%, #2E86AB 100%) 1',
              boxShadow: '0 0 32px 0 rgba(255,107,53,0.10), 0 0 16px 0 rgba(46,134,171,0.08)'
            }}
          />

          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5" />

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />

          {/* Content */}
          <div className="relative z-20 p-6 space-y-4">
            {/* Icon container */}
            <motion.div
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center backdrop-blur-sm border border-white/30"
              whileHover={{
                scale: 1.18,
                rotate: [0, -10, 10, 0],
                boxShadow: "0 0 32px 8px #FF6B35, 0 0 16px 4px #2E86AB",
                transition: { duration: 0.5 }
              }}
              animate={{
                y: [0, -8, 0, 8, 0],
                boxShadow: ["0 0 0px #FF6B35", "0 0 16px #FF6B35", "0 0 0px #FF6B35"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-3xl" role="img" aria-label={title}>
                {icon}
              </span>
              {/* Icon glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Text content */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white font-heading tracking-tight drop-shadow-lg">
                {title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* Animated arrow indicator */}
            <motion.div
              className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                x: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
                boxShadow: ["0 0 0px #FF6B35", "0 0 12px #FF6B35", "0 0 0px #FF6B35"]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut"
              }}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                    animate={{
                      stroke: ["#FF6B35", "#2E86AB", "#FF6B35"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-gradient-to-br from-primary to-secondary rounded-full"
                style={{
                  top: `${15 + i * 20}%`,
                  left: `${10 + i * 22}%`,
                }}
                animate={{
                  y: [0, -18, 0, 18, 0],
                  x: [0, 8, 0, -8, 0],
                  opacity: [0.15, 0.7, 0.15],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}