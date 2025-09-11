export default function MapPage() {
  return (
    <main className="min-h-screen">
      <iframe
        src="/map-embed.html?v=2"
        title="Interactive Map"
        className="w-full h-screen"
        style={{ border: 'none' }}
      />
    </main>
  )
}