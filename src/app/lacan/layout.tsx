import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '라캉 (Lacan)',
  description: '전문 살롱을 위한 프리미엄 왁스 브랜드 라캉. 업소용 왁스 제품과 전문가 멤버십 서비스를 제공합니다.',
  keywords: ['라캉', 'Lacan', 'Lacan Wax', 'salon wax', 'professional wax', '살롱 왁스', '업소용 왁스', '전문가 왁싱', '프리미엄 왁스', 'K-Beauty wax'],
  openGraph: {
    title: '라캉 (Lacan) | 전문가를 위한 프리미엄 왁스',
    description: '전문 살롱을 위한 프리미엄 왁스 브랜드 라캉. 품질로 승부하는 전문가 왁싱 솔루션.',
    images: [{ url: '/lacan/lacan_hero_1.jpg', width: 1200, height: 630, alt: 'Lacan 전문가 왁스' }],
  },
  alternates: {
    canonical: '/lacan',
  },
};

export default function LacanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
