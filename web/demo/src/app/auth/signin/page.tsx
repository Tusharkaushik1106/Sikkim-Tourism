'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Monastery360°</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to explore virtual monastery tours</p>
        </div>

        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
          />
          <span>Continue with Google</span>
        </button>
      </motion.div>
    </div>
  );
}