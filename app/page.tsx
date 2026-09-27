'use client';

import React from 'react';
import { AppProvider, useApp } from '@/lib/context';
import DemoSwitcherBar from '@/components/layout/DemoSwitcherBar';
import Toaster from '@/components/layout/Toaster';
import PublicLawFirmApp from '@/components/lawfirm/PublicLawFirmApp';
import AdminDashboardApp from '@/components/admin/AdminDashboardApp';

function AppContent() {
  const { appMode } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Interactive Top Switcher Bar for Demo Presentation */}
      <DemoSwitcherBar />

      {/* Main Switcher: Public Law Firm Website vs Internal SEO Admin */}
      <div className="flex-1">
        {appMode === 'public' ? <PublicLawFirmApp /> : <AdminDashboardApp />}
      </div>

      {/* Real-time Interactive Toast Feedback */}
      <Toaster />
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
