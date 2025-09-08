import Link from 'next/link'
import Image from 'next/image'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Logo and About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/national-emblem.png"
                alt="National Emblem of India"
                width={40}
                height={40}
                className="national-emblem"
              />
              <span className="font-heading text-lg font-bold">Monastery360</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              A digital heritage platform showcasing the cultural treasures of Sikkim's monasteries.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <FiFacebook />
              </a>
              <a href="https://twitter.com" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <FiTwitter />
              </a>
              <a href="https://instagram.com" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <FiInstagram />
              </a>
              <a href="https://youtube.com" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/virtual-tours" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Virtual Tours
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link href="/archives" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Digital Archives
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Cultural Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  About the Project
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-2 text-primary" />
                <span className="text-gray-600 dark:text-gray-400">
                  Ministry of Tourism<br />
                  Transport Bhawan, 1 Parliament Street<br />
                  New Delhi, 110001
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2 text-primary" />
                <span className="text-gray-600 dark:text-gray-400">+91 11 2371 1995</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2 text-primary" />
                <a href="mailto:info@monastery360.gov.in" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  info@monastery360.gov.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400">
              © {currentYear} Monastery360. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Image 
              src="/images/g20-logo.png" 
              alt="G20 Logo" 
              width={40} 
              height={40} 
              className="h-10 w-auto"
            />
            <Image 
              src="/images/digital-india-logo.png" 
              alt="Digital India Logo" 
              width={40} 
              height={40} 
              className="h-10 w-auto"
            />
            <Image 
              src="/images/incredible-india-logo.png" 
              alt="Incredible India Logo" 
              width={40} 
              height={40}
              className="h-10 w-auto" 
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
