'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, Home, MapPin, Calendar, Archive, Info, Settings } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { 
      name: 'Home', 
      href: '/', 
      icon: Home,
      bgColor: 'bg-orange-600 hover:bg-orange-700'
    },
    { 
      name: 'Virtual Tours', 
      href: '/virtual-tours', 
      icon: MapPin,
      bgColor: 'bg-gray-600 hover:bg-gray-700'
    },
    { 
      name: 'Interactive Map', 
      href: '/map', 
      icon: MapPin,
      bgColor: 'bg-gray-600 hover:bg-gray-700'
    },
    { 
      name: 'Digital Archives', 
      href: '/archives', 
      icon: Archive,
      bgColor: 'bg-gray-600 hover:bg-gray-700'
    },
    { 
      name: 'Cultural Calendar', 
      href: '/calendar', 
      icon: Calendar,
      bgColor: 'bg-gray-600 hover:bg-gray-700'
    },
    { 
      name: 'About', 
      href: '/about', 
      icon: Info,
      bgColor: 'bg-gray-600 hover:bg-gray-700'
    }
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-800/95 backdrop-blur-md border-b border-slate-700/50">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
              <Image 
                src="/images/ashoka-emblem.png" 
                alt="Government of India" 
                width={32} 
                height={32}
                className="w-8 h-8"
              />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold text-orange-400">Monastery360</h1>
              <p className="text-sm text-slate-300">Ministry of Tourism, Government of India</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 ${
                      index === 0 ? item.bgColor : item.bgColor
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center space-x-2 text-white">
              <Settings className="w-5 h-5" />
              <span className="text-sm">Buddhist Prayer Wheel</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-slate-700"
          >
            <div className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-slate-700 transition-colors">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                )
              })}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center space-x-2 text-white">
                  <Settings className="w-5 h-5" />
                  <span className="text-sm">Buddhist Prayer Wheel</span>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}