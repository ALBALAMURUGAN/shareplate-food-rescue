import React from 'react';
import {
  ShieldCheck,
  Activity,
  CheckCircle2,
  Sliders,
  Cpu,
  RefreshCw,
  Zap,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { auditLogs, metrics, setIsSandboxOpen, triggerConfetti } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Control Tower Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-950 via-[#1e0f3d] to-amber-950/40 border border-violet-800/60 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1">
              <Zap className="w-4 h-4 fill-current" />
              Super Admin Control Tower
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-violet-800 text-amber-300 text-[11px] font-mono font-bold">
              System Status: 100% Operational
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Platform Network Administration & KYC Oversight
          </h2>
          <p className="text-xs text-violet-300/80 mt-1">
            Monitor Express API response times, PostgreSQL transaction integrity, and Python match engine parameters.
          </p>
        </div>

        <button
          onClick={() => setIsSandboxOpen(true)}
          className="px-5 py-3 rounded-2xl bg-violet-900/80 hover:bg-violet-800 text-amber-300 text-xs font-bold border border-violet-700/60 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Cpu className="w-4 h-4 text-amber-400" />
          Inspect Postgres & Express Backend
        </button>
      </div>

      {/* Admin KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 space-y-1">
          <div className="text-xs text-violet-400 font-semibold">Active Donors (KYC)</div>
          <div className="text-2xl font-black text-white font-mono">{metrics.activeDonorsCount}</div>
          <div className="text-[10px] text-emerald-400">99.8% Hygiene Compliant</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 space-y-1">
          <div className="text-xs text-violet-400 font-semibold">Verified NGO Recipients</div>
          <div className="text-2xl font-black text-amber-400 font-mono">{metrics.activeNGOsCount}</div>
          <div className="text-[10px] text-amber-300">Active Daily Needs</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 space-y-1">
          <div className="text-xs text-violet-400 font-semibold">Registered Courier Fleet</div>
          <div className="text-2xl font-black text-white font-mono">{metrics.activeVolunteersCount}</div>
          <div className="text-[10px] text-violet-300">22 min avg pickup</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160b29] border border-violet-800/50 space-y-1">
          <div className="text-xs text-violet-400 font-semibold">Dispatch Match Rate</div>
          <div className="text-2xl font-black text-amber-400 font-mono">{metrics.matchEfficiencyPercent}%</div>
          <div className="text-[10px] text-emerald-400">0% Expiry Discards</div>
        </div>

      </div>

      {/* KYC Verification Approvals & Audit Trail */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Donor Hygiene KYC Verification Queue */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#160b29] border border-violet-800/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Donor KYC & Food Safety Approvals
            </h3>
            <span className="text-xs text-emerald-400 font-bold">2 Pending Review</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-violet-950/80 border border-violet-800 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-white text-sm">Metropolis Sky Lounge</div>
                <div className="text-violet-300/80">FDA Food Safety License #FDA-9082 • Caterer</div>
              </div>
              <button
                onClick={() => {
                  triggerConfetti();
                  alert('Donor KYC Approved & Hygiene Badge Issued!');
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all"
              >
                Approve Donor
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-violet-950/80 border border-violet-800 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-white text-sm">Sunrise Bakery & Cafe</div>
                <div className="text-violet-300/80">Health Inspection Score: 98% • Bakery</div>
              </div>
              <button
                onClick={() => {
                  triggerConfetti();
                  alert('Donor KYC Approved!');
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all"
              >
                Approve Donor
              </button>
            </div>
          </div>
        </div>

        {/* Live Audit Log */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#160b29] border border-violet-800/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              Real-Time Audit Log Stream
            </h3>
            <span className="text-xs text-violet-400 font-mono">PostgreSQL WAL Engine</span>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2 pr-1 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 rounded-xl bg-violet-950/60 border border-violet-900 font-mono">
                <div className="flex items-center justify-between text-[11px] text-amber-300 mb-1">
                  <span>{log.actor} [{log.action}]</span>
                  <span className="text-violet-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-violet-200/90 text-[11px]">{log.details}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
