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

interface PropertyRegistrationModalProps {
  onClose: () => void;
}

export const PropertyRegistrationModal: React.FC<PropertyRegistrationModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    propertyName: '',
    geographicalLocation: '',
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
    
    if (!formData.propertyName.trim()) {
      newErrors.propertyName = 'کادر الزامی است';
    }
    if (!formData.geographicalLocation.trim()) {
      newErrors.geographicalLocation = 'کادر الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving property data:', formData);
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rtl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>فرم ثبت املاک خزانه</DialogTitle>
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
            <Label htmlFor="propertyName" className="text-right flex justify-end">
              نام ملک <span className="text-destructive mr-1">*</span>
            </Label>
            <Input
              id="propertyName"
              value={formData.propertyName}
              onChange={(e) => handleInputChange('propertyName', e.target.value)}
              className="text-right"
              dir="rtl"
            />
            {errors.propertyName && (
              <p className="text-sm text-destructive text-right">{errors.propertyName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="geographicalLocation" className="text-right flex justify-end">
              موقعیت جغرافیایی <span className="text-destructive mr-1">*</span>
            </Label>
            <Input
              id="geographicalLocation"
              value={formData.geographicalLocation}
              onChange={(e) => handleInputChange('geographicalLocation', e.target.value)}
              className="text-right"
              dir="rtl"
            />
            {errors.geographicalLocation && (
              <p className="text-sm text-destructive text-right">{errors.geographicalLocation}</p>
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