import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, updateOrderStatus, type Order } from '@/lib/orders-store';

export async function GET(request: NextRequest) {
  try {
    // Get all orders from shared store
    const allOrders = getAllOrders();

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const tableNumber = searchParams.get('table');

    // Filter orders based on status
    let filteredOrders = allOrders;
    if (status && status !== 'ALL') {
      filteredOrders = filteredOrders.filter((order) => order.status === status);
    }

    // Filter orders based on table number
    if (tableNumber) {
      filteredOrders = filteredOrders.filter((order) => order.tableNumber === tableNumber);
    }

    return NextResponse.json({
      success: true,
      totalOrders: filteredOrders.length,
      orders: filteredOrders,
    });
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Missing orderId or status' },
        { status: 400 }
      );
    }

    // Validate status
    if (!['NEW', 'PREPARING', 'DONE'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update order status
    const updatedOrder = updateOrderStatus(orderId, status);

    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
