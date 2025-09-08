"use client"

import Header from '@/components/header'
import Footer from '@/components/footer'

export default function RankaTourPage() {
  // Street View-only embed for Lingdum (Ranka) Monastery
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const rankaEmbed = `https://www.google.com/maps/embed/v1/streetview?key=${key}&location=27.3202,88.6700&heading=60&pitch=5&fov=80`

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <div className="container-custom pt-28 pb-16">
        <h1 className="font-heading text-3xl font-bold">Ranka (Lingdum) Monastery 360°</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Interactive 360° Street View experience powered by Google.</p>
        <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <iframe
            src={rankaEmbed}
            width="100%"
            height="540"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
      <Footer />
    </main>
  )
}


