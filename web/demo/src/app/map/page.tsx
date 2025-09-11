export default function MapPage() {
  return (
    <main className="min-h-screen pt-20">
      <iframe
        src="/map-embed.html?v=2"
        title="Interactive Map"
        className="w-full"
        style={{ height: 'calc(100vh - 80px)', border: 'none' }}
      />
    </main>
  )
}


