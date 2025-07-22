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
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { X, Calendar } from 'lucide-react';

interface FundRequestModalProps {
  onClose: () => void;
}

export const FundRequestModal: React.FC<FundRequestModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    requestType: '',
    amount: '',
    date: '',
    documentNumber: '',
    reason: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const requestTypes = [
    { value: 'cash_advance', label: 'تنخواه' },
    { value: 'loan', label: 'قرض' },
    { value: 'facilities', label: 'تسهیلات' },
    { value: 'refund', label: 'استرداد' },
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
    
    if (!formData.requestType) {
      newErrors.requestType = 'کادر الزامی است';
    }
    if (!formData.amount.trim()) {
      newErrors.amount = 'کادر الزامی است';
    }
    if (!formData.date.trim()) {
      newErrors.date = 'کادر الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving fund request:', formData);
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rtl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>فرم درخواست وجه</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4 py-4 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            <Label className="text-right flex justify-end">
              نوع درخواست <span className="text-destructive mr-1">*</span>
            </Label>
            <Select onValueChange={(value) => handleSelectChange('requestType', value)}>
              <SelectTrigger className="text-right" dir="rtl">
                <SelectValue placeholder="نوع درخواست را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {requestTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="text-right">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.requestType && (
              <p className="text-sm text-destructive text-right">{errors.requestType}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-right flex justify-end">
              مبلغ <span className="text-destructive mr-1">*</span>
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

          <div className="space-y-2">
            <Label htmlFor="date" className="text-right flex justify-end">
              تاریخ <span className="text-destructive mr-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="text-right"
                dir="rtl"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors.date && (
              <p className="text-sm text-destructive text-right">{errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentNumber" className="text-right flex justify-end">
              شماره سند
            </Label>
            <Input
              id="documentNumber"
              value={formData.documentNumber}
              onChange={(e) => handleInputChange('documentNumber', e.target.value)}
              className="text-right"
              dir="rtl"
              placeholder="اختیاری"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-right flex justify-end">
              دلیل
            </Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              className="text-right min-h-20"
              dir="rtl"
              placeholder="توضیحات اختیاری"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-row-reverse gap-2">
          <Button onClick={handleSave}>ثبت درخواست</Button>
          <Button variant="outline" onClick={onClose}>انصراف</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};