import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Playfair_Display, Poppins } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/layout/FloatingCTA'
import CookieBanner from '@/components/layout/CookieBanner'
import './globals.css'

const playfair = Playfair_Display({
  subsets:  ['latin'],
  display:  'swap',
  variable: '--font-playfair',
  weight:   ['400', '700', '900'],
  style:    ['normal', 'italic'],
})

const poppins = Poppins({
  subsets:  ['latin'],
  display:  'swap',
  variable: '--font-poppins',
  weight:   ['300', '400', '500', '600'],
})

const GA_ID = 'G-PXM6MZFMMJ'
const BASE_URL = 'https://studioamage.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Studio Amage',
    default: 'Studio Amage | Frizerski salon Split',
  },
  description:
    'Studio Amage — profesionalni frizerski salon u Splitu. Balayage, bojanje, šišanje i transformacije kose. Rezerviraj termin online.',
  openGraph: {
    siteName: 'Studio Amage',
    locale: 'hr_HR',
    type: 'website',
    url: BASE_URL,
    images: [
      {
        url:    'https://studioamage.com/images/hero/hero-1.webp',
        width:  1200,
        height: 630,
        alt:    'Studio Amage — frizerski salon Split',
      },
    ],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png',      sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png',      sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <html lang="hr" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        {isProduction && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TWXMZB8L');`}
          </Script>
        )}
        <link rel="preload" as="image" href="/images/hero/hero-1.webp" fetchPriority="high" />
      </head>
      <body>
        {isProduction && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TWXMZB8L"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Header />
        {children}
        <Footer />
        <FloatingCTA />
        <CookieBanner />
        <SpeedInsights />

        {isProduction && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure',
                  client_storage: 'none'
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
