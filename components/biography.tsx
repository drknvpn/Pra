import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const STATS = [
  { value: '2011', label: 'Первый альбом «Агрессия»' },
  { value: '30+', label: 'Альбомов и EP' },
  { value: '39', label: 'Калининградский регион' },
  { value: '50+', label: 'Концертов за первые годы' },
]

// Биография от первого лица. Абзацы можно дополнять / редактировать.
const PARAGRAPHS = [
  'Меня зовут Максим Иньков, но на сцене я — Pra(Killa`Gramm). Родился я 10 мая 1992-го в Черняховске, Калининградская область. Самый западный угол страны, тридцать девятый регион — вот мой воздух, мой акцент, мой поребрик. Отсюда всё и началось.',
  'Рэп я поймал лет в тринадцать. Тогда же дома всё посыпалось — родители развелись, и я ушёл в текст, как в подвал, где никто не достанет. Первый трек назывался «Время», первый клип снял в 2010-м на песню «Человеку». Был в «Основе слова», был в «Эпицентре» — учился держать удар словом.',
  'В 2011-м вышла «Агрессия» — мой дебют. Дальше я просто не останавливался: «ВЕСъ», «Топь», «Чума», «Турист», «Самовывоз», «Вокабуляр», «Улица говорит», «Тесно». Совместки с ШаолинЬ, ZigiZag, ChipaChip. Я не гнался за форматом — я писал так, как дышит улица: сыро, плотно, без фальши.',
  'Versus, «Рвать на битах» — баттлы закалили флоу. Мне говорили, что я «отдувался за всех российских рэперов», и я нёс это как ответственность, а не как корону. Долго я не уезжал из родного города — пока все рвались в Москву, я держался за Черняховск. Потом всё-таки перебрался — поднимать движение.',
  'Это движение — #PDVLFIRMA. Не лейбл ради вывески, а андеграунд-объединение, семья. Голос из подвала, который не просит микрофон — он его берёт. В 2025-м я собрал сольник в Питере, в «Ласточке», а вчера выпустил, наверное, самый личный трек — «Детство». Я всё ещё тут. И легче не стало — и пусть.',
]

export function Biography() {
  return (
    <section id="bio" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading index="02 / БИОГРАФИЯ" title="Манифест" />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          {/* Photo + stats */}
          <Reveal className="md:sticky md:top-24 md:self-start">
            <div className="relative aspect-[3/4] overflow-hidden border border-border bg-card">
              <Image
                src="/images/pra.jpg"
                alt="Pra(Killa`Gramm) — Максим Иньков"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-top contrast-110 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <span className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest text-primary">
                Максим Павлович Иньков
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-px border border-border bg-border">
              {STATS.map((s) => (
                <div key={s.label} className="bg-card p-4">
                  <dt className="heading text-3xl font-bold text-primary">
                    {s.value}
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Text */}
          <div className="space-y-6">
            {PARAGRAPHS.map((p, i) => (
              <Reveal key={i} delay={i * 70}>
                <p className="text-pretty font-mono text-[15px] leading-relaxed text-foreground/85 first-letter:float-left first-letter:mr-2 first-letter:font-[family-name:var(--font-heading)] first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-primary">
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={120}>
              <blockquote className="mt-4 border-l-2 border-primary bg-card/50 p-5">
                <p className="heading text-2xl font-semibold uppercase leading-tight text-balance md:text-3xl">
                  «Мне дали микрофон — я сделал из него рупор»
                </p>
                <cite className="mt-2 block font-mono text-xs not-italic text-muted-foreground">
                  — Pra(Killa`Gramm)
                </cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
