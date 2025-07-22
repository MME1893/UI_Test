import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { X } from 'lucide-react';

interface PaymentModalProps {
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    region: '',
    amount: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const regions = [
    'منطقه مرکزی',
    'منطقه شمال',
    'منطقه جنوب',
    'منطقه شرق',
    'منطقه غرب',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.region) {
      newErrors.region = 'کادر الزامی است';
    }
    if (!formData.amount.trim()) {
      newErrors.amount = 'کادر الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving payment data:', formData);
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rtl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>فرم پرداخت وجه</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-right flex justify-end">
              منطقه <span className="text-destructive mr-1">*</span>
            </Label>
            <Select onValueChange={(value) => handleSelectChange('region', value)}>
              <SelectTrigger className="text-right" dir="rtl">
                <SelectValue placeholder="منطقه را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region, index) => (
                  <SelectItem key={index} value={region} className="text-right">
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.region && (
              <p className="text-sm text-destructive text-right">{errors.region}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-right flex justify-end">
              مبلغ پرداختی <span className="text-destructive mr-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="text-right pr-12"
                dir="rtl"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                ریال
              </span>
            </div>
            {errors.amount && (
              <p className="text-sm text-destructive text-right">{errors.amount}</p>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-row-reverse gap-2">
          <Button onClick={handleSave}>ثبت پرداخت</Button>
          <Button variant="outline" onClick={onClose}>انصراف</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};