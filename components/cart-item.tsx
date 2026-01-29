'use client';

import { CartItem as CartItemType, useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-3 pb-4 border-b border-border last:border-0">
      {/* Image */}
      <div className="relative w-20 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
        <Image
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground line-clamp-2">
          {item.name}
        </h4>
        <p className="text-sm text-primary font-semibold mt-1">
          {(item.price / 1000).toFixed(0)}K
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 rounded-full bg-transparent"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="w-8 text-center font-semibold text-sm">
            {item.quantity}
          </span>
          <Button
            size="sm"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 ml-auto text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <p className="font-bold text-foreground">
          {((item.price * item.quantity) / 1000).toFixed(0)}K
        </p>
      </div>
    </div>
  );
}
