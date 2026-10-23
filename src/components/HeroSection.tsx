import React from 'react';
import {
  Sparkles,
  Zap,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { metrics, setActiveTab, setIsPostModalOpen } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0d0714] via-[#160b2b] to-[#0d0714]">
      {/* Dynamic Glowing Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-700/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-950/80 border border-violet-700/60 shadow-lg backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-semibold text-violet-200">
              ⚡ Powered by Python Priority Matching & Node.js Dispatch
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              99.4% Match Rate
            </span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Zero Food Waste.{' '}
              <span className="block mt-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Maximum Social Impact.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-violet-200/80 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              SharePlate instantly connects restaurants, hostels, event caterers, and food banks. Our smart matching algorithm prioritizes nearby shelters and donations approaching collection deadlines before food expires.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setIsPostModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-slate-950 fill-current" />
                List Surplus Food Now
              </button>

              <button
                onClick={() => setActiveTab('feed')}
                className="px-6 py-3.5 rounded-2xl bg-violet-900/40 hover:bg-violet-800/60 border border-violet-700/60 text-violet-100 font-semibold text-sm backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer"
              >
                Explore Live Feed
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => setActiveTab('visualizer')}
                className="px-5 py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-medium text-xs backdrop-blur-md flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Inspect Algorithm
              </button>
            </div>

            {/* Security & Verification Guarantee */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-violet-300/70 border-t border-violet-900/40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% FDA / FSSAI Certified Donors</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>22 Min Avg Dispatch Time</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-violet-400" />
                <span>Proximity Heatmap Dispatch</span>
              </div>
            </div>

          </div>

          {/* Right Parallax Hero Visual Card with Animated Percentage Rings */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-400/40 via-violet-600/30 to-violet-900/20 shadow-2xl shadow-violet-950/80">
              <div className="relative rounded-[22px] overflow-hidden bg-[#160b29] p-5 space-y-5">
                
                {/* Visual Image Header */}
                <div className="relative h-48 rounded-xl overflow-hidden group">
                  <img
                    src="/hero-rescue.png"
                    alt="Food Rescue Hero"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160b29] via-transparent to-black/30" />
                  
                  {/* Floating Urgency Tag */}
                  <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    Live Matching Engine Active
                  </div>

                  {/* Expiry Pill */}
                  <div className="absolute bottom-3 left-3 bg-violet-950/90 text-amber-300 text-xs font-semibold px-3 py-1 rounded-lg border border-violet-700/60 backdrop-blur-md flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Critical Window: &lt; 90 mins prioritized
                  </div>
                </div>

                {/* Percentage Progress Gauge Grid */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Gauge 1: Expiry Rescue Success */}
                  <div className="p-3.5 rounded-xl bg-violet-950/60 border border-violet-800/40 relative overflow-hidden group hover:border-amber-400/50 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-violet-300">Match Efficiency</span>
                      <span className="text-xs font-extrabold text-amber-400">99.4%</span>
                    </div>
                    {/* Visual Bar */}
                    <div className="w-full h-2 rounded-full bg-violet-900/80 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full w-[99.4%]" />
                    </div>
                    <p className="text-[10px] text-violet-400/80 mt-1.5">Nearby NGOs auto-routed</p>
                  </div>

                  {/* Gauge 2: Carbon Waste Diverted */}
                  <div className="p-3.5 rounded-xl bg-violet-950/60 border border-violet-800/40 relative overflow-hidden group hover:border-amber-400/50 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-violet-300">Landfill Diverted</span>
                      <span className="text-xs font-extrabold text-amber-400">88.5%</span>
                    </div>
                    {/* Visual Bar */}
                    <div className="w-full h-2 rounded-full bg-violet-900/80 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full w-[88.5%]" />
                    </div>
                    <p className="text-[10px] text-violet-400/80 mt-1.5">1,180 Tonnes CO₂ saved</p>
                  </div>

                </div>

                {/* Live Activity Snippet */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-violet-900/40 to-amber-500/10 border border-violet-700/40 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center shrink-0 border border-amber-400/30">
                    <Building2 className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-violet-100 flex items-center justify-between">
                      <span>Grand Royale Hotel</span>
                      <span className="text-[10px] text-amber-400 font-mono">98.4% Match</span>
                    </div>
                    <p className="text-violet-300/80 text-[11px]">75 Hot Meals claimed by Hope Haven Shelter</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Live Scrolling Metrics Ribbon with Percentage Cards */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-[#160b29]/80 border border-violet-800/50 hover:border-amber-400/40 transition-all shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-amber-400/20 text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {(metrics.totalFoodRescuedKg / 1000).toFixed(1)}k <span className="text-xs text-amber-400 font-normal">kg</span>
              </span>
            </div>
            <p className="text-xs text-violet-300/70 font-medium">Surplus Food Rescued</p>
            <div className="mt-2 text-[10px] text-amber-400 flex items-center gap-1">
              <span>▲ +14.2%</span> <span className="text-violet-400">vs last month</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#160b29]/80 border border-violet-800/50 hover:border-amber-400/40 transition-all shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-violet-500/20 text-violet-300">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {(metrics.mealsServedCount / 1000000).toFixed(2)}M
              </span>
            </div>
            <p className="text-xs text-violet-300/70 font-medium">Hot Meals Served</p>
            <div className="mt-2 text-[10px] text-amber-400 flex items-center gap-1">
              <span>▲ 96.2%</span> <span className="text-violet-400">recipient satisfaction</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#160b29]/80 border border-violet-800/50 hover:border-amber-400/40 transition-all shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {metrics.co2PreventedTonnes} <span className="text-xs text-emerald-400 font-normal">Tonnes</span>
              </span>
            </div>
            <p className="text-xs text-violet-300/70 font-medium">CO₂e Emissions Prevented</p>
            <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1">
              <span>🌿 100% Green</span> <span className="text-violet-400">certified offset</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#160b29]/80 border border-violet-800/50 hover:border-amber-400/40 transition-all shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {metrics.avgPickupTimeMins} <span className="text-xs text-amber-300 font-normal">mins</span>
              </span>
            </div>
            <p className="text-xs text-violet-300/70 font-medium">Avg Collection Speed</p>
            <div className="mt-2 text-[10px] text-amber-400 flex items-center gap-1">
              <span>⚡ Smart Dispatch</span> <span className="text-violet-400">activated</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
