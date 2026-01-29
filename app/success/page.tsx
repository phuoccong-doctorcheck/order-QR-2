'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCustomerStore, useCartStore } from '@/lib/store';
import { CheckCircle, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function SuccessPage() {
  const router = useRouter();
  const { customerName, tableNumber, clearCustomerInfo } = useCustomerStore();
  const { items, clearCart } = useCartStore();
  const [orderNumber] = useState(`#${Math.floor(Math.random() * 10000)}`);

  // Redirect if no customer info
  useEffect(() => {
    if (!customerName || !tableNumber) {
      router.push('/');
    }
  }, [customerName, tableNumber, router]);

  if (!customerName || !tableNumber) return null;

  const handleOrderMore = () => {
    router.push('/menu');
  };

  const handleCallStaff = async () => {
    try {
      await fetch('/api/call-staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, tableNumber }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary rounded-full p-4">
            <CheckCircle className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2 text-foreground">
          Đặt thành công!
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Món ăn của bạn đang được chuẩn bị
        </p>

        {/* Order Number */}
        <div className="bg-secondary rounded-lg p-4 mb-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">Mã đơn hàng</p>
          <p className="text-3xl font-bold text-primary">{orderNumber}</p>
        </div>

        {/* Order Details */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Khách hàng:</span>
            <span className="font-semibold text-foreground">{customerName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Bàn số:</span>
            <span className="font-semibold text-foreground">{tableNumber}</span>
          </div>
          <Separator />
        </div>

        {/* Items Summary */}
        {items.length > 0 && (
          <div className="bg-secondary rounded-lg p-4 mb-6">
            <p className="text-sm font-semibold text-foreground mb-3">
              Tóm tắt đơn hàng
            </p>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-semibold text-foreground">
                    {((item.price * item.quantity) / 1000).toFixed(0)}K
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleOrderMore}
            className="w-full h-12 text-base font-semibold"
          >
            Gọi thêm món
          </Button>
          <Button
            onClick={handleCallStaff}
            variant="outline"
            className="w-full h-12 text-base font-semibold bg-transparent"
          >
            <Phone className="w-5 h-5 mr-2" />
            Gọi nhân viên
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Cảm ơn bạn đã đặt hàng tại nhà hàng của chúng tôi!
        </p>
      </Card>
    </div>
  );
}
