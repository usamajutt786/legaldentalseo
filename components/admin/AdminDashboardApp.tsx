'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

// Views
import DashboardView from './views/DashboardView';
import PagesView from './views/PagesView';
import GenerateWizardView from './views/GenerateWizardView';
import SinglePageGenView from './views/SinglePageGenView';
import PracticeAreasView from './views/PracticeAreasView';
import CitiesView from './views/CitiesView';
import TemplatesView from './views/TemplatesView';
import GlobalSectionsView from './views/GlobalSectionsView';
import SurferSeoView from './views/SurferSeoView';
import InternalLinkingView from './views/InternalLinkingView';
import SeoSettingsView from './views/SeoSettingsView';
import SchemaUiView from './views/SchemaUiView';
import CallTrackingView from './views/CallTrackingView';
import CtaSettingsView from './views/CtaSettingsView';
import BulkImportView from './views/BulkImportView';
import ReviewQueueView from './views/ReviewQueueView';
import PageEditorView from './views/PageEditorView';
import PagePreviewView from './views/PagePreviewView';
import SitemapView from './views/SitemapView';
import ScalabilityCalcView from './views/ScalabilityCalcView';
import TrainingHandoverView from './views/TrainingHandoverView';
import DeploymentsView from './views/DeploymentsView';
import SecurityView from './views/SecurityView';

export default function AdminDashboardApp() {
  const { adminTab } = useApp();

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Fixed Left Sidebar */}
      <AdminSidebar />

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <AdminHeader />

        <main className="flex-1 pb-16">
          {adminTab === 'dashboard' && <DashboardView />}
          {adminTab === 'pages' && <PagesView />}
          {adminTab === 'generate' && <GenerateWizardView />}
          {adminTab === 'single-generate' && <SinglePageGenView />}
          {adminTab === 'practice-areas' && <PracticeAreasView />}
          {adminTab === 'cities' && <CitiesView />}
          {adminTab === 'templates' && <TemplatesView />}
          {adminTab === 'global-sections' && <GlobalSectionsView />}
          {adminTab === 'surfer-seo' && <SurferSeoView />}
          {adminTab === 'internal-linking' && <InternalLinkingView />}
          {adminTab === 'seo-settings' && <SeoSettingsView />}
          {adminTab === 'schema-ui' && <SchemaUiView />}
          {adminTab === 'call-tracking' && <CallTrackingView />}
          {adminTab === 'cta-settings' && <CtaSettingsView />}
          {adminTab === 'bulk-import' && <BulkImportView />}
          {adminTab === 'review-queue' && <ReviewQueueView />}
          {adminTab === 'page-editor' && <PageEditorView />}
          {adminTab === 'page-preview' && <PagePreviewView />}
          {adminTab === 'sitemap' && <SitemapView />}
          {adminTab === 'scalability' && <ScalabilityCalcView />}
          {adminTab === 'training' && <TrainingHandoverView />}
          {adminTab === 'deployments' && <DeploymentsView />}
          {adminTab === 'security' && <SecurityView />}
        </main>
      </div>
    </div>
  );
}
