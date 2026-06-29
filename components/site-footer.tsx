import Image from 'next/image'
import { ArrowUpRight, Mail, AlertTriangle } from 'lucide-react'
import { socials, MANAGER_EMAIL, META_DISCLAIMER } from '@/lib/site-data'
import { Reveal } from '@/components/reveal'

export function SiteFooter() {
    return (
        <>
            <footer id="contacts" className="relative border-t border-border pt-16">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <Reveal>
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            #PDVLFIRMA
                        </p>
                        <h2 className="heading mt-3 text-balance text-[clamp(2.5rem,9vw,6rem)] font-bold leading-[0.9]">
                            Голос из подвала
                        </h2>
                    </Reveal>

                    <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr]">
                        {/* socials */}
                        <Reveal>
                            <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                Официальные страницы
                            </span>
                            <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
                                {socials.map((s) => (
                                    <li key={s.label}>
                                        <a
                                            href={s.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between gap-3 bg-card p-4 transition-colors hover:bg-primary"
                                        >
                                            <span>
                                                <span className="heading block text-xl font-bold uppercase text-foreground transition-colors group-hover:text-primary-foreground">
                                                    {s.label}
                                                </span>
                                                <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                                                    {s.handle}
                                                </span>
                                            </span>
                                            <ArrowUpRight className="h-5 w-5 flex-none text-primary transition-all group-hover:rotate-45 group-hover:text-primary-foreground" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>

                        {/* contact */}
                        <Reveal delay={80}>
                            <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                По всем вопросам
                            </span>
                            <a
                                href={`mailto:${MANAGER_EMAIL}`}
                                className="group flex items-center gap-3 border border-border bg-card p-5 transition-colors hover:border-primary"
                            >
                                <Mail className="h-6 w-6 flex-none text-primary" />
                                <span>
                                    <span className="block font-mono text-xs text-muted-foreground">
                                        Менеджмент / букинг
                                    </span>
                                    <span className="font-mono text-base text-foreground transition-colors group-hover:text-primary">
                                        {MANAGER_EMAIL}
                                    </span>
                                </span>
                            </a>

                            <div className="mt-6 border border-border bg-card p-5">
                                <div className="flex flex-col items-center">
                                    <Image
                                        src="/images/pdvl-logo.png"
                                        alt="PDVL FIRMA"
                                        width={160}
                                        height={120}
                                        className="w-auto h-9 invert"
                                    />
                                    <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground text-center">
                                        Андеграунд-объединение Pra(Killa`Gramm).<br />
                                        Калининград — Москва — по всей стране.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* bottom bar */}
                    <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border py-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
                        <span>
                            © {new Date().getFullYear()} Pra(Killa`Gramm) · Все права защищены
                        </span>
                        <a href="#top" className="transition-colors hover:text-primary">
                            Наверх ↑
                        </a>
                    </div>

                    {/* ⚠️ ДИСКЛЕЙМЕР META — между bottom bar и концом футера */}
                    <div className="border-t border-border/30 py-4 mt-2">
                        <div className="group relative inline-flex items-center gap-2 cursor-help">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-500/60 transition-colors group-hover:text-amber-500" />
                            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/70">
                                Meta запрещена в РФ
                            </span>

                            {/* Всплывающая подсказка */}
                            <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-72 scale-95 rounded-lg border border-border/50 bg-card/95 p-3 opacity-0 shadow-xl backdrop-blur-sm transition-all group-hover:scale-100 group-hover:opacity-100 md:w-80">
                                <p className="text-[11px] leading-relaxed text-muted-foreground">
                                    {META_DISCLAIMER}
                                </p>
                                <div className="absolute -bottom-1.5 left-4 h-3 w-3 rotate-45 border-b border-r border-border/50 bg-card/95"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Кнопка "Сделано" — финал */}
            <div className="fixed bottom-4 left-4 z-50">
                <div className="group relative inline-block">
                    {/* Иконка с сердечком */}
                    <button
                        type="button"
                        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/20 text-foreground/60 backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:backdrop-blur-md"
                        aria-label="О разработчике"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>

                    {/* Всплывающее окно — над кнопкой, с минимальным отступом */}
                    <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block">
                        <div className="rounded-xl border border-border/50 bg-card/90 p-4 shadow-2xl backdrop-blur-md min-w-[220px] opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 origin-bottom-left pointer-events-auto">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 whitespace-nowrap">
                                Сайт создан для{' '}
                                <a
                                    href="https://vk.com/prakillagramm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs font-semibold text-primary hover:underline transition-colors"
                                >
                                    Pra(Killa`Gramm)
                                </a>
                            </p>

                            <div className="my-3 h-px bg-border/50" />

                            <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                                    разработчик
                                </span>
                                <a
                                    href="https://vk.com/corona92"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs font-semibold text-primary hover:underline transition-colors"
                                >
                                    Aristo
                                </a>
                            </div>

                            {/* Стрелка вниз */}
                            <div className="absolute -bottom-1 left-6 h-3 w-3 rotate-45 border-b border-r border-border/50 bg-card/90" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
