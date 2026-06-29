// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/', // если у тебя есть API
        },
        sitemap: 'https://prakillagramm.ru/sitemap.xml', // 🔥 ЗАМЕНИ НА СВОЙ ДОМЕН
    }
}