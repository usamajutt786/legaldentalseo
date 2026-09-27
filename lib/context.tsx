'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  City,
  PracticeArea,
  GeneratedPage,
  TemplateSection,
  GlobalSectionBlock,
  CallRailConfig,
  StickyCtaConfig,
  SeoPatternConfig,
  DeploymentRecord,
  TrafficSource,
  PageStatus,
} from './types';
import {
  INITIAL_CITIES,
  INITIAL_PRACTICE_AREAS,
  INITIAL_TEMPLATE_SECTIONS,
  INITIAL_GLOBAL_SECTIONS,
  INITIAL_CALL_RAIL_CONFIG,
  INITIAL_STICKY_CTA_CONFIG,
  INITIAL_SEO_PATTERNS,
  INITIAL_DEPLOYMENTS,
  SAMPLE_PAGES,
} from './mockData';

export type PublicRoute =
  | 'home'
  | 'about'
  | 'attorneys'
  | 'practice-areas'
  | 'locations'
  | 'results'
  | 'faq'
  | 'contact'
  | 'page';

export type AdminTab =
  | 'dashboard'
  | 'pages'
  | 'generate'
  | 'single-generate'
  | 'practice-areas'
  | 'cities'
  | 'templates'
  | 'global-sections'
  | 'surfer-seo'
  | 'internal-linking'
  | 'seo-settings'
  | 'schema-ui'
  | 'call-tracking'
  | 'cta-settings'
  | 'bulk-import'
  | 'review-queue'
  | 'page-editor'
  | 'page-preview'
  | 'sitemap'
  | 'scalability'
  | 'training'
  | 'deployments'
  | 'security';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
}

interface AppContextType {
  // Navigation & Mode
  appMode: 'public' | 'admin';
  setAppMode: (mode: 'public' | 'admin') => void;
  publicRoute: PublicRoute;
  setPublicRoute: (route: PublicRoute) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  selectedPageId: string;
  setSelectedPageId: (id: string) => void;

  // Traffic Source & Call Tracking
  trafficSource: TrafficSource;
  setTrafficSource: (source: TrafficSource) => void;
  currentPhoneNumber: string;
  callRailConfig: CallRailConfig;
  updateCallRailConfig: (config: Partial<CallRailConfig>) => void;
  testNumberRotation: (source: TrafficSource) => void;

  // Sticky CTA
  stickyCtaConfig: StickyCtaConfig;
  updateStickyCtaConfig: (config: Partial<StickyCtaConfig>) => void;
  consultationModalOpen: boolean;
  setConsultationModalOpen: (open: boolean) => void;

  // Data Collections
  cities: City[];
  practiceAreas: PracticeArea[];
  pages: GeneratedPage[];
  templateSections: TemplateSection[];
  globalSections: GlobalSectionBlock[];
  seoPatterns: SeoPatternConfig;
  deployments: DeploymentRecord[];

  // Surfer SEO
  surferConnected: boolean;
  surferApiKey: string;
  setSurferApiKey: (key: string) => void;
  testSurferConnection: () => Promise<boolean>;

  // CRUD Actions
  addCity: (city: Omit<City, 'id' | 'generatedPagesCount'>) => void;
  updateCity: (id: string, updates: Partial<City>) => void;
  deleteCity: (id: string) => void;

  addPracticeArea: (area: Omit<PracticeArea, 'id'>) => void;
  updatePracticeArea: (id: string, updates: Partial<PracticeArea>) => void;
  deletePracticeArea: (id: string) => void;

  updatePageStatus: (pageId: string, status: PageStatus) => void;
  updatePageContent: (pageId: string, updates: Partial<GeneratedPage>) => void;
  deletePage: (pageId: string) => void;

  // Generation & Simulators
  generatePagesBatch: (
    cityIds: string[],
    practiceIds: string[],
    options: { tone: string; wordCount: number; faqCount: number; includeLocal: boolean }
  ) => Promise<{ count: number }>;
  generateSinglePage: (cityId: string, practiceId: string) => Promise<GeneratedPage>;
  regeneratePageContent: (pageId: string) => Promise<void>;

  // Templates & Global Blocks
  toggleTemplateSection: (sectionId: string) => void;
  reorderTemplateSection: (sectionId: string, direction: 'up' | 'down') => void;
  updateGlobalSection: (id: string, updates: Partial<GlobalSectionBlock>) => void;

