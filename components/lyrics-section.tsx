'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, X } from 'lucide-react'
import { lyrics, type Lyric } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

// ✅ Показываем только последние 6 текстов на главной
const FEATURED_LYRICS = lyrics.slice(0, 6)

export function LyricsSection() {
    const [open, setOpen] = useState<Lyric | null>(null)

    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(null)
        }
        document.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [open])

    return (
        <section id="lyrics" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
                <Reveal>
                    <SectionHeading index="03 / ТЕКСТЫ" title="Тексты" />
                </Reveal>

                <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
                    {FEATURED_LYRICS.map((track, i) => (
                        <Reveal as="li" key={track.id} delay={i * 60}>
                            <button
                                type="button"
                                onClick={() => setOpen(track)}
                                className="group flex w-full items-center justify-between gap-4 bg-card p-5 text-left transition-colors hover:bg-primary md:p-6"
                            >
                                <div className="min-w-0">
                                    <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                                        {String(i + 1).padStart(2, '0')} · {track.year}
                                    </span>
                                    <h3 className="heading truncate text-2xl font-bold text-foreground transition-colors group-hover:text-primary-foreground md:text-3xl">
                                        {track.title}
                                    </h3>
                                </div>
                                <ArrowUpRight className="h-6 w-6 flex-none text-primary transition-all duration-300 group-hover:rotate-45 group-hover:text-primary-foreground" />
                            </button>
                        </Reveal>
                    ))}
                </ul>

                {/* ✅ Кнопка "Все тексты" */}
                <Reveal delay={120}>
                    <div className="mt-8 flex justify-center">
                        <Link
                            href="/lyrics"
                            className="group inline-flex items-center gap-3 border border-border bg-card px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            <span>Все тексты ({lyrics.length})</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </Reveal>
            </div>

            {/* MODAL */}
            {open && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Текст песни ${open.title}`}
                    className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-4"
                >
                    {/* backdrop */}
                    <button
                        type="button"
                        aria-label="Закрыть"
                        onClick={() => setOpen(null)}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    />

                    <div className="relative z-10 flex max-h-[88svh] w-full max-w-2xl flex-col border border-border bg-card shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-300">
                        {/* header */}
                        <div className="flex items-start justify-between gap-4 border-b border-border bg-background/40 p-5 md:p-6">
                            <div>
                                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                                    {open.artist ? `${open.artist} · ${open.year}` : `Pra(Killa\`Gramm) · ${open.year}`}
                                </span>
                                <h3 className="heading text-3xl font-bold md:text-4xl">
                                    {open.title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setOpen(null)}
                                aria-label="Закрыть"
                                className="glitch-btn flex h-10 w-10 flex-none items-center justify-center border border-border text-foreground hover:text-primary-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* lyrics body */}
                        <div className="hide-scrollbar overflow-y-auto p-5 md:p-6">
                            <pre className="whitespace-pre-wrap font-mono text-[15px] leading-relaxed text-foreground/90">
                                {open.lines.map((line, idx) => {
                                    const isLabel = /^\[.*\]$/.test(line.trim())
                                    return (
                                        <span
                                            key={idx}
                                            className={
                                                isLabel
                                                    ? 'mt-3 block font-bold uppercase tracking-widest text-primary'
                                                    : 'block'
                                            }
                                        >
                                            {line || '\u00A0'}
                                        </span>
                                    )
                                })}
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}