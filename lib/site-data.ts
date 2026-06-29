/**
 * ============================================================
 *  ЕДИНЫЙ ФАЙЛ КОНТЕНТА — Pra(Killa`Gramm)
 * ------------------------------------------------------------
 *  Теперь с поддержкой id и автоматической связкой релизов и текстов
 * ============================================================
 */

import releasesData from '@/public/data/releases.json'
import lyricsData from '@/public/data/lyrics.json'

export type Release = {
  id: string
  title: string
  year: string
  type: string
  cover: string
  link: string
}

export type Lyric = {
  id: string
  title: string
  year: string
  artist?: string
  lines: string[]
}

export type Show = {
  city: string
  venue: string
  date: string
  ticketUrl: string
  soldOut?: boolean
}

export type Social = {
  label: string
  handle: string
  url: string
}

/* -------------------- ССЫЛКИ CTA (Хиро) -------------------- */
export const VK_URL = 'https://vk.com/prakillagramm'
export const VM_URL = 'https://vk.com/audios-15864713'
export const YANDEX_MUSIC_URL =
  'https://music.yandex.ru/search?text=Pra(Killa%60Gramm)'

/* -------------------- РЕЛИЗЫ (все) -------------------- */
export const releases: Release[] = releasesData

// ✅ Только последние 6 для карусели (новые релизы)
export const featuredReleases = releases.slice(0, 6)

// ✅ Группировка по годам для страницы дискографии
export const releasesByYear = releases.reduce((acc, release) => {
  const year = release.year
  if (!acc[year]) acc[year] = []
  acc[year].push(release)
  return acc
}, {} as Record<string, Release[]>)

// ✅ Сортируем года от новых к старым
export const sortedYears = Object.keys(releasesByYear).sort((a, b) => parseInt(b) - parseInt(a))

// ✅ Связка релизов с текстами по id
const lyricsMap = Object.fromEntries(
  lyricsData.map((l: Lyric) => [l.id, l.lines])
)

export const releasesWithLyrics = releases.map((release) => ({
  ...release,
  lyrics: lyricsMap[release.id] || null,
}))

// ✅ Проверка — если текст не найден, покажем предупреждение в консоли
const missingLyrics = releases
  .filter((r) => !lyricsMap[r.id])
  .map((r) => r.title)

if (missingLyrics.length > 0) {
  console.warn('⚠️ Нет текстов для релизов:', missingLyrics)
}

/* -------------------- ТЕКСТЫ ПЕСЕН -------------------- */
export const lyrics: Lyric[] = lyricsData

/* -------------------- ТУР / КОНЦЕРТЫ -------------------- */
export const shows: Show[] = [
  {
    city: 'Санкт-Петербург',
    venue: 'Клуб «Ласточка»',
    date: '14 марта 2026',
    ticketUrl: '#',
  },
  {
    city: 'Москва',
    venue: 'Aglomerat',
    date: '28 марта 2026',
    ticketUrl: '#',
  },
  {
    city: 'Калининград',
    venue: 'Дом Искусств',
    date: '11 апреля 2026',
    ticketUrl: '#',
  },
  {
    city: 'Екатеринбург',
    venue: 'Tele-Club',
    date: '25 апреля 2026',
    ticketUrl: '#',
  },
  {
    city: 'Новосибирск',
    venue: 'Подземка',
    date: '9 мая 2026',
    ticketUrl: '#',
    soldOut: true,
  },
  {
    city: 'Минск',
    venue: 'RE:PUBLIC',
    date: '23 мая 2026',
    ticketUrl: '#',
  },
]

/* -------------------- СОЦСЕТИ (подвал) -------------------- */
export const MANAGER_EMAIL = 'prakillagramm.team@bk.ru'

export const socials: Social[] = [
  { label: 'ВКонтакте', handle: '/prakillagramm', url: 'https://vk.com/prakillagramm' },
  { label: 'YouTube', handle: '@prakillagramm', url: 'https://www.youtube.com/@prakillagramm' },
  { label: 'Telegram', handle: '@prakillagramm_one39', url: 'https://t.me/prakillagramm_one39' },
  { label: 'Instagram', handle: '@prakillagramm_one', url: 'https://www.instagram.com/prakillagramm_one/' },
  { label: 'Яндекс.Музыка', handle: 'Слушать', url: YANDEX_MUSIC_URL },
  { label: 'Место для рекламы', handle: '/prakillagramm', url: 'https://vk.com/prakillagramm' },
]