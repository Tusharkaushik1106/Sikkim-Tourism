import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng') || searchParams.get('lon')

    if (!lat || !lng) {
      return NextResponse.json({ error: 'Missing lat/lng' }, { status: 400 })
    }

    // Use OpenStreetMap Nominatim reverse geocoding (no API key required)
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Monastery360/1.0 (contact: support@monastery360.local)'
      },
      // Nominatim requires no aggressive rate use; this is a simple demo call
      cache: 'no-store'
    })

    if (!res.ok) {
      return NextResponse.json({ address: `Lat ${lat}, Lng ${lng}` })
    }

    const data = await res.json()
    const address: string = data?.display_name || `Lat ${lat}, Lng ${lng}`

    return NextResponse.json({ address })
  } catch (err) {
    return NextResponse.json({ error: 'Reverse geocoding failed' }, { status: 500 })
  }
}


