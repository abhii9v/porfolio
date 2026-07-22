'use client';

import React, { useState } from 'react';
import { Shield, Database, RefreshCw, CheckCircle, AlertCircle, ExternalLink, Settings } from 'lucide-react';

export default function AdminPage() {
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await fetch('/api/seed');
      const data = await res.json();
      setSeedResult({
        success: data.success,
        message: data.success ? 'All database tables seeded successfully!' : data.error || 'Seeding failed.',
      });
    } catch (err: any) {
      setSeedResult({
        success: false,
        message: err.message || 'Network request failed.',
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      {/* Title */}
      <div className="flex items-center space-x-3 pb-4 border-b border-white/5">
        <div className="h-10 w-10 rounded-none bg-white/10 border border-white/20 flex items-center justify-center text-white">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="text-xs text-zinc-500 font-mono">Appwrite Database & CMS Control Console</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sync Controls */}
        <div className="glass border border-white/5 rounded-none p-6 bg-black/20 md:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-white font-sans flex items-center space-x-2">
            <Database className="h-5 w-5 text-white" />
            <span>Database Synchronization</span>
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Force a database synchronization. This will populate the Appwrite Database with Abhinav's experiences, projects, and RAG knowledge base chunks if they are not already present.
          </p>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-none bg-white text-black border border-white font-semibold font-mono text-xs hover:bg-zinc-200 disabled:opacity-40 transition-all cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${seeding ? 'animate-spin' : ''}`} />
              <span>{seeding ? 'Syncing...' : 'Sync Database / Seed Data'}</span>
            </button>
          </div>

          {/* Results Toast */}
          {seedResult && (
            <div
              className={`p-4 rounded-none border flex items-start space-x-3 ${
                seedResult.success
                  ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400'
                  : 'border-rose-500/20 bg-rose-500/5 text-rose-400'
              }`}
            >
              {seedResult.success ? (
                <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              )}
              <div>
                <h5 className="text-xs font-semibold font-sans">
                  {seedResult.success ? 'Sync Completed' : 'Sync Error'}
                </h5>
                <p className="text-[11px] font-mono mt-1 leading-normal">{seedResult.message}</p>
              </div>
            </div>
          )}
        </div>

        {/* Console Shortcuts */}
        <div className="glass border border-white/5 rounded-none p-6 bg-black/20 space-y-6">
          <h3 className="text-sm font-bold text-white font-sans flex items-center space-x-2">
            <Settings className="h-4 w-4 text-white" />
            <span>Console Shortcuts</span>
          </h3>

          <div className="space-y-3">
            <a
              href="https://nyc.cloud.appwrite.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-none bg-white/[0.01] hover:bg-white/[0.03] border border-white/10 hover:border-white/20 text-xs text-zinc-300 hover:text-white transition-all group"
            >
              <span>Appwrite Cloud Console</span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-white transition-colors" />
            </a>

            <div className="border-t border-white/5 pt-4 space-y-2">
              <span className="text-[10px] text-zinc-500 font-mono block">Project ID</span>
              <code className="text-[10px] text-zinc-300 font-mono bg-black/40 px-2 py-1 rounded-none block truncate select-all">
                6a1ece8b002c669f2b4f
              </code>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 font-mono block">Database ID</span>
              <code className="text-[10px] text-zinc-300 font-mono bg-black/40 px-2 py-1 rounded-none block truncate select-all">
                portfolio_db
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
