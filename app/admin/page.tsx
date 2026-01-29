'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { AlertCircle, Volume2, VolumeX, History } from 'lucide-react';
import { toast } from 'sonner';
import OrderHistory from '@/components/admin/order-history';
import MenuManagement from '@/components/admin/menu-management';
import type { Order, OrderItem } from '@/lib/orders-store';

const POLL_INTERVAL = 3000; // Poll every 3 seconds

interface OrdersByTable {
  [tableNumber: string]: Order[];
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchTable, setSearchTable] = useState<string>('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [newOrderIds, setNewOrderIds] = useState<Set<string>>(new Set());
  const [currentTab, setCurrentTab] = useState<'orders' | 'menu'>('orders');
  const lastFetchRef = useRef<Order[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const notificationShownRef = useRef<Set<string>>(new Set());

  // Fetch orders from admin API
  const fetchOrders = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (activeTab !== 'ALL') {
        params.append('status', activeTab);
      }
      if (searchTable) {
        params.append('table', searchTable);
      }

      const response = await fetch(`/api/admin/orders?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch orders');

      const data = await response.json();
      const currentOrders = data.orders || [];

      // Detect new orders
      const previousIds = new Set(lastFetchRef.current.map((o) => o.id));
      const newIds = currentOrders
        .filter((o: Order) => !previousIds.has(o.id) && o.status === 'NEW')
        .map((o: Order) => o.id);

      if (newIds.length > 0 && notificationsEnabled) {
        setNewOrderIds((prev) => new Set([...prev, ...newIds]));

        // Show toast notification
        toast.success(`${newIds.length} new order(s) received!`, {
          icon: <AlertCircle className="w-5 h-5" />,
        });

        // Play sound if enabled
        if (audioRef.current) {
          audioRef.current.play().catch(() => {
            console.log('Could not play notification sound');
          });
        }
      }

      setOrders(currentOrders);
      lastFetchRef.current = currentOrders;
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [activeTab, searchTable, notificationsEnabled]);

  // Polling effect
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // Apply filters
  useEffect(() => {
    let result = orders;

    if (activeTab !== 'ALL') {
      result = result.filter((order) => order.status === activeTab);
    }

    if (searchTable) {
      result = result.filter((order) => order.tableNumber.includes(searchTable));
    }

    setFilteredOrders(result);
  }, [orders, activeTab, searchTable]);

  // Group orders by table
  const ordersByTable: OrdersByTable = {};
  filteredOrders.forEach((order) => {
    if (!ordersByTable[order.tableNumber]) {
      ordersByTable[order.tableNumber] = [];
    }
    ordersByTable[order.tableNumber].push(order);
  });

  // Sort tables by first order time
  const sortedTables = Object.keys(ordersByTable).sort((a, b) => {
    const firstOrderA = ordersByTable[a][0];
    const firstOrderB = ordersByTable[b][0];
    return new Date(firstOrderA.createdAt).getTime() - new Date(firstOrderB.createdAt).getTime();
  });

  const handleUpdateStatus = async (orderId: string, newStatus: 'PREPARING' | 'DONE') => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update order');

      // Remove from new orders if status changed
      setNewOrderIds((prev) => {
        const next = new Set(prev);
        next.delete(orderId);
        return next;
      });

      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'default';
      case 'PREPARING':
        return 'secondary';
      case 'DONE':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'Mới';
      case 'PREPARING':
        return 'Đang làm';
      case 'DONE':
        return 'Hoàn tất';
      default:
        return status;
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            {currentTab === 'orders' ? 'Quản lý Đơn hàng' : 'Quản lý Menu'}
          </h1>
          {currentTab === 'orders' && (
            <div className="flex items-center gap-3">
              <Button
                variant={notificationsEnabled ? 'default' : 'outline'}
                size="sm"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              >
                {notificationsEnabled ? (
                  <Volume2 className="w-4 h-4 mr-2" />
                ) : (
                  <VolumeX className="w-4 h-4 mr-2" />
                )}
                {notificationsEnabled ? 'Bật' : 'Tắt'}
              </Button>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <Tabs value={currentTab} onValueChange={(val) => setCurrentTab(val as 'orders' | 'menu')}>
          <TabsList>
            <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Orders-specific filters */}
        {currentTab === 'orders' && (
          <>
            {/* Search and Filters */}
            <div className="flex gap-3 mt-4 mb-4">
              <Input
                placeholder="Tìm kiếm bàn số..."
                value={searchTable}
                onChange={(e) => setSearchTable(e.target.value)}
                className="flex-1 max-w-xs"
              />
              <Button
                variant={showHistory ? 'default' : 'outline'}
                onClick={() => setShowHistory(!showHistory)}
              >
                <History className="w-4 h-4 mr-2" />
                Lịch sử
              </Button>
            </div>

            {/* Status Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="ALL">Tất cả</TabsTrigger>
                <TabsTrigger value="NEW">Mới</TabsTrigger>
                <TabsTrigger value="PREPARING">Đang làm</TabsTrigger>
                <TabsTrigger value="DONE">Hoàn tất</TabsTrigger>
              </TabsList>
            </Tabs>
          </>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {currentTab === 'menu' ? (
          <MenuManagement />
        ) : showHistory ? (
          <OrderHistory
            allOrders={orders}
            formatTime={formatTime}
            getStatusLabel={getStatusLabel}
            getStatusBadgeVariant={getStatusBadgeVariant}
          />
        ) : (
          <>
            {filteredOrders.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-muted-foreground text-lg">Không có đơn hàng</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {sortedTables.map((tableNumber) => (
                  <div key={tableNumber} className="border border-border rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-muted px-4 py-3 border-b border-border">
                      <h2 className="text-lg font-semibold text-foreground">Bàn {tableNumber}</h2>
                    </div>

                    {/* Orders for this table */}
                    <div className="divide-y divide-border">
                      {ordersByTable[tableNumber].map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          isNew={newOrderIds.has(order.id)}
                          onUpdateStatus={handleUpdateStatus}
                          getStatusBadgeVariant={getStatusBadgeVariant}
                          getStatusLabel={getStatusLabel}
                          formatTime={formatTime}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Hidden audio element for notification sound */}
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==" />
    </main>
  );
}

interface OrderCardProps {
  order: Order;
  isNew: boolean;
  onUpdateStatus: (orderId: string, status: 'PREPARING' | 'DONE') => void;
  getStatusBadgeVariant: (status: string) => any;
  getStatusLabel: (status: string) => string;
  formatTime: (isoString: string) => string;
}

function OrderCard({
  order,
  isNew,
  onUpdateStatus,
  getStatusBadgeVariant,
  getStatusLabel,
  formatTime,
}: OrderCardProps) {
  return (
    <div className={`px-4 py-4 ${isNew ? 'bg-orange-50 border-l-4 border-orange-400' : ''}`}>
      {/* Order Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-foreground">{order.customerName}</p>
          <p className="text-sm text-muted-foreground">{formatTime(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          {isNew && <Badge className="bg-orange-400">Mới</Badge>}
          <Badge variant={getStatusBadgeVariant(order.status)}>{getStatusLabel(order.status)}</Badge>
        </div>
      </div>

      {/* Items */}
      <div className="bg-card border border-border rounded-lg p-3 mb-3">
        <div className="space-y-2">
          {order.items.map((item: OrderItem) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-foreground">
                {item.quantity} × {item.name}
              </span>
              <span className="text-muted-foreground">{item.price.toLocaleString('vi-VN')}đ</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-2 pt-2 flex justify-between font-semibold">
          <span>Tổng:</span>
          <span>{order.totalPrice.toLocaleString('vi-VN')}đ</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {order.status === 'NEW' && (
          <Button
            size="sm"
            variant="default"
            onClick={() => onUpdateStatus(order.id, 'PREPARING')}
            className="flex-1"
          >
            Đang làm
          </Button>
        )}
        {order.status === 'PREPARING' && (
          <Button
            size="sm"
            variant="default"
            onClick={() => onUpdateStatus(order.id, 'DONE')}
            className="flex-1"
          >
            Hoàn tất
          </Button>
        )}
        {order.status === 'DONE' && (
          <Button size="sm" variant="outline" disabled className="flex-1 bg-transparent">
            Hoàn tất
          </Button>
        )}
      </div>
    </div>
  );
}
