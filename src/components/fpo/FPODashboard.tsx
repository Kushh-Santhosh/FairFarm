import React, { useState } from 'react';
import { useTranslation } from '../../i18n';
import { store, SEED_FARMERS } from '../../services/store';
import {
  Building2,
  Users,
  Sprout,
  Truck,
  TrendingUp,
  Search,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  X,
} from 'lucide-react';

export const FPODashboard: React.FC = () => {
  const { t } = useTranslation();
  const listings = store.getProduceListings();
  const groups = store.getCollectiveGroups();
  const transactions = store.getTransactions();

  const [searchQuery, setSearchQuery] = useState('');
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [newFarmerName, setNewFarmerName] = useState('');
  const [newFarmerPhone, setNewFarmerPhone] = useState('');
  const [newFarmerVillage, setNewFarmerVillage] = useState('Hoskote');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredFarmers = SEED_FARMERS.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegisterMember = () => {
    setShowMemberModal(false);
    setToastMessage(`Farmer member ${newFarmerName} registered into Hoskote Farmer Producer Co.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-forest to-forest-dark text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-surface/20 text-cream text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5 text-gold" />
            <span>Farmer Producer Company Hub</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            {t.fpo.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#D8E2DC] mt-1 max-w-2xl leading-relaxed">
            {t.fpo.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowMemberModal(true)}
          className="px-4 py-2.5 bg-gold hover:bg-gold-hover text-forest-dark font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.fpo.registerFarmerCta}</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-950 flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Stat Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex justify-between items-center text-mutedGrey mb-2">
            <span className="text-xs font-semibold">{t.fpo.memberFarmers}</span>
            <Users className="w-4 h-4 text-forest" />
          </div>
          <div className="text-2xl font-black text-forest-dark">854</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">Across 42 cluster villages</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex justify-between items-center text-mutedGrey mb-2">
            <span className="text-xs font-semibold">{t.fpo.activeProduce}</span>
            <Sprout className="w-4 h-4 text-forest" />
          </div>
          <div className="text-2xl font-black text-forest-dark">42.5 <span className="text-sm font-normal text-mutedGrey">Tonnes</span></div>
          <div className="text-[11px] text-mutedGrey mt-1">Ready for collective dispatch</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex justify-between items-center text-mutedGrey mb-2">
            <span className="text-xs font-semibold">{t.fpo.activeGroups}</span>
            <Building2 className="w-4 h-4 text-forest" />
          </div>
          <div className="text-2xl font-black text-forest-dark">{groups.length} Pools</div>
          <div className="text-[11px] text-amber-800 font-semibold mt-1">Hoskote & Kolar corridors</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex justify-between items-center text-mutedGrey mb-2">
            <span className="text-xs font-semibold">{t.fpo.totalSalesValue}</span>
            <TrendingUp className="w-4 h-4 text-forest" />
          </div>
          <div className="text-2xl font-black text-forest-dark">₹58.4 <span className="text-sm font-normal text-mutedGrey">Lakhs</span></div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">Season-to-date turnover</div>
        </div>
      </div>

      {/* 3. Member Farmers Directory */}
      <div className="bg-white rounded-2xl border border-[#E5E0D0] p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-base text-forest-dark">Registered Farmer Members</h3>
            <p className="text-xs text-mutedGrey">Direct FPO network members with verified landholdings</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-300 bg-gray-50 text-xs w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-mutedGrey" />
            <input
              type="text"
              placeholder="Search member name or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none w-full text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-mutedGrey font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Farmer Name</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3">Village & District</th>
                <th className="py-2.5 px-3">Landholding</th>
                <th className="py-2.5 px-3">Primary Crops</th>
                <th className="py-2.5 px-3">Bank Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFarmers.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-forest-dark">{f.name}</td>
                  <td className="py-3 px-3 text-gray-600">{f.phone}</td>
                  <td className="py-3 px-3 text-gray-600">{f.village}, {f.district}</td>
                  <td className="py-3 px-3 font-medium text-gray-700">{f.totalLandAcres} Acres</td>
                  <td className="py-3 px-3 font-medium text-forest">{f.mainCrops.join(', ')}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      <span>Verified</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. REGISTER MEMBER MODAL */}
      {showMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E0D0] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-base text-forest-dark">{t.fpo.registerFarmerCta}</h3>
              <button onClick={() => setShowMemberModal(false)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Farmer Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Nagaraj Gowda"
                  value={newFarmerName}
                  onChange={(e) => setNewFarmerName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">Mobile Number</label>
                <input
                  type="text"
                  placeholder="+91 98450 ..."
                  value={newFarmerPhone}
                  onChange={(e) => setNewFarmerPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">Village & Cluster</label>
                <input
                  type="text"
                  value={newFarmerVillage}
                  onChange={(e) => setNewFarmerVillage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={() => setShowMemberModal(false)} className="px-4 py-2 text-xs font-semibold text-gray-500">
                  Cancel
                </button>
                <button onClick={handleRegisterMember} className="px-5 py-2.5 bg-forest text-white rounded-xl text-xs font-bold shadow-xs">
                  Register Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

