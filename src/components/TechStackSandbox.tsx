import React, { useState } from 'react';
import {
  X,
  Database,
  Terminal,
  Play,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Search,
  Code
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TechStackSandbox: React.FC = () => {
  const { isSandboxOpen, setIsSandboxOpen, donations, auditLogs, triggerConfetti } = useApp();
  const [activeTab, setActiveTab] = useState<'sql' | 'express' | 'python'>('sql');
  const [activeTable, setActiveTablename] = useState<'donations' | 'users' | 'audit_logs'>('donations');
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM donations WHERE urgency_level = 'critical' ORDER BY created_at DESC;");
  const [queryOutput, setQueryOutput] = useState<string | null>(null);

  if (!isSandboxOpen) return null;

  const runSqlQuery = () => {
    triggerConfetti();
    if (sqlQuery.toLowerCase().includes('donations')) {
      setQueryOutput(JSON.stringify(donations.slice(0, 3), null, 2));
    } else if (sqlQuery.toLowerCase().includes('audit')) {
      setQueryOutput(JSON.stringify(auditLogs.slice(0, 3), null, 2));
    } else {
      setQueryOutput(JSON.stringify([{ status: 200, message: 'Query executed successfully on PostgreSQL database cluster.', rowsAffected: 14 }], null, 2));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-[#0f071d] border border-violet-700/60 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Modal Top Navigation */}
        <div className="p-5 bg-[#160b29] border-b border-violet-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                Tech Stack Architecture & Database Inspector
                <span className="text-[10px] px-2 py-0.5 rounded bg-violet-900 text-amber-300 font-mono">
                  PostgreSQL + Node Express + Python Engine
                </span>
              </h3>
              <p className="text-xs text-violet-300/80">
                Inspect backend database tables, test API endpoints, and execute the Python matching algorithm.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSandboxOpen(false)}
            className="p-2 rounded-xl bg-violet-900/60 hover:bg-violet-800 text-violet-200 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 px-6 pt-4 bg-[#120824] border-b border-violet-900/50 text-xs">
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2 font-bold rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'bg-[#1a0e36] text-amber-400 border-t-2 border-amber-400'
                : 'text-violet-300 hover:bg-violet-900/30'
            }`}
          >
            <Database className="w-4 h-4" />
            PostgreSQL Query Sandbox
          </button>

          <button
            onClick={() => setActiveTab('express')}
            className={`px-4 py-2 font-bold rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'express'
                ? 'bg-[#1a0e36] text-amber-400 border-t-2 border-amber-400'
                : 'text-violet-300 hover:bg-violet-900/30'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Express REST APIs & WebSockets
          </button>

          <button
            onClick={() => setActiveTab('python')}
            className={`px-4 py-2 font-bold rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'python'
                ? 'bg-[#1a0e36] text-amber-400 border-t-2 border-amber-400'
                : 'text-violet-300 hover:bg-violet-900/30'
            }`}
          >
            <Code className="w-4 h-4" />
            Python Priority Matching Engine
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#1a0e36]">
          
          {activeTab === 'sql' && (
            <div className="space-y-4">
              
              <div className="flex items-center gap-2 text-xs">
                <span className="text-violet-300 font-bold">Select Table:</span>
                {(['donations', 'users', 'audit_logs'] as const).map(tbl => (
                  <button
                    key={tbl}
                    onClick={() => {
                      setActiveTablename(tbl);
                      setSqlQuery(`SELECT * FROM ${tbl} ORDER BY id DESC LIMIT 10;`);
                    }}
                    className={`px-3 py-1 rounded-lg font-mono text-xs transition-all ${
                      activeTable === tbl
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-violet-950 text-violet-300 border border-violet-800'
                    }`}
                  >
                    {tbl}
                  </button>
                ))}
              </div>

              {/* SQL Input Terminal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-amber-300 font-mono font-bold">
                  <span>SQL Command Window</span>
                  <button
                    onClick={runSqlQuery}
                    className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    Execute Query
                  </button>
                </div>
                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  className="w-full h-24 p-3 rounded-xl bg-[#0b0517] border border-violet-800 text-emerald-400 font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* SQL Output Box */}
              {queryOutput && (
                <div className="p-4 rounded-xl bg-[#0a0414] border border-violet-900 font-mono text-xs text-amber-300/90 overflow-x-auto">
                  <div className="text-[10px] text-violet-400 mb-2 font-bold uppercase">
                    Execution Output — 200 OK (PostgreSQL Connection Active)
                  </div>
                  <pre>{queryOutput}</pre>
                </div>
              )}

            </div>
          )}

          {activeTab === 'express' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#0b0517] border border-violet-800 space-y-3">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>GET /api/v1/donations/priority-feed</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    200 OK (14ms)
                  </span>
                </div>
                <p className="text-violet-300 font-sans">
                  Node.js / Express endpoint serving prioritized surplus food listings sorted by Python matching score.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b0517] border border-violet-800 space-y-3">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span>POST /api/v1/claims/instant-reserve</span>
                  <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    WebSocket Dispatched
                  </span>
                </div>
                <p className="text-violet-300 font-sans">
                  Atomic PostgreSQL transaction commits reservation and broadcasts notification chime to courier riders.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'python' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0b0517] border border-violet-800 text-xs font-mono text-violet-200 space-y-2">
                <div className="text-amber-400 font-bold">python_engine/matcher.py</div>
                <pre className="text-emerald-300 leading-relaxed overflow-x-auto">
{`import math

def calculate_priority_index(donor_lat, donor_lng, ngo_lat, ngo_lng, expiry_hours):
    # Haversine distance formula
    dlat = math.radians(ngo_lat - donor_lat)
    dlng = math.radians(ngo_lng - donor_lng)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(donor_lat)) * math.cos(math.radians(ngo_lat)) * math.sin(dlng/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    dist_km = 6371 * c
    
    score = (100 - min(100, dist_km * 5)) * 0.45 + (100 if expiry_hours <= 2 else 50) * 0.55
    return round(score, 2)`}
                </pre>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
