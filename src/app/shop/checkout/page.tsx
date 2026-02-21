'use client';

import React, { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import styles from './checkout.module.css';
import { addOrder } from '@/lib/firestore';

function CheckoutContent() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const [shipping, setShipping] = useState({
    recipient: '',
    phone: '',
    postalCode: '',
    address1: '',
    address2: '',
    memo: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [submitting, setSubmitting] = useState(false);

  // 주문 상품 (향후 장바구니/URL 파라미터에서 확장 가능)
  const orderItem = { name: 'Alminer Hard Wax (200g)', qty: 1, price: 9500 };
  const shippingFee = 3000;
  const total = orderItem.price * orderItem.qty + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!shipping.recipient || !shipping.phone || !shipping.address1) {
      showToast('배송 정보를 입력해주세요.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const orderId = `ORD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      await addOrder({
        orderId,
        user: shipping.recipient,
        email: user?.email || '',
        item: orderItem.name,
        amount: total,
        status: 'Pending',
        date: dateStr,
      });

      showToast('주문이 접수되었습니다!', 'success');
      router.push('/shop');
    } catch (err) {
      console.error('주문 접수 실패:', err);
      showToast('주문 접수에 실패했습니다.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const paymentMethods = [
    { id: 'card', label: 'Credit Card' },
    { id: 'bank', label: 'Bank Transfer' },
    { id: 'naver', label: 'Naver Pay' },
  ];

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
                <input type="text" name="postalCode" placeholder="Postal Code" className={styles.inputShort} value={shipping.postalCode} onChange={handleChange} />
                <button type="button" className={styles.searchBtn}>Find</button>
              </div>
              <input type="text" name="address1" placeholder="Address Block 1" className={styles.input} style={{ marginTop: '10px' }} value={shipping.address1} onChange={handleChange} />
              <input type="text" name="address2" placeholder="Detail Address" className={styles.input} style={{ marginTop: '10px' }} value={shipping.address2} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>{t.checkout.labels.memo}</label>
              <input type="text" name="memo" placeholder="Ex: Leave at front door" className={styles.input} value={shipping.memo} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <h2>{t.checkout.paymentInfo}</h2>
            <div className={styles.paymentMethods}>
              {paymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  className={`${styles.payMethod} ${paymentMethod === pm.id ? styles.active : ''}`}
                  onClick={() => setPaymentMethod(pm.id)}
                >
                  {pm.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className={styles.summarySection}>
          <div className={styles.summaryCard}>
            <h2>{t.checkout.orderSummary}</h2>
            <div className={styles.itemList}>
              <div className={styles.item}>
                <div className={styles.itemImg} />
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{orderItem.name}</div>
                  <div className={styles.itemMeta}>{orderItem.qty} ea</div>
                </div>
                <div className={styles.itemPrice}>{orderItem.price.toLocaleString()}원</div>
              </div>
            </div>

            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <span className={styles.totalPrice}>{total.toLocaleString()}원</span>
            </div>
            <div className={styles.shippingRow}>
              <span>Shipping</span>
              <span>{shippingFee.toLocaleString()}원</span>
            </div>

            <button className={styles.checkoutBtn} onClick={handleSubmit} disabled={submitting}>
              {submitting ? '주문 처리 중...' : t.checkout.btn}
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
