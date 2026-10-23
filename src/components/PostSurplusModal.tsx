import React, { useState } from 'react';
import {
  X,
  Utensils,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  Sparkles,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FoodCategory, StorageReq, UrgencyLevel } from '../types';

export const PostSurplusModal: React.FC = () => {
  const { isPostModalOpen, setIsPostModalOpen, createDonation, triggerConfetti } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [title, setTitle] = useState('');
  const [donorName, setDonorName] = useState('Grand Royale Hotel');
  const [foodCategory, setFoodCategory] = useState<FoodCategory>('cooked');
  const [servings, setServings] = useState(50);
  const [quantityKg, setQuantityKg] = useState(20);
  const [pickupWindow, setPickupWindow] = useState('Within 2 Hours');
  const [storageReq, setStorageReq] = useState<StorageReq>('Hot (>60°C)');
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel>('high');
  const [dietaryTags, setDietaryTags] = useState<string[]>(['Vegetarian', 'Halal']);
  const [imageUrl, setImageUrl] = useState('/food-buffet.png');

  if (!isPostModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDonation({
      title: title || 'Surplus Gourmet Meal Trays',
      donorName,
      foodCategory,
      servings,
      quantityKg,
      quantityDescription: `${servings} Servings (~${quantityKg} kg)`,
      pickupWindow,
      storageRequirement: storageReq,
      urgencyLevel,
      dietaryTags,
      imageUrl,
    });
    triggerConfetti();
    setIsPostModalOpen(false);
    // Reset
    setTitle('');
    setStep(1);
  };

  const handleDietToggle = (tag: string) => {
    if (dietaryTags.includes(tag)) {
      setDietaryTags(dietaryTags.filter(t => t !== tag));
    } else {
      setDietaryTags([...dietaryTags, tag]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#160b29] border border-violet-700/60 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl space-y-6 p-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-violet-800/60 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Post Surplus Food Donation</h3>
              <p className="text-xs text-violet-300">Connect to nearby verified shelters instantly</p>
            </div>
          </div>

          <button
            onClick={() => setIsPostModalOpen(false)}
            className="p-2 rounded-xl bg-violet-900/60 hover:bg-violet-800 text-violet-200 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="space-y-3">
            <div>
              <label className="text-violet-300 font-bold block mb-1">Donor / Organization Name:</label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full p-3 rounded-xl bg-violet-950 border border-violet-800 text-white focus:outline-none focus:border-amber-400"
                placeholder="e.g. Grand Royale Hotel & Catering"
                required
              />
            </div>

            <div>
              <label className="text-violet-300 font-bold block mb-1">Meal Title / Description:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-violet-950 border border-violet-800 text-white focus:outline-none focus:border-amber-400"
                placeholder="e.g. Executive Lunch Buffet - Roasted Meats & Rice"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-violet-300 font-bold block mb-1">Food Category:</label>
                <select
                  value={foodCategory}
                  onChange={(e) => setFoodCategory(e.target.value as FoodCategory)}
                  className="w-full p-3 rounded-xl bg-violet-950 border border-violet-800 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="cooked">Hot Cooked Meals</option>
                  <option value="bakery">Bakery & Bread</option>
                  <option value="produce">Fresh Produce</option>
                  <option value="packaged">Packed Meal Boxes</option>
                  <option value="dairy">Dairy Products</option>
                </select>
              </div>

              <div>
                <label className="text-violet-300 font-bold block mb-1">Storage Need:</label>
                <select
                  value={storageReq}
                  onChange={(e) => setStorageReq(e.target.value as StorageReq)}
                  className="w-full p-3 rounded-xl bg-violet-950 border border-violet-800 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Hot (>60°C)">Hot (&gt;60°C Insulated)</option>
                  <option value="Refrigerated (2-4°C)">Refrigerated (2-4°C)</option>
                  <option value="Ambient Room Temp">Ambient Room Temp</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-violet-300 font-bold block mb-1">Portions (Servings):</label>
                <input
                  type="number"
                  value={servings}
                  onChange={(e) => setServings(parseInt(e.target.value) || 0)}
                  className="w-full p-3 rounded-xl bg-violet-950 border border-violet-800 text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="text-violet-300 font-bold block mb-1">Est. Weight (kg):</label>
                <input
                  type="number"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(parseInt(e.target.value) || 0)}
                  className="w-full p-3 rounded-xl bg-violet-950 border border-violet-800 text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-violet-300 font-bold block mb-1">Dietary Tags:</label>
              <div className="flex items-center gap-2 flex-wrap">
                {['Vegetarian', 'Vegan', 'Halal', 'Nut-Free', 'Gluten-Free'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleDietToggle(tag)}
                    className={`px-3 py-1 rounded-lg text-xs transition-all ${
                      dietaryTags.includes(tag)
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-violet-900/40 text-violet-300 border border-violet-800'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Photo */}
            <div>
              <label className="text-violet-300 font-bold block mb-1">Select Presentation Image:</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { path: '/food-buffet.png', label: 'Buffet' },
                  { path: '/food-bakery.png', label: 'Bakery' },
                  { path: '/food-produce.png', label: 'Produce' },
                  { path: '/food-packed.png', label: 'Packed' },
                ].map(img => (
                  <button
                    type="button"
                    key={img.path}
                    onClick={() => setImageUrl(img.path)}
                    className={`p-1 rounded-xl border transition-all ${
                      imageUrl === img.path ? 'border-amber-400 ring-2 ring-amber-400' : 'border-violet-800 opacity-60'
                    }`}
                  >
                    <img src={img.path} alt={img.label} className="w-full h-12 object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-violet-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIsPostModalOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-violet-900/50 hover:bg-violet-800 text-violet-200 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Broadcast Surplus to Network</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
