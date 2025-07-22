import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { X } from 'lucide-react';

interface AccessModalProps {
  onClose: () => void;
}

export const AccessModal: React.FC<AccessModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    account: '',
    accessLevel: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const accounts = [
    'حساب جاری شعبه مرکزی',
    'حساب پس‌انداز شعبه شمال',
    'حساب سپرده شعبه جنوب',
    'حساب ویژه مدیران',
  ];

  const accessLevels = [
    { value: 'view', label: 'مشاهده' },
    { value: 'edit', label: 'ویرایش' },
    { value: 'approve', label: 'تأیید' },
  ];

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.account) {
      newErrors.account = 'کادر الزامی است';
    }
    if (!formData.accessLevel) {
      newErrors.accessLevel = 'کادر الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving access data:', formData);
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rtl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>فرم دسترسی</DialogTitle>
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
              انتخاب حساب <span className="text-destructive mr-1">*</span>
            </Label>
            <Select onValueChange={(value) => handleSelectChange('account', value)}>
              <SelectTrigger className="text-right" dir="rtl">
                <SelectValue placeholder="یک حساب انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account, index) => (
                  <SelectItem key={index} value={account} className="text-right">
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.account && (
              <p className="text-sm text-destructive text-right">{errors.account}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-right flex justify-end">
              سطح دسترسی <span className="text-destructive mr-1">*</span>
            </Label>
            <Select onValueChange={(value) => handleSelectChange('accessLevel', value)}>
              <SelectTrigger className="text-right" dir="rtl">
                <SelectValue placeholder="سطح دسترسی را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {accessLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value} className="text-right">
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.accessLevel && (
              <p className="text-sm text-destructive text-right">{errors.accessLevel}</p>
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