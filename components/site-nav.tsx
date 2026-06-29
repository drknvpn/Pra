'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#releases', label: 'Релизы' },
  { href: '#bio', label: 'Биография' },
  { href: '#lyrics', label: 'Тексты' },
  { href: '#tour', label: 'Тур' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a
          href="#top"
          className="flex items-center gap-2"
          aria-label="Pra(Killa`Gramm) — наверх"
        >
          <Image
  src="/images/pdvl-logo.png"
  alt="PDVL FIRMA"
  width={100}
  height={100}
  style={{ height: '50px', width: 'auto' }}  // ← принудительно 80px
  className="opacity-90 invert"
  priority
/>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Меню"
          aria-expanded={open}
        >
          <span
            className={cn(
              'h-0.5 w-6 bg-foreground transition-transform',
              open && 'translate-y-2 rotate-45',
            )}
          />
          <span
            className={cn(
              'h-0.5 w-6 bg-foreground transition-opacity',
              open && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'h-0.5 w-6 bg-foreground transition-transform',
              open && '-translate-y-2 -rotate-45',
            )}
          />
        </button>
      </nav>

      {/* mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-border bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden',
          open ? 'max-h-72 border-b' : 'max-h-0',
        )}
      >
        <div className="flex flex-col px-4 py-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
