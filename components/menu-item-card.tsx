'use client';

import { MenuItemType, useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Image from 'next/image';

interface MenuItemCardProps {
  item: MenuItemType;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCartStore();

  const handleAddItem = () => {
    addItem(item);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Image */}
      <div className="relative w-full h-40 bg-muted overflow-hidden">
        <Image
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="font-semibold text-foreground line-clamp-2">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-lg font-bold text-primary">
            {(item.price / 1000).toFixed(0)}K
          </span>
          <Button
            onClick={handleAddItem}
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
