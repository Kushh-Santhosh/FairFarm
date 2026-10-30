import React from 'react';
import { useTranslation } from '../../i18n';
import {
  HelpCircle,
  PhoneCall,
  Scale,
  ShieldCheck,
  Truck,
  Users,
  MessageCircle,
} from 'lucide-react';

export const HelpCenter: React.FC = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      q: 'Why does a buyer offering ₹14/kg not always yield more than ₹10/kg?',
      a: 'If a buyer is located 55 km away, transportation fees (e.g. ₹2,200), loading/unloading (₹300), commissions (₹200), and transit deductions (₹300) can eat up ₹3,000. In our model, ₹14/kg leaves ₹11,000 net, which is indeed ₹1,500 more than the local trader (₹9,500). However, if transport costs were higher, it could easily end up lower. FAIRFARM calculates the exact difference.',
    },
    {
      q: 'How does the Hoskote Collective reduce freight fees?',
      a: 'Instead of hiring an individual small vehicle (e.g. Tata Ace) for ₹2.20/kg, 12 farmers combine 10,000 kg into one 10-tonne agricultural truck, bringing the cost down to just ₹0.75/kg—saving ₹1.45 on every single kilogram.',
    },
    {
      q: 'Can I access FAIRFARM if I only have a basic phone with no internet?',
      a: 'Yes! You can call our toll-free IVR hotline (1800-FAIR-FARM). The voice assistant speaks Kannada, Telugu, Tamil, Hindi, and English. You enter your crop and quantity on the numeric keypad to hear your net earnings read aloud.',
    },
    {
      q: 'What should I do if a buyer disputes my quality grade?',
      a: 'All transactions on FAIRFARM are monitored by the FPO ombudsman. You can click "Report Dispute" in your transactions tab. An FPO field coordinator will verify the weighbridge receipt and batch moisture readings within 24 hours.',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-[#E5E0D0] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-forest text-cream">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-forest-dark">
              Farmer Help & Support Centre
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Guidance on net-earnings calculations, collective transport, and dispute escalations.
          </p>
        </div>

        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-bold flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-emerald-700" />
          <span>FPO Coordinator Hotline: +91 98451 23410</span>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="p-5 bg-white rounded-2xl border border-[#E5E0D0] shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-forest-dark flex items-start gap-2">
              <span className="text-forest font-black">Q{i + 1}:</span>
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed pl-6">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

