// app/lyrics/[id]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { X } from 'lucide-react'
import { lyrics } from '@/lib/site-data'

export default async function LyricsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // ✅ Ждём params (async/await)
    const { id } = await params

    // ✅ Логируем, чтобы увидеть, что приходит
    console.log('🔍 Ищем id:', id)
    console.log('📦 Доступные id:', lyrics.map(l => l.id))

    const lyric = lyrics.find((l) => l.id === id)

    if (!lyric) {
        console.log('❌ Текст не найден для id:', id)
        notFound()
    }

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <div className="relative z-10 flex max-h-[88svh] w-full max-w-2xl flex-col border border-border bg-card shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-300">
                <div className="flex items-start justify-between gap-4 border-b border-border bg-background/40 p-5 md:p-6">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-primary">
                            {lyric.artist || 'Pra(Killa`Gramm)'} · {lyric.year}
                        </span>
                        <h3 className="heading text-3xl font-bold md:text-4xl">
                            {lyric.title}
                        </h3>
                    </div>
                    <Link
                        href="/lyrics"
                        className="glitch-btn flex h-10 w-10 flex-none items-center justify-center border border-border text-foreground hover:text-primary-foreground"
                        aria-label="Закрыть"
                    >
                        <X className="h-5 w-5" />
                    </Link>
                </div>

                <div className="hide-scrollbar overflow-y-auto p-5 md:p-6">
                    <pre className="whitespace-pre-wrap font-mono text-[15px] leading-relaxed text-foreground/90">
                        {lyric.lines.map((line, idx) => {
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
    )
}