  // Internal Links
  approveInternalLink: (pageId: string, linkId: string) => void;
  rejectInternalLink: (pageId: string, linkId: string) => void;
  approveAllInternalLinks: () => void;

  // Deployment & Rollback
  rollbackDeployment: (version: string) => Promise<void>;
  simulateDeploy: () => Promise<void>;

  // Bulk CSV
  importCsvDrafts: (rows: { city: string; practice: string }[]) => Promise<number>;

  // Toast
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Reset Demo
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Navigation states
  const [appMode, setAppMode] = useState<'public' | 'admin'>('public');
  const [publicRoute, setPublicRoute] = useState<PublicRoute>('home');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [selectedPageId, setSelectedPageId] = useState<string>('page-houston-car');
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  // Traffic Source & CallRail
  const [trafficSource, setTrafficSource] = useState<TrafficSource>('organic');
  const [callRailConfig, setCallRailConfig] = useState<CallRailConfig>(INITIAL_CALL_RAIL_CONFIG);

  // Sticky CTA
  const [stickyCtaConfig, setStickyCtaConfig] = useState<StickyCtaConfig>(INITIAL_STICKY_CTA_CONFIG);

  // Data states with lazy initializers
  const [cities, setCities] = useState<City[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lexscale_cities');
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return INITIAL_CITIES;
  });

  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lexscale_practices');
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return INITIAL_PRACTICE_AREAS;
  });

  const [pages, setPages] = useState<GeneratedPage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lexscale_pages');
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return SAMPLE_PAGES;
  });

  const [templateSections, setTemplateSections] = useState<TemplateSection[]>(INITIAL_TEMPLATE_SECTIONS);

  const [globalSections, setGlobalSections] = useState<GlobalSectionBlock[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lexscale_globals');
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return INITIAL_GLOBAL_SECTIONS;
  });

  const [seoPatterns, setSeoPatterns] = useState<SeoPatternConfig>(INITIAL_SEO_PATTERNS);
  const [deployments, setDeployments] = useState<DeploymentRecord[]>(INITIAL_DEPLOYMENTS);

  // Surfer SEO
  const [surferConnected, setSurferConnected] = useState(true);
  const [surferApiKey, setSurferApiKey] = useState('surfer_live_token_77a942df98c');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('lexscale_pages', JSON.stringify(pages));
    } catch {}
  }, [pages]);

  useEffect(() => {
    try {
      localStorage.setItem('lexscale_cities', JSON.stringify(cities));
    } catch {}
  }, [cities]);

  useEffect(() => {
    try {
      localStorage.setItem('lexscale_practices', JSON.stringify(practiceAreas));
    } catch {}
  }, [practiceAreas]);

  useEffect(() => {
    try {
      localStorage.setItem('lexscale_globals', JSON.stringify(globalSections));
    } catch {}
  }, [globalSections]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Determine current active phone number based on CallRail config & trafficSource
  const currentPhoneNumber =
    callRailConfig.dniEnabled
      ? callRailConfig.numbers[trafficSource] || callRailConfig.numbers.main
      : callRailConfig.numbers.main;

  const testNumberRotation = (source: TrafficSource) => {
    setTrafficSource(source);
    const num = callRailConfig.numbers[source];
    addToast({
      type: 'info',
      title: 'CallRail DNI Rotated Phone Number',
      description: `Traffic source detected as "${source.replace('_', ' ').toUpperCase()}". Display number updated to ${num}`,
    });
  };

  const updateCallRailConfig = (updates: Partial<CallRailConfig>) => {
    setCallRailConfig((prev) => ({ ...prev, ...updates }));
    addToast({
      type: 'success',
      title: 'CallRail Settings Saved',
      description: 'Dynamic number pool and routing rules updated successfully.',
    });
  };

  const updateStickyCtaConfig = (updates: Partial<StickyCtaConfig>) => {
    setStickyCtaConfig((prev) => ({ ...prev, ...updates }));
    addToast({
      type: 'success',
      title: 'CTA Settings Updated',
      description: 'Sticky toolbar configuration updated for desktop and mobile.',
    });
  };

  const testSurferConnection = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setSurferConnected(true);
        addToast({
          type: 'success',
          title: 'Surfer SEO API Connected',
          description: 'Handshake verified. Real-time NLP content scores & keyword audits active.',
        });
        resolve(true);
      }, 1200);
    });
  };

  // Cities CRUD
  const addCity = (cityData: Omit<City, 'id' | 'generatedPagesCount'>) => {
    const id = cityData.slug || cityData.name.toLowerCase().replace(/\s+/g, '-');
    const newCity: City = {
      ...cityData,
      id,
      generatedPagesCount: 0,
    };
    setCities((prev) => [newCity, ...prev]);
    addToast({
      type: 'success',
      title: `City "${cityData.name}" Added`,
      description: 'Ready for programmatic page generation clusters.',
    });
  };

  const updateCity = (id: string, updates: Partial<City>) => {
    setCities((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    addToast({
      type: 'success',
      title: 'City Updated',
      description: 'Changes saved to city database.',
    });
  };

  const deleteCity = (id: string) => {
    const city = cities.find((c) => c.id === id);
    setCities((prev) => prev.filter((c) => c.id !== id));
    addToast({
      type: 'warning',
      title: `City "${city?.name || id}" Removed`,
      description: 'Associated drafts archived.',
    });
  };

  // Practice Areas CRUD
  const addPracticeArea = (areaData: Omit<PracticeArea, 'id'>) => {
    const id = areaData.slug || areaData.name.toLowerCase().replace(/\s+/g, '-');
    const newArea: PracticeArea = {
      ...areaData,
      id,
    };
    setPracticeAreas((prev) => [newArea, ...prev]);
    addToast({
      type: 'success',
      title: `Practice Area "${areaData.name}" Created`,
      description: 'Available in page generator wizards.',
    });
  };

  const updatePracticeArea = (id: string, updates: Partial<PracticeArea>) => {
    setPracticeAreas((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    addToast({
      type: 'success',
      title: 'Practice Area Updated',
      description: 'Practice parameters saved.',
    });
  };

  const deletePracticeArea = (id: string) => {
    const area = practiceAreas.find((p) => p.id === id);
    setPracticeAreas((prev) => prev.filter((p) => p.id !== id));
    addToast({
      type: 'warning',
      title: `Practice Area "${area?.name || id}" Removed`,
      description: 'Template mappings updated.',
    });
  };

  // Pages actions
  const updatePageStatus = (pageId: string, status: PageStatus) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id === pageId ? { ...p, status, lastUpdated: new Date().toISOString().split('T')[0] } : p
      )
    );
    const statusLabels: Record<PageStatus, string> = {
      published: 'Published live to website',
      approved: 'Approved for publishing',
      review: 'Sent to Editorial Review Queue',
      draft: 'Moved to Draft status',
    };
    addToast({
      type: status === 'published' ? 'success' : 'info',
      title: `Page Status Changed`,
      description: statusLabels[status],
    });
  };

  const updatePageContent = (pageId: string, updates: Partial<GeneratedPage>) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id === pageId
          ? { ...p, ...updates, isCustomized: true, lastUpdated: new Date().toISOString().split('T')[0] }
          : p
      )
    );
    addToast({
      type: 'success',
      title: 'Page Saved',
      description: 'Changes recorded and local preview updated.',
    });
  };

  const deletePage = (pageId: string) => {
    const target = pages.find((p) => p.id === pageId);
    setPages((prev) => prev.filter((p) => p.id !== pageId));
    addToast({
      type: 'info',
      title: 'Page Deleted',
      description: `"${target?.h1 || 'Page'}" has been permanently removed.`,
    });
  };

  // Batch Programmatic Page Generator
  const generatePagesBatch = async (
    cityIds: string[],
    practiceIds: string[],
    options: { tone: string; wordCount: number; faqCount: number; includeLocal: boolean }
  ): Promise<{ count: number }> => {
    const newPages: GeneratedPage[] = [];

    for (const cId of cityIds) {
      const city = cities.find((c) => c.id === cId);
      if (!city) continue;

      for (const pId of practiceIds) {
        const practice = practiceAreas.find((p) => p.id === pId);
        if (!practice) continue;

        const pageId = `page-${city.slug}-${practice.slug}-${Math.random().toString(36).substring(2, 6)}`;
        const url = `/${city.slug}/${practice.slug}/`;

        // Check if exists
        const exists = pages.some((p) => p.url === url);
        if (exists) continue;

        const primaryKw = `${city.name} ${practice.name.toLowerCase()}`;
        const score = Math.floor(Math.random() * 15) + 78; // 78 - 93
        const words = options.wordCount || 2250 + Math.floor(Math.random() * 300);

        newPages.push({
          id: pageId,
          cityId: city.id,
          cityName: city.name,
          practiceId: practice.id,
          practiceName: practice.name,
          slug: practice.slug,
          url,
          status: 'draft',
          seoScore: score,
          wordCount: words,
          internalLinksCount: 5,
          lastUpdated: new Date().toISOString().split('T')[0],
          h1: `${city.name} ${practice.name}`,
          metaTitle: `${city.name} ${practice.name} | Harrison & Cole Injury Attorneys`,
          metaDescription: `Injured in ${city.name}? Our aggressive ${practice.name} advocates fight insurance companies to recover maximum damages. Over $145M won. Free consultation.`,
          introText: `Accidents in ${city.name} and across ${city.county} leave innocent victims and their families facing severe physical trauma, mounting medical costs, and missed paychecks. High-speed collisions along ${city.majorHighways.slice(0, 2).join(' and ')} are among the most catastrophic. At Harrison & Cole, we hold reckless drivers and corporate carriers accountable.`,
          mainContentText: `Under Texas proportionate responsibility statutes, injured plaintiffs in ${city.name} can seek financial damages if they bear 50% or less liability. Our experienced personal injury trial lawyers immediately obtain police collision reports, inspect vehicle event data recorders, and prepare claims for jury presentation at ${city.courthouseName}.`,
          commonCauses: [
            `Distracted driving and mobile device usage along congested corridors of ${city.majorHighways[0] || 'arterial roads'}`,
            `Failure to yield right-of-way at commercial intersections in ${city.name}`,
            `Commercial vehicle speeding and reckless driving during heavy traffic periods`,
            `Intoxicated and impaired motorists operating vehicles throughout ${city.county}`,
          ],
          localCourthouse: city.courthouseName,
          statAccidentsYear: `Over 1,200 traffic accidents reported annually in the ${city.name} metropolitan corridor`,
          faqList: [
            {
              question: `How long do I have to file a ${practice.name.toLowerCase()} claim in ${city.name}?`,
              answer: `The Texas statute of limitations provides a strict two-year window from the incident date to commence formal legal proceedings in ${city.county} courts.`,
            },
            {
              question: `What compensation can I recover in ${city.name}, TX?`,
              answer: `Damages include medical bills, surgical expenses, lost current and future wages, pain and suffering, physical impairment, and property damage.`,
            },
            {
              question: `Does Harrison & Cole charge upfront legal fees?`,
              answer: `No. We represent injury clients throughout ${city.name} on a strict contingency fee arrangement. If we do not win compensation, you pay zero attorney fees.`,
            },
          ],
          internalLinks: [
            {
              id: `lnk-1-${pageId}`,
              anchorText: `${city.name} Car Accident Lawyer`,
              targetUrl: `/${city.slug}/car-accident-lawyer/`,
              relationship: 'Same City → Related Practice',
              status: 'approved',
            },
            {
              id: `lnk-2-${pageId}`,
              anchorText: `Houston ${practice.name}`,
              targetUrl: `/houston/${practice.slug}/`,
              relationship: 'Same Practice → Nearby City',
              status: 'approved',
            },
          ],
          surferKeywords: [
            { term: primaryKw, frequency: 15, recommended: '14-20', status: 'good' },
            { term: `${city.county} injury lawyer`, frequency: 4, recommended: '3-6', status: 'good' },
            { term: 'Texas statute of limitations', frequency: 5, recommended: '4-7', status: 'good' },
            { term: 'no win no fee guarantee', frequency: 3, recommended: '3-5', status: 'good' },
          ],
        });
      }
    }

    setPages((prev) => [...newPages, ...prev]);

    // Update city counts
    setCities((prev) =>
      prev.map((c) => {
        const addedForCity = newPages.filter((p) => p.cityId === c.id).length;
        return {
          ...c,
          generatedPagesCount: c.generatedPagesCount + addedForCity,
        };
      })
    );

    return { count: newPages.length };
  };

  // Single Page Generator
  const generateSinglePage = async (cityId: string, practiceId: string): Promise<GeneratedPage> => {
    const city = cities.find((c) => c.id === cityId) || cities[0];
    const practice = practiceAreas.find((p) => p.id === practiceId) || practiceAreas[0];
    const url = `/${city.slug}/${practice.slug}/`;

    const existing = pages.find((p) => p.url === url);
    if (existing) {
      addToast({
        type: 'info',
        title: 'Page Already Exists',
        description: `Loaded existing page for ${city.name} ${practice.name}`,
      });
      setSelectedPageId(existing.id);
      return existing;
    }

    const pageId = `page-${city.slug}-${practice.slug}-${Math.random().toString(36).substring(2, 6)}`;
    const newPage: GeneratedPage = {
      id: pageId,
      cityId: city.id,
      cityName: city.name,
      practiceId: practice.id,
      practiceName: practice.name,
      slug: practice.slug,
      url,
      status: 'draft',
      seoScore: 84,
      wordCount: 2280,
      internalLinksCount: 6,
      lastUpdated: new Date().toISOString().split('T')[0],
      h1: `${city.name} ${practice.name}`,
      metaTitle: `${city.name} ${practice.name} | Harrison & Cole`,
      metaDescription: `Top-rated ${practice.name.toLowerCase()} advocates serving ${city.name} and ${city.county}. 99% success rate, $145M+ won. Call 24/7 for a free case evaluation.`,
      introText: `When a severe injury occurs in ${city.name}, victims frequently must face ruthless corporate insurance adjusters trained to deny liability. At Harrison & Cole, we investigate accidents along ${city.majorHighways.join(', ')} to hold negligent parties accountable.`,
      mainContentText: `Our trial attorneys combine deep Texas statutory knowledge with cutting-edge accident reconstruction techniques. We prepare every claim from day one for litigation in ${city.courthouseName}.`,
      commonCauses: [
        `Reckless speeding and tailgating in ${city.name}`,
        `Distracted driving along major thoroughfares including ${city.majorHighways[0]}`,
        `Commercial truck driver fatigue and logbook violations`,
      ],
      localCourthouse: city.courthouseName,
      statAccidentsYear: `Hundreds of serious injury claims processed annually in ${city.county}`,
      faqList: [
        {
          question: `How quickly should I contact a lawyer in ${city.name}?`,
          answer: `Immediately. Physical evidence disappears, surveillance video is overwritten after 7 to 14 days, and insurance companies begin crafting defense strategies within hours.`,
        },
      ],
      internalLinks: [
        {
          id: `link-single-1`,
          anchorText: `${city.name} Car Accident Lawyer`,
          targetUrl: `/${city.slug}/car-accident-lawyer/`,
          relationship: 'Same City → Related Practice',
          status: 'approved',
        },
        {
          id: `link-single-2`,
          anchorText: `Houston ${practice.name}`,
          targetUrl: `/houston/${practice.slug}/`,
          relationship: 'Same Practice → Nearby City',
          status: 'approved',
        },
      ],
      surferKeywords: [
        { term: `${city.name} ${practice.name.toLowerCase()}`, frequency: 16, recommended: '15-20', status: 'good' },
        { term: `${city.county} personal injury`, frequency: 5, recommended: '4-7', status: 'good' },
      ],
    };

    setPages((prev) => [newPage, ...prev]);
    setSelectedPageId(pageId);
    setCities((prev) =>
      prev.map((c) => (c.id === city.id ? { ...c, generatedPagesCount: c.generatedPagesCount + 1 } : c))
    );

    addToast({
      type: 'success',
      title: 'Page Generated Successfully',
      description: `${newPage.h1} created with full Surfer SEO brief and schema.`,
    });

    return newPage;
  };

  const regeneratePageContent = async (pageId: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setPages((prev) =>
          prev.map((p) => {
            if (p.id !== pageId) return p;
            const newScore = Math.min(96, p.seoScore + 5);
            return {
              ...p,
              seoScore: newScore,
              wordCount: p.wordCount + 120,
              lastUpdated: new Date().toISOString().split('T')[0],
              surferKeywords: p.surferKeywords.map((k) => ({
                ...k,
                frequency: k.frequency + 2,
                status: 'good',
              })),
            };
          })
        );
        addToast({
          type: 'success',
          title: 'Content Regenerated',
          description: 'Surfer NLP recommendations incorporated. SEO score improved.',
        });
        resolve();
      }, 1000);
    });
  };

  // Template builders
  const toggleTemplateSection = (sectionId: string) => {
    setTemplateSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const reorderTemplateSection = (sectionId: string, direction: 'up' | 'down') => {
    setTemplateSections((prev) => {
      const idx = prev.findIndex((s) => s.id === sectionId);
      if (idx < 0) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy.map((item, i) => ({ ...item, order: i + 1 }));
    });
  };

  const updateGlobalSection = (id: string, updates: Partial<GlobalSectionBlock>) => {
    setGlobalSections((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, ...updates, lastUpdated: 'Just now' } : b
      )
    );
    addToast({
      type: 'success',
      title: 'Global Section Updated',
      description: 'Changes successfully propagated across 1,246 live practice pages.',
    });
  };

  // Internal Links
  const approveInternalLink = (pageId: string, linkId: string) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          internalLinks: p.internalLinks.map((l) => (l.id === linkId ? { ...l, status: 'approved' } : l)),
        };
      })
    );
    addToast({
      type: 'success',
      title: 'Internal Link Approved',
      description: 'Link relationship anchored in page DOM.',
    });
  };

  const rejectInternalLink = (pageId: string, linkId: string) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          internalLinks: p.internalLinks.map((l) => (l.id === linkId ? { ...l, status: 'rejected' } : l)),
        };
      })
    );
    addToast({
      type: 'info',
      title: 'Internal Link Excluded',
      description: 'Link proposal removed from suggestions.',
    });
  };

  const approveAllInternalLinks = () => {
    setPages((prev) =>
      prev.map((p) => ({
        ...p,
        internalLinks: p.internalLinks.map((l) => ({ ...l, status: 'approved' })),
      }))
    );
    addToast({
      type: 'success',
      title: 'All Internal Links Approved',
      description: 'Automated semantic silo links activated across all pages.',
    });
  };

  // Deployment & Rollback
  const rollbackDeployment = async (version: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setDeployments((prev) => [
          {
            id: `dep-${Date.now()}`,
            version: `${version}-restored`,
            commitHash: 'a712e09',
            message: `Rollback to ${version} executed by administrator`,
            timestamp: 'Just now',
            status: 'healthy',
            pagesDeployed: 1242,
            deployedBy: 'System Administrator (Rollback)',
          },
          ...prev,
        ]);
        addToast({
          type: 'warning',
          title: `Rollback Executed: ${version}`,
          description: 'Production edge cache invalidated and previous release restored.',
        });
        resolve();
      }, 1400);
    });
  };

  const simulateDeploy = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const nextVer = `v1.4.${deployments.length + 1}`;
        setDeployments((prev) => [
          {
            id: `dep-${Date.now()}`,
            version: nextVer,
            commitHash: Math.random().toString(16).substring(2, 9),
            message: 'Automated production build & edge cache deployment',
            timestamp: 'Just now',
            status: 'healthy',
            pagesDeployed: 1284 + pages.length - SAMPLE_PAGES.length,
            deployedBy: 'Harrison & Cole SEO Automation Engine',
          },
          ...prev,
        ]);
        addToast({
          type: 'success',
          title: 'Deployment Complete',
          description: `Version ${nextVer} deployed to Edge CDN with 100% cache hit verification.`,
        });
        resolve();
      }, 1500);
    });
  };

  // Bulk CSV Import
  const importCsvDrafts = async (rows: { city: string; practice: string }[]): Promise<number> => {
    const createdPages: GeneratedPage[] = [];

    for (const r of rows) {
      const citySlug = r.city.toLowerCase().trim().replace(/\s+/g, '-');
      const practiceSlug = r.practice.toLowerCase().trim().replace(/\s+/g, '-');
      const url = `/${citySlug}/${practiceSlug}/`;

      if (pages.some((p) => p.url === url)) continue;

      const pageId = `page-csv-${citySlug}-${practiceSlug}-${Math.random().toString(36).substring(2, 6)}`;
      createdPages.push({
        id: pageId,
        cityId: citySlug,
        cityName: r.city,
        practiceId: practiceSlug,
        practiceName: r.practice,
        slug: practiceSlug,
        url,
        status: 'draft',
        seoScore: 81,
        wordCount: 2200,
        internalLinksCount: 4,
        lastUpdated: new Date().toISOString().split('T')[0],
        h1: `${r.city} ${r.practice}`,
        metaTitle: `${r.city} ${r.practice} | Harrison & Cole`,
        metaDescription: `Injured in ${r.city}? Contact Harrison & Cole for dedicated representation in ${r.practice.toLowerCase()} claims. Free consultation.`,
        introText: `Victims of negligence in ${r.city} deserve fierce legal representation. We fight insurance carriers to recover full damages for injured Texans.`,
        mainContentText: `Our legal team examines every case with meticulous care, retaining top expert witnesses and preparing comprehensive demand packages.`,
        commonCauses: [`Driver negligence in ${r.city}`, `Reckless behavior on highway corridors`],
        localCourthouse: `${r.city} District Court`,
        statAccidentsYear: 'Official state collision reporting statistics apply',
        faqList: [
          {
            question: `When should I file a ${r.practice.toLowerCase()} claim?`,
            answer: `The Texas statute of limitations is two years from the injury date. Contact counsel immediately.`,
          },
        ],
        internalLinks: [],
        surferKeywords: [
          { term: `${r.city} ${r.practice.toLowerCase()}`, frequency: 12, recommended: '12-18', status: 'good' },
        ],
      });
    }

    setPages((prev) => [...createdPages, ...prev]);
    addToast({
      type: 'success',
      title: 'CSV Import Completed',
      description: `${createdPages.length} programmatic page drafts generated from CSV batch.`,
    });

    return createdPages.length;
  };

  const resetAllDemoData = () => {
    try {
      localStorage.removeItem('lexscale_pages');
      localStorage.removeItem('lexscale_cities');
      localStorage.removeItem('lexscale_practices');
      localStorage.removeItem('lexscale_globals');
    } catch {}
    setCities(INITIAL_CITIES);
    setPracticeAreas(INITIAL_PRACTICE_AREAS);
    setPages(SAMPLE_PAGES);
    setTemplateSections(INITIAL_TEMPLATE_SECTIONS);
    setGlobalSections(INITIAL_GLOBAL_SECTIONS);
    setCallRailConfig(INITIAL_CALL_RAIL_CONFIG);
    setStickyCtaConfig(INITIAL_STICKY_CTA_CONFIG);
    setSeoPatterns(INITIAL_SEO_PATTERNS);
    setDeployments(INITIAL_DEPLOYMENTS);
    setSelectedPageId('page-houston-car');
    addToast({
      type: 'info',
      title: 'Demo State Reset',
      description: 'All cities, practice areas, pages, and CallRail configurations reset to pristine demo defaults.',
    });
  };

  return (
    <AppContext.Provider
      value={{
        appMode,
        setAppMode,
        publicRoute,
        setPublicRoute,
        adminTab,
        setAdminTab,
        selectedPageId,
        setSelectedPageId,
        trafficSource,
        setTrafficSource,
        currentPhoneNumber,
        callRailConfig,
        updateCallRailConfig,
        testNumberRotation,
        stickyCtaConfig,
        updateStickyCtaConfig,
        consultationModalOpen,
        setConsultationModalOpen,
        cities,
        practiceAreas,
        pages,
        templateSections,
        globalSections,
        seoPatterns,
        deployments,
        surferConnected,
        surferApiKey,
        setSurferApiKey,
        testSurferConnection,
        addCity,
        updateCity,
        deleteCity,
        addPracticeArea,
        updatePracticeArea,
        deletePracticeArea,
        updatePageStatus,
        updatePageContent,
        deletePage,
        generatePagesBatch,
        generateSinglePage,
        regeneratePageContent,
        toggleTemplateSection,
        reorderTemplateSection,
        updateGlobalSection,
        approveInternalLink,
        rejectInternalLink,
        approveAllInternalLinks,
        rollbackDeployment,
        simulateDeploy,
        importCsvDrafts,
        toasts,
        addToast,
        removeToast,
        resetAllDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
