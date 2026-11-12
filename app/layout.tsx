import Script from 'next/script';
import type { Metadata } from 'next'
import { GeistSans } from "geist/font/sans";
import './globals.css'
import { NavMenu } from '@/components/navmenu';
import { ProjectsContextProvider } from '@/context/ProjectsContext';



export const metadata: Metadata = {
  title: 'Oferta Servicio Social - Febrero-Junio 2027 e Invierno 2027',
  description: 'Oferta de proyectos de Servicio Social del Tec de Monterrey Campus Ciudad de México para los periodos Febrero-Junio 2027 e Invierno 2027',
  metadataBase: new URL('https://oferta-servicio-social.vercel.app/'),
  openGraph: {
    type: 'website',
    url: 'https://oferta-servicio-social.vercel.app/',
    title: 'Oferta Servicio Social - Febrero-Junio 2027 e Invierno 2027',
    description: 'Consulta los proyectos de Servicio Social disponibles para Febrero-Junio 2027 e Invierno 2027 en el Tec de Monterrey Campus Ciudad de México.',
    images: [
      {
        url: 'https://oferta-servicio-social.vercel.app/opengraph/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Catálogo de Servicio Social Tec CCM 2027',
      },
    ],
  },
};


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
