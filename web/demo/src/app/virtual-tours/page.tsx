"use client"

import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function VirtualToursPage() {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <div className="container-custom pt-28 pb-16">
        <h1 className="font-heading text-3xl font-bold">360° Virtual Tours</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Choose a monastery to explore in 360° on Google Maps.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/virtual-tours/rumtek" className="block rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
            <h2 className="font-heading text-xl font-semibold">Rumtek Monastery</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Open the 360° experience for Rumtek Monastery.</p>
          </Link>
          <Link href="/virtual-tours/ranka" className="block rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
            <h2 className="font-heading text-xl font-semibold">Ranka (Lingdum) Monastery</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Open the 360° experience for Ranka Monastery.</p>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}


