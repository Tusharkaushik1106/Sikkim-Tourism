"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LordIconButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  className?: string
}

export default function LordIconButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
}: LordIconButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [lordIconLoaded, setLordIconLoaded] = useState(false)

  // Load lord-icon script dynamically
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.lordicon.com/lordicon.js'
    script.async = true
    script.onload = () => setLordIconLoaded(true)
    document.head.appendChild(script)

    return () => {
      // Cleanup script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary to-orange-600 text-white hover:shadow-2xl hover:shadow-primary/25 border-0',
    secondary: 'bg-gradient-to-r from-secondary to-blue-600 text-white hover:shadow-2xl hover:shadow-secondary/25 border-0',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-lg',
    ghost: 'bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 hover:shadow-lg'
  }
  
  const sizeStyles = {
    sm: 'text-sm py-2.5 px-4 rounded-lg',
    md: 'text-base py-3 px-6 rounded-xl',
    lg: 'text-lg py-4 px-8 rounded-xl'
  }

  const iconSizes = {
    sm: '24',
    md: '28',
    lg: '32'
  }

  return (
    <Link href={href}>
      <motion.button
        className={cn(
          'relative inline-flex items-center justify-center gap-3 font-semibold transition-all duration-300 overflow-hidden group',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50',
          'transform hover:scale-105 active:scale-95',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          y: -2,
          transition: { type: "spring", stiffness: 300, damping: 10 } 
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.8 }}
        />

        {/* Ripple effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-xl"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {/* Lord Icon */}
        {icon && lordIconLoaded && (
          <motion.div
            animate={isHovered ? { rotate: [0, 10, -10, 0] } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <lord-icon
              src={icon}
              trigger="hover"
              colors="primary:currentColor,secondary:currentColor"
              style={{ 
                width: `${iconSizes[size]}px`, 
                height: `${iconSizes[size]}px`,
                filter: variant === 'outline' ? 'none' : 'brightness(0) invert(1)'
              }}
            />
          </motion.div>
        )}

        {/* Button text */}
        <span className="relative z-10 font-medium tracking-wide">
          {children}
        </span>

        {/* Glow effect for primary and secondary variants */}
        {(variant === 'primary' || variant === 'secondary') && (
          <motion.div
            className={cn(
              'absolute -inset-1 rounded-xl blur-lg opacity-0 transition-opacity duration-300',
              variant === 'primary' ? 'bg-primary/30' : 'bg-secondary/30'
            )}
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
        )}
      </motion.button>
    </Link>
  )
}

// Type declaration for lord-icon web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lord-icon': {
        src?: string
        trigger?: string
        colors?: string
        style?: React.CSSProperties
      }
    }
  }
}