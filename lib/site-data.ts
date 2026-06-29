/**
 * ============================================================
 *  ЕДИНЫЙ ФАЙЛ КОНТЕНТА — Pra(Killa`Gramm)
 * ------------------------------------------------------------
 *  Теперь без текстов — они подгружаются с Genius
 * ============================================================
 */

import releasesData from '@/public/data/releases.json'

export type Release = {
    id: string
    title: string
    year: string
    type: string
    cover: string
    link: string
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

/* -------------------- РЕЛИЗЫ (карусель) -------------------- */
export const releases: Release[] = releasesData

// ✅ Только последние 10 для карусели (новые релизы)
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

/* -------------------- ТУР / КОНЦЕРТЫ -------------------- */
export const shows: Show[] = [
    {
        city: 'Калининград',
        venue: 'Клуб «Калининград Сити Джаз»',
        date: '12 сентября',
        ticketUrl: 'https://prakld.ticketscloud.org/',
        year: '2026',
    },
    {
        city: 'Екатеринбург',
        venue: 'Пространство Ц',
        date: '19 сентября',
        ticketUrl: 'https://praekb1.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Нижний Новгород',
        venue: 'Alcatraz',
        date: '20 сентября',
        ticketUrl: 'https://prann.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Самара',
        venue: 'Бар Куйбышев',
        date: '25 сентября',
        ticketUrl: 'https://prasam.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Волгоград',
        venue: 'FERRUM ROCK"n"ROLL CLUB',
        date: '26 сентября',
        ticketUrl: 'https://pravgg.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Саратов',
        venue: 'Machine Head',
        date: '27 сентября',
        ticketUrl: 'https://prasar.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Москва',
        venue: 'Свобода',
        date: '9 октября',
        ticketUrl: 'https://pramsk.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Питер',
        venue: 'РАССВЕТ',
        date: '10 октября',
        ticketUrl: 'https://praspb1.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Казань',
        venue: 'BIBLIOTEKA Bar',
        date: '16 октября',
        ticketUrl: 'https://prakzn.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Уфа',
        venue: 'DOM ПЕЧАТИ',
        date: '17 октября',
        ticketUrl: 'https://praufa.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Воронеж',
        venue: 'Клуб Сто Ручьёв',
        date: '23 октября',
        ticketUrl: 'https://pravrn.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Ростов-на-Дону',
        venue: 'Родня',
        date: '24 октября',
        ticketUrl: 'https://prarnd.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Краснодар',
        venue: 'Сержант Пеппер',
        date: '25 октября',
        ticketUrl: 'https://prakrd.ticketscloud.org',
        year: '2026',
    },
    {
        city: 'Новосибирск',
        venue: 'Лофт-парк «Подземка» (зал «Правда»)',
        date: '7 ноября',
        ticketUrl: 'https://pransk.ticketscloud.org',
        year: '2026',
    }
]

/* -------------------- СОЦСЕТИ (подвал) -------------------- */
export const MANAGER_EMAIL = 'prakillagramm.team@bk.ru'

export const socials: Social[] = [
    { label: 'ВКонтакте', handle: '/prakillagramm', url: 'https://vk.com/prakillagramm' },
    { label: 'YouTube', handle: '@prakillagramm', url: 'https://www.youtube.com/@prakillagramm' },
    { label: 'Telegram', handle: '@prakillagramm_one39', url: 'https://t.me/prakillagramm_one39' },
    { label: 'Instagram', handle: '@prakillagramm_one', url: 'https://www.instagram.com/prakillagramm_one/' },
    { label: 'Яндекс.Музыка', handle: 'Слушать', url: YANDEX_MUSIC_URL },
]
