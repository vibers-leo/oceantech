'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import styles from '../checkout.module.css';

function CompleteContent() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const orderId = params.get('orderId') || '-';
  const isKorean = language === 'ko';

  return (
    <div className={styles.container} style={{ textAlign: 'center', paddingTop: '160px' }}>
      <div style={{
        fontSize: '4rem',
        marginBottom: '20px',
      }}>
        &#10003;
      </div>
      <h1 className={styles.title} style={{ marginBottom: '16px' }}>
        {isKorean ? '결제가 완료되었습니다!' : 'Payment Complete!'}
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '8px' }}>
        {isKorean ? '주문번호' : 'Order ID'}: <strong>{orderId}</strong>
      </p>
      <p style={{ fontSize: '0.95rem', color: '#888', marginBottom: '40px' }}>
        {isKorean
          ? '주문 확인 메일이 발송됩니다. 감사합니다.'
          : 'A confirmation email will be sent shortly. Thank you!'}
      </p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link
          href="/shop"
          style={{
            padding: '14px 32px',
            background: '#333',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          {isKorean ? '쇼핑 계속하기' : 'Continue Shopping'}
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutCompletePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteContent />
    </Suspense>
  );
}
