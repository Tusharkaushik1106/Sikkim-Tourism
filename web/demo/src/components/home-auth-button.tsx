'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HomeAuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
    );
  }

  if (session?.user) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-4 p-2 rounded-xl bg-white/10 backdrop-blur-sm"
      >
        {session.user.image && (
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm text-white/90">{session.user.name}</span>
          <button
            onClick={() => signOut()}
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => signIn('google')}
      className="px-6 py-3 rounded-lg bg-white text-gray-900 hover:bg-white/90 transition-colors"
    >
      Get Started
    </motion.button>
  );
}