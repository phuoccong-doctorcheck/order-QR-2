export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  tableNumber: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'NEW' | 'PREPARING' | 'DONE';
  createdAt: string;
  updatedAt: string;
}

// In-memory storage for orders (in production, use a database)
let orders: Order[] = [];

export function addOrder(order: Order): Order {
  orders.push(order);
  return order;
}

export function getAllOrders(): Order[] {
  return orders;
}

export function getOrderById(orderId: string): Order | undefined {
  return orders.find((order) => order.id === orderId);
}

export function updateOrderStatus(orderId: string, status: 'NEW' | 'PREPARING' | 'DONE'): Order | null {
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  }
  return null;
}

export function clearOrders(): void {
  orders = [];
}
