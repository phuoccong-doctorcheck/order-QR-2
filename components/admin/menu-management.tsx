'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { MenuItemType, Category } from '@/lib/store';

export default function MenuManagement() {
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    nameVi: '',
    price: '',
    categoryId: '',
    description: '',
    imageUrl: '',
  });

  // Fetch menu data
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/menu');
      if (!response.ok) throw new Error('Failed to fetch menu');

      const data = await response.json();
      setItems(data.items || []);
      setCategories(data.categories || []);
      if (data.categories.length > 0 && !selectedCategory) {
        setSelectedCategory(data.categories[0].id);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
      toast.error('Không thể tải menu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!formData.name || !formData.nameVi || !formData.price || !formData.categoryId) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      const response = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add item');

      toast.success('Thêm món thành công');
      setIsAddOpen(false);
      resetForm();
      fetchMenu();
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Lỗi khi thêm món');
    }
  };

  const handleUpdateItem = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch('/api/admin/menu', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingItem.id,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error('Failed to update item');

      toast.success('Cập nhật món thành công');
      setIsEditOpen(false);
      setEditingItem(null);
      resetForm();
      fetchMenu();
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Lỗi khi cập nhật món');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa món này?')) return;

    try {
      const response = await fetch('/api/admin/menu', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete item');

      toast.success('Xóa món thành công');
      fetchMenu();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Lỗi khi xóa món');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      nameVi: '',
      price: '',
      categoryId: '',
      description: '',
      imageUrl: '',
    });
  };

  const openEditDialog = (item: MenuItemType) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      nameVi: item.nameVi || '',
      price: String(item.price),
      categoryId: item.categoryId,
      description: item.description || '',
      imageUrl: item.imageUrl,
    });
    setIsEditOpen(true);
  };

  const filteredItems = selectedCategory
    ? items.filter(item => item.categoryId === selectedCategory)
    : items;

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.nameVi || 'Unknown';
  };

  if (isLoading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quản lý Menu</h1>
          <p className="text-sm text-muted-foreground">
            Tổng cộng: {items.length} món
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                if (categories.length > 0) {
                  setFormData(prev => ({ ...prev, categoryId: categories[0].id }));
                }
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm món
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm món mới</DialogTitle>
              <DialogDescription>Nhập thông tin chi tiết cho món ăn mới</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tên (English)
                </label>
                <Input
                  placeholder="e.g., Pho Bo"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tên (Tiếng Việt)
                </label>
                <Input
                  placeholder="e.g., Phở Bò"
                  value={formData.nameVi}
                  onChange={e =>
                    setFormData({ ...formData, nameVi: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Danh mục
                </label>
                <Select
                  value={formData.categoryId}
                  onValueChange={value =>
                    setFormData({ ...formData, categoryId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.nameVi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Giá (VND)
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 85000"
                  value={formData.price}
                  onChange={e =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mô tả
                </label>
                <Input
                  placeholder="e.g., Traditional beef noodle soup"
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  URL ảnh
                </label>
                <Input
                  placeholder="e.g., /images/pho-bo.jpg"
                  value={formData.imageUrl}
                  onChange={e =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleAddItem} className="w-full">
                Thêm món
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedCategory === '' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('')}
        >
          Tất cả
        </Button>
        {categories.map(cat => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.nameVi}
          </Button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map(item => (
          <Card key={item.id} className="overflow-hidden">
            {/* Item Image */}
            <div className="h-40 bg-muted overflow-hidden">
              <img
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.nameVi}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Item Info */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground">{item.nameVi}</h3>
                <p className="text-xs text-muted-foreground">{item.name}</p>
              </div>

              {item.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs">
                    {getCategoryName(item.categoryId)}
                  </Badge>
                  <p className="text-lg font-bold text-primary">
                    {Number(item.price).toLocaleString()} đ
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Dialog open={isEditOpen && editingItem?.id === item.id} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(item)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Chỉnh sửa món</DialogTitle>
                        <DialogDescription>Cập nhật thông tin chi tiết của món ăn</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Tên (English)
                          </label>
                          <Input
                            value={formData.name}
                            onChange={e =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Tên (Tiếng Việt)
                          </label>
                          <Input
                            value={formData.nameVi}
                            onChange={e =>
                              setFormData({ ...formData, nameVi: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Danh mục
                          </label>
                          <Select
                            value={formData.categoryId}
                            onValueChange={value =>
                              setFormData({ ...formData, categoryId: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(cat => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.nameVi}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Giá (VND)
                          </label>
                          <Input
                            type="number"
                            value={formData.price}
                            onChange={e =>
                              setFormData({ ...formData, price: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Mô tả
                          </label>
                          <Input
                            value={formData.description}
                            onChange={e =>
                              setFormData({ ...formData, description: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            URL ảnh
                          </label>
                          <Input
                            value={formData.imageUrl}
                            onChange={e =>
                              setFormData({ ...formData, imageUrl: e.target.value })
                            }
                          />
                        </div>
                        <Button onClick={handleUpdateItem} className="w-full">
                          Cập nhật
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-muted-foreground">Không có món nào trong danh mục này</p>
        </Card>
      )}
    </div>
  );
}
