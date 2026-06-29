// components/schema-markup.tsx
'use client'

import { useEffect } from 'react'
import { shows, releases } from '@/lib/site-data'

export function SchemaMarkup() {
    useEffect(() => {
        // Разметка для сайта (WebSite)
        const websiteSchema = {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Pra(Killa`Gramm) — Голос из подвала',
            url: 'https://prakillagramm.ru',
            description: 'Официальный сайт андеграунд-исполнителя Pra(Killa`Gramm). Релизы, тексты, тур, биография.',
            author: {
                '@type': 'MusicGroup',
                name: 'Pra(Killa`Gramm)',
                sameAs: [
                    'https://vk.com/prakillagramm',
                    'https://t.me/prakillagramm_one39',
                    'https://www.youtube.com/@prakillagramm',
                ],
            },
        }

        // Разметка для концертов (Event)
        const eventsSchema = {
            '@context': 'https://schema.org',
            '@type': 'EventSeries',
            name: 'Pra(Killa`Gramm) — Тур 2026',
            description: 'Концерты андеграунд-исполнителя Pra(Killa`Gramm)',
            performer: {
                '@type': 'MusicGroup',
                name: 'Pra(Killa`Gramm)',
                url: 'https://prakillagramm.ru',
            },
            eventSchedule: shows.map((show) => ({
                '@type': 'Schedule',
                scheduledEvent: {
                    '@type': 'Event',
                    name: `Концерт в ${show.city}`,
                    startDate: show.date,
                    location: {
                        '@type': 'Place',
                        name: show.venue,
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: show.city,
                            addressCountry: 'RU',
                        },
                    },
                    offers: {
                        '@type': 'Offer',
                        url: show.ticketUrl,
                        availability: show.soldOut ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
                    },
                },
            })),
        }

        // Разметка для релизов (MusicAlbum)
        const albumsSchema = {
            '@context': 'https://schema.org',
            '@type': 'MusicAlbum',
            name: 'Дискография Pra(Killa`Gramm)',
            album: releases.map((release) => ({
                '@type': 'MusicAlbum',
                name: release.title,
                datePublished: release.year,
                albumReleaseType: release.type,
                image: `https://prakillagramm.ru${release.cover}`,
                url: release.link,
            })),
        }

        // Добавляем все скрипты
        const schemas = [websiteSchema, eventsSchema, albumsSchema]
        schemas.forEach((schema) => {
            const script = document.createElement('script')
            script.type = 'application/ld+json'
            script.innerHTML = JSON.stringify(schema)
            document.head.appendChild(script)
        })

        return () => {
            document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => {
                if (el.innerHTML.includes('Pra(Killa`Gramm)')) {
                    el.remove()
                }
            })
        }
    }, [])

    return null
}