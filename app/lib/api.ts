const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(err.detail ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export type BackendProduct = {
  id: string;
  slug: string;
  name: string;
  pricing: { label: string; price: number }[];
};

export type CreateOrderPayload = {
  items: {
    product_id: string;
    slug: string;
    name: string;
    sku_label: string;
    quantity: number;
    unit_price: number;
  }[];
  shipping_address: {
    full_name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  guest_email?: string;
  notes?: string;
};

export type OrderResponse = {
  id: string;
  total: number;
  subtotal: number;
  shipping_fee: number;
  status: string;
  payment_status: string;
};

export const api = {
  getProduct: (slug: string) => apiFetch<BackendProduct>(`/products/${slug}`),

  createOrder: (payload: CreateOrderPayload) =>
    apiFetch<OrderResponse>('/orders/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
