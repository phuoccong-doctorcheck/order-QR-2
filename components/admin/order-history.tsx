'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { type Order, type OrderItem } from '@/lib/orders-store';

interface OrderHistoryProps {
  allOrders: Order[];
  formatTime: (isoString: string) => string;
  getStatusLabel: (status: string) => string;
  getStatusBadgeVariant: (status: string) => any;
}

export default function OrderHistory({
  allOrders,
  formatTime,
  getStatusLabel,
  getStatusBadgeVariant,
}: OrderHistoryProps) {
  const [searchTable, setSearchTable] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    let result = allOrders.filter((order) => order.status === 'DONE');

    if (searchTable) {
      result = result.filter((order) => order.tableNumber.includes(searchTable));
    }

    // Sort by createdAt descending (newest first)
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setFilteredOrders(result);
  }, [allOrders, searchTable]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Tìm kiếm bàn số..."
          value={searchTable}
          onChange={(e) => setSearchTable(e.target.value)}
          className="flex-1 max-w-xs"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-muted-foreground text-lg">Không có đơn hàng hoàn tất</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">Bàn {order.tableNumber} - {order.customerName}</p>
                  <p className="text-sm text-muted-foreground">{formatTime(order.createdAt)}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(order.status)}>{getStatusLabel(order.status)}</Badge>
              </div>

              <div className="bg-background rounded-lg p-3 space-y-2">
                {order.items.map((item: OrderItem) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground">
                      {item.quantity} × {item.name}
                    </span>
                    <span className="text-muted-foreground">{item.price.toLocaleString('vi-VN')}đ</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-semibold mt-3 pt-3 border-t border-border">
                <span>Tổng:</span>
                <span>{order.totalPrice.toLocaleString('vi-VN')}đ</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
