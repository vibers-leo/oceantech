'use client';

import React from 'react';
import { ExternalLink, CheckCircle, Search, TrendingUp, Globe, FileText } from 'lucide-react';

/* 
  TradeKorea Analysis Component
  - Provides a summary of tradeKorea.com services.
  - Outlines actionable strategies for Ocean Tech (R-minu).
*/

export default function TradeKoreaAnalysis() {
  return (
    <div className="w-full space-y-6">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#e63946] to-[#f1faee] p-6 rounded-2xl shadow-sm border border-red-100 flex justify-between items-center text-[#1d3557]">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
            <Globe className="text-[#e63946]" />
            TradeKorea Platform Analysis
          </h2>
          <p className="text-sm opacity-80">
            Powered by KITA (Korea International Trade Association). A critical channel for B2B export success.
          </p>
        </div>
        <a 
          href="https://www.tradekorea.com/main.do" 
          target="_blank" 
          rel="noreferrer"
          className="bg-white text-[#e63946] px-4 py-2 rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
        >
          Visit Site <ExternalLink size={14} />
        </a>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Platform Summary */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="text-blue-500" size={20} />
            Platform Summary
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
                <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-blue-500"></div>
                <div>
                    <strong className="block text-gray-900 text-sm">What is tradeKorea?</strong>
                    <span className="text-gray-600 text-sm">Korea's representative B2B marketplace operated by KITA. It allows Korean sellers to list products and receive inquiries from global buyers.</span>
                </div>
            </li>
            <li className="flex gap-3">
                <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-blue-500"></div>
                <div>
                    <strong className="block text-gray-900 text-sm">Key Strength: Credibility</strong>
                    <span className="text-gray-600 text-sm">Buyers trust suppliers here because of the verification by KITA. It's less crowded than Alibaba but higher quality leads.</span>
                </div>
            </li>
            <li className="flex gap-3">
                <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-blue-500"></div>
                <div>
                    <strong className="block text-gray-900 text-sm">Matching Services</strong>
                    <span className="text-gray-600 text-sm">Offers 'GbMS' (Global Business Matching Service) where KITA experts actively match your products with buyers.</span>
                </div>
            </li>
          </ul>
        </div>

        {/* Right: Relevance to Ocean Tech */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="text-green-600" size={20} />
            Action Plan for R-minu
          </h3>
          
          <div className="space-y-4">
             <div className="flex gap-4 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="bg-green-100 p-2 rounded-lg text-green-700">
                    <CheckCircle size={18} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900">1. Mini-Site Optimization</h4>
                    <p className="text-xs text-gray-600 mt-1">
                        We need to create a dedicated 'R-minu Brand Minisite' within tradeKorea. Uploading high-res images of our 500g/1kg Wax products is crucial.
                    </p>
                </div>
             </div>

             <div className="flex gap-4 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                    <Search size={18} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900">2. Target 'Buy Offers'</h4>
                    <p className="text-xs text-gray-600 mt-1">
                        Actively search for keywords like <span className="font-semibold text-blue-600">"Hair Removal Wax"</span> or <span className="font-semibold text-blue-600">"K-Beauty Cosmetics"</span> in the Buy Offer section and send proposals directly.
                    </p>
                </div>
             </div>

             <div className="flex gap-4 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                    <Globe size={18} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900">3. Apply for Online Exhibitions</h4>
                    <p className="text-xs text-gray-600 mt-1">
                        KITA hosts "Online K-Product Exhibitions" periodically. We should apply for the "Beauty & Health" category to get premium exposure banner spots.
                    </p>
                </div>
             </div>
          </div>
        </div>

      </div>

      {/* Bottom: Keyword Strategy */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-6 rounded-xl shadow-lg">
         <h3 className="tex-lg font-bold mb-4 flex items-center gap-2">
            🚀 Recommended Keywords for Listing
         </h3>
         <div className="flex flex-wrap gap-3">
            {['Hard Wax Beans', 'Painless Depilatory', 'K-Beauty Supply', 'Hypoallergenic Wax', 'Salon Professional', 'Private Label (OEM)'].map(kw => (
                <span key={kw} className="bg-[#334155] px-3 py-1.5 rounded-full text-sm border border-[#475569] text-blue-200">
                    #{kw}
                </span>
            ))}
         </div>
      </div>

    </div>
  );
}
