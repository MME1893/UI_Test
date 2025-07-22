import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { ArrowRight, Plus, Settings, Play } from 'lucide-react';

interface ReportBuilderPageProps {
  onBack: () => void;
}

export const ReportBuilderPage: React.FC<ReportBuilderPageProps> = ({ onBack }) => {
  const [reportConfig, setReportConfig] = useState({
    name: '',
    dataSource: '',
    dateRange: '',
    fields: [] as string[],
    filters: [] as any[]
  });

  const dataSources = [
    { value: 'transactions', label: 'تراکنش‌ها' },
    { value: 'accounts', label: 'حساب‌ها' },
    { value: 'loans', label: 'وام‌ها' },
    { value: 'properties', label: 'املاک' },
    { value: 'branches', label: 'شعب' }
  ];

  const dateRanges = [
    { value: 'last_month', label: 'ماه گذشته' },
    { value: 'last_quarter', label: 'سه‌ماه گذشته' },
    { value: 'last_year', label: 'سال گذشته' },
    { value: 'custom', label: 'بازه سفارشی' }
  ];

  const availableFields: Record<string, string[]> = {
    transactions: ['مبلغ', 'تاریخ', 'نوع تراکنش', 'حساب مبدأ', 'حساب مقصد'],
    accounts: ['شماره حساب', 'نام حساب', 'موجودی', 'نوع حساب'],
    loans: ['مبلغ وام', 'تاریخ دریافت', 'نرخ بهره', 'مدت بازپرداخت'],
    properties: ['نام ملک', 'موقعیت', 'ارزش', 'تاریخ خرید'],
    branches: ['نام شعبه', 'موقعیت', 'عملکرد مالی', 'تعداد کارمند']
  };

  const handleFieldToggle = (field: string) => {
    setReportConfig(prev => ({
      ...prev,
      fields: prev.fields.includes(field)
        ? prev.fields.filter(f => f !== field)
        : [...prev.fields, field]
    }));
  };

  const handleGenerateReport = () => {
    console.log('Generating report with config:', reportConfig);
    // Here you would typically generate the report
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
        <div className="max-w-4xl mx-auto">
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
              <h1 className="mb-2 text-primary">گزارش‌ساز</h1>
              <p className="text-muted-foreground">ایجاد گزارش‌های سفارشی بر اساس نیاز شما</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Report Basic Info */}
            <Card className="bg-white/95 backdrop-blur-md shadow-xl border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="h-5 w-5" />
                  اطلاعات کلی گزارش
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <Label htmlFor="reportName" className="text-right flex justify-end">
                    نام گزارش
                  </Label>
                  <Input
                    id="reportName"
                    value={reportConfig.name}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, name: e.target.value }))}
                    className="text-right border-primary/30 focus:border-primary"
                    dir="rtl"
                    placeholder="نام گزارش را وارد کنید"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-right flex justify-end">منبع داده</Label>
                    <Select onValueChange={(value) => setReportConfig(prev => ({ ...prev, dataSource: value, fields: [] }))}>
                      <SelectTrigger className="text-right border-primary/30 focus:border-primary" dir="rtl">
                        <SelectValue placeholder="منبع داده را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataSources.map((source) => (
                          <SelectItem key={source.value} value={source.value} className="text-right">
                            {source.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-right flex justify-end">بازه زمانی</Label>
                    <Select onValueChange={(value) => setReportConfig(prev => ({ ...prev, dateRange: value }))}>
                      <SelectTrigger className="text-right border-primary/30 focus:border-primary" dir="rtl">
                        <SelectValue placeholder="بازه زمانی را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        {dateRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value} className="text-right">
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Field Selection */}
            {reportConfig.dataSource && (
              <Card className="bg-white/95 backdrop-blur-md shadow-xl border-primary/20">
                <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
                  <CardTitle className="text-white">انتخاب فیلدها</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableFields[reportConfig.dataSource]?.map((field) => (
                      <div key={field} className="flex items-center space-x-2 space-x-reverse p-2 rounded-lg hover:bg-primary/5 transition-colors">
                        <Checkbox
                          id={field}
                          checked={reportConfig.fields.includes(field)}
                          onCheckedChange={() => handleFieldToggle(field)}
                          className="border-primary/50 data-[state=checked]:bg-primary"
                        />
                        <Label 
                          htmlFor={field} 
                          className="cursor-pointer flex-1 text-right"
                        >
                          {field}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generate Report */}
            <Card className="bg-white/95 backdrop-blur-md shadow-xl border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row-reverse gap-4 items-center">
                  <Button 
                    onClick={handleGenerateReport}
                    disabled={!reportConfig.name || !reportConfig.dataSource || reportConfig.fields.length === 0}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 disabled:opacity-50"
                  >
                    <Play className="h-4 w-4 ml-2" />
                    تولید گزارش
                  </Button>
                  <div className="text-sm text-muted-foreground text-center sm:text-right">
                    پس از تنظیم پارامترها، گزارش شما تولید و قابل دانلود خواهد بود
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            {reportConfig.name && reportConfig.dataSource && reportConfig.fields.length > 0 && (
              <Card className="bg-white/95 backdrop-blur-md shadow-xl border-primary/20">
                <CardHeader className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white rounded-t-lg">
                  <CardTitle className="text-white">پیش‌نمایش تنظیمات گزارش</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <strong className="text-primary">نام گزارش:</strong> {reportConfig.name}
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <strong className="text-primary">منبع داده:</strong> {dataSources.find(s => s.value === reportConfig.dataSource)?.label}
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <strong className="text-primary">بازه زمانی:</strong> {dateRanges.find(r => r.value === reportConfig.dateRange)?.label}
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <strong className="text-primary">فیلدهای انتخاب شده:</strong> {reportConfig.fields.join('، ')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};