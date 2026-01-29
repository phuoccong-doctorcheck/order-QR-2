'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCustomerStore } from '@/lib/store';

interface EditCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditCustomerDialog({
  open,
  onOpenChange,
}: EditCustomerDialogProps) {
  const { customerName, tableNumber, setCustomerInfo } = useCustomerStore();
  const [name, setName] = useState(customerName);
  const [table, setTable] = useState(tableNumber);
  const [errors, setErrors] = useState({ name: '', table: '' });

  const handleSave = () => {
    const newErrors = { name: '', table: '' };

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập tên';
    }
    if (!table.trim()) {
      newErrors.table = 'Vui lòng nhập số bàn';
    }

    if (newErrors.name || newErrors.table) {
      setErrors(newErrors);
      return;
    }

    setCustomerInfo(name, table);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sửa thông tin</DialogTitle>
          <DialogDescription>
            Cập nhật tên khách hàng và số bàn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Tên khách hàng *
            </label>
            <Input
              type="text"
              placeholder="Nhập tên của bạn"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Số bàn *
            </label>
            <Input
              type="text"
              placeholder="Ví dụ: 5"
              value={table}
              onChange={(e) => {
                setTable(e.target.value);
                if (errors.table) setErrors({ ...errors, table: '' });
              }}
            />
            {errors.table && (
              <p className="text-sm text-destructive">{errors.table}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSave}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
