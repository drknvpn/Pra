import { MapPin } from 'lucide-react'
import { shows } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

export function TourSection() {
  return (
    <section id="tour" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading index="04 / ТУР" title="Концерты" />
        </Reveal>

        <ul className="grid gap-px border border-border bg-border">
          {shows.map((show, i) => (
            <Reveal as="li" key={`${show.city}-${show.date}`} delay={i * 50}>
              <div className="grid grid-cols-1 items-center gap-4 bg-card p-5 transition-colors hover:bg-card/60 md:grid-cols-[auto_1fr_auto_auto] md:gap-6 md:p-6">
                {/* date */}
                <div className="font-mono text-sm text-primary md:w-40">
                  {show.date}
                </div>

                {/* city */}
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-none text-muted-foreground" />
                  <h3 className="heading text-2xl font-bold leading-none md:text-3xl">
                    {show.city}
                  </h3>
                </div>

                {/* venue */}
                <div className="font-mono text-sm text-muted-foreground md:text-right">
                  {show.venue}
                </div>

                {/* CTA */}
                {show.soldOut ? (
                  <span className="inline-flex items-center justify-center border border-border px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Sold Out
                  </span>
                ) : (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glitch-btn inline-flex items-center justify-center border border-primary bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground"
                  >
                    Купить билет
                  </a>
                )}
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
