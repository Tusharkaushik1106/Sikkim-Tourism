"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

export default function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(false);
  const [hidePopup, setHidePopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Show initial message after 3 seconds
    if (!hidePopup) {
      const timer = setTimeout(() => setShowInitialMessage(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [hidePopup]);

  // Show popup again after 3 minutes if closed
  useEffect(() => {
    if (hidePopup) {
      const timer = setTimeout(() => setHidePopup(false), 180000); // 3 minutes
      return () => clearTimeout(timer);
    }
  }, [hidePopup]);

  const handleSearch = () => {
    window.location.href = '/search?source=chatbot';
  };

  return (
    <>
      <AnimatePresence>
        {showInitialMessage && !isOpen && !hidePopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-xs z-[100]"
          >
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Need help? Try our <span className="font-bold text-orange-500">AI Powered Search</span>
              </p>
              <button
                onClick={() => { setShowInitialMessage(false); setHidePopup(true); }}
                className="ml-2 text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="mt-2 text-sm text-orange-500 hover:text-orange-600"
            >
              Ask me anything!
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-lg hover:shadow-orange-500/20 transition-all duration-300 z-[101]"
        style={{ pointerEvents: "auto" }}
      >
        <FiSearch className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full z-[102]"
            style={{ pointerEvents: "auto" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Welcome to <span className="text-orange-500">AI Powered Search!</span>
              </h3>
              <button
                onClick={() => { setIsOpen(false); setHidePopup(true); setShowInitialMessage(false); }}
                className="ml-2 text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I can help you find information about monasteries in Sikkim. Click below to start searching!
            </p>
            <button
              onClick={handleSearch}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            >
              Start Searching
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}