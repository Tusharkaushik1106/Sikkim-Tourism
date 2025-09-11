'use client'

import { useMemo, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

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
  const [rideDate, setRideDate] = useState(() => new Date())
  const [rideTime, setRideTime] = useState(() => {
    const d = new Date()
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  })

  // Autofill pickup with user's current location (when allowed) and
  // dropoff from the destination selected on the map (query params).
  // Also reverse-geocode both using our /api/geocode endpoint.
  if (typeof window !== 'undefined') {
    // no-op to satisfy types for navigator usage below
  }

  useEffect(() => {
    // Fill dropoff from query params first
    (async () => {
      if (!dropoff && initial.destLat && initial.destLng) {
        try {
          const res = await fetch(`/api/geocode?lat=${initial.destLat}&lng=${initial.destLng}`)
          const data = res.ok ? await res.json() : null
          setDropoff(data?.address || 'Selected destination')
        } catch {
          setDropoff('Selected destination')
        }
      }
    })()

    // Pickup: prefer query params if present; else use geolocation
    ;(async () => {
      if (!pickup) {
        if (initial.pickupLat && initial.pickupLng) {
          try {
            const res = await fetch(`/api/geocode?lat=${initial.pickupLat}&lng=${initial.pickupLng}`)
            const data = res.ok ? await res.json() : null
            setPickup(data?.address || 'Current location')
            return
          } catch {
            setPickup('Current location')
            return
          }
        }
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords
            try {
              const res = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`)
              const data = res.ok ? await res.json() : null
              setPickup(data?.address || 'Current location')
            } catch {
              setPickup('Current location')
            }
          })
        }
      }
    })()
  }, [initial.destLat, initial.destLng, initial.pickupLat, initial.pickupLng, pickup, dropoff])

  const numericFare = initial.fare ? Number(initial.fare) : (Number(initial.distanceKm || 0) * 25 || 299)
  const fareDisplay = numericFare ? `₹${numericFare}` : '—'

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
      <div className="max-w-5xl mx-auto">
        {/* Header banner, similar to event page */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white p-8 mb-8">
          <a href="/map" className="inline-flex items-center text-white/80 hover:text-white text-sm">← Back to map</a>
          <div className="mt-4">
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/15 backdrop-blur">Transport</span>
            <h1 className="mt-3 text-4xl font-extrabold">Ride Booking</h1>
            <p className="mt-2 text-white/85 max-w-3xl">Book a comfortable local ride between your selected pickup and drop-off points. Transparent pricing, quick confirmation.</p>
          </div>
        </div>

        {/* Two-column details + price card */}
        {step === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Details */}
            <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold mb-4">Ride Details</h2>
              <div className="space-y-5">
                {/* Pickup styled field */}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Pickup location</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">•</span>
                    <input
                      value={pickup}
                      onChange={e => setPickup(e.target.value)}
                      placeholder="Pickup location"
                      className="w-full pl-7 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">➤</span>
                  </div>
                </div>
                {/* Dropoff styled field */}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Dropoff location</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs">■</span>
                    <input
                      value={dropoff}
                      onChange={e => setDropoff(e.target.value)}
                      placeholder="Dropoff location"
                      className="w-full pl-7 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                </div>
                {/* Date and time row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Date</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">📅</span>
                      <input
                        type="date"
                        value={`${rideDate.getFullYear()}-${String(rideDate.getMonth()+1).padStart(2,'0')}-${String(rideDate.getDate()).padStart(2,'0')}`}
                        onChange={(e) => {
                          const [y,m,d] = e.target.value.split('-').map(Number)
                          const newDate = new Date(rideDate)
                          newDate.setFullYear(y)
                          newDate.setMonth((m||1)-1)
                          newDate.setDate(d||1)
                          setRideDate(newDate)
                        }}
                        className="w-full pl-9 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Time</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">🕒</span>
                      <input
                        type="time"
                        value={rideTime}
                        onChange={(e) => setRideTime(e.target.value)}
                        className="w-full pl-9 pr-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2">▾</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-xs text-gray-500">Distance</div>
                    <div className="font-semibold">{initial.distanceKm || '—'} km</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-xs text-gray-500">Est. Time</div>
                    <div className="font-semibold">{initial.timeMin || '—'} min</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-xs text-gray-500">Vehicle</div>
                    <div className="font-semibold">Sedan / Hatchback</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-xs text-gray-500">Availability</div>
                    <div className="font-semibold">Drivers nearby</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Notes (optional)</div>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" rows={3} />
                </div>
              </div>
            </div>

            {/* Price card */}
            <form onSubmit={handleContinue} className="md:col-span-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-3xl font-extrabold text-green-600">{fareDisplay}</div>
              <div className="text-xs text-gray-500 mb-4">estimated fare</div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                  <div className="text-xs text-gray-500">Difficulty</div>
                  <div className="font-medium">Easy</div>
                </div>
                <div className="p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                  <div className="text-xs text-gray-500">Passengers</div>
                  <div className="font-medium">1–4</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-gray-500">Your name</div>
                <input value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                <div className="text-xs text-gray-500">Phone</div>
                <input value={phone} onChange={e => setPhone(e.target.value)} required className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              </div>
              <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold">Book Now</button>
              <div className="mt-3 text-xs text-gray-500">No charge now. Pay securely on next step.</div>
            </form>
          </div>
        )}

        {step === 'payment' && (
          <form onSubmit={handlePay} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Payment</h2>
              <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Secure • 256-bit</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: Methods and inputs */}
              <div className="md:col-span-2">
                <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
                  <button type="button" onClick={() => setMethod('card')} className={`px-4 py-2 text-sm ${method === 'card' ? 'bg-orange-600 text-white' : 'bg-transparent text-gray-700 dark:text-gray-200'}`}>💳 Card</button>
                  <button type="button" onClick={() => setMethod('upi')} className={`px-4 py-2 text-sm border-l border-gray-200 dark:border-gray-700 ${method === 'upi' ? 'bg-orange-600 text-white' : 'bg-transparent text-gray-700 dark:text-gray-200'}`}>🏦 UPI</button>
                  <button type="button" onClick={() => setMethod('cod')} className={`px-4 py-2 text-sm border-l border-gray-200 dark:border-gray-700 ${method === 'cod' ? 'bg-orange-600 text-white' : 'bg-transparent text-gray-700 dark:text-gray-200'}`}>💵 Cash</button>
                </div>

                {method === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1">Card number</label>
                      <input required inputMode="numeric" placeholder="4242 4242 4242 4242" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
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
                    <div className="text-xs text-gray-500">We do not store your card details. Payments are processed securely.</div>
                  </div>
                )}

                {method === 'upi' && (
                  <div className="space-y-2">
                    <label className="block text-sm">UPI ID</label>
                    <input required placeholder="name@bank" pattern="[^@\s]+@[^@\s]+" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                    <div className="text-xs text-gray-500">You will receive a collect request in your UPI app.</div>
                  </div>
                )}

                {method === 'cod' && (
                  <div className="text-sm text-gray-600 dark:text-gray-300">Pay cash to the driver at pickup. Exact change appreciated.</div>
                )}

                <div className="mt-6 flex items-center gap-3">
                  <button type="button" onClick={() => setStep('details')} className="text-sm text-gray-600 hover:underline">← Back to details</button>
                  <button type="submit" className="ml-auto inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold">
                    <span>🔒 Pay</span>
                    <span>{fareDisplay}</span>
                  </button>
                </div>
              </div>

              {/* Right: Summary */}
              <div className="md:col-span-1">
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="font-semibold mb-2">Fare Summary</div>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between"><span>Base fare</span><span>₹99</span></div>
                    <div className="flex justify-between"><span>Distance ({initial.distanceKm || '—'} km)</span><span>₹{Math.max(0, Number(initial.distanceKm||0)*25).toFixed(0)}</span></div>
                    <div className="flex justify-between"><span>Time ({initial.timeMin || '—'} min)</span><span>₹{Math.max(0, Number(initial.timeMin||0)*1).toFixed(0)}</span></div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-semibold"><span>Total</span><span>{fareDisplay}</span></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-3">Taxes included where applicable. Cancellation free within 5 minutes.</div>
              </div>
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


