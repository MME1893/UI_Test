import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowRight, FileText, Download, Eye } from 'lucide-react';

interface FixedReportsPageProps {
  onBack: () => void;
}

export const FixedReportsPage: React.FC<FixedReportsPageProps> = ({ onBack }) => {
  const reports = [
    {
      id: 1,
      title: 'گزارش تراز مالی',
      description: 'گزارش جامع وضعیت مالی سازمان',
      lastUpdate: '1402/10/15',
      type: 'مالی'
    },
    {
      id: 2,
      title: 'گزارش جریان نقدینگی',
      description: 'تحلیل ورود و خروج وجوه نقد',
      lastUpdate: '1402/10/14',
      type: 'نقدینگی'
    },
    {
      id: 3,
      title: 'گزارش وام‌ها و تسهیلات',
      description: 'وضعیت کلیه وام‌ها و تسهیلات پرداختی',
      lastUpdate: '1402/10/13',
      type: 'وام'
    },
    {
      id: 4,
      title: 'گزارش املاک و دارایی‌ها',
      description: 'فهرست کامل املاک و دارایی‌های سازمان',
      lastUpdate: '1402/10/12',
      type: 'املاک'
    },
    {
      id: 5,
      title: 'گزارش عملکرد شعب',
      description: 'عملکرد مالی و عملیاتی شعب مختلف',
      lastUpdate: '1402/10/11',
      type: 'شعب'
    },
    {
      id: 6,
      title: 'گزارش بودجه و واقعی',
      description: 'مقایسه بودجه پیش‌بینی شده با عملکرد واقعی',
      lastUpdate: '1402/10/10',
      type: 'بودجه'
    }
  ];

  const handleViewReport = (reportId: number) => {
    console.log(`Viewing report ${reportId}`);
    // Here you would typically open the report view
  };

  const handleDownloadReport = (reportId: number) => {
    console.log(`Downloading report ${reportId}`);
    // Here you would typically trigger the download
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
              <h1 className="mb-2 text-primary">گزارش‌های ثابت</h1>
              <p className="text-muted-foreground">مجموعه گزارش‌های از پیش تعریف شده سیستم</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="bg-white/95 backdrop-blur-md shadow-xl border-primary/20 hover:shadow-2xl transition-all duration-300 hover:border-primary/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {report.title}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    <span className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs mb-2">
                      {report.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {report.description}
                  </p>
                  
                  <div className="text-xs text-muted-foreground mb-4 p-2 bg-primary/5 rounded-lg">
                    آخرین به‌روزرسانی: {report.lastUpdate}
                  </div>

                  <div className="flex flex-row-reverse gap-2">
                    <Button 
                      size="sm"
                      onClick={() => handleViewReport(report.id)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Eye className="h-4 w-4 ml-2" />
                      مشاهده
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadReport(report.id)}
                      className="border-primary/30 hover:bg-primary/10 hover:border-primary"
                    >
                      <Download className="h-4 w-4 ml-2" />
                      دانلود
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <Card className="bg-white/95 backdrop-blur-md shadow-xl border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-primary">نیاز به گزارش خاص دارید؟</h3>
                <p className="text-muted-foreground mb-4">
                  با استفاده از گزارش‌ساز می‌توانید گزارش‌های سفارشی ایجاد کنید
                </p>
                <Button onClick={onBack} className="bg-primary hover:bg-primary/90">
                  رفتن به گزارش‌ساز
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};