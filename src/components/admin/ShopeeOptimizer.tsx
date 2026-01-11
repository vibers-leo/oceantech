'use client';

import React, { useState } from 'react';
import styles from './AdminComponents.module.css';
import { Copy, Sparkles, RefreshCw, Check } from 'lucide-react';

/* 
  Shopee Listing Optimizer 
  - Generates SEO-optimized titles & descriptions for Shopee logic using Mock AI.
*/

const KEYWORDS = [
  'Painless', 'Strong Grip', 'Sensitive Skin', 'Korean Beauty', 'Hypoallergenic', 
  'Low Melting Point', 'Salon Quality', 'Ready Stock', 'Fast Shipping'
];

const MOCK_RESULTS = {
  title: "🔥[Korea No.1] R-minu Premium Hard Wax (500g) | Painless & Strong Grip #LegWaxing",
  desc: `
✨ PRODUCT DESCRIPTION ✨

💡 Brand: Ocean Tech R-minu
🇰🇷 Origin: Made in Korea (100% Authentic)
📦 Capacity: 500g / 1kg
🚚 Shipping: Direct from Korea (SLS Standard)

🌟 KEY FEATURES 🌟
✅ 3-Core Tech: The generated formula ensures hair removal from the root without breaking.
✅ Low Melting Point: Safe for sensitive skin (45~50°C).
✅ Painless Experience: Adheres only to hair, not skin.

💡 HOW TO USE
1. Melt the wax warmer to honey consistency.
2. Apply thin layer in direction of hair growth.
3. Pull off quickly in opposite direction.

#waxing #hardwax #hairremoval #kbeauty #skincare #sensitive #rminu #lacan
  `
};

export default function ShopeeOptimizer() {
  const [productName, setProductName] = useState('R-minu Hard Wax');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(['Painless', 'Korean Beauty']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{title: string, desc: string} | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleKeyword = (kw: string) => {
    if (selectedKeywords.includes(kw)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== kw));
    } else {
      setSelectedKeywords([...selectedKeywords, kw]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setResult(null);
    
    // Simulate AI delay
    setTimeout(() => {
      // Dynamic Generation Logic (Mock)
      const emojiTitle = ["🔥", "✨", "🌟"][Math.floor(Math.random() * 3)];
      const kwString = selectedKeywords.slice(0, 2).join(" & ");
      const title = `${emojiTitle} [Korea No.1] ${productName} | ${kwString} ${selectedKeywords.includes('Ready Stock') ? '[Ready Stock]' : ''}`;
      
      setResult({
        title: title,
        desc: MOCK_RESULTS.desc
      });
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${result.title}\n\n${result.desc}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.componentContainer}>
      <h2 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/globe.svg" alt="Shopee" width={24} height={24} style={{ filter: 'invert(1)' }}/>
        Shopee Listing Optimizer (AI-SEO)
      </h2>
      <p className={styles.desc}>
        Generates optimized product titles and descriptions for Shopee's search algorithm using high-volume keywords.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        
        {/* Left: Inputs */}
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', fontWeight: 'bold' }}>1. Target Settings</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#64748b' }}>Product Name</label>
            <input 
              type="text" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={styles.priceInput}
              style={{ width: '100%', textAlign: 'left' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#64748b' }}>Strategic Keywords (Select 2-3)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {KEYWORDS.map(kw => (
                <button 
                  key={kw}
                  onClick={() => toggleKeyword(kw)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    border: selectedKeywords.includes(kw) ? '1px solid #f97316' : '1px solid #cbd5e1',
                    background: selectedKeywords.includes(kw) ? '#fff7ed' : 'white',
                    color: selectedKeywords.includes(kw) ? '#ea580c' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(to right, #f97316, #ea580c)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              opacity: isGenerating ? 0.7 : 1
            }}
          >
            {isGenerating ? <RefreshCw className="animate-spin w-5 h-5"/> : <Sparkles className="w-5 h-5"/>}
            {isGenerating ? 'Analyzing Market Trends...' : 'Generate Optimized Listing'}
          </button>
        </div>

        {/* Right: Output */}
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '15px', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#334155' }}>Preview (Shopee Mobile)</span>
            {result && (
              <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: copied ? '#16a34a' : '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
                {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                {copied ? 'Copied' : 'Copy All'}
              </button>
            )}
          </div>
          
          <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
            {!result && !isGenerating && (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.9rem', flexDirection: 'column', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9' }}></div>
                Waiting for input...
              </div>
            )}

            {isGenerating && (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '15px' }}>
                <div className="animate-pulse" style={{ width: '80%', height: '20px', background: '#f1f5f9', borderRadius: '4px' }}></div>
                <div className="animate-pulse" style={{ width: '60%', height: '20px', background: '#f1f5f9', borderRadius: '4px' }}></div>
                <div className="animate-pulse" style={{ width: '90%', height: '150px', background: '#f1f5f9', borderRadius: '4px' }}></div>
              </div>
            )}

            {result && (
              <div className="animate-fadeIn">
                {/* Shopee UI Mockup */}
                <div style={{ marginBottom: '15px' }}>
                  <span style={{ background: '#ee4d2d', color: 'white', fontSize: '0.7rem', padding: '2px 4px', borderRadius: '2px', marginRight: '6px' }}>Mall</span>
                  <strong style={{ fontSize: '1rem', lineHeight: '1.4' }}>{result.title}</strong>
                </div>
                
                <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                  <span style={{ color: '#ee4d2d', fontSize: '1.1rem' }}>$18.50</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'line-through', marginTop: '4px' }}>$25.00</span>
                </div>

                <div style={{ fontSize: '0.9rem', color: '#334155', whiteSpace: 'pre-line', lineHeight: '1.6', background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                  {result.desc}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
