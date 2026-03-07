export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ocean Tech Co., Ltd.',
    alternateName: '오션해양테크연구소',
    url: 'https://rminu.com',
    logo: 'https://rminu.com/og-image.jpg',
    description: 'Premium waxing solutions - Lacan Wax for professionals, R-minu for home care.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '못골번영로 71번길 74, 부산예술대학교 본관 4층',
      addressLocality: '부산광역시',
      addressRegion: '남구',
      addressCountry: 'KR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-10-7169-3438',
      email: 'jbanion@naver.com',
      contactType: 'customer service',
      availableLanguage: ['Korean', 'English', 'Thai'],
    },
    brand: [
      { '@type': 'Brand', name: 'Lacan Wax' },
      { '@type': 'Brand', name: 'R-minu' },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'R-minu Hard Wax (알마이너 하드 왁스)',
    description: 'All-in-one premium hard wax for face, body, and Brazilian. Low melting point of 50-55°C minimizes skin irritation.',
    brand: { '@type': 'Brand', name: 'R-minu' },
    manufacturer: { '@type': 'Organization', name: 'Ocean Tech Co., Ltd.' },
    image: 'https://rminu.com/rminu/알마이너-썸네일-1000g-2종.jpg',
    offers: [
      {
        '@type': 'Offer',
        name: '200g × 1',
        price: '9500',
        priceCurrency: 'KRW',
        availability: 'https://schema.org/InStock',
        url: 'https://rminu.com/shop/alminer',
      },
      {
        '@type': 'Offer',
        name: '500g × 1',
        price: '14450',
        priceCurrency: 'KRW',
        availability: 'https://schema.org/InStock',
        url: 'https://rminu.com/shop/alminer',
      },
      {
        '@type': 'Offer',
        name: '1000g × 1',
        price: '21140',
        priceCurrency: 'KRW',
        availability: 'https://schema.org/InStock',
        url: 'https://rminu.com/shop/alminer',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '5',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
