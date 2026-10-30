import React, { useState } from 'react';
import { useTranslation } from '../../i18n';
import { store } from '../../services/store';
import { CollectiveGroup } from '../../types';
import {
  Users,
  TrendingDown,
  Truck,
  MapPin,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  PlusCircle,
  X,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CollectiveSellingProps {
  onGroupJoined?: () => void;
}

export const CollectiveSelling: React.FC<CollectiveSellingProps> = ({ onGroupJoined }) => {
  const { t } = useTranslation();
  const groups = store.getCollectiveGroups();
  const farmer = store.getFarmer();

  const [selectedGroup, setSelectedGroup] = useState<CollectiveGroup | null>(null);
  const [joinModalGroup, setJoinModalGroup] = useState<CollectiveGroup | null>(null);
  const [pledgeQuantityKg, setPledgeQuantityKg] = useState('1000');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Group Form state
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupCrop, setNewGroupCrop] = useState('Tomato');
  const [newGroupTargetKg, setNewGroupTargetKg] = useState('10000');
  const [newGroupCenter, setNewGroupCenter] = useState('Hoskote Collection Centre');

  const handleJoin = (group: CollectiveGroup) => {
    const qty = Number(pledgeQuantityKg) || 1000;
    store.joinCollectiveGroup(group.id, farmer.id, qty);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    setJoinModalGroup(null);
    setSuccessToast(`Successfully joined ${group.name} with ${qty} kg! You saved approx ₹${(qty * group.savingsPerKg).toFixed(0)} on transport.`);
    setTimeout(() => setSuccessToast(null), 5000);
    if (onGroupJoined) onGroupJoined();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-forest to-forest-dark text-white p-6 sm:p-7 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-surface/20 text-cream text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span>Cooperative Aggregation & Shared Logistics</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            {t.collective.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#D8E2DC] mt-1 max-w-2xl leading-relaxed">
            {t.collective.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-gold hover:bg-gold-hover text-forest-dark font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.collective.createGroup}</span>
        </button>
      </div>

      {/* Success Banner */}
      {successToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-950 flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* 2. Collective Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {groups.map((group) => {
          const progressPercent = Math.min(100, Math.round((group.currentQuantityKg / group.targetQuantityKg) * 100));
          const isFull = group.currentQuantityKg >= group.targetQuantityKg;

          return (
            <div
              key={group.id}
              className="bg-white rounded-2xl border border-[#E5E0D0] shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Title & Status badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-base text-forest-dark leading-snug">
                      {group.name}
                    </h3>
                    <div className="text-xs text-mutedGrey mt-0.5">
                      Crop: <strong className="text-forest">{group.crop}</strong> ({group.variety})
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      isFull
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}
                  >
                    {group.status}
                  </span>
                </div>

                {/* Data Source Badge */}
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-gray-100">
                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    SIMULATED DEMO DATA (FPO Logistics Pool)
                  </span>
                  <span className="text-[10px] text-mutedGrey font-medium">Hoskote Hub</span>
                </div>

                {/* Progress Bar & Quantity metrics */}
                <div className="my-4 p-4 rounded-xl bg-cream border border-[#E5E0D0]">
                  <div className="flex justify-between items-baseline mb-1.5 text-xs">
                    <span className="font-bold text-forest-dark">
                      Aggregated Produce: {group.currentQuantityKg.toLocaleString()} / {group.targetQuantityKg.toLocaleString()} kg
                    </span>
                    <span className="font-black text-forest">{progressPercent}%</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-forest to-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-mutedGrey mt-2">
                    <span>{group.memberCount} Farmers Participating</span>
                    <span>Remaining to Goal: {(group.targetQuantityKg - group.currentQuantityKg).toLocaleString()} kg</span>
                  </div>
                </div>

                {/* Shared Logistics Financial Savings */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-forest-surface rounded-xl border border-forest/15 text-center text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-mutedGrey block">Individual Truck</span>
                    <span className="font-bold text-danger text-sm">₹{group.individualTransportCostPerKg}/kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-mutedGrey block">Shared 10T Truck</span>
                    <span className="font-bold text-forest text-sm">₹{group.collectiveTransportCostPerKg}/kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-mutedGrey block">Farmer Savings</span>
                    <span className="font-black text-emerald-700 text-sm">₹{group.savingsPerKg}/kg</span>
                  </div>
                </div>

                {/* Logistics details */}
                <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Collection Centre: <strong>{group.collectionCenter}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Expected Dispatch: <strong>{group.expectedCollectionDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Target Bulk Buyer: <strong>{group.targetBuyer}</strong></span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                <button
                  onClick={() => setSelectedGroup(group)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-forest-dark font-semibold text-xs transition-colors"
                >
                  View Members ({group.members.length})
                </button>

                <button
                  onClick={() => setJoinModalGroup(group)}
                  className="flex-1 py-2 px-3 rounded-xl bg-forest hover:bg-forest-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
                >
                  <span>{t.common.joinGroup}</span>
                  <ArrowRight className="w-3 h-3 text-gold" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. JOIN MODAL */}
      {joinModalGroup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E0D0] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-base text-forest-dark">Join {joinModalGroup.name}</h3>
              <button onClick={() => setJoinModalGroup(null)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-gray-600">
                Aggregate your harvest into the Hoskote collection truck to enjoy shared bulk transport at ₹{joinModalGroup.collectiveTransportCostPerKg}/kg.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Quantity to pool (kg)</label>
                <input
                  type="number"
                  value={pledgeQuantityKg}
                  onChange={(e) => setPledgeQuantityKg(e.target.value)}
                  placeholder="e.g. 1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-medium">
                ✨ Estimated Logistics Savings for you:{' '}
                <strong className="text-emerald-800 text-sm">
                  ₹{((Number(pledgeQuantityKg) || 0) * joinModalGroup.savingsPerKg).toFixed(0)}
                </strong>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setJoinModalGroup(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleJoin(joinModalGroup)}
                  className="px-5 py-2.5 bg-forest hover:bg-forest-dark text-white rounded-xl font-bold shadow-xs active:scale-95"
                >
                  Confirm & Join Pool
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MEMBERS LIST MODAL */}
      {selectedGroup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E0D0] animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <h3 className="font-bold text-base text-forest-dark">{selectedGroup.name}</h3>
                <span className="text-xs text-mutedGrey">Participating Farmers Roster</span>
              </div>
              <button onClick={() => setSelectedGroup(null)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {selectedGroup.members.map((m, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-forest-dark">{m.farmerName}</div>
                    <div className="text-[11px] text-mutedGrey">{m.village} • Joined {m.joinedAt}</div>
                  </div>
                  <div className="font-bold text-forest text-sm">{m.quantityKg.toLocaleString()} kg</div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-right">
              <button
                onClick={() => setSelectedGroup(null)}
                className="px-4 py-2 bg-cream text-forest-dark rounded-xl text-xs font-bold border border-[#E5E0D0]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. CREATE GROUP MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E0D0] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-base text-forest-dark">{t.collective.createGroup}</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Group Name</label>
                <input
                  type="text"
                  placeholder="e.g. Malur Tomato Collective"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">Target Quantity (kg)</label>
                <input
                  type="number"
                  value={newGroupTargetKg}
                  onChange={(e) => setNewGroupTargetKg(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">Collection Centre</label>
                <input
                  type="text"
                  value={newGroupCenter}
                  onChange={(e) => setNewGroupCenter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setSuccessToast('New Collective Group created successfully!');
                    setTimeout(() => setSuccessToast(null), 4000);
                  }}
                  className="px-5 py-2.5 bg-forest text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Create Pool
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

