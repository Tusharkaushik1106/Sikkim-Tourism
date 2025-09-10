'use client'

import { useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import BookRideForm from '@/components/book-ride-form'

export default function BookRidePage() {
  const params = useSearchParams()
  const router = useRouter()

  const initial = useMemo(() => ({
    pickupLat: params.get('pickupLat') || '',
    pickupLng: params.get('pickupLng') || '',
    destLat: params.get('destLat') || '',
    destLng: params.get('destLng') || '',
    distanceKm: params.get('distanceKm') || '',
    timeMin: params.get('timeMin') || '',
    fare: params.get('fare') || '',
  }), [params])

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [notes, setNotes] = useState('')
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details')
  const [method, setMethod] = useState<'card' | 'upi' | 'cod'>('card')

  const fareDisplay = initial.fare ? `₹${initial.fare}` : '—'

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo-only: simulate payment
    setTimeout(() => setStep('success'), 600)
  }

  return (
    <main className="min-h-screen pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Book your ride</h1>
        <p className="text-sm text-gray-500 mb-6">Distance: {initial.distanceKm || '—'} km • Time: {initial.timeMin || '—'} min • Fare: <span className="font-semibold">{fareDisplay}</span></p>

        <BookRideForm />

        {step === 'details' && (
          <form onSubmit={handleContinue} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Your name</label>
                <input value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} required className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Pickup location</label>
                <input value={pickup} onChange={e => setPickup(e.target.value)} placeholder={`Lat ${initial.pickupLat}, Lng ${initial.pickupLng}`} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              </div>
              <div>
                <label className="block text-sm mb-1">Drop-off location</label>
                <input value={dropoff} onChange={e => setDropoff(e.target.value)} placeholder={`Lat ${initial.destLat}, Lng ${initial.destLng}`} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Notes (optional)</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" rows={3} />
            </div>
            <div className="flex items-center justify-between pt-2">
              <a href="/map" className="text-sm text-gray-600 hover:underline">← Back to map</a>
              <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-md font-semibold">Continue to payment</button>
            </div>
          </form>
        )}

        {step === 'payment' && (
          <form onSubmit={handlePay} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold">Payment</h2>
            <div className="flex gap-3">
              <button type="button" onClick={() => setMethod('card')} className={`px-3 py-2 rounded-md border ${method === 'card' ? 'bg-orange-600 text-white border-orange-700' : 'border-gray-300 dark:border-gray-700'}`}>Card</button>
              <button type="button" onClick={() => setMethod('upi')} className={`px-3 py-2 rounded-md border ${method === 'upi' ? 'bg-orange-600 text-white border-orange-700' : 'border-gray-300 dark:border-gray-700'}`}>UPI</button>
              <button type="button" onClick={() => setMethod('cod')} className={`px-3 py-2 rounded-md border ${method === 'cod' ? 'bg-orange-600 text-white border-orange-700' : 'border-gray-300 dark:border-gray-700'}`}>Cash</button>
            </div>
            {method === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Card number</label>
                  <input required placeholder="4242 4242 4242 4242" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Expiry</label>
                    <input required placeholder="MM/YY" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">CVC</label>
                    <input required placeholder="123" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                  </div>
                </div>
              </div>
            )}
            {method === 'upi' && (
              <div>
                <label className="block text-sm mb-1">UPI ID</label>
                <input required placeholder="name@bank" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              </div>
            )}
            {method === 'cod' && (
              <div className="text-sm text-gray-600 dark:text-gray-300">Pay cash to driver at pickup.</div>
            )}
            <div className="flex items-center justify-between pt-2">
              <button type="button" onClick={() => setStep('details')} className="text-sm text-gray-600 hover:underline">← Back to details</button>
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold">Pay {fareDisplay}</button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2">Payment successful</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Your ride is booked. You will receive driver details via SMS (demo).</p>
            <div className="flex gap-3">
              <a href="/map" className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700">Back to map</a>
              <button onClick={() => router.push('/bookings')} className="px-4 py-2 rounded-md bg-orange-600 text-white">View bookings</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}


