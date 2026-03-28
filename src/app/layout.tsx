import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import AIChatBot from '@/components/AIChatBot';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rminu.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Lacan & R-minu | 프리미엄 왁싱의 새로운 기준',
    template: '%s | Lacan & R-minu',
  },
  description: '전문가를 위한 라캉 왁스, 홈케어를 위한 알마이너(R-minu). 대한민국 프리미엄 제모 왁스 브랜드 오션해양테크.',
  keywords: ['왁싱', '제모', '왁스', '라캉', '알마이너', 'R-minu', 'Lacan', '프리미엄 왁싱', '홈케어 제모', '오션해양테크'],
  authors: [{ name: '오션해양테크', url: siteUrl }],
  creator: '오션해양테크',
  publisher: '오션해양테크',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: ['en_US', 'th_TH'],
    url: siteUrl,
    siteName: 'Lacan & R-minu',
    title: 'Lacan & R-minu | 프리미엄 왁싱의 새로운 기준',
    description: '전문가를 위한 라캉 왁스, 홈케어를 위한 알마이너(R-minu). 대한민국 프리미엄 제모 왁스 브랜드.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lacan & R-minu - 프리미엄 왁싱',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lacan & R-minu | 프리미엄 왁싱의 새로운 기준',
    description: '전문가를 위한 라캉 왁스, 홈케어를 위한 알마이너(R-minu).',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'ko-KR': siteUrl,
      'en-US': `${siteUrl}/en`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7704550771011130"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <LanguageProvider>
          <ToastProvider>
            <AuthProvider>
              <Header />
              <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
                {children}
              </main>
              <Footer />
              <AIChatBot />
              <ScrollToTop />
            </AuthProvider>
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
