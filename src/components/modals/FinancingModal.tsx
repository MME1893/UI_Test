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

interface FinancingModalProps {
  onClose: () => void;
}

export const FinancingModal: React.FC<FinancingModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    recipientBank: '',
    percentage: '',
    period: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const banks = [
    'بانک ملی ایران',
    'بانک صادرات ایران',
    'بانک تجارت',
    'بانک کشاورزی',
    'بانک صنعت و معدن',
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
    
    if (!formData.recipientBank) {
      newErrors.recipientBank = 'کادر الزامی است';
    }
    if (!formData.percentage.trim()) {
      newErrors.percentage = 'کادر الزامی است';
    }
    if (!formData.period.trim()) {
      newErrors.period = 'کادر الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving financing data:', formData);
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rtl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>فرم تامین مالی</DialogTitle>
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
              بانک گیرنده وام <span className="text-destructive mr-1">*</span>
            </Label>
            <Select onValueChange={(value) => handleSelectChange('recipientBank', value)}>
              <SelectTrigger className="text-right" dir="rtl">
                <SelectValue placeholder="بانک را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank, index) => (
                  <SelectItem key={index} value={bank} className="text-right">
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.recipientBank && (
              <p className="text-sm text-destructive text-right">{errors.recipientBank}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="percentage" className="text-right flex justify-end">
              درصد (٪) <span className="text-destructive mr-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="percentage"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.percentage}
                onChange={(e) => handleInputChange('percentage', e.target.value)}
                className="text-right pr-8"
                dir="rtl"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                ٪
              </span>
            </div>
            {errors.percentage && (
              <p className="text-sm text-destructive text-right">{errors.percentage}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="period" className="text-right flex justify-end">
              دوره (ماه) <span className="text-destructive mr-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="period"
                type="number"
                min="1"
                value={formData.period}
                onChange={(e) => handleInputChange('period', e.target.value)}
                className="text-right pr-10"
                dir="rtl"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                ماه
              </span>
            </div>
            {errors.period && (
              <p className="text-sm text-destructive text-right">{errors.period}</p>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-row-reverse gap-2">
          <Button onClick={handleSave}>ثبت</Button>
          <Button variant="outline" onClick={onClose}>انصراف</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};