import React from 'react'
import Calendar from '../../components/calendar/calendar'
import Header from '../../components/header'
import '../globals.css'

export const metadata = {
  title: 'Sikkim Cultural Calendar',
  description: 'Browse festivals and cultural events across Sikkim.'
}

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Header />
      <main className="pt-28 pb-12 px-4">
        <section className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Cultural Calendar
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Discover the rich tapestry of Sikkim's festivals, religious ceremonies, cultural celebrations, and holidays throughout the year. Experience the vibrant traditions that make Sikkim truly unique.
            </p>
          </div>
          <Calendar />
        </section>
      </main>
    </div>
  )
}
