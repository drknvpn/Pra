'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import { VK_URL, VM_URL, YANDEX_MUSIC_URL } from '@/lib/site-data'

export function Hero() {
    return (
        <section
            id="top"
            className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-24 md:pb-16"
        >
            {/* Artist photo */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <Image
                    src="/images/artist.png"
                    alt="Pra(Killa`Gramm) — портрет"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain object-bottom md:object-right-bottom"
                    style={{
                        // ✅ УЛУЧШЕННАЯ МАСКА — на мобилках больше прозрачности снизу
                        maskImage: `
                            radial-gradient(
                                ellipse 90% 70% at 70% 90%,
                                black 20%,
                                rgba(0,0,0,0.6) 50%,
                                transparent 85%
                            )
                        `,
                        WebkitMaskImage: `
                            radial-gradient(
                                ellipse 90% 70% at 70% 90%,
                                black 20%,
                                rgba(0,0,0,0.6) 50%,
                                transparent 85%
                            )
                        `,
                        // ✅ Дополнительная маска для мобилок — больше прозрачности снизу
                        '@media (max-width: 768px)': {
                            maskImage: `
                                radial-gradient(
                                    ellipse 100% 60% at 50% 95%,
                                    black 15%,
                                    rgba(0,0,0,0.4) 50%,
                                    transparent 80%
                                )
                            `,
                            WebkitMaskImage: `
                                radial-gradient(
                                    ellipse 100% 60% at 50% 95%,
                                    black 15%,
                                    rgba(0,0,0,0.4) 50%,
                                    transparent 80%
                                )
                            `,
                        }
                    }}
                />

                {/* ✅ Затемнение для читаемости текста */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
            </div>

            {/* ✅ Контент с дополнительным отступом снизу на мобилках */}
            <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6 pb-16 md:pb-0">
                {/* tag */}
                <div className="mb-5 flex items-center gap-3">
                    <span className="inline-block h-2 w-2 animate-pulse bg-primary" />
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                        #PDVLFIRMA · Калининград · 39
                    </span>
                </div>

                {/* Name */}
                <h1 className="heading max-w-4xl text-balance text-[clamp(2.75rem,11vw,8rem)] font-bold">
                    <span
                        className="glitch-text"
                        data-text="Pra(Killa`Gramm)"
                    >
                        Pra(Killa`Gramm)
                    </span>
                </h1>

                {/* Slogan */}
                <p className="mt-4 max-w-xl text-pretty font-mono text-base text-muted-foreground sm:text-lg">
                    Флоу, которое не отмыть. Андеграунд, который говорит.
                </p>

                {/* CTA */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                        href={YANDEX_MUSIC_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glitch-btn group inline-flex items-center justify-center gap-2 border border-primary bg-primary px-7 py-4 font-mono text-sm font-bold uppercase tracking-widest text-primary-foreground"
                    >
                        <Play className="h-4 w-4 fill-current" strokeWidth={1.5} />
                        Слушать на Я.Музыке
                    </a>
                    <a
                        href={VM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glitch-btn group inline-flex items-center justify-center gap-2 border border-primary bg-primary px-7 py-4 font-mono text-sm font-bold uppercase tracking-widest text-primary-foreground"
                    >
                        <Play className="h-4 w-4 fill-current" strokeWidth={1.5} />
                        Слушать на ВК музыке
                    </a>
                </div>
            </div>

            {/* scroll hint */}
            <div className="relative z-10 mx-auto mt-12 w-full max-w-6xl px-4 md:px-6">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    <span className="h-px w-8 bg-muted-foreground/50" />
                    Листай вниз
                </div>
            </div>
        </section>
    )
}
