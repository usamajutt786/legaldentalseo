'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  GitBranch,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Server,
  AlertTriangle,
  X,
} from 'lucide-react';

export default function DeploymentsView() {
  const {
    deployments,
    rollbackDeployment,
    simulateDeploy,
    setAppMode,
    setPublicRoute,
  } = useApp();

  const [isDeploying, setIsDeploying] = useState(false);
  const [rollbackModalVer, setRollbackModalVer] = useState<string | null>(null);
  const [isRollingBack, setIsRollingBack] = useState(false);

  const handleDeploy = async () => {
    setIsDeploying(true);
    await simulateDeploy();
    setIsDeploying(false);
  };

  const confirmRollback = async () => {
    if (!rollbackModalVer) return;
    setIsRollingBack(true);
    await rollbackDeployment(rollbackModalVer);
    setIsRollingBack(false);
    setRollbackModalVer(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <GitBranch className="w-3.5 h-3.5" />
          Infrastructure & Edge CDN
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Deployments & Instant Rollback System
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor continuous integration pipelines and restore historical releases in seconds.
        </p>
      </div>

      {/* GitHub & Vercel Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>Production Status</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-lg font-bold text-emerald-700">Healthy</div>
          <div className="text-[11px] text-slate-400">Edge CDN 100% operational</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>Vercel Build Edge</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-bold text-slate-900">Successful</div>
          <div className="text-[11px] text-slate-400">Latest build: 48s · 1,284 URLs</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>Preview Staging</span>
            <ExternalLink className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-lg font-bold text-blue-700">Available</div>
          <div className="text-[11px] text-slate-400">Branch: stage-harris-county</div>
        </div>
      </div>

      {/* Actions Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-bold text-slate-900 text-xs">Production Environment: Live</div>
          <div className="text-[11px] text-slate-500">Targeting https://www.harrisoncoleinjurylaw.com</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setAppMode('public');
              setPublicRoute('home');
            }}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
          >
            View Live Preview
          </button>
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isDeploying ? 'animate-spin' : ''}`} />
            <span>{isDeploying ? 'Deploying to Edge...' : 'Deploy Production Release'}</span>
          </button>
        </div>
      </div>

      {/* Deployment History Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 font-serif font-bold text-slate-900 text-sm">
          Deployment & Release History
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Release Version</th>
                <th className="px-4 py-3">Commit & Message</th>
                <th className="px-4 py-3">Deployed By</th>
                <th className="px-4 py-3 text-center">Pages Deployed</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {deployments.map((dep, idx) => {
                const isCurrent = idx === 0;

                return (
                  <tr key={dep.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-mono font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{dep.version}</span>
                        {isCurrent && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                            CURRENT
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-800">{dep.message}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Commit: {dep.commitHash}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{dep.deployedBy}</td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-slate-800">
                      {dep.pagesDeployed.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">
                      {dep.timestamp}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!isCurrent ? (
                        <button
                          onClick={() => setRollbackModalVer(dep.version)}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded text-xs font-semibold flex items-center gap-1 ml-auto"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Rollback</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">
                          Live Production
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rollback Confirmation Modal */}
      {rollbackModalVer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Confirm Instant Rollback to {rollbackModalVer}
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                This will immediately invalidate the edge CDN cache across North America and restore the previous sitemap and page database from {rollbackModalVer}.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setRollbackModalVer(null)}
                disabled={isRollingBack}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmRollback}
                disabled={isRollingBack}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg shadow transition-colors"
              >
                {isRollingBack ? 'Restoring Snapshot...' : `Rollback to ${rollbackModalVer}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
