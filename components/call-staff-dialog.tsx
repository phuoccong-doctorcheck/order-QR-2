'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useCustomerStore } from '@/lib/store';
import { toast } from 'sonner';

interface CallStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CallStaffDialog({
  open,
  onOpenChange,
}: CallStaffDialogProps) {
  const { customerName, tableNumber } = useCustomerStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleCallStaff = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/call-staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          tableNumber,
        }),
      });

      if (!response.ok) throw new Error('Failed to call staff');

      toast.success('Đã thông báo cho nhân viên');
      onOpenChange(false);
    } catch (error) {
      toast.error('Lỗi khi gọi nhân viên');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Gọi nhân viên</AlertDialogTitle>
          <AlertDialogDescription>
            Gọi nhân viên đến bàn {tableNumber}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-3">
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleCallStaff} disabled={isLoading}>
            {isLoading ? 'Đang gọi...' : 'Gọi ngay'}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
