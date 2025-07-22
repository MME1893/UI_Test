import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';
import { BankRegistrationModal } from './modals/BankRegistrationModal';
import { SignatoriesPage } from './pages/SignatoriesPage';
import { AccessModal } from './modals/AccessModal';
import { FundRequestModal } from './modals/FundRequestModal';
import { PaymentModal } from './modals/PaymentModal';
import { LoanModal } from './modals/LoanModal';
import { FinancingModal } from './modals/FinancingModal';
import { PropertyRegistrationModal } from './modals/PropertyRegistrationModal';
import { FixedReportsPage } from './pages/FixedReportsPage';
import { ReportBuilderPage } from './pages/ReportBuilderPage';

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'signatories' | 'fixedReports' | 'reportBuilder'>('dashboard');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const navigateToPage = (page: string) => {
    setCurrentView(page as any);
  };

  const navigateBack = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'signatories') {
    return <SignatoriesPage onBack={navigateBack} />;
  }

  if (currentView === 'fixedReports') {
    return <FixedReportsPage onBack={navigateBack} />;
  }

  if (currentView === 'reportBuilder') {
    return <ReportBuilderPage onBack={navigateBack} />;
  }

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
        <div className="max-w-7xl mx-auto">
          {/* Header with primary color accent */}
          <div className="mb-8 text-center">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-primary/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
              </div>
              <h1 className="mb-3 text-primary">داشبورد مدیریت مالی</h1>
              <p className="text-muted-foreground">سیستم جامع مدیریت اطلاعات مالی و گزارشات</p>
              <div className="mt-4 h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* اطلاعات پایه */}
            <Card className="h-fit bg-white/95 backdrop-blur-md shadow-xl border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-white">
                  اطلاعات پایه
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-6">
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-auto p-4 text-right hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => openModal('bankRegistration')}
                >
                  <ChevronLeft className="h-4 w-4 group-hover:text-primary" />
                  <span>ثبت بانک</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-auto p-4 text-right hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => navigateToPage('signatories')}
                >
                  <ChevronLeft className="h-4 w-4 group-hover:text-primary" />
                  <span>صاحبان امضا</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-auto p-4 text-right hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => openModal('access')}
                >
                  <ChevronLeft className="h-4 w-4 group-hover:text-primary" />
                  <span>دسترسی</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-auto p-4 text-right hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => openModal('fundRequest')}
                >
                  <ChevronLeft className="h-4 w-4 group-hover:text-primary" />
                  <span>درخواست وجه</span>
                </Button>
              </CardContent>
            </Card>

            {/* عملیات فرآیند */}
            <Card className="h-fit bg-white/95 backdrop-blur-md shadow-xl border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-white">
                  عملیات فرآیند
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-6">
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-auto p-4 text-right hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => openModal('payment')}
                >
                  <ChevronLeft className="h-4 w-4 group-hover:text-primary" />
                  <span>پرداخت وجه</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-auto p-4 text-right hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => openModal('loan')}
                >
                  <ChevronLeft className="h-4 w-4 group-hover:text-primary" />
                  <span>وام</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-auto p-4 text-right hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => openModal('financing')}
                >
                  <ChevronLeft className="h-4 w-4 group-hover:text-primary" />
                  <span>تامین مالی</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-auto p-4 text-right hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => openModal('propertyRegistration')}
                >
                  <ChevronLeft className="h-4 w-4 group-hover:text-primary" />
                  <span>ثبت املاک خزانه</span>
                </Button>
              </CardContent>
            </Card>

            {/* گزارشات */}
            <Card className="h-fit bg-white/95 backdrop-blur-md shadow-xl border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-white">
                  گزارشات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-6">
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-auto p-4 text-right hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => navigateToPage('fixedReports')}
                >
                  <ChevronLeft className="h-4 w-4 group-hover:text-primary" />
                  <span>گزارش‌های ثابت</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-auto p-4 text-right hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => navigateToPage('reportBuilder')}
                >
                  <ChevronLeft className="h-4 w-4 group-hover:text-primary" />
                  <span>گزارش‌ساز</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer with Isfahan theme */}
          <div className="mt-12 text-center">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border border-primary/20">
              <p className="text-muted-foreground text-sm mb-2">
                سیستم مدیریت مالی شهر اصفهان
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-primary">متصل و آماده</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'bankRegistration' && (
        <BankRegistrationModal onClose={closeModal} />
      )}
      {activeModal === 'access' && (
        <AccessModal onClose={closeModal} />
      )}
      {activeModal === 'fundRequest' && (
        <FundRequestModal onClose={closeModal} />
      )}
      {activeModal === 'payment' && (
        <PaymentModal onClose={closeModal} />
      )}
      {activeModal === 'loan' && (
        <LoanModal onClose={closeModal} />
      )}
      {activeModal === 'financing' && (
        <FinancingModal onClose={closeModal} />
      )}
      {activeModal === 'propertyRegistration' && (
        <PropertyRegistrationModal onClose={closeModal} />
      )}
    </div>
  );
};