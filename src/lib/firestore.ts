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
