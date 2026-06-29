import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Marquee } from '@/components/marquee'
import { ReleasesCarousel } from '@/components/releases-carousel'
import { Biography } from '@/components/biography'
import { LyricsSection } from '@/components/lyrics-section'
import { TourSection } from '@/components/tour-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="scanlines relative min-h-screen bg-background">
      {/* grain / noise overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <SiteNav />

      <main>
        <Hero />
        <Marquee />
        <ReleasesCarousel />
        <Biography />
        <LyricsSection />
        <TourSection />
      </main>

      <SiteFooter />
    </div>
  )
}
