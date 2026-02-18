import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '쇼핑몰',
  description: '알마이너(R-minu) 제모 왁스 공식 온라인 쇼핑몰. 국내 직구 및 해외 글로벌 구매 안내.',
  keywords: ['알마이너 구매', 'R-minu 쇼핑', '왁스 구매', '제모 왁스 쇼핑몰'],
  openGraph: {
    title: '쇼핑몰 | R-minu 알마이너',
    description: '알마이너(R-minu) 제모 왁스 공식 온라인 쇼핑몰.',
  },
  alternates: {
    canonical: '/shop',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
