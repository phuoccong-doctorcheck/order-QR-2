'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useCustomerStore } from '@/lib/store';
import { ChefHat } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setCustomerInfo } = useCustomerStore();
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [errors, setErrors] = useState({ name: '', table: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: '', table: '' };

    if (!customerName.trim()) {
      newErrors.name = 'Vui lòng nhập tên';
    }
    if (!tableNumber.trim()) {
      newErrors.table = 'Vui lòng nhập số bàn';
    }

    if (newErrors.name || newErrors.table) {
      setErrors(newErrors);
      return;
    }

    setCustomerInfo(customerName, tableNumber);
    router.push('/menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-primary rounded-full p-4">
            <ChefHat className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-foreground">
          Nhà Hàng
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Quét mã QR để đặt hàng
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Tên khách hàng *
            </label>
            <Input
              type="text"
              placeholder="Nhập tên của bạn"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className="text-base"
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
              value={tableNumber}
              onChange={(e) => {
                setTableNumber(e.target.value);
                if (errors.table) setErrors({ ...errors, table: '' });
              }}
              className="text-base"
            />
            {errors.table && (
              <p className="text-sm text-destructive">{errors.table}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold mt-8"
          >
            Vào Menu
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Thông tin của bạn sẽ được lưu trong phiên làm việc này
        </p>
      </Card>
    </div>
  );
}
