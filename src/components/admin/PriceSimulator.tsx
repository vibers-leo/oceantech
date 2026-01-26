'use client';

import React, { useEffect, useState } from 'react';
import styles from './AdminComponents.module.css';
import { useLanguage } from '@/context/LanguageContext';

// Product Data Type
interface Product {
  id: string;
  name: string;
  priceKRW: number;
}

// Basic Fee Assumptions: Platform 10% + Shipping/Buffer 15% = 25% Markup required
const MARKUP_SHOPEE = 1.35; // Safe margin for SEA
const MARKUP_AMAZON = 1.60; // Higher shipping/FBA costs for US

const CURRENCIES = [
  { code: 'USD', name: 'Amazon US', country: 'US (Amazon)', countryKO: '미국 (아마존)', markup: MARKUP_AMAZON },
  { code: 'SGD', name: 'Shopee SG', country: 'SG (Shopee)', countryKO: '싱가포르 (쇼피)', markup: MARKUP_SHOPEE },
  { code: 'MYR', name: 'Shopee MY', country: 'MY (Shopee)', countryKO: '말레이시아 (쇼피)', markup: MARKUP_SHOPEE },
  { code: 'IDR', name: 'Shopee ID', country: 'ID (Shopee)', countryKO: '인도네시아 (쇼피)', markup: MARKUP_SHOPEE },
  { code: 'THB', name: 'Shopee TH', country: 'TH (Shopee)', countryKO: '태국 (쇼피)', markup: MARKUP_SHOPEE },
  { code: 'VND', name: 'Shopee VN', country: 'VN (Shopee)', countryKO: '베트남 (쇼피)', markup: MARKUP_SHOPEE },
  { code: 'PHP', name: 'Shopee PH', country: 'PH (Shopee)', countryKO: '필리핀 (쇼피)', markup: MARKUP_SHOPEE },
];

const INITIAL_PRODUCTS: Product[] = [
  { id: 'rminu-1kg', name: 'R-minu Hard Wax (1kg)', nameKO: '알마이너 하드 왁스 (1kg)', priceKRW: 21140 },
  { id: 'rminu-500g', name: 'R-minu Hard Wax (500g)', nameKO: '알마이너 하드 왁스 (500g)', priceKRW: 14450 },
  { id: 'rminu-400g', name: 'R-minu Hard Wax (400g)', nameKO: '알마이너 하드 왁스 (400g)', priceKRW: 14400 },
  { id: 'rminu-200g', name: 'R-minu Hard Wax (200g)', nameKO: '알마이너 하드 왁스 (200g)', priceKRW: 9500 },
  { id: 'lacan-1kg', name: 'Lacan Hard Wax (Pro 1kg)', nameKO: '라캉 하드 왁스 (전문가용 1kg)', priceKRW: 88000 },
] as any[];

// Mock rates for "Yesterday" to show fluctuation
const YESTERDAY_RATES: Record<string, number> = {
  USD: 0.00075, SGD: 0.00101, MYR: 0.00355, IDR: 11.85, 
  THB: 0.0265, VND: 18.2, PHP: 0.0425
};

