import React, { useState } from 'react';
import { useTranslation } from '../../i18n';
import { store } from '../../services/store';
import { formatINR } from '../../utils/currency';
import {
  ShieldCheck,
  Users,
  Store,
  Receipt,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
  Database,
  Check,
  X,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const buyers = store.getBuyers();
  const transactions = store.getTransactions();
  const listings = store.getProduceListings();

  const [activeTab, setActiveTab] = useState<'buyers' | 'disputes' | 'market_feeds'>('buyers');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const disputes = transactions.filter((tx) => tx.dispute);

  const handleToggleVerification = (buyerId: string) => {
    store.toggleBuyerVerification(buyerId);
    setToastMessage('Buyer verification status updated.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalGMV = transactions.reduce((sum, tx) => sum + tx.grossValue, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E0D0] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-forest-dark">
              {t.admin.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            {t.admin.subtitle}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-cream p-1 border border-[#E5E0D0]">
          <button
            onClick={() => setActiveTab('buyers')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'buyers' ? 'bg-forest text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Buyer Approvals
          </button>
          <button
            onClick={() => setActiveTab('disputes')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'disputes' ? 'bg-forest text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Disputes ({disputes.length})
          </button>
          <button
            onClick={() => setActiveTab('market_feeds')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'market_feeds' ? 'bg-forest text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Data Feeds
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-950 flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex justify-between items-center text-mutedGrey mb-2">
            <span className="text-xs font-semibold">{t.admin.totalFarmers}</span>
            <Users className="w-4 h-4 text-forest" />
          </div>
          <div className="text-2xl font-black text-forest-dark">1,240</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">Karnataka Agricultural Zone</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex justify-between items-center text-mutedGrey mb-2">
            <span className="text-xs font-semibold">{t.admin.totalBuyers}</span>
            <Store className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl font-black text-forest-dark">{buyers.length}</div>
          <div className="text-[11px] text-blue-700 font-semibold mt-1">Wholesale & Food Processors</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex justify-between items-center text-mutedGrey mb-2">
            <span className="text-xs font-semibold">{t.admin.totalTransactions}</span>
            <TrendingUp className="w-4 h-4 text-forest" />
          </div>
          <div className="text-2xl font-black text-forest-dark">{formatINR(totalGMV)}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">Active platform GMV</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D0] shadow-xs">
          <div className="flex justify-between items-center text-mutedGrey mb-2">
            <span className="text-xs font-semibold">{t.admin.disputesCount}</span>
            <AlertTriangle className="w-4 h-4 text-danger" />
          </div>
          <div className="text-2xl font-black text-danger">{disputes.length}</div>
          <div className="text-[11px] text-gray-500 mt-1">Assigned to FPO resolution desk</div>
        </div>
      </div>

      {/* 3. TAB 1: BUYER VERIFICATION CONTROL */}
      {activeTab === 'buyers' && (
        <div className="bg-white rounded-2xl border border-[#E5E0D0] p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-gray-100">
            <h3 className="font-bold text-base text-forest-dark">Buyer Authentication & Due Diligence</h3>
            <p className="text-xs text-mutedGrey">
              Verify trade licenses, GST credentials, and weighbridge transparency agreements before exposing to farmers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-mutedGrey font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Business Entity</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Location Yard</th>
                  <th className="py-2.5 px-3">Daily Demand</th>
                  <th className="py-2.5 px-3">Verification Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {buyers.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-forest-dark">
                      <div>{b.businessName}</div>
                      <div className="text-[10px] text-mutedGrey">{b.contactPerson}</div>
                    </td>
                    <td className="py-3 px-3 text-gray-600">{b.businessCategory}</td>
                    <td className="py-3 px-3 text-gray-600">{b.district}</td>
                    <td className="py-3 px-3 font-medium">{b.dailyDemandKg.toLocaleString()} kg/day</td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          b.verificationStatus === 'Demo Verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.verificationStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleToggleVerification(b.id)}
                        className="px-3 py-1 bg-cream hover:bg-cream-dark text-forest-dark border border-[#E5E0D0] rounded-lg text-xs font-semibold"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TAB 2: DISPUTES RESOLUTION */}
      {activeTab === 'disputes' && (
        <div className="bg-white rounded-2xl border border-[#E5E0D0] p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-gray-100">
            <h3 className="font-bold text-base text-forest-dark">Open Farmer Disputes</h3>
            <p className="text-xs text-mutedGrey">
              Escalations regarding weighbridge deductions or transit delay settlements.
            </p>
          </div>

          {disputes.length === 0 ? (
            <p className="text-xs text-mutedGrey italic">No active disputes reported.</p>
          ) : (
            <div className="space-y-3">
              {disputes.map((tx) => (
                <div key={tx.id} className="p-4 rounded-xl bg-cream border border-[#E5E0D0] text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-forest-dark">
                      Order {tx.id} • {tx.farmerName} vs {tx.buyerName}
                    </span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                      {tx.dispute?.category}
                    </span>
                  </div>
                  <p className="text-gray-600">{tx.dispute?.description}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-mutedGrey text-[11px]">Reported: {tx.dispute?.reportedAt}</span>
                    <button
                      onClick={() => {
                        setToastMessage(`Dispute on Order ${tx.id} resolved with compensatory credit.`);
                        setTimeout(() => setToastMessage(null), 3000);
                      }}
                      className="px-3 py-1 bg-forest text-white rounded-lg font-bold text-xs"
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. TAB 3: DATA FEEDS */}
      {activeTab === 'market_feeds' && (
        <div className="bg-white rounded-2xl border border-[#E5E0D0] p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-gray-100">
            <h3 className="font-bold text-base text-forest-dark">Mandi Data Ingestion Connectors</h3>
            <p className="text-xs text-mutedGrey">
              Status of Agmarknet, Open Government Data (data.gov.in), and e-NAM synchronized feeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-cream border border-[#E5E0D0] space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-forest-dark">AGMARKNET Connector</span>
                <span className="text-[10px] bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  SIMULATED DEMO DATA (KSAMB Bulletin Model)
                </span>
              </div>
              <p className="text-gray-600">
                Source: Karnataka State Agricultural Marketing Board (KSAMB) daily arrivals and modal APMC benchmarks.
              </p>
              <div className="text-[11px] text-mutedGrey">Last Ingestion: Today, 09:30 AM • 10 Commodities Active</div>
            </div>

            <div className="p-4 rounded-xl bg-cream border border-[#E5E0D0] space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-forest-dark">e-NAM Escrow & Trade Feed</span>
                <span className="text-[10px] bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  SIMULATED DEMO DATA (e-NAM APMC Baseline)
                </span>
              </div>
              <p className="text-gray-600">
                National electronic spot auction clearing and interstate freight rates.
              </p>
              <div className="text-[11px] text-mutedGrey">Last Ingestion: Today, 10:15 AM • Escrow Contract Ready</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
