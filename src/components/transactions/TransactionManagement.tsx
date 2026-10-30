import React, { useState } from 'react';
import { useTranslation } from '../../i18n';
import { store } from '../../services/store';
import { Transaction, TransactionStatus } from '../../types';
import { formatINR } from '../../utils/currency';
import {
  Receipt,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  CreditCard,
  Building2,
  ArrowRight,
  SlidersHorizontal,
  X,
  ShieldAlert,
} from 'lucide-react';

export const TransactionManagement: React.FC = () => {
  const { t } = useTranslation();
  const transactions = store.getTransactions();

  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [selectedTxForActuals, setSelectedTxForActuals] = useState<Transaction | null>(null);
  const [actualExpensesInput, setActualExpensesInput] = useState('');
  const [actualPaymentInput, setActualPaymentInput] = useState('');

  const [selectedTxForDispute, setSelectedTxForDispute] = useState<Transaction | null>(null);
  const [disputeCategory, setDisputeCategory] = useState<'Quality Deduction Mismatch' | 'Weight Shortage' | 'Payment Delay' | 'Transportation Delay'>('Quality Deduction Mismatch');
  const [disputeDescription, setDisputeDescription] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeTransactions = transactions.filter((t) => t.status !== 'payment_completed');
  const completedTransactions = transactions.filter((t) => t.status === 'payment_completed');

  const visibleTransactions = activeTab === 'active' ? activeTransactions : completedTransactions;

  const handleSaveActuals = () => {
    if (!selectedTxForActuals) return;
    const exp = Number(actualExpensesInput) || selectedTxForActuals.estimatedExpenses;
    const pay = Number(actualPaymentInput) || selectedTxForActuals.grossValue;

    store.updateTransactionActuals(selectedTxForActuals.id, exp, pay);
    setSelectedTxForActuals(null);
    setToastMessage(`Settlement recorded for Order ${selectedTxForActuals.id}. Actual earnings updated.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleFileDispute = () => {
    if (!selectedTxForDispute) return;
    store.reportDispute(selectedTxForDispute.id, disputeCategory, disputeDescription);
    setSelectedTxForDispute(null);
    setDisputeDescription('');
    setToastMessage(`Dispute filed for Order ${selectedTxForDispute.id}. Transferred to Hoskote FPO Review Desk.`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const getStatusBadge = (status: TransactionStatus | string) => {
    switch (status) {
      case 'offer_received':
        return { label: 'Offer Received', color: 'bg-blue-100 text-blue-800' };
      case 'offer_accepted':
        return { label: 'Offer Accepted', color: 'bg-emerald-100 text-emerald-800' };
      case 'sale_confirmed':
        return { label: 'Sale Confirmed', color: 'bg-purple-100 text-purple-800' };
      case 'pickup_scheduled':
        return { label: 'Pickup Scheduled', color: 'bg-amber-100 text-amber-800' };
      case 'produce_collected':
        return { label: 'Collected', color: 'bg-indigo-100 text-indigo-800' };
      case 'in_transit':
        return { label: 'In Transit', color: 'bg-indigo-100 text-indigo-800' };
      case 'delivered':
        return { label: 'Delivered', color: 'bg-teal-100 text-teal-800' };
      case 'payment_pending':
        return { label: 'Payment Pending', color: 'bg-yellow-100 text-yellow-800' };
      case 'payment_completed':
        return { label: 'Payment Settled', color: 'bg-emerald-100 text-emerald-900 font-bold' };
      default:
        return { label: 'Active', color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E0D0] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-forest text-cream">
              <Receipt className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-forest-dark">
              {t.transactions.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            {t.transactions.subtitle}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-cream p-1 border border-[#E5E0D0]">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'active' ? 'bg-forest text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.transactions.activeTab} ({activeTransactions.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'completed' ? 'bg-forest text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.transactions.completedTab} ({completedTransactions.length})
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-950 flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Transactions List */}
      <div className="space-y-4">
        {visibleTransactions.map((tx) => {
          const badge = getStatusBadge(tx.status);
          const variance = tx.actualNetEarnings - tx.estimatedNetEarnings;

          return (
            <div
              key={tx.id}
              className="bg-white rounded-2xl border border-[#E5E0D0] p-5 shadow-xs space-y-4 hover:border-forest/40 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-forest-dark">{tx.id}</span>
                      <span className="text-xs text-mutedGrey">•</span>
                      <span className="font-bold text-sm text-forest">{tx.crop} ({tx.quantityKg.toLocaleString()} kg)</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="text-xs text-mutedGrey mt-0.5">
                      Buyer: <strong>{tx.buyerName}</strong> ({tx.buyerCategory}) • Rate: ₹{tx.agreedPricePerKg}/kg
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-mutedGrey uppercase font-bold">Created</div>
                  <div className="text-xs font-semibold text-gray-700">{tx.createdAt}</div>
                </div>
              </div>

              {/* Financial Box: Estimated vs Actual Comparison (Feedback Loop) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3.5 bg-cream rounded-xl border border-[#E5E0D0] text-xs">
                <div>
                  <span className="text-[10px] text-mutedGrey block uppercase font-bold">Gross Value</span>
                  <span className="text-base font-extrabold text-forest-dark">
                    {formatINR(tx.grossValue)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-mutedGrey block uppercase font-bold">Estimated Expenses</span>
                  <span className="text-base font-bold text-danger">
                    -{formatINR(tx.estimatedExpenses)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-mutedGrey block uppercase font-bold">Estimated Net Return</span>
                  <span className="text-base font-black text-forest">
                    {formatINR(tx.estimatedNetEarnings)}
                  </span>
                </div>

                <div className="bg-white p-2 rounded-lg border border-[#E5E0D0]">
                  <span className="text-[10px] text-mutedGrey block uppercase font-bold">Actual Final Received</span>
                  <span className="text-base font-black text-emerald-800">
                    {formatINR(tx.actualNetEarnings)}
                  </span>
                  {variance !== 0 && (
                    <div className={`text-[10px] font-bold ${variance > 0 ? 'text-emerald-700' : 'text-danger'}`}>
                      {variance > 0 ? `+${formatINR(variance)} bonus quality gain` : `-${formatINR(Math.abs(variance))} deduction`}
                    </div>
                  )}
                </div>
              </div>

              {/* 8-Stage Timeline */}
              <div className="pt-2">
                <div className="text-xs font-bold text-gray-700 mb-2">Order Milestones:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
                  {tx.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border text-[10px] ${
                        step.completed
                          ? 'bg-forest-surface border-forest/30 text-forest font-semibold'
                          : 'bg-gray-50 border-gray-200 text-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="opacity-75">#{idx + 1}</span>
                        {step.completed && <CheckCircle2 className="w-3 h-3 text-forest" />}
                      </div>
                      <div className="font-bold leading-tight line-clamp-2">{step.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dispute Warning if any */}
              {tx.dispute && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Active Dispute ({tx.dispute.category}):</span> {tx.dispute.description}
                    <div className="text-[10px] text-rose-700 font-semibold mt-0.5">Status: {tx.dispute.status}</div>
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                <div className="text-[11px] text-mutedGrey">
                  Payment: <strong>{tx.paymentTerms}</strong> • Collection: {tx.collectionPoint}
                </div>

                <div className="flex items-center gap-2">
                  {!tx.dispute && tx.status !== 'payment_completed' && (
                    <button
                      onClick={() => setSelectedTxForDispute(tx)}
                      className="px-3 py-1.5 text-xs text-danger hover:bg-rose-50 rounded-lg font-semibold transition-colors"
                    >
                      {t.transactions.disputeButton}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelectedTxForActuals(tx);
                      setActualExpensesInput(String(tx.actualExpenses || tx.estimatedExpenses));
                      setActualPaymentInput(String(tx.actualFinalPayment || tx.grossValue));
                    }}
                    className="px-3.5 py-1.5 bg-cream hover:bg-cream-dark text-forest-dark border border-[#E5E0D0] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-forest" />
                    <span>{t.transactions.recordActuals}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. RECORD ACTUALS MODAL */}
      {selectedTxForActuals && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E0D0] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <h3 className="font-bold text-base text-forest-dark">Record Actual Settlement</h3>
                <p className="text-xs text-mutedGrey">Order {selectedTxForActuals.id}</p>
              </div>
              <button onClick={() => setSelectedTxForActuals(null)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-gray-600">
                Enter the final bank credit and actual expense receipts to verify estimated vs actual earnings.
              </p>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Gross Payment Received from Buyer (₹)</label>
                <input
                  type="number"
                  value={actualPaymentInput}
                  onChange={(e) => setActualPaymentInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Actual Incurred Selling Expenses (₹)</label>
                <input
                  type="number"
                  value={actualExpensesInput}
                  onChange={(e) => setActualExpensesInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center text-xs">
                <span className="font-bold text-forest-dark">Final Farmer Net:</span>
                <span className="text-base font-black text-forest">
                  {formatINR(Number(actualPaymentInput || 0) - Number(actualExpensesInput || 0))}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={() => setSelectedTxForActuals(null)} className="px-4 py-2 text-xs font-semibold text-gray-500">
                  Cancel
                </button>
                <button onClick={handleSaveActuals} className="px-5 py-2.5 bg-forest text-white rounded-xl text-xs font-bold shadow-xs">
                  Save & Complete Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. DISPUTE MODAL */}
      {selectedTxForDispute && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E0D0] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-danger" />
                <h3 className="font-bold text-base text-forest-dark">Report Transaction Issue</h3>
              </div>
              <button onClick={() => setSelectedTxForDispute(null)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Dispute Category</label>
                <select
                  value={disputeCategory}
                  onChange={(e) => setDisputeCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Quality Deduction Mismatch">Quality Deduction Mismatch (Excessive Rejection)</option>
                  <option value="Weight Shortage">Weight Shortage at Buyer Yard</option>
                  <option value="Payment Delay">Payment Delay beyond 24h terms</option>
                  <option value="Transportation Delay">Transportation / Pickup Delay</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Description & Evidence</label>
                <textarea
                  rows={3}
                  value={disputeDescription}
                  onChange={(e) => setDisputeDescription(e.target.value)}
                  placeholder="Explain the issue with weighbridge receipt numbers or batch notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={() => setSelectedTxForDispute(null)} className="px-4 py-2 text-xs font-semibold text-gray-500">
                  Cancel
                </button>
                <button onClick={handleFileDispute} className="px-5 py-2.5 bg-danger text-white rounded-xl text-xs font-bold shadow-xs">
                  Submit to FPO Ombudsman
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
