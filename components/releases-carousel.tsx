'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react'
import { featuredReleases, releases } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function ReleasesCarousel() {
  const trackRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const totalReleases = releases.length
  const featuredCount = featuredReleases.length

  // ✅ Отслеживаем активный слайд при скролле
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const updateActive = () => {
      const center = track.scrollLeft + track.clientWidth / 2
      let best = 0
      let bestDist = Infinity

      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement
        const elCenter = el.offsetLeft + el.offsetWidth / 2
        const dist = Math.abs(elCenter - center)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })

      setActive(best)
    }

    track.addEventListener('scroll', updateActive, { passive: true })
    return () => track.removeEventListener('scroll', updateActive)
  }, [])

  // ✅ Drag to scroll (мышкой)
  const handleMouseDown = (e: React.MouseEvent<HTMLUListElement>) => {
    const track = trackRef.current
    if (!track) return

    setIsDragging(true)
    setStartX(e.pageX - track.offsetLeft)
    setScrollLeft(track.scrollLeft)
    track.style.cursor = 'grabbing'
    track.style.userSelect = 'none'
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!isDragging) return
    const track = trackRef.current
    if (!track) return

    e.preventDefault()
    const x = e.pageX - track.offsetLeft
    const walk = (x - startX) * 1.5
    track.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    const track = trackRef.current
    if (track) {
      track.style.cursor = 'grab'
      track.style.userSelect = 'auto'
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      const track = trackRef.current
      if (track) {
        track.style.cursor = 'grab'
        track.style.userSelect = 'auto'
      }
    }
  }

  // ✅ Кнопки навигации
  const scrollToIndex = (index: number) => {
    const track = trackRef.current
    if (!track) return

    const clamped = Math.max(0, Math.min(index, featuredCount - 1))
    const card = track.children[clamped] as HTMLElement
    if (!card) return

    const trackRect = track.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const scrollOffset = cardRect.left - trackRect.left - (trackRect.width / 2) + (cardRect.width / 2)

    track.scrollBy({
      left: scrollOffset,
      behavior: 'smooth'
    })
  }

  return (
    <section id="releases" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading index="01 / РЕЛИЗЫ" title="Дискография" />
        </Reveal>

        <Reveal delay={80}>
          <div className="mb-6 flex items-center justify-between">
            <p className="max-w-md font-mono text-sm text-muted-foreground">
              Тяни за карточку или используй стрелки
            </p>
            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollToIndex(active - 1)}
                disabled={active === 0}
                className={cn(
                  'flex h-11 w-11 items-center justify-center border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors',
                  active === 0 && 'opacity-40 cursor-not-allowed'
                )}
                aria-label="Предыдущий релиз"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(active + 1)}
                disabled={active === featuredCount - 1}
                className={cn(
                  'flex h-11 w-11 items-center justify-center border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors',
                  active === featuredCount - 1 && 'opacity-40 cursor-not-allowed'
                )}
                aria-label="Следующий релиз"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* track с drag-to-scroll */}
      <ul
        ref={trackRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:gap-6"
        style={{ 
          scrollbarWidth: 'none',
          cursor: 'grab',
          scrollBehavior: 'smooth',
          paddingLeft: 'calc(50vw - 180px)',
          paddingRight: 'calc(50vw - 180px)',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {featuredReleases.map((r, i) => (
          <li
            key={`${r.title}-${i}`}
            className={cn(
              'group relative w-[78vw] flex-none snap-center sm:w-[58vw] md:w-[360px] pointer-events-none',
              'transition-all duration-500',
              active === i ? 'opacity-100' : 'opacity-50 md:scale-95',
            )}
          >
            <div className="relative aspect-square overflow-hidden border border-border bg-card pointer-events-auto">
              <Image
                src={r.cover || '/placeholder.svg'}
                alt={`Обложка релиза «${r.title}»`}
                fill
                sizes="(max-width: 768px) 78vw, 360px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

              <span className="absolute left-3 top-3 border border-primary/60 bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur-sm">
                {r.type}
              </span>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <div>
                  <h3 className="heading text-2xl font-bold leading-none">
                    {r.title}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {r.year}
                  </span>
                </div>
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Слушать «${r.title}»`}
                  className="flex h-12 w-12 flex-none items-center justify-center border border-primary bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                >
                  <Play className="h-5 w-5 fill-current" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </li>
        ))}

        {/* ✅ Кнопка "Все релизы" в конце карусели */}
        <li className="flex-none w-[78vw] sm:w-[58vw] md:w-[360px] snap-center pointer-events-none">
          <Link
            href="/discography"
            className="group relative flex h-full w-full flex-col items-center justify-center border border-border bg-card/50 p-8 text-center pointer-events-auto transition-all hover:border-primary hover:bg-primary/5"
          >
            <span className="text-6xl font-bold text-primary/30 transition-colors group-hover:text-primary/60">
              {totalReleases}
            </span>
            <p className="mt-4 font-mono text-sm uppercase tracking-widest text-foreground/60 transition-colors group-hover:text-foreground">
              Все релизы
            </p>
            <ArrowRight className="mt-4 h-8 w-8 text-primary/30 transition-all group-hover:translate-x-1 group-hover:text-primary/60" />
            <span className="absolute bottom-3 right-3 font-mono text-[10px] text-muted-foreground/30">
              посмотреть все →
            </span>
          </Link>
        </li>
      </ul>

      {/* dots — показываем только для карусели + кнопка "все" */}
      <div className="mx-auto mt-6 flex max-w-6xl items-center justify-center gap-2 px-4 md:px-6">
        {featuredReleases.map((r, i) => (
          <button
            key={`dot-${i}`}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Перейти к «${r.title}»`}
            className={cn(
              'h-1.5 transition-all duration-300 cursor-pointer',
              active === i ? 'w-8 bg-primary' : 'w-3 bg-muted-foreground/40',
              'hover:bg-primary/70'
            )}
          />
        ))}
        {/* Дополнительная точка для кнопки "Все релизы" */}
        <div
          className={cn(
            'h-1.5 w-3 transition-all duration-300',
            active === featuredCount ? 'w-8 bg-primary' : 'w-3 bg-muted-foreground/40'
          )}
        />
      </div>
    </section>
  )
}