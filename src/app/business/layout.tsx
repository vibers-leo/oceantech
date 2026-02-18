import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비즈니스 센터',
  description: '라캉·알마이너 브랜드 B2B 비즈니스 문의, 유통 파트너십, 해외 수출 상담 및 브랜드 자료 다운로드.',
  keywords: ['왁스 유통', 'B2B 왁싱', '라캉 대리점', '알마이너 수출', '뷰티 파트너십'],
  openGraph: {
    title: '비즈니스 센터 | Lacan & R-minu',
    description: 'B2B 유통 파트너십 및 해외 수출 상담. 라캉·알마이너 공식 비즈니스 센터.',
  },
  alternates: {
    canonical: '/business',
  },
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
