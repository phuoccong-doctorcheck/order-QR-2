'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search, Phone, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCustomerStore, useCartStore } from '@/lib/store';
import CartDrawer from '@/components/cart-drawer';
import MenuItemCard from '@/components/menu-item-card';
import CallStaffDialog from '@/components/call-staff-dialog';
import EditCustomerDialog from '@/components/edit-customer-dialog';
import type { Category, MenuItemType } from '@/lib/store';

export default function MenuPage() {
  const router = useRouter();
  const { customerName, tableNumber } = useCustomerStore();
  const { getItemCount } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [callStaffOpen, setCallStaffOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch menu data
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/admin/menu');
        if (!response.ok) throw new Error('Failed to fetch menu');
        const data = await response.json();
        setCategories(data.categories || []);
        setMenuItems(data.items || []);
        if (data.categories.length > 0) {
          setSelectedCategory(data.categories[0].id);
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.categoryId === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const itemCount = getItemCount();

  // Redirect to home if no customer info
  if (!customerName || !tableNumber) {
    router.push('/');
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Đang tải menu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Menu</h1>
              <button
                onClick={() => setEditOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {customerName} - Bàn {tableNumber}
              </button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setEditOpen(true)}
              title="Sửa thông tin"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      {/* Categories Navigation */}
      <div className="sticky top-24 z-30 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="w-full justify-start border-0 rounded-none bg-transparent h-auto p-0 gap-2">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent text-sm font-medium px-4 py-3"
                >
                  {category.nameVi}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Menu Items Grid */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Không tìm thấy món ăn phù hợp</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-card shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex gap-3">
          {itemCount > 0 && (
            <Button
              onClick={() => setCartOpen(true)}
              className="flex-1"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Giỏ hàng ({itemCount})
            </Button>
          )}
          <Button
            onClick={() => setCallStaffOpen(true)}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            <Phone className="w-5 h-5 mr-2" />
            Gọi nhân viên
          </Button>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      {/* Call Staff Dialog */}
      <CallStaffDialog open={callStaffOpen} onOpenChange={setCallStaffOpen} />

      {/* Edit Customer Dialog */}
      <EditCustomerDialog open={editOpen} onOpenChange={setEditOpen} />
    </div>
  );
}
