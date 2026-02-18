import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '알마이너 (R-minu)',
  description: '집에서 쉽게 하는 홈케어 왁싱 브랜드 알마이너(R-minu). 누구나 쉽고 안전하게 사용할 수 있는 제모 왁스.',
  keywords: ['알마이너', 'R-minu', '홈케어 왁싱', '자가 제모', '제모 왁스', '집에서 왁싱'],
  openGraph: {
    title: '알마이너 (R-minu) | 홈케어 제모 왁스',
    description: '집에서 쉽게 하는 홈케어 왁싱 브랜드 알마이너. 안전하고 편리한 자가 제모 솔루션.',
    images: [{ url: '/og-alminer.jpg', width: 1200, height: 630, alt: 'R-minu 알마이너 홈케어 왁스' }],
  },
  alternates: {
    canonical: '/alminer',
  },
};

export default function AlminerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
