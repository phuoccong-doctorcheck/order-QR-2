'use client';

import { useRouter } from 'next/navigation';
import { useCartStore, useCustomerStore } from '@/lib/store';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import CartItem from './cart-item';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { customerName, tableNumber } = useCustomerStore();
  const totalPrice = getTotalPrice();

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          tableNumber,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalPrice,
        }),
      });

      if (!response.ok) throw new Error('Failed to place order');

      clearCart();
      onOpenChange(false);
      router.push('/success');
    } catch (error) {
      toast.error('Lỗi khi đặt món. Vui lòng thử lại.');
      console.error(error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b border-border">
          <DrawerTitle>Giỏ hàng</DrawerTitle>
        </DrawerHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Giỏ hàng trống</p>
            <DrawerClose asChild>
              <Button variant="outline" className="mt-4 bg-transparent">
                Quay lại menu
              </Button>
            </DrawerClose>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <Separator className="my-0" />

            {/* Total */}
            <div className="px-4 py-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Tổng cộng:</span>
                <span className="text-2xl font-bold text-primary">
                  {(totalPrice / 1000).toFixed(0)}K
                </span>
              </div>

              <DrawerFooter className="flex-row gap-3 px-0">
                <DrawerClose asChild>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Tiếp tục mua
                  </Button>
                </DrawerClose>
                <Button onClick={handlePlaceOrder} className="flex-1">
                  Đặt món
                </Button>
              </DrawerFooter>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
