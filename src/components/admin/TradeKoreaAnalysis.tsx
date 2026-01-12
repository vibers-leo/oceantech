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
            트레이드코리아(tradeKorea) 플랫폼 분석
          </h2>
          <p className="text-sm opacity-80">
            한국무역협회(KITA) 운영. B2B 수출 성공을 위한 핵심 채널.
          </p>
        </div>
        <a 
          href="https://www.tradekorea.com/main.do" 
          target="_blank" 
          rel="noreferrer"
          className="bg-white text-[#e63946] px-4 py-2 rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
        >
          사이트 방문 <ExternalLink size={14} />
        </a>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Platform Summary */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="text-blue-500" size={20} />
            플랫폼 개요
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
                <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-blue-500"></div>
                <div>
                    <strong className="block text-gray-900 text-sm">트레이드코리아란?</strong>
                    <span className="text-gray-600 text-sm">KITA가 운영하는 한국 대표 B2B 마켓플레이스입니다. 한국 셀러가 상품을 리스팅하고 글로벌 바이어의 인콰이어리를 받을 수 있습니다.</span>
                </div>
            </li>
            <li className="flex gap-3">
                <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-blue-500"></div>
                <div>
                    <strong className="block text-gray-900 text-sm">핵심 강점: 신뢰도</strong>
                    <span className="text-gray-600 text-sm">KITA의 검증을 거치므로 바이어 신뢰도가 높습니다. 알리바바보다 덜 붐비지만 리드 퀄리티는 더 높습니다.</span>
                </div>
            </li>
            <li className="flex gap-3">
                <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-blue-500"></div>
                <div>
                    <strong className="block text-gray-900 text-sm">매칭 서비스</strong>
                    <span className="text-gray-600 text-sm">'GbMS'(Global Business Matching Service)를 통해 KITA 전문가가 귀사 제품과 바이어를 적극적으로 매칭해줍니다.</span>
                </div>
            </li>
          </ul>
        </div>

        {/* Right: Relevance to Ocean Tech */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="text-green-600" size={20} />
            알마이너(R-minu) 실행 전략
          </h3>
          
          <div className="space-y-4">
             <div className="flex gap-4 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="bg-green-100 p-2 rounded-lg text-green-700">
                    <CheckCircle size={18} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900">1. 미니사이트(Mini-Site) 최적화</h4>
                    <p className="text-xs text-gray-600 mt-1">
                        트레이드코리아 내에 '알마이너 전용 미니사이트'를 구축해야 합니다. 500g/1kg 왁스 제품의 고해상도 이미지를 업로드하는 것이 중요합니다.
                    </p>
                </div>
             </div>

             <div className="flex gap-4 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                    <Search size={18} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900">2. 'Buy Offers' 타겟팅</h4>
                    <p className="text-xs text-gray-600 mt-1">
                        Buy Offer 섹션에서 <span className="font-semibold text-blue-600">"Hair Removal Wax"</span> 또는 <span className="font-semibold text-blue-600">"K-Beauty Cosmetics"</span> 같은 키워드를 적극 검색하고 제안서를 직접 발송하세요.
                    </p>
                </div>
             </div>

             <div className="flex gap-4 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                    <Globe size={18} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900">3. 온라인 전시관 신청</h4>
                    <p className="text-xs text-gray-600 mt-1">
                        KITA는 주기적으로 "온라인 K-Product 전시회"를 개최합니다. "Beauty & Health" 카테고리에 신청하여 프리미엄 노출 배너 자리를 확보해야 합니다.
                    </p>
                </div>
             </div>
          </div>
        </div>

      </div>

      {/* Bottom: Keyword Strategy */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-6 rounded-xl shadow-lg">
         <h3 className="tex-lg font-bold mb-4 flex items-center gap-2">
            🚀 리스팅 추천 키워드
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
