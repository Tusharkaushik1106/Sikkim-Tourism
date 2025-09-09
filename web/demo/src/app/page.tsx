import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import FeatureSection from '@/components/feature-section'
import StatsSection from '@/components/stats-section'
import TestimonialsSection from '@/components/testimonials-section'
import CtaSection from '@/components/cta-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <div className="pt-0">
        <HeroSection />
        <FeatureSection />
        <StatsSection />
        <TestimonialsSection />
        <CtaSection />
      </div>

      <Footer />
    </main>
  )
}
