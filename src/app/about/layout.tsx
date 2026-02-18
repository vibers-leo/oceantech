import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회사소개',
  description: '오션해양테크(주)는 대한민국 부산을 기반으로 프리미엄 제모 왁스 브랜드 라캉과 알마이너를 운영하는 뷰티 전문 기업입니다.',
  keywords: ['오션해양테크', '회사소개', '제모 왁스 제조사', '뷰티 기업', 'Ocean Tech'],
  openGraph: {
    title: '회사소개 | 오션해양테크',
    description: '대한민국 부산 기반 프리미엄 왁스 브랜드 라캉·알마이너를 운영하는 오션해양테크를 소개합니다.',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
