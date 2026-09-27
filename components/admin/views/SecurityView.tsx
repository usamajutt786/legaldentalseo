'use client';

import React from 'react';
import {
  ShieldCheck,
  Lock,
  Key,
  CheckCircle2,
  FileCode,
  Shield,
  Zap,
} from 'lucide-react';

export default function SecurityView() {
  const securityItems = [
    {
      title: 'Automated SSL / TLS Encryption',
      status: 'Enabled & Enforced',
      desc: 'TLS 1.3 encryption with automated certificate renewal via Let’s Encrypt edge authority. Strict Transport Security (HSTS) with 1-year max-age preload.',
    },
    {
      title: 'Security Headers & CSP Directives',
      status: 'Enabled & Enforced',
      desc: 'Content Security Policy (CSP), X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, and Referrer-Policy: strict-origin-when-cross-origin.',
    },
    {
      title: 'Environment Variables & Secrets Vault',
      status: 'Protected & Encrypted',
      desc: 'All third-party integration keys (Surfer SEO API, CallRail webhook secrets) are encrypted at rest with AES-256 and never exposed in client bundles.',
    },
    {
      title: 'Automated Dependency Vulnerability Scanning',
      status: 'Enabled (Zero Alerts)',
      desc: 'Continuous GitHub Dependabot and Snyk scanning across npm runtime dependencies with automated security patch PRs.',
    },
    {
      title: 'Form Spam & DDoS Rate Limiting',
      status: 'Active (Honeypot + Cloudflare)',
      desc: 'Edge-based rate limiting capping free case evaluation requests at 5 submissions per minute per IP to prevent lead-form spamming.',
    },
    {
      title: 'Ephemeral Preview Deployments',
      status: 'Enabled (Isolated Sandboxes)',
      desc: 'Branch previews run inside isolated staging environments requiring team authorization before staging can promote to production.',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Compliance & Hardening
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Security, SSL & Infrastructure Safeguards
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Enterprise security compliance protecting confidential attorney-client communications and web presence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {securityItems.map((item, idx) => (
          <div
            key={idx}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-slate-900 text-sm">
                {item.title}
              </h3>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {item.status}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
