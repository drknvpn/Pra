import Link from 'next/link'
import { ArrowLeft, Music } from 'lucide-react'
import { lyrics, releases } from '@/lib/site-data'
import { Reveal } from '@/components/reveal'

export const metadata = {
    title: 'Тексты песен — Pra(Killa`Gramm)',
    description: 'Все тексты песен Pra(Killa`Gramm) по годам. Полная лирика андеграунд-исполнителя.',
}

export default function LyricsPage() {
    // Группируем тексты по годам
    const lyricsByYear = lyrics.reduce((acc, lyric) => {
        const year = lyric.year
        if (!acc[year]) acc[year] = []
        acc[year].push(lyric)
        return acc
    }, {} as Record<string, typeof lyrics>)

    // Сортируем года
    const sortedYears = Object.keys(lyricsByYear).sort((a, b) => parseInt(b) - parseInt(a))

    const totalLyrics = lyrics.length

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
                <div className="mx-auto max-w-6xl px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/#lyrics"
                            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Назад
                        </Link>
                        <span className="font-mono text-xs text-muted-foreground">
                            {totalLyrics} текстов
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-20">
                <Reveal>
                    <h1 className="heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9]">
                        Тексты песен
                    </h1>
                    <p className="mt-3 font-mono text-sm text-muted-foreground">
                        Все тексты Pra(Killa`Gramm) по годам
                    </p>
                </Reveal>

                <div className="mt-12 space-y-16">
                    {sortedYears.map((year) => (
                        <Reveal key={year} delay={80}>
                            <div>
                                <h2 className="font-mono text-2xl font-bold text-primary/80">
                                    {year}
                                    <span className="ml-3 font-mono text-sm font-normal text-muted-foreground">
                                        {lyricsByYear[year].length} текстов
                                    </span>
                                </h2>
                                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {lyricsByYear[year].map((lyric) => {
                                        // Находим релиз для этого текста (по id)
                                        const release = releases.find((r) => r.id === lyric.id)

                                        return (
                                            <Link
                                                key={lyric.id}
                                                href={`/lyrics/${lyric.id}`}
                                                className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:bg-primary/5"
                                            >
                                                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                                                    <Music className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-mono text-sm font-bold truncate group-hover:text-primary transition-colors">
                                                        {lyric.title}
                                                    </h3>
                                                    <p className="font-mono text-[10px] text-muted-foreground">
                                                        {release?.type || 'Сингл'} · {lyric.year}
                                                    </p>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    )
}