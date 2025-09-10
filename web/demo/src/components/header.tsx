"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'
import { FiMenu, FiX, FiMapPin, FiBookOpen, FiCalendar, FiInfo, FiHome, FiCamera } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import RotatingPrayerWheel from './rotating-prayer-wheel'

const navigation = [
  { name: 'Home', href: '/', icon: <FiHome className="h-4 w-4" /> },
  { name: 'Virtual Tours', href: '/virtual-tours', icon: <FiCamera className="h-4 w-4" /> },
  { name: 'Interactive Map', href: '/map', icon: <FiMapPin className="h-4 w-4" /> },
  { name: 'Digital Archives', href: '/archive', icon: <FiBookOpen className="h-4 w-4" /> },
  { name: 'Cultural Calendar', href: '/calendar', icon: <FiCalendar className="h-4 w-4" /> },
  { name: 'About', href: '/about', icon: <FiInfo className="h-4 w-4" /> },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <header className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        'theme-aware-element',
        isScrolled 
          ? 'py-2 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 shadow-lg shadow-black/5 dark:shadow-white/5' 
          : 'py-4 bg-transparent'
      )}>
        <div className="container-custom relative">
          {/* Background decorative elements */}
          {isScrolled && (
            <>
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
            </>
          )}
          
          <nav className="flex items-center justify-between">
            {/* Left side - Logo and brand */}
            <motion.div 
              className="flex items-center space-x-4 z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative">
                  <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                    alt="National Emblem of India" 
                    width={isScrolled ? 50 : 60} 
                    height={isScrolled ? 50 : 60}
                    className="transition-all duration-300 group-hover:scale-110"
                    priority
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -inset-1 rounded-full bg-primary/10 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                
                <div className="flex flex-col">
                  <motion.span 
                    layout
                    className={cn(
                      "font-heading font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary transition-all duration-300",
                      isScrolled ? "text-lg" : "text-xl"
                    )}
                  >
                    Monastery360
                  </motion.span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Ministry of Tourism, Government of India
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Right side - Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 z-10">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link 
                      href={item.href}
                      className={cn(
                        "relative px-3 py-2 text-sm font-medium rounded-md flex items-center gap-1.5 transition-colors group",
                        isActive ? "text-primary" : "hover:text-primary"
                      )}
                    >
                      <span className={cn(
                        "absolute inset-0 rounded-md -z-10",
                        isActive 
                          ? "bg-primary/10 dark:bg-primary/20" 
                          : "bg-transparent group-hover:bg-gray-100/80 dark:group-hover:bg-gray-800/50 transition-colors"
                      )}/>
                      
                      {item.icon}
                      {item.name}
                      
                      {isActive && (
                        <motion.span 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          layoutId="navbar-underline"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
              
              <div className="flex items-center pl-2 space-x-3 border-l border-gray-200 dark:border-gray-700 ml-3">
                <ThemeToggleButton />
                <RotatingPrayerWheel size="sm" className="hidden lg:block" />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2 z-10">
              <ThemeToggleButton />
              <motion.button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiX className="h-6 w-6" aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu className="h-6 w-6" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 overflow-hidden"
            >
              <motion.div 
                className="space-y-1 px-4 py-5"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  
                  return (
                    <motion.div
                      key={item.name}
                      variants={{
                        open: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            y: { stiffness: 1000, velocity: -100 }
                          }
                        },
                        closed: {
                          y: 20,
                          opacity: 0,
                          transition: {
                            y: { stiffness: 1000 }
                          }
                        }
                      }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg transition-colors",
                          isActive 
                            ? "bg-primary/10 text-primary dark:bg-primary/20" 
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className={cn(
                          "p-1.5 rounded-md",
                          isActive 
                            ? "bg-primary/20 text-primary dark:bg-primary/30" 
                            : "bg-gray-100 dark:bg-gray-800"
                        )}>
                          {item.icon}
                        </span>
                        {item.name}
                        
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active-indicator"
                            className="ml-auto h-2 w-2 rounded-full bg-primary"
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
                
                <motion.div
                  variants={{
                    open: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        y: { stiffness: 1000, velocity: -100 }
                      }
                    },
                    closed: {
                      y: 20,
                      opacity: 0,
                      transition: {
                        y: { stiffness: 1000 }
                      }
                    }
                  }}
                  className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-center">
                    <RotatingPrayerWheel size="md" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  )
}

// Enhanced theme toggle button with animations
function ThemeToggleButton() {
  return (
    <div className="relative">
      <ThemeToggle />
      <motion.span
        className="absolute -bottom-1 -right-1 flex h-3 w-3"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.2, 1] }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 5 }}
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
      </motion.span>
    </div>
  )
}
