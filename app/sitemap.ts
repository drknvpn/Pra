// app/sitemap.ts
import { MetadataRoute } from 'next'
import { releases, shows } from '@/lib/site-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://prakillagramm.ru' // 🔥 ЗАМЕНИ НА СВОЙ ДОМЕН

    // Основные страницы
    const pages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/#releases`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/#lyrics`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#contacts`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/discography`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
    ]

    // Страницы релизов (каждый релиз — отдельная страница)
    const releasePages = releases.map((release) => ({
        url: `${baseUrl}/release/${release.id}`,
        lastModified: new Date(),
        changeFrequency: 'never' as const,
        priority: 0.8,
    }))

    // Страницы концертов (каждый концерт — отдельная страница)
    const showPages = shows.map((show) => ({
        url: `${baseUrl}/show/${show.city.toLowerCase().replace(/\s+/g, '-')}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...pages, ...releasePages, ...showPages]
}