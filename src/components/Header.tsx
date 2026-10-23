import React, { useState } from 'react';
import {
  Utensils,
  Bell,
  PlusCircle,
  Database,
  Cpu,
  Volume2,
  VolumeX,
  Sliders,
  Sparkles,
  MapPin,
  TrendingUp,
  Award,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Header: React.FC = () => {
  const {
    userRole,
    setUserRole,
    activeTab,
    setActiveTab,
    notifications,
    setIsPostModalOpen,
    setIsSandboxOpen,
    audioChimeEnabled,
    setAudioChimeEnabled,
    markNotificationAsRead,
  } = useApp();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; bg: string; icon: string }> = {
    donor: { label: 'Donor / Caterer', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: '🍲' },
    ngo: { label: 'NGO / Charity', bg: 'bg-violet-500/20 text-violet-300 border-violet-500/40', icon: '🏛️' },
    volunteer: { label: 'Volunteer Rider', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: '🚴' },
    admin: { label: 'Platform Admin', bg: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/40', icon: '⚡' },
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0714]/90 backdrop-blur-xl border-b border-violet-900/40 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo & Platform Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('feed')}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-700 via-violet-900 to-amber-500 p-0.5 shadow-lg shadow-violet-900/50 group">
            <div className="w-full h-full bg-[#120924] rounded-[14px] flex items-center justify-center group-hover:bg-transparent transition-all">
              <Utensils className="w-6 h-6 text-amber-400 transform group-hover:scale-110 transition-transform" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-amber-400 to-violet-300 bg-clip-text text-transparent">
                SharePlate
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-violet-950 text-amber-400 border border-violet-700/60 tracking-wider">
                v3.4 AI
              </span>
            </div>
            <p className="text-xs text-violet-300/70 hidden sm:block">
              Food Rescue & Smart Dispatch Network
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-[#160b29] border border-violet-900/50 rounded-full shadow-inner">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'feed'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                : 'text-violet-200 hover:text-white hover:bg-violet-900/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Live Surplus Feed
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'map'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                : 'text-violet-200 hover:text-white hover:bg-violet-900/40'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Interactive Map
          </button>

          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'visualizer'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                : 'text-violet-200 hover:text-white hover:bg-violet-900/40'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-violet-900" />
            Smart Match AI
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'dashboard'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                : 'text-violet-200 hover:text-white hover:bg-violet-900/40'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Role Dashboard
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'impact'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                : 'text-violet-200 hover:text-white hover:bg-violet-900/40'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Impact Metrics
          </button>
        </nav>

        {/* Right Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Role Switcher Pill Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all ${roleLabels[userRole].bg}`}>
              <span>{roleLabels[userRole].icon}</span>
              <span className="hidden sm:inline">{roleLabels[userRole].label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-current opacity-70" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-52 py-2 bg-[#1b0e33] border border-violet-800/60 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="px-3 py-1.5 border-b border-violet-800/40 text-[10px] font-bold text-violet-300 uppercase tracking-wider">
                Switch Perspective
              </div>
              {(['ngo', 'donor', 'volunteer', 'admin'] as UserRole[]).map(role => (
                <button
                  key={role}
                  onClick={() => {
                    setUserRole(role);
                    setActiveTab('dashboard');
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors ${
                    userRole === role ? 'bg-amber-400/20 text-amber-300 font-bold' : 'text-violet-200 hover:bg-violet-900/40'
                  }`}
                >
                  <span>{roleLabels[role].icon}</span>
                  <span>{roleLabels[role].label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Post Surplus Button */}
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition-all transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">Post Surplus</span>
          </button>

          {/* Node/Postgres Tech Stack Debug Console Toggle */}
          <button
            onClick={() => setIsSandboxOpen(true)}
            title="Inspect Backend Stack & SQL Database"
            className="p-2 rounded-xl bg-violet-950/80 hover:bg-violet-900 border border-violet-700/50 text-amber-400 hover:text-amber-300 transition-all flex items-center gap-1 text-xs"
          >
            <Database className="w-4 h-4" />
            <span className="hidden xl:inline text-[11px] font-mono">DB Console</span>
          </button>

          {/* Audio Alert Toggle */}
          <button
            onClick={() => setAudioChimeEnabled(!audioChimeEnabled)}
            title={audioChimeEnabled ? 'Mute Chime Alerts' : 'Enable Chime Alerts'}
            className="p-2 rounded-xl bg-violet-950/80 hover:bg-violet-900 border border-violet-700/50 text-violet-300 transition-all"
          >
            {audioChimeEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-violet-500" />}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="p-2 rounded-xl bg-violet-950/80 hover:bg-violet-900 border border-violet-700/50 text-violet-200 hover:text-white transition-all relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-slate-950">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-[#160b29] border border-violet-700/60 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="p-3 bg-violet-950/90 border-b border-violet-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">Smart Dispatch Notifications</span>
                  </div>
                  <span className="text-[10px] bg-violet-800 text-violet-200 px-2 py-0.5 rounded-full">
                    WebSocket Live
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-violet-900/40">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3 text-xs cursor-pointer hover:bg-violet-900/30 transition-colors ${
                        n.read ? 'opacity-60' : 'bg-amber-400/5 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-amber-300">{n.title}</span>
                        <span className="text-[10px] text-violet-400">{n.timestamp}</span>
                      </div>
                      <p className="text-violet-200/90 text-[11px] leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Tab Navigation */}
      <div className="flex md:hidden items-center justify-around pt-2 mt-2 border-t border-violet-900/40">
        <button
          onClick={() => setActiveTab('feed')}
          className={`text-xs font-medium py-1 px-2 rounded ${activeTab === 'feed' ? 'text-amber-400 font-bold' : 'text-violet-300'}`}
        >
          Feed
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`text-xs font-medium py-1 px-2 rounded ${activeTab === 'map' ? 'text-amber-400 font-bold' : 'text-violet-300'}`}
        >
          Map
        </button>
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`text-xs font-medium py-1 px-2 rounded ${activeTab === 'visualizer' ? 'text-amber-400 font-bold' : 'text-violet-300'}`}
        >
          Smart AI
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`text-xs font-medium py-1 px-2 rounded ${activeTab === 'dashboard' ? 'text-amber-400 font-bold' : 'text-violet-300'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('impact')}
          className={`text-xs font-medium py-1 px-2 rounded ${activeTab === 'impact' ? 'text-amber-400 font-bold' : 'text-violet-300'}`}
        >
          Impact
        </button>
      </div>
    </header>
  );
};
