export interface CheckoutItem {
  label: string;
  price: number;
  quantity: number;
}

const CART_KEY = 'rminu_checkout_items';

export function setCheckoutItems(items: CheckoutItem[]): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function getCheckoutItems(): CheckoutItem[] {
  if (typeof window === 'undefined') return [];
  const raw = sessionStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CheckoutItem[];
  } catch {
    return [];
  }
}

export function clearCheckoutItems(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(CART_KEY);
}
