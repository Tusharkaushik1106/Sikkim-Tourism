"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  delay?: number
  className?: string
}

export default function FeatureCard({
  title,
  description,
  icon,
  delay = 0,
  className
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 30 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ 
        delay, 
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { type: "spring", stiffness: 300 }
      }}
      className={cn(
        'relative group',
        className
      )}
    >
      {/* Card background with glassmorphism effect */}
      <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5" />
        
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 space-y-4">
          {/* Icon container */}
          <motion.div
            className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center backdrop-blur-sm border border-white/30"
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 }
            }}
          >
            <span className="text-3xl" role="img" aria-label={title}>
              {icon}
            </span>
            
            {/* Icon glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
          </motion.div>

          {/* Text content */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white font-heading tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* Animated arrow indicator */}
          <motion.div 
            className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
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
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(45deg, rgba(255, 107, 53, 0.3), rgba(46, 134, 171, 0.3)) border-box',
            mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            maskComposite: 'subtract'
          }}
        />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                top: `${20 + i * 30}%`,
                left: `${10 + i * 25}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}