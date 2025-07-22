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
import { X } from 'lucide-react';

interface BankRegistrationModalProps {
  onClose: () => void;
}

export const BankRegistrationModal: React.FC<BankRegistrationModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    bankName: '',
    location: '',
    branch: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'کادر الزامی است';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'کادر الزامی است';
    }
    if (!formData.branch.trim()) {
      newErrors.branch = 'کادر الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Here you would typically save the data
      console.log('Saving bank data:', formData);
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rtl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>فرم ثبت بانک</DialogTitle>
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
            <Label htmlFor="bankName" className="text-right flex justify-end">
              نام بانک <span className="text-destructive mr-1">*</span>
            </Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              className="text-right"
              dir="rtl"
            />
            {errors.bankName && (
              <p className="text-sm text-destructive text-right">{errors.bankName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-right flex justify-end">
              موقعیت <span className="text-destructive mr-1">*</span>
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="text-right"
              dir="rtl"
            />
            {errors.location && (
              <p className="text-sm text-destructive text-right">{errors.location}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch" className="text-right flex justify-end">
              شعبه <span className="text-destructive mr-1">*</span>
            </Label>
            <Input
              id="branch"
              value={formData.branch}
              onChange={(e) => handleInputChange('branch', e.target.value)}
              className="text-right"
              dir="rtl"
            />
            {errors.branch && (
              <p className="text-sm text-destructive text-right">{errors.branch}</p>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-row-reverse gap-2">
          <Button onClick={handleSave}>ذخیره</Button>
          <Button variant="outline" onClick={onClose}>انصراف</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};