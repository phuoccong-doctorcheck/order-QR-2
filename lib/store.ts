import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  quantity: number;
}

export interface MenuItemType {
  id: string;
  categoryId: string;
  name: string;
  nameVi?: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  nameVi: string;
}

interface CustomerStore {
  customerName: string;
  tableNumber: string;
  setCustomerInfo: (name: string, table: string) => void;
  clearCustomerInfo: () => void;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItemType) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set) => ({
      customerName: '',
      tableNumber: '',
      setCustomerInfo: (name, table) => set({ customerName: name, tableNumber: table }),
      clearCustomerInfo: () => set({ customerName: '', tableNumber: '' }),
    }),
    {
      name: 'customer-storage',
    }
  )
);

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        }),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        })),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== itemId)
              : state.items.map((i) =>
                  i.id === itemId ? { ...i, quantity } : i
                ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
