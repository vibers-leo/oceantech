'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import styles from './checkout.module.css';
import { addOrder, updateOrderPayment } from '@/lib/firestore';
import { getCheckoutItems, clearCheckoutItems, type CheckoutItem } from '@/lib/cart';
import * as PortOne from '@portone/browser-sdk/v2';

const STORE_ID = process.env.NEXT_PUBLIC_PORTONE_STORE_ID || '';
const CHANNEL_KEY_KR = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY_KR || '';
const CHANNEL_KEY_PAYPAL = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY_PAYPAL || '';

function CheckoutContent() {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [shipping, setShipping] = useState({
    recipient: '',
    phone: '',
    postalCode: '',
    address1: '',
    address2: '',
    memo: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = getCheckoutItems();
    if (stored.length === 0) {
      router.replace('/shop');
      return;
    }
    setItems(stored);
  }, [router]);

  const shippingFee = language === 'ko' ? 3000 : 0;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingFee;

  const isKorean = language === 'ko';
  const currency = isKorean ? 'KRW' : 'USD';

  // USD 환산 (간이 환율 — 실서비스에서는 실시간 환율 API 사용)
  const KRW_TO_USD = 0.00075;
  const displayAmount = isKorean ? total : Math.round(total * KRW_TO_USD * 100) / 100;

  const formatCurrency = (amount: number) => {
    if (isKorean) return `${amount.toLocaleString('ko-KR')}원`;
    return `$${amount.toFixed(2)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateOrderId = () => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${rand}`;
  };

  const handlePayment = async () => {
    if (!shipping.recipient || !shipping.phone || !shipping.address1) {
      showToast(
        isKorean ? '배송 정보를 입력해주세요.' : 'Please fill in the shipping details.',
        'error'
      );
      return;
    }

    if (items.length === 0) {
      showToast(isKorean ? '주문 상품이 없습니다.' : 'No items to order.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      // 1. Firestore에 주문 생성 (status: Pending)
      const orderId = generateOrderId();
      const dateStr = new Date().toISOString().split('T')[0];
      const itemNames = items.map((i) => `${i.label} x${i.quantity}`).join(', ');

      const firestoreId = await addOrder({
        orderId,
        user: shipping.recipient,
        email: user?.email || '',
        item: itemNames,
        amount: total,
        status: 'Pending',
        date: dateStr,
      });

      // 2. PortOne 결제 요청
      const channelKey = isKorean ? CHANNEL_KEY_KR : CHANNEL_KEY_PAYPAL;

      const response = await PortOne.requestPayment({
        storeId: STORE_ID,
        channelKey,
        paymentId: `payment-${orderId}-${Date.now()}`,
        orderName: items.length === 1
          ? items[0].label
          : `${items[0].label} 외 ${items.length - 1}건`,
        totalAmount: displayAmount,
        currency,
        payMethod: isKorean ? 'CARD' : 'PAYPAL',
        customer: {
          fullName: shipping.recipient,
          phoneNumber: shipping.phone,
          email: user?.email || undefined,
        },
        redirectUrl: `${window.location.origin}/shop/checkout/complete?orderId=${orderId}&firestoreId=${firestoreId}`,
      });

      // 3. 결제 결과 처리
      if (!response || response.code != null) {
        // 결제 실패 또는 사용자 취소
        const msg = response?.message || (isKorean ? '결제가 취소되었습니다.' : 'Payment was cancelled.');
        showToast(msg, 'error');
        setSubmitting(false);
        return;
      }

      // 4. 서버 사이드 결제 검증
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: response.paymentId,
          orderId,
          expectedAmount: displayAmount,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        showToast(
          isKorean ? '결제 검증에 실패했습니다.' : 'Payment verification failed.',
          'error'
        );
        setSubmitting(false);
        return;
      }

      // 5. Firestore 주문 업데이트 (Paid)
      await updateOrderPayment(firestoreId, response.paymentId, 'Paid');
      clearCheckoutItems();

      // 6. 완료 페이지로 이동
      router.push(`/shop/checkout/complete?orderId=${orderId}`);
    } catch (err) {
      console.error('결제 처리 실패:', err);
      showToast(
        isKorean ? '결제 처리 중 오류가 발생했습니다.' : 'An error occurred during payment.',
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return <div className={styles.container}><p>Loading...</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t.checkout.title}</h1>

      <div className={styles.grid}>
        {/* Left: Shipping + Payment */}
        <div className={styles.formSection}>
          <div className={styles.sectionBlock}>
            <h2>{t.checkout.shippingInfo}</h2>
            <div className={styles.formGroup}>
              <label>{t.checkout.labels.recipient}</label>
              <input type="text" name="recipient" className={styles.input} value={shipping.recipient} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>{t.checkout.labels.phone}</label>
              <input type="tel" name="phone" placeholder="010-0000-0000" className={styles.input} value={shipping.phone} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>{t.checkout.labels.address}</label>
              <div className={styles.addressGroup}>
                <input type="text" name="postalCode" placeholder={isKorean ? '우편번호' : 'Postal Code'} className={styles.inputShort} value={shipping.postalCode} onChange={handleChange} />
                <button type="button" className={styles.searchBtn}>
                  {isKorean ? '검색' : 'Find'}
                </button>
              </div>
              <input type="text" name="address1" placeholder={isKorean ? '기본 주소' : 'Address Line 1'} className={styles.input} style={{ marginTop: '10px' }} value={shipping.address1} onChange={handleChange} />
              <input type="text" name="address2" placeholder={isKorean ? '상세 주소' : 'Address Line 2'} className={styles.input} style={{ marginTop: '10px' }} value={shipping.address2} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>{t.checkout.labels.memo}</label>
              <input type="text" name="memo" placeholder={isKorean ? '예: 문 앞에 놔주세요' : 'Ex: Leave at front door'} className={styles.input} value={shipping.memo} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <h2>{t.checkout.paymentInfo}</h2>
            <div className={styles.paymentMethods}>
              {isKorean ? (
                <>
                  <div className={`${styles.payMethod} ${styles.active}`}>
                    Credit Card
                  </div>
                  <div className={styles.payMethod}>Bank Transfer</div>
                </>
              ) : (
                <div className={`${styles.payMethod} ${styles.active}`}>
                  PayPal
                </div>
              )}
            </div>
            <p className={styles.paymentNote}>
              {isKorean
                ? '결제하기 버튼을 누르면 결제 창이 열립니다.'
                : 'A secure payment window will open when you click the button.'}
            </p>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className={styles.summarySection}>
          <div className={styles.summaryCard}>
            <h2>{t.checkout.orderSummary}</h2>
            <div className={styles.itemList}>
              {items.map((item, idx) => (
                <div key={idx} className={styles.item}>
                  <div className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.label}</div>
                    <div className={styles.itemMeta}>{item.quantity}ea</div>
                  </div>
                  <div className={styles.itemPrice}>
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.totalRow}>
              <span>{isKorean ? '상품 금액' : 'Subtotal'}</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className={styles.shippingRow}>
              <span>{isKorean ? '배송비' : 'Shipping'}</span>
              <span>{shippingFee > 0 ? formatCurrency(shippingFee) : 'Free'}</span>
            </div>
            <div className={styles.totalRow}>
              <span>{isKorean ? '총 결제 금액' : 'Total'}</span>
              <span className={styles.totalPrice}>{formatCurrency(displayAmount)}</span>
            </div>

            <button
              className={styles.checkoutBtn}
              onClick={handlePayment}
              disabled={submitting}
            >
              {submitting
                ? (isKorean ? '결제 진행 중...' : 'Processing...')
                : t.checkout.btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