export default function PriceSimulator() {
  const { language } = useLanguage();
  const [rates, setRates] = useState<Record<string, number>>({});
  const [prevRates, setPrevRates] = useState<Record<string, number>>(YESTERDAY_RATES);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [safetyBuffer, setSafetyBuffer] = useState(3); // Default 3% extra buffer

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/KRW');
        const data = await res.json();
        setRates(data.rates);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, priceKRW: newPrice } : p));
  };

  const isWonWeak = rates['USD'] < YESTERDAY_RATES['USD'];

  return (
    <div className={styles.componentContainer}>
      <h2 className={styles.title}>
        {language === 'ko' ? '글로벌 판매 전략 및 환율 시뮬레이터' : 'Global Strategy & Exchange Rate Simulator'}
      </h2>
      
      <div className={styles.volatilityAlert} style={{
        background: isWonWeak ? '#fff7ed' : '#f0fdf4',
        border: `1px solid ${isWonWeak ? '#fdba74' : '#86efac'}`,
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <strong style={{ color: isWonWeak ? '#c2410c' : '#15803d' }}>
            {language === 'ko' 
              ? `[환율 상태] 현재 원화 ${isWonWeak ? '약세' : '강세'} 국면` 
              : `[FX Status] KRW is currently ${isWonWeak ? 'Weak' : 'Strong'}`}
          </strong>
          <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#666' }}>
            {language === 'ko'
              ? '달러 대비 원화 가치가 하락하여 수출 경쟁력은 높아졌으나, 원자재 비용 상승을 고려해야 합니다.'
              : 'KRW value dropped against USD. Export competitiveness increased, but check material costs.'}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
           <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>환율 변동 대비 안전 마진 (Safety Buffer)</label>
           <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
              <input 
                type="number" 
                value={safetyBuffer} 
                onChange={(e) => setSafetyBuffer(Number(e.target.value))}
                style={{ width: '60px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
              /> %
           </div>
        </div>
      </div>

      <p className={styles.desc}>
        {language === 'ko' 
          ? '해외 플랫폼 수수료(Amazon ~15%, Shopee ~10%) 및 배송/안전 마진을 포함한 최종 제안 판매가입니다.'
          : 'Final suggested selling price including platform fees (~15%), shipping, and safety buffer.'}
      </p>
      
      {loading ? <div>Loading Rates...</div> : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '220px' }}>{language === 'ko' ? '제품 정보' : 'Product Information'}</th>
                <th style={{ width: '160px' }}>{language === 'ko' ? '기준가 (KRW)' : 'Base (KRW)'}</th>
                {CURRENCIES.map(c => (
                   <th key={c.code} style={{ minWidth: '160px' }}>
                     <div className={styles.thCol}>
                       <span style={{ color: '#1e293b', fontSize: '0.95rem' }}>{language === 'ko' ? c.countryKO : c.country}</span>
                       <span className={styles.rate} style={{ color: '#64748b' }}>1₩ = {rates[c.code]?.toFixed(5)}</span>
                     </div>
                   </th>
                 ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: '600', color: '#334155' }}>{language === 'ko' ? (p as any).nameKO : p.name}</td>
                  <td>
                    <input 
                      type="number" 
                      className={styles.priceInput}
                      value={p.priceKRW}
                      onChange={(e) => handlePriceChange(p.id, Number(e.target.value))}
                    />
                  </td>
                  {CURRENCIES.map(c => {
                    const currentRate = rates[c.code] || 0;
                    const prevRate = prevRates[c.code] || currentRate;
                    const totalMarkup = c.markup * (1 + safetyBuffer / 100);
                    
                    const currentPrice = p.priceKRW * currentRate * totalMarkup;
                    const prevPrice = p.priceKRW * prevRate * totalMarkup;
                    const diff = currentPrice - prevPrice;
                    const isPositive = diff >= 0;

                    return (
                      <td key={c.code} className={styles.currVal} style={{ padding: '1.25rem 1rem', verticalAlign: 'top' }}>
                        <div className={styles.priceMain} style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.01em' }}>
                          {formatCurrency(currentPrice, c.code)}
                        </div>
                        
                        {/* KRW Conversion Display */}
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>KRW</span>
                          {Math.round(currentPrice / currentRate).toLocaleString()}원
                        </div>

                        {/* Fluctuation Indicator */}
                        <div className={styles.priceDiff} style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                          <span style={{ 
                            color: isPositive ? '#059669' : '#dc2626', 
                            fontSize: '0.75rem', 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '2px',
                            background: isPositive ? '#ecfdf5' : '#fef2f2',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontWeight: '600'
                          }}>
                            {isPositive ? '▲' : '▼'} {formatCurrency(Math.abs(diff), c.code)}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ height: '100px' }}></div> {/* Added Bottom Space */}
        </div>
      )}
    </div>
  );
}
