'use client';

import React, { useState } from 'react';
import styles from './AdminComponents.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface Order {
  id: string;
  user: string;
  item: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Shipped' | 'Cancelled';
  date: string;
  paymentId?: string; // Portone imp_uid
}

/* Order Manager - Korean Localized */

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-001', user: '김민지', item: '알마이너 하드 왁스 500g', amount: 32000, status: 'Shipped', date: '2024-05-20', paymentId: 'imp_83921021' },
  { id: 'ORD-002', user: '이준호', item: '라칸 베이직 프로토콜 키트', amount: 154000, status: 'Paid', date: '2024-05-21', paymentId: 'imp_12093120' },
  { id: 'ORD-003', user: '박지성', item: '알마이너 200g 리필', amount: 18000, status: 'Pending', date: '2024-05-21' },
  { id: 'ORD-004', user: '최수지', item: '라칸 프로 왁스 워머기', amount: 89000, status: 'Cancelled', date: '2024-05-19' },
];

export default function OrderManager() {
  const { language } = useLanguage();
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [filter, setFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getLocalizedStatus = (status: string) => {
    switch (status) {
      case 'Paid': return '결제완료';
      case 'Pending': return '대기중';
      case 'Shipped': return '배송중';
      case 'Cancelled': return '취소됨';
      case 'All': return '전체';
      default: return status;
    }
  };

  const updateStatus = (id: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className={styles.componentContainer}>
      <h2 className={styles.title}>주문 관리</h2>
      
      <div className={styles.filterBar}>
        {['All', 'Paid', 'Pending', 'Shipped', 'Cancelled'].map(f => (
          <button 
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.activeFilter : ''}`}
            onClick={() => setFilter(f)}
          >
            {getLocalizedStatus(f)}
          </button>
        ))}
      </div>

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
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user}</td>
              <td>{order.item}</td>
              <td>{order.amount.toLocaleString()}원</td>
              <td><span className={styles.code}>{order.paymentId || '-'}</span></td>
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
                     onChange={(e) => updateStatus(order.id, e.target.value as any)}
                   >
                     <option value="Pending">대기중</option>
                     <option value="Paid">결제완료</option>
                     <option value="Shipped">배송중</option>
                     <option value="Cancelled">취소됨</option>
                   </select>
                   <button 
                     className={styles.viewBtn} 
                     onClick={() => setSelectedOrder(order)}
                   >
                     보기
                   </button>
                 </div>
               </td>
             </tr>
           ))}
         </tbody>
       </table>

       {/* Order Detail Modal */}
       {selectedOrder && (
         <div className={styles.modalOverlay} onClick={() => setSelectedOrder(null)}>
           <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
             <div className={styles.modalHeader}>
               <h3>주문 상세 정보: {selectedOrder.id}</h3>
               <button className={styles.closeBtn} onClick={() => setSelectedOrder(null)}>&times;</button>
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
                   <p><span className={`${styles.badge} ${styles['badge' + selectedOrder.status]}`}>{getLocalizedStatus(selectedOrder.status)}</span></p>
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
                    <button className={styles.cancelOrderBtn} onClick={() => { updateStatus(selectedOrder.id, 'Cancelled'); setSelectedOrder(null); }}>
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
