import { MapPin, Calendar } from 'lucide-react'
import { shows } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

export function TourSection() {
    return (
        <section id="tour" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
                <Reveal>
                    <SectionHeading index="04 / ТУР" title="2026" />
                </Reveal>

                <ul className="grid gap-px border border-border bg-border">
                    {shows.map((show, i) => (
                        <Reveal as="li" key={`${show.city}-${show.date}`} delay={i * 50}>
                            <div className="flex flex-col gap-3 bg-card p-5 transition-colors hover:bg-card/60 md:flex-row md:items-center md:justify-between md:p-6">

                                {/* Левая часть: ДАТА сверху, ГОРОД снизу */}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span className="font-mono text-xl font-semibold text-primary md:text-2xl">
                                            {show.date}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 flex-none text-muted-foreground" />
                                        <h3 className="heading text-xl font-bold leading-none md:text-2xl">
                                            {show.city}
                                        </h3>
                                    </div>
                                </div>

                                {/* Правая часть: площадка + кнопка */}
                                <div className="flex items-center justify-between gap-4 md:gap-6">
                                    <span className="font-mono text-sm text-muted-foreground md:text-base">
                                        {show.venue}
                                    </span>

                                    {show.soldOut ? (
                                        <span className="whitespace-nowrap border border-border px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground md:px-6">
                                            Sold Out
                                        </span>
                                    ) : (
                                        <a
                                            href={show.ticketUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="whitespace-nowrap border border-primary bg-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90 md:px-6"
                                        >
                                            Купить билет
                                        </a>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </ul>

                <Reveal delay={120}>
                    <p className="mt-6 font-mono text-xs text-muted-foreground">
                        Хочешь привезти Pra(Killa`Gramm) в свой город? Пиши менеджеру —
                        контакт в подвале сайта.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}
