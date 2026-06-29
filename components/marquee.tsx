'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const WORDS = [
  '#PDVLFIRMA',
  'ГОЛОС ИЗ ПОДВАЛА',
  'КАЛИНИНГРАД 39',
  'БОЖЕ',
  'ХРАНИ',
  'АНДЕГРАУНД',
]

interface MarqueeProps {
  speed?: number
  className?: string
}

export function Marquee({ speed = 0.5, className = '' }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [currentSpeed] = useState(speed)
  const positionRef = useRef(0)
  const lastTimestampRef = useRef(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const track = trackRef.current
    if (!track) return

    // Тройное дублирование для бесконечности
    const content = track.innerHTML
    track.innerHTML = content + content + content

    let animationId: number

    const animate = (timestamp: number) => {
      const firstChild = track.children[0] as HTMLElement
      if (!firstChild) {
        animationId = requestAnimationFrame(animate)
        return
      }

      const singleSetWidth = track.scrollWidth / 3

      // Плавный сброс позиции
      if (Math.abs(positionRef.current) >= singleSetWidth) {
        positionRef.current += singleSetWidth
        positionRef.current += 0.5
      }

      // Движение
      if (lastTimestampRef.current === 0) {
        lastTimestampRef.current = timestamp
      }
      const delta = timestamp - lastTimestampRef.current
      lastTimestampRef.current = timestamp

      positionRef.current -= currentSpeed * (delta / 16)

      track.style.transform = `translateX(${positionRef.current}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isClient, currentSpeed])

  // Адаптация под ресайз
  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      const track = trackRef.current
      if (!track) return
      track.style.transform = 'translateX(0)'
      positionRef.current = 0
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient])

  return (
    <div
      className={`border-y border-border bg-primary py-3 text-primary-foreground overflow-hidden select-none ${className}`}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{
          width: 'max-content',
        }}
      >
        {WORDS.map((w, i) => (
          <span
            key={i}
            className="heading mx-6 text-lg font-bold uppercase tracking-tight md:text-2xl flex-shrink-0"
          >
            {w}
            <span className="mx-6 opacity-50">✶</span>
          </span>
        ))}
      </div>
    </div>
  )
}