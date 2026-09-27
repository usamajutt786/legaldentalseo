export type PageStatus = 'published' | 'draft' | 'review' | 'approved';

export type TrafficSource = 'organic' | 'google_ads' | 'direct' | 'local_maps';

export interface City {
  id: string;
  name: string;
  state: string;
  slug: string;
  county: string;
  active: boolean;
  generatedPagesCount: number;
  population?: string;
  courthouseName: string;
  majorHighways: string[];
}

export interface PracticeArea {
  id: string;
  name: string;
  slug: string;
  category: 'Motor Vehicle' | 'Premises Liability' | 'Catastrophic' | 'Workplace' | 'General';
  active: boolean;
  statAvgSettlement: string;
  searchVolume: string;
  difficulty: number;
}

export interface InternalLinkItem {
  id: string;
  anchorText: string;
  targetUrl: string;
  relationship: 'Same City → Related Practice' | 'Same Practice → Nearby City' | 'Hub → Detail' | 'Supporting Guide';
  status: 'approved' | 'pending' | 'rejected';
}

export interface SchemaConfig {
  type: 'LegalService' | 'Attorney' | 'LocalBusiness' | 'FAQPage' | 'BreadcrumbList';
  name: string;
  url: string;
  telephone: string;
  priceRange: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
}

export interface SurferKeywordMetric {
  term: string;
  frequency: number;
  recommended: string;
  status: 'good' | 'under' | 'over';
}

export interface GeneratedPage {
  id: string;
  cityId: string;
  cityName: string;
  practiceId: string;
  practiceName: string;
  slug: string;
  url: string;
  status: PageStatus;
  seoScore: number;
  wordCount: number;
  internalLinksCount: number;
  lastUpdated: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  introText: string;
  mainContentText: string;
  commonCauses: string[];
  localCourthouse: string;
  statAccidentsYear: string;
  faqList: { question: string; answer: string }[];
  internalLinks: InternalLinkItem[];
  surferKeywords: SurferKeywordMetric[];
  isCustomized?: boolean;
}

export interface TemplateSection {
  id: string;
  name: string;
  type: 'dynamic' | 'global';
  description: string;
  enabled: boolean;
  order: number;
  globalKey?: string;
}

export interface GlobalSectionBlock {
  id: string;
  key: string;
  name: string;
  headline: string;
  subheadline: string;
  bodyContent: string;
  badgeText: string;
  usedOnPagesCount: number;
  lastUpdated: string;
}

export interface CallRailConfig {
  provider: string;
  status: 'Configured' | 'Syncing' | 'Offline';
  dniEnabled: boolean;
  numbers: {
    main: string;
    organic: string;
    google_ads: string;
    direct: string;
    local_maps: string;
  };
}

export interface StickyCtaConfig {
  headline: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  phoneSource: 'Dynamic Call Tracking' | 'Main Office';
  desktopEnabled: boolean;
  mobileEnabled: boolean;
  showConsultationModal: boolean;
}

export interface SeoPatternConfig {
  metaTitlePattern: string;
  metaDescriptionPattern: string;
  urlPattern: string;
  h1Pattern: string;
  canonicalBase: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  enableBreadcrumbs: boolean;
  openGraphEnabled: boolean;
}

export interface DeploymentRecord {
  id: string;
  version: string;
  commitHash: string;
  message: string;
  timestamp: string;
  status: 'healthy' | 'rollback_available' | 'rolled_back';
  pagesDeployed: number;
  deployedBy: string;
}
