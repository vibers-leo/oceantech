import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Lacan & R-minu | Premium Waxing Standard',
  description: '전문가를 위한 라캉, 당신을 위한 R-minu. 대한민국 프리미엄 왁싱의 새로운 기준을 제시합니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable}`}>
      <body>
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
