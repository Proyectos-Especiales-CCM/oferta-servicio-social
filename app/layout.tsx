import Script from 'next/script';
import type { Metadata } from 'next'
import { GeistSans } from "geist/font/sans";
import './globals.css'
import { NavMenu } from '@/components/navmenu';
import { ProjectsContextProvider } from '@/context/ProjectsContext';


export const metadata: Metadata = {
  title: 'Oferta Servicio Social - Invierno 2025 y Febrero-Junio 2026',
  description: 'Oferta de proyectos de Servicio Social Tec CCM para el periodo de Invierno 2025 y Febrero-Junio 2026',
  metadataBase: new URL('https://oferta-servicio-social.vercel.app/'),
  openGraph: {
    type: 'website',
    url: 'https://oferta-servicio-social.vercel.app/',
    title: 'Oferta Servicio Social - Invierno 2025 y Febrero-Junio 2026',
    description: 'Oferta de proyectos de Servicio Social Tec CCM para el periodo de Invierno 2025 y Febrero-Junio 2026',
    images: [
      {
        url: 'https://oferta-servicio-social.vercel.app/opengraph/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Preview Image',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B7ZLCVH9T5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B7ZLCVH9T5');
          `}
        </Script>
      </head>
      <body className={GeistSans.className}>
        <ProjectsContextProvider>
          <NavMenu />
          {children}
        </ProjectsContextProvider>
      </body>
    </html>
  )
}
