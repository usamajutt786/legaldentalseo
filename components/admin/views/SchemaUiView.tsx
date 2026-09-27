'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Code2,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function SchemaUiView() {
  const { addToast } = useApp();

  const [activeSchema, setActiveSchema] = useState<'LegalService' | 'Attorney' | 'LocalBusiness' | 'FAQPage' | 'BreadcrumbList'>('LegalService');
  const [copied, setCopied] = useState(false);

  const schemaSnippets = {
    LegalService: {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Harrison & Cole Injury Attorneys',
      description: 'Houston and Texas personal injury trial lawyers recovering maximum compensation for catastrophic truck, car, and industrial accidents.',
      url: 'https://www.harrisoncoleinjurylaw.com/houston/car-accident-lawyer/',
      telephone: '(713) 555-0101',
      priceRange: '$$$$',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1000 Louisiana St, Suite 4800',
        addressLocality: 'Houston',
        addressRegion: 'TX',
        postalCode: '77002',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.7589,
        longitude: -95.3677,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Personal Injury Legal Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Car Accident Representation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '18-Wheeler Truck Crash Litigation' } },
        ],
      },
    },
    Attorney: {
      '@context': 'https://schema.org',
      '@type': 'Attorney',
      name: 'Richard E. Harrison',
      jobTitle: 'Senior Managing Partner & Trial Lawyer',
      worksFor: {
        '@type': 'LegalService',
        name: 'Harrison & Cole Injury Attorneys',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'University of Texas School of Law',
      },
      knowsAbout: [
        'Personal Injury Trial Law',
        'FMCSA Trucking Regulations',
        'Texas Civil Practice & Remedies Code § 33.001',
      ],
    },
    LocalBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Harrison & Cole - Katy Branch',
      telephone: '(713) 555-0202',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '22201 Katy Freeway, Suite 300',
        addressLocality: 'Katy',
        addressRegion: 'TX',
        postalCode: '77450',
        addressCountry: 'US',
      },
    },
    FAQPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long do I have to file a car accident claim in Houston, TX?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Under Texas Civil Practice & Remedies Code § 16.003, you have strictly two years from the collision date.',
          },
        },
        {
          '@type': 'Question',
          name: 'What fees does Harrison & Cole charge upfront?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Zero dollars. We litigate all cases on a pure contingency fee contract.',
          },
        },
      ],
    },
    BreadcrumbList: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.harrisoncoleinjurylaw.com/' },
        { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.harrisoncoleinjurylaw.com/locations/' },
        { '@type': 'ListItem', position: 3, name: 'Houston', item: 'https://www.harrisoncoleinjurylaw.com/houston/' },
        { '@type': 'ListItem', position: 4, name: 'Car Accident Lawyer', item: 'https://www.harrisoncoleinjurylaw.com/houston/car-accident-lawyer/' },
      ],
    },
  };

  const jsonString = JSON.stringify(schemaSnippets[activeSchema], null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    addToast({
      type: 'success',
      title: 'JSON-LD Copied',
      description: 'Schema code copied to your clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
          <Code2 className="w-3.5 h-3.5" />
          Rich Snippets & Structured Data
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Schema.org JSON-LD Generation
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Automated structured data embedding for Google Knowledge Graph, Local Packs, and SERP rich snippets.
        </p>
      </div>

      {/* Schema Type Selector */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl max-w-2xl text-xs">
        {(['LegalService', 'Attorney', 'LocalBusiness', 'FAQPage', 'BreadcrumbList'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActiveSchema(type)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeSchema === type
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Code Inspector Box */}
      <div className="bg-slate-950 text-slate-100 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-mono font-bold">
              {activeSchema}.jsonld
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
              Valid Schema.org 2026 Spec
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors flex items-center gap-1.5 text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="p-5 overflow-x-auto">
          <pre className="font-mono text-xs text-amber-300 leading-relaxed">
            {jsonString}
          </pre>
        </div>
      </div>
    </div>
  );
}
