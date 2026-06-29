import Image from 'next/image'
import Link from 'next/link'
import { Play, ArrowLeft } from 'lucide-react'
import { releasesByYear, sortedYears } from '@/lib/site-data'
import { Reveal } from '@/components/reveal'

export const metadata = {
    title: 'Дискография — Pra(Killa`Gramm)',
    description: 'Все релизы Pra(Killa`Gramm) по годам. Полная дискография андеграунд-исполнителя.',
}

export default function DiscographyPage() {
    const totalReleases = Object.values(releasesByYear).reduce(
        (acc, releases) => acc + releases.length,
        0
    )

    return (
        <div className="min-h-screen bg-background">
            {/* Header — как на всём сайте */}
            <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
                <div className="mx-auto max-w-6xl px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/#releases"
                            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Назад
                        </Link>
                        <span className="font-mono text-xs text-muted-foreground">
                            {totalReleases} релизов
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-20">
                <Reveal>
                    <h1 className="heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9]">
                        Дискография
                    </h1>
                    <p className="mt-3 font-mono text-sm text-muted-foreground">
                        Все релизы Pra(Killa`Gramm) по годам
                    </p>
                </Reveal>

                <div className="mt-12 space-y-16">
                    {sortedYears.map((year) => (
                        <Reveal key={year} delay={80}>
                            <div>
                                <h2 className="font-mono text-2xl font-bold text-primary/80">
                                    {year}
                                    <span className="ml-3 font-mono text-sm font-normal text-muted-foreground">
                                        {releasesByYear[year].length} релизов
                                    </span>
                                </h2>
                                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {releasesByYear[year].map((release) => (
                                        <div
                                            key={release.id}
                                            className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/5"
                                        >
                                            <div className="relative aspect-square overflow-hidden">
                                                <Image
                                                    src={release.cover || '/placeholder.svg'}
                                                    alt={release.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />

                                                {/* ✅ Затемнение — теперь полностью перекрывает обложку */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                                {/* Кнопка Play */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                    <a
                                                        href={release.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/60 bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 transition-transform duration-300 hover:scale-110 group-hover:scale-110"
                                                        aria-label={`Слушать ${release.title}`}
                                                    >
                                                        <Play className="h-5 w-5 fill-current" strokeWidth={1.5} />
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="p-3">
                                                <h3 className="font-mono text-xs font-bold uppercase truncate">
                                                    {release.title}
                                                </h3>
                                                <p className="font-mono text-[10px] text-muted-foreground">
                                                    {release.type}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    )
}