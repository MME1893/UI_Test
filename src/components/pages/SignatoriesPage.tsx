import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';

interface Signatory {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  reference: string;
}

interface SignatoriesPageProps {
  onBack: () => void;
}

export const SignatoriesPage: React.FC<SignatoriesPageProps> = ({ onBack }) => {
  const [signatories, setSignatories] = useState<Signatory[]>([
    {
      id: '1',
      firstName: 'محمد',
      lastName: 'احمدی',
      position: 'مدیر عامل',
      reference: 'هیئت مدیره'
    },
    {
      id: '2',
      firstName: 'فاطمه',
      lastName: 'کریمی',
      position: 'مدیر مالی',
      reference: 'مدیر عامل'
    }
  ]);

  const [newSignatory, setNewSignatory] = useState<Omit<Signatory, 'id'>>({
    firstName: '',
    lastName: '',
    position: '',
    reference: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof Omit<Signatory, 'id'>, value: string) => {
    setNewSignatory(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateNewSignatory = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newSignatory.firstName.trim()) {
      newErrors.firstName = 'کادر الزامی است';
    }
    if (!newSignatory.lastName.trim()) {
      newErrors.lastName = 'کادر الزامی است';
    }
    if (!newSignatory.position.trim()) {
      newErrors.position = 'کادر الزامی است';
    }
    if (!newSignatory.reference.trim()) {
      newErrors.reference = 'کادر الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSignatory = () => {
    if (validateNewSignatory()) {
      const id = (signatories.length + 1).toString();
      setSignatories(prev => [...prev, { id, ...newSignatory }]);
      setNewSignatory({
        firstName: '',
        lastName: '',
        position: '',
        reference: '',
      });
    }
  };

  const removeSignatory = (id: string) => {
    setSignatories(prev => prev.filter(s => s.id !== id));
  };

  const saveChanges = () => {
    console.log('Saving signatories:', signatories);
    // Here you would typically save to backend
    onBack();
  };

  return (
    <div 
      className="min-h-screen rtl relative"
      style={{
        backgroundImage: 'url(https://my.isfahan.ir/Content/images/isfahan/bg/home.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-4 bg-white/90 backdrop-blur-md hover:bg-primary hover:text-white transition-all"
            >
              <ArrowRight className="h-4 w-4 ml-2" />
              بازگشت به داشبورد
            </Button>
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-xl border border-primary/20">
              <h1 className="mb-2 text-primary">مدیریت صاحبان امضا</h1>
              <p className="text-muted-foreground">مدیریت اطلاعات صاحبان امضای مجاز</p>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Add New Signatory Form */}
            <Card className="bg-white/95 backdrop-blur-md shadow-xl border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Plus className="h-5 w-5" />
                  افزودن صاحب امضای جدید
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-right flex justify-end">
                      نام <span className="text-destructive mr-1">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={newSignatory.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="text-right border-primary/30 focus:border-primary"
                      dir="rtl"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive text-right">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-right flex justify-end">
                      نام خانوادگی <span className="text-destructive mr-1">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={newSignatory.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="text-right border-primary/30 focus:border-primary"
                      dir="rtl"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive text-right">{errors.lastName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-right flex justify-end">
                      سمت <span className="text-destructive mr-1">*</span>
                    </Label>
                    <Input
                      id="position"
                      value={newSignatory.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="text-right border-primary/30 focus:border-primary"
                      dir="rtl"
                    />
                    {errors.position && (
                      <p className="text-sm text-destructive text-right">{errors.position}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference" className="text-right flex justify-end">
                      معرف <span className="text-destructive mr-1">*</span>
                    </Label>
                    <Input
                      id="reference"
                      value={newSignatory.reference}
                      onChange={(e) => handleInputChange('reference', e.target.value)}
                      className="text-right border-primary/30 focus:border-primary"
                      dir="rtl"
                    />
                    {errors.reference && (
                      <p className="text-sm text-destructive text-right">{errors.reference}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button onClick={addSignatory} className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 ml-2" />
                    افزودن صاحب امضا
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Signatories Table */}
            <Card className="bg-white/95 backdrop-blur-md shadow-xl border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
                <CardTitle className="text-white">فهرست صاحبان امضا</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border rounded-lg border-primary/20">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/10 hover:bg-primary/20">
                        <TableHead className="text-right">عملیات</TableHead>
                        <TableHead className="text-right">معرف</TableHead>
                        <TableHead className="text-right">سمت</TableHead>
                        <TableHead className="text-right">نام خانوادگی</TableHead>
                        <TableHead className="text-right">نام</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {signatories.map((signatory) => (
                        <TableRow key={signatory.id} className="hover:bg-primary/5">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSignatory(signatory.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">{signatory.reference}</TableCell>
                          <TableCell className="text-right">{signatory.position}</TableCell>
                          <TableCell className="text-right">{signatory.lastName}</TableCell>
                          <TableCell className="text-right">{signatory.firstName}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex flex-row-reverse gap-2 mt-6">
                  <Button onClick={saveChanges} className="bg-primary hover:bg-primary/90">ذخیره تغییرات</Button>
                  <Button variant="outline" onClick={onBack} className="border-primary/30 hover:bg-primary/10">انصراف</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};