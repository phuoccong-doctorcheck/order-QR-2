import { NextRequest, NextResponse } from 'next/server';
import { addOrder, getAllOrders, type Order, type OrderItem } from '@/lib/orders-store';

const orders: Order[] = []; // Declare the orders variable

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, tableNumber, items, totalPrice } = body;

    // Validate input
    if (!customerName || !tableNumber || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Create order object
    const now = new Date().toISOString();
    const order: Order = {
      id: `ORD-${Date.now()}`,
      customerName,
      tableNumber: String(tableNumber),
      items: items.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
      status: 'NEW',
      createdAt: now,
      updatedAt: now,
    };

    // Store order using shared store
    addOrder(order);

    // Log order (in production, this would be saved to database)
    console.log('[Order Created]', order);

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        message: 'Đơn hàng đã được tạo thành công',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve orders (for debugging/admin)
export async function GET(request: NextRequest) {
  const allOrders = getAllOrders();
  return NextResponse.json({
    totalOrders: allOrders.length,
    orders: allOrders.map((order) => ({
      id: order.id,
      customer: order.customerName,
      table: order.tableNumber,
      items: order.items.length,
      total: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
    })),
  });
}
