import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ============================
// Types
// ============================

export type OrderStatus = 'Paid' | 'Pending' | 'Shipped' | 'Cancelled';

export interface Order {
  id: string; // Firestore doc ID
  orderId: string; // 표시용 (ORD-001 등)
  user: string;
  email?: string;
  item: string;
  amount: number;
  status: OrderStatus;
  date: string; // YYYY-MM-DD
  paymentId?: string;
  createdAt?: Timestamp;
}

export interface CalendarEvent {
  id: string; // Firestore doc ID
  date: string; // YYYY-MM-DD
  title: string;
  type: 'meeting' | 'deadline' | 'other';
  participants?: string;
  createdAt?: Timestamp;
}

export interface Inquiry {
  id: string;
  company: string;
  email: string;
  region: string;
  inquiryType: string;
  message: string;
  createdAt?: Timestamp;
}

// ============================
// Orders
// ============================

const ordersRef = collection(db, 'orders');

export async function getOrders(): Promise<Order[]> {
  const q = query(ordersRef, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
  const q = query(ordersRef, where('status', '==', status), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function addOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(ordersRef, {
    ...order,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  await updateDoc(doc(db, 'orders', id), { status });
}

export async function deleteOrder(id: string): Promise<void> {
  await deleteDoc(doc(db, 'orders', id));
}

// ============================
// Calendar Events
// ============================

const eventsRef = collection(db, 'calendarEvents');

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const q = query(eventsRef, orderBy('date', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CalendarEvent));
}

export async function addCalendarEvent(
  event: Omit<CalendarEvent, 'id' | 'createdAt'>
): Promise<string> {
  const docRef = await addDoc(eventsRef, {
    ...event,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteCalendarEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, 'calendarEvents', id));
}

// ============================
// Inquiries
// ============================

const inquiriesRef = collection(db, 'inquiries');

export async function getInquiries(): Promise<Inquiry[]> {
  const q = query(inquiriesRef, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Inquiry));
}

export async function addInquiry(inq: Omit<Inquiry, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(inquiriesRef, {
    ...inq,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateOrderPayment(
  id: string,
  paymentId: string,
  status: OrderStatus
): Promise<void> {
  await updateDoc(doc(db, 'orders', id), { paymentId, status });
}

export async function deleteUser(uid: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid));
}

// ============================
// Dashboard 통계
// ============================

export interface DashboardStats {
  totalOrders: number;
  revenue: number;
  pendingShipments: number;
  totalInquiries: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const orders = await getOrders();
  const inquiries = await getInquiries();

  const activeOrders = orders.filter((o) => o.status !== 'Cancelled');
  const revenue = activeOrders.reduce((sum, o) => sum + o.amount, 0);
  const pendingShipments = orders.filter((o) => o.status === 'Paid' || o.status === 'Pending').length;

  return {
    totalOrders: orders.length,
    revenue,
    pendingShipments,
    totalInquiries: inquiries.length,
  };
}

// ============================
// Config & Settings
// ============================

export interface PopupConfig {
  isEnabled: boolean;
  title: string;
  imagePath: string;
  updatedAt: string;
}

export async function getPopupConfig(): Promise<PopupConfig> {
  const docRef = doc(db, 'config', 'popup');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data() as PopupConfig;
  }
  // Default values
  return {
    isEnabled: false,
    title: '라캉 전문가용 무료 테스트 이벤트',
    imagePath: '/라캉-무료테스트-전단.png',
    updatedAt: new Date().toISOString(),
  };
}

export async function updatePopupConfig(config: PopupConfig): Promise<void> {
  const docRef = doc(db, 'config', 'popup');
  await updateDoc(docRef, { ...config });
}

// ============================
// TradeKorea Checklist
// ============================

export interface ChecklistItem {
  id: number;
  title: string;
  completed: boolean;
}

export async function getTradeKoreaChecklist(): Promise<ChecklistItem[]> {
  const docRef = doc(db, 'checklists', 'tradekorea');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data().items as ChecklistItem[];
  }
  // Default checklist
  return [
    { id: 1, title: '트레이드코리아 계정 생성 (Seller Account)', completed: true },
    { id: 2, title: '영문 사업자등록증 제출 (Biz License)', completed: true },
    { id: 3, title: '통신판매업신고증 제출 (Online Sales Permit)', completed: true },
    { id: 4, title: '미니사이트 로고/배너 등록 (Mini-site Design)', completed: false },
    { id: 5, title: '대표 상품 (왁스) 5개 이상 등록 (Product Listing)', completed: false },
    { id: 6, title: 'KITA (한국무역협회) 회원 인증 (KITA Member)', completed: false },
  ];
}

export async function updateTradeKoreaChecklist(items: ChecklistItem[]): Promise<void> {
  const docRef = doc(db, 'checklists', 'tradekorea');
  const snap = await getDoc(docRef);
  if (!snap.exists()) {
    // Note: In real production, you might need to use setDoc if it doesn't exist
    // But for this project, I'll assume db.collection().doc() set is fine.
    // I'll use a safer approach in implementation if needed.
  }
  // Simplified for this context
  const { setDoc } = await import('firebase/firestore');
  await setDoc(docRef, { items, updatedAt: serverTimestamp() });
}
