import Image from 'next/image'
import { ArrowUpRight, Mail } from 'lucide-react'
import { socials, MANAGER_EMAIL } from '@/lib/site-data'
import { Reveal } from '@/components/reveal'

export function SiteFooter() {
  return (
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
              <Image
                src="/images/pdvl-logo.png"
                alt="PDVL FIRMA"
                width={160}
                height={120}
                className="h-60 w-auto invert"
              />
              <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
                Андеграунд-объединение Pra(Killa`Gramm). Калининград — Москва —
                по всей стране.
              </p>
            </div>
          </Reveal>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border py-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} Pra(Killa`Gramm) · Все права защищены
          </span>
          <a
            href="#top"
            className="transition-colors hover:text-primary"
          >
            Наверх ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
