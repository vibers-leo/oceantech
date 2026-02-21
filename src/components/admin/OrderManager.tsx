'use client';

import React, { useState, useEffect } from 'react';
import styles from './AdminComponents.module.css';
import { useLanguage } from '@/context/LanguageContext';
import {
  type Order,
  type OrderStatus,
  getOrders,
  updateOrderStatus,
} from '@/lib/firestore';

export default function OrderManager() {
  const { language } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Firestore에서 주문 목록 로드
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error('주문 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedStatus = (status: string) => {
    if (language !== 'ko') return status;
    switch (status) {
      case 'Paid': return '결제완료';
      case 'Pending': return '대기중';
      case 'Shipped': return '배송중';
      case 'Cancelled': return '취소됨';
      case 'All': return '전체';
      default: return status;
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
      if (selectedOrder?.id === id) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error('상태 변경 실패:', err);
    }
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className={styles.componentContainer}>
      <h2 className={styles.title}>주문 관리</h2>

      <div className={styles.filterBar}>
        {['All', 'Paid', 'Pending', 'Shipped', 'Cancelled'].map((f) => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.activeFilter : ''}`}
            onClick={() => setFilter(f)}
          >
            {getLocalizedStatus(f)}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
          주문 데이터를 불러오는 중...
        </p>
      ) : filteredOrders.length === 0 ? (
        <p style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
          {filter === 'All' ? '등록된 주문이 없습니다.' : `${getLocalizedStatus(filter)} 상태의 주문이 없습니다.`}
        </p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>주문번호</th>
              <th>주문자</th>
              <th>상품명</th>
              <th>결제금액</th>
              <th>포트원 ID</th>
              <th>일자</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderId}</td>
                <td>{order.user}</td>
                <td>{order.item}</td>
                <td>{order.amount.toLocaleString()}원</td>
                <td>
                  <span className={styles.code}>{order.paymentId || '-'}</span>
                </td>
                <td>{order.date}</td>
                <td>
                  <span className={`${styles.badge} ${styles['badge' + order.status]}`}>
                    {getLocalizedStatus(order.status)}
                  </span>
                </td>
                <td>
                  <div className={styles.actionCell}>
                    <select
                      className={styles.actionSelect}
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                    >
                      <option value="Pending">대기중</option>
                      <option value="Paid">결제완료</option>
                      <option value="Shipped">배송중</option>
                      <option value="Cancelled">취소됨</option>
                    </select>
                    <button className={styles.viewBtn} onClick={() => setSelectedOrder(order)}>
                      보기
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className={styles.modalOverlay} onClick={() => setSelectedOrder(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>주문 상세 정보: {selectedOrder.orderId}</h3>
              <button className={styles.closeBtn} onClick={() => setSelectedOrder(null)}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>구매자</label>
                  <p>{selectedOrder.user}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>주문일</label>
                  <p>{selectedOrder.date}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>결제 ID (imp_uid)</label>
                  <p className={styles.code}>{selectedOrder.paymentId || 'N/A'}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>주문 상태</label>
                  <p>
                    <span className={`${styles.badge} ${styles['badge' + selectedOrder.status]}`}>
                      {getLocalizedStatus(selectedOrder.status)}
                    </span>
                  </p>
                </div>
              </div>

              <div className={styles.modalItemsSection}>
                <h4>주문 상품</h4>
                <div className={styles.orderItemRow}>
                  <span>{selectedOrder.item}</span>
                  <span>1 x {selectedOrder.amount.toLocaleString()}원</span>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <div className={styles.totalAmount}>
                  <span>합계</span>
                  <strong>{selectedOrder.amount.toLocaleString()}원</strong>
                </div>
                <div className={styles.modalActions}>
                  <button
                    className={styles.cancelOrderBtn}
                    onClick={() => {
                      handleUpdateStatus(selectedOrder.id, 'Cancelled');
                      setSelectedOrder(null);
                    }}
                  >
                    주문 취소
                  </button>
                  <button className={styles.confirmBtn} onClick={() => setSelectedOrder(null)}>
                    확인
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
