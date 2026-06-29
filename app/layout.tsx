import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Oswald, JetBrains_Mono } from 'next/font/google'
import { SchemaMarkup } from '@/components/schema-markup'
import './globals.css'

const oswald = Oswald({
    variable: '--font-heading',
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
    variable: '--font-mono',
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
    title: 'Pra(Killa`Gramm) — Голос из подвала | PDVL FIRMA',
    description:
        'Официальный сайт андеграунд-исполнителя Pra(Killa`Gramm) (Максим Иньков). Релизы, тексты, тур, биография. Голос из подвала. #PDVLFIRMA',
    generator: 'v0.app',
    keywords: [
        'Pra(Killa`Gramm)',
        'ПраКиллаГрамм',
        'Максим Иньков',
        'PDVL FIRMA',
        'андеграунд рэп',
        'Калининград',
        'Черняховск',
        'хип-хоп',
        'ВКонтакте',
        'ВК',
        'VK',
        'Яндекс Музыка',
        'Рэп',
        'Rap',
        'Андеграунд',
        'The Underground',
    ],
    openGraph: {
        title: 'Pra(Killa`Gramm) — Голос из подвала',
        description: 'Андеграунд. Лирика. Бетон. #PDVLFIRMA',
        type: 'website',
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
        ],
        manifest: '/site.webmanifest',
    },
    appleWebApp: {
        title: 'PDVLFIRMA',
        capable: true,
        statusBarStyle: 'black-translucent',
    },
}

export const viewport: Viewport = {
    colorScheme: 'dark',
    themeColor: '#0A0A0A',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="ru"
            className={`dark ${oswald.variable} ${jetbrainsMono.variable}`}
        >
            <body className="bg-background font-mono antialiased">
                <SchemaMarkup /> {/* ✅ ДОБАВЛЯЕМ СХЕМУ */}
                {children}
                {process.env.NODE_ENV === 'production' && <Analytics />}
            </body>
        </html>
    )
}