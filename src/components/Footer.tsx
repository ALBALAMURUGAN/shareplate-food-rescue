import React from 'react';
import { Utensils, Heart, ShieldCheck, Phone, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsSandboxOpen } = useApp();

  return (
    <footer className="bg-[#090412] border-t border-violet-900/60 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-violet-300/80 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="text-lg font-extrabold text-white">SharePlate</span>
          </div>
          <p className="text-violet-300/70 text-xs leading-relaxed">
            Autonomous Food Rescue & Donation Dispatch Network. Diverting organic surplus from landfills to verified community shelters in real time.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-amber-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Node.js / Express / Python Engine v3.4 Active
          </div>
        </div>

        {/* Links 1 */}
        <div className="space-y-2">
          <div className="font-bold text-white text-xs uppercase tracking-wider">Navigation</div>
          <ul className="space-y-1.5">
            <li>
              <button onClick={() => setActiveTab('feed')} className="hover:text-amber-400 transition-colors">
                Live Surplus Feed
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('map')} className="hover:text-amber-400 transition-colors">
                Interactive Routing Map
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('visualizer')} className="hover:text-amber-400 transition-colors">
                Smart Match AI Engine
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('impact')} className="hover:text-amber-400 transition-colors">
                Quantifiable ESG Metrics
              </button>
            </li>
          </ul>
        </div>

        {/* Links 2 */}
        <div className="space-y-2">
          <div className="font-bold text-white text-xs uppercase tracking-wider">Technology Stack</div>
          <ul className="space-y-1.5 text-violet-300/70">
            <li>React + Vite + TypeScript</li>
            <li>PostgreSQL ACID Database</li>
            <li>Express Node REST APIs & WebSockets</li>
            <li>Python Proximity Dispatch Formula</li>
          </ul>
          <button
            onClick={() => setIsSandboxOpen(true)}
            className="mt-2 text-amber-400 hover:underline text-[11px] font-mono flex items-center gap-1"
          >
            <Cpu className="w-3 h-3" />
            Inspect Query Sandbox
          </button>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-2">
          <div className="font-bold text-white text-xs uppercase tracking-wider">24/7 Rescue Dispatch Hotline</div>
          <p className="text-violet-300/70">For large event caterer emergency surplus pickup:</p>
          <div className="p-3 rounded-xl bg-violet-950 border border-violet-800 font-mono font-bold text-amber-300 flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-400" />
            +1 (800) 555-FOOD-RESCUE
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            FSSAI & FDA Hygiene Certified Process
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-violet-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-violet-400">
        <p>© 2026 SharePlate — Food Rescue & Donation Network. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with <Heart className="w-3 h-3 text-amber-400 fill-current" /> for zero food waste and zero hunger.
        </p>
      </div>
    </footer>
  );
};
