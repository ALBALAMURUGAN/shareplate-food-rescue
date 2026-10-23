import React, { useState, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Check,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FoodCategory, UrgencyLevel, DonationItem } from '../types';

export const ListingsFeed: React.FC = () => {
  const {
    donations,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedUrgency,
    setSelectedUrgency,
    selectedDiet,
    setSelectedDiet,
    maxDistanceKm,
    setMaxDistanceKm,
    setIsClaimModalOpen,
    setSelectedDonation,
    userRole,
  } = useApp();

  const [activeModalItem, setActiveModalItem] = useState<DonationItem | null>(null);

  // Filter logic
  const filteredDonations = donations.filter(item => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDonor = item.donorName.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDonor && !matchDesc) return false;
    }

    // Category match
    if (selectedCategory !== 'all' && item.foodCategory !== selectedCategory) {
      return false;
    }

    // Urgency match
    if (selectedUrgency !== 'all' && item.urgencyLevel !== selectedUrgency) {
      return false;
    }

    // Distance match
    if (item.location.distanceKm > maxDistanceKm) {
      return false;
    }

    // Dietary match
    if (selectedDiet !== 'all' && !item.dietaryTags.includes(selectedDiet)) {
      return false;
    }

    return true;
  });

  const categories: { id: FoodCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Surplus', icon: '🍽️' },
    { id: 'cooked', label: 'Hot Meals', icon: '🍲' },
    { id: 'bakery', label: 'Bakery & Bread', icon: '🥐' },
    { id: 'produce', label: 'Fresh Produce', icon: '🥦' },
    { id: 'packaged', label: 'Meal Trays', icon: '🍱' },
    { id: 'dairy', label: 'Dairy & Milk', icon: '🥛' },
  ];

  const dietaryOptions = ['all', 'Vegetarian', 'Vegan', 'Halal', 'Gluten-Free', 'Nut-Free', 'Organic'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search & Filter Header Toolbar */}
      <div className="p-6 rounded-3xl bg-[#160b29] border border-violet-800/50 shadow-xl space-y-6">
        
        {/* Top Search Input Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-2/3">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" />
            <input
              type="text"
              placeholder="Search by meal, restaurant, hostel, or dietary tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-violet-950/80 border border-violet-700/60 text-white text-sm focus:outline-none focus:border-amber-400 placeholder-violet-400 transition-all"
            />
          </div>

          {/* Distance Radius Slider */}
          <div className="w-full md:w-1/3 flex items-center gap-3 bg-violet-950/50 px-4 py-2.5 rounded-2xl border border-violet-800/40">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="w-full">
              <div className="flex justify-between text-xs text-violet-200 mb-1">
                <span>Distance Radius</span>
                <span className="font-bold text-amber-400">{maxDistanceKm} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-violet-900 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-violet-950/80 text-violet-200 hover:bg-violet-900/60 border border-violet-800/40'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Secondary Filter Tags */}
        <div className="flex items-center justify-between gap-4 flex-wrap text-xs pt-2 border-t border-violet-900/50">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-violet-400 font-semibold flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              Dietary Tag:
            </span>
            {dietaryOptions.map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDiet(diet)}
                className={`px-3 py-1 rounded-lg text-xs transition-all ${
                  selectedDiet === diet
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-violet-900/30 text-violet-300 hover:bg-violet-800/50'
                }`}
              >
                {diet === 'all' ? 'Any Diet' : diet}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-violet-400 font-semibold">Urgency Filter:</span>
            <button
              onClick={() => setSelectedUrgency(selectedUrgency === 'critical' ? 'all' : 'critical')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedUrgency === 'critical'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-violet-900/30 text-amber-300 border border-amber-500/30'
              }`}
            >
              ⚡ Urgent (&lt; 2h)
            </button>
          </div>
        </div>

      </div>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            Available Surplus Food Listings
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-900 text-amber-300 font-mono font-bold">
              {filteredDonations.length} Active
            </span>
          </h3>
          <p className="text-xs text-violet-300/70">
            Automatically prioritized by Python match algorithm based on distance and collection window.
          </p>
        </div>
      </div>

      {/* Food Listings Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonations.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            onClaim={() => {
              setSelectedDonation(item);
              setIsClaimModalOpen(true);
            }}
            onViewDetail={() => setActiveModalItem(item)}
            userRole={userRole}
          />
        ))}
      </div>

      {/* Item Detail View Modal */}
      {activeModalItem && (
        <ItemDetailModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
          onClaim={() => {
            setSelectedDonation(activeModalItem);
            setIsClaimModalOpen(true);
            setActiveModalItem(null);
          }}
        />
      )}

    </div>
  );
};

/* Food Listing Card Component */
interface FoodCardProps {
  item: DonationItem;
  onClaim: () => void;
  onViewDetail: () => void;
  userRole: string;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onClaim, onViewDetail }) => {
  const [timeLeft, setTimeLeft] = useState('');

  // Live Countdown calculation
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const expiry = new Date(item.expiryTimestamp).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [item.expiryTimestamp]);

  const isCritical = item.urgencyLevel === 'critical';
  const score = item.matchScore || 90;

  return (
    <div className="rounded-3xl bg-[#160b29] border border-violet-800/50 hover:border-amber-400/60 transition-all duration-300 overflow-hidden group shadow-xl flex flex-col justify-between">
      
      {/* Card Image Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160b29] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-violet-950/90 text-amber-300 border border-violet-700/60 backdrop-blur-md text-[11px] font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {item.hygieneScore}% Certified
          </span>

          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            {score.toFixed(0)}% Match
          </span>
        </div>

        {/* Countdown Pill at Bottom of Image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className={`px-3 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-md ${
            isCritical ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-violet-950/90 text-amber-300 border border-violet-700'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>Expires: {timeLeft}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          {/* Donor & Title */}
          <div className="flex items-center justify-between text-xs text-violet-300/80">
            <span className="font-semibold text-amber-300">{item.donorName}</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-violet-900/60 text-violet-300">
              {item.donorType}
            </span>
          </div>

          <h4 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {item.title}
          </h4>

          <p className="text-xs text-violet-200/80 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Location & Quantity Row */}
          <div className="pt-2 flex items-center justify-between text-xs text-violet-300 border-t border-violet-900/40">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {item.location.distanceKm} km ({item.location.city})
            </span>
            <span className="font-bold text-white bg-violet-900/40 px-2 py-0.5 rounded">
              {item.quantityDescription}
            </span>
          </div>

          {/* Dietary Tags */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {item.dietaryTags.map(tag => (
              <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-violet-950 text-violet-300 border border-violet-800">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 flex items-center gap-3 border-t border-violet-900/50">
          <button
            onClick={onViewDetail}
            className="p-2.5 rounded-xl bg-violet-900/40 hover:bg-violet-800 text-violet-200 border border-violet-700/50 transition-all text-xs"
            title="View Food & Hygiene Details"
          >
            <Info className="w-4 h-4" />
          </button>

          {item.status === 'available' ? (
            <button
              onClick={onClaim}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all transform active:scale-95"
            >
              <span>Claim Donation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex-1 py-2 rounded-xl bg-violet-950 text-amber-300 text-xs font-bold border border-violet-800 text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Claimed by {item.claimInfo?.ngoName || 'NGO'}</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

/* Item Detail Modal */
const ItemDetailModal: React.FC<{ item: DonationItem; onClose: () => void; onClaim: () => void }> = ({ item, onClose, onClaim }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#160b29] border border-violet-700/60 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl space-y-4">
        
        <div className="relative h-56">
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white font-bold flex items-center justify-center hover:bg-black"
          >
            ✕
          </button>
          <div className="absolute bottom-3 left-3 bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow">
            {item.hygieneScore}% Food Safety Hygiene Score
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{item.donorName}</span>
            <h3 className="text-xl font-extrabold text-white mt-0.5">{item.title}</h3>
            <p className="text-xs text-violet-200/90 mt-2 leading-relaxed">{item.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-violet-950/80 border border-violet-800">
              <div className="text-violet-400 text-[10px]">Storage Requirement</div>
              <div className="font-bold text-amber-300">{item.storageRequirement}</div>
            </div>
            <div className="p-3 rounded-xl bg-violet-950/80 border border-violet-800">
              <div className="text-violet-400 text-[10px]">CO₂ Carbon Saved</div>
              <div className="font-bold text-emerald-400">{item.co2SavedKg} kg CO₂e</div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-violet-900/50 hover:bg-violet-800 text-violet-200 text-xs font-bold"
            >
              Close
            </button>
            {item.status === 'available' && (
              <button
                onClick={onClaim}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 text-xs font-black shadow-lg"
              >
                Proceed to Reserve Donation
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
