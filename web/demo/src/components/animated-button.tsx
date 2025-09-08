"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  className?: string
}

export default function AnimatedButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary to-primary-dark btn-gradient text-white',
    secondary: 'bg-gradient-to-r from-secondary to-secondary-dark btn-gradient text-white',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10',
    ghost: 'bg-white/20 backdrop-blur-md text-white border border-white/30',
    glow: 'bg-primary text-white relative overflow-hidden isolation-auto'
  }
  
  const sizeStyles = {
    sm: 'text-xs py-2 px-3',
    md: 'text-sm py-2.5 px-5',
    lg: 'text-base py-3 px-6'
  }
  
  return (
    <Link href={href} passHref>
      <motion.div
        className={cn(
          'relative inline-flex items-center justify-center rounded-lg font-medium',
          'overflow-hidden cursor-pointer shadow-md',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.03,
          boxShadow: variant === 'primary' || variant === 'secondary' || variant === 'glow' 
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
            : undefined
        }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Ripple effect */}
        {isHovered && (
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ scale: 0, x: 0, y: 0, opacity: 0.5 }}
            animate={{ 
              scale: 2.5,
              opacity: 0
            }}
            transition={{ duration: 0.8 }}
            style={{ borderRadius: '100%' }}
          />
        )}
        
        {/* Special glow effect for glow variant */}
        {variant === 'glow' && (
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}
        
        {/* Content */}
        <span className="relative flex items-center gap-2">
          <span>{children}</span>
          
          {icon && (
            <motion.span
              animate={isHovered ? { x: 3 } : { x: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.span>
          )}
        </span>
      </motion.div>
    </Link>
  )
}
