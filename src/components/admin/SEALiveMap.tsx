'use client';

import React, { useEffect, useState } from 'react';
import styles from './AdminComponents.module.css';

/*
  SEA Market Analysis
  - Visualizes "Live Orders" from 6 SEA countries.
  - Provides concise beauty market insights for each region.
*/

// Market Data
const MARKET_INSIGHTS = [
  { id: 'VN', country: 'Vietnam', flag: '🇻🇳', title: 'K-Beauty Avid Fans', desc: 'High trust in Korean skincare. Price-sensitive but quality-focused. Influenser marketing is key.' },
  { id: 'TH', country: 'Thailand', flag: '🇹🇭', title: 'Trend Leaders', desc: 'Sophisticated market with high competition. Strong demand for whitening & anti-aging. Social commerce is dominant.' },
  { id: 'PH', country: 'Philippines', flag: '🇵🇭', title: 'Whitening Focus', desc: 'English-friendly market. Obsessed with whitening products. Low price point sensitivity for sachets/trial kits.' },
  { id: 'MY', country: 'Malaysia', flag: '🇲🇾', title: 'Halal Conscious', desc: 'Multi-ethnic market. Halal certification is a major plus. High skincare awareness among urban population.' },
  { id: 'SG', country: 'Singapore', flag: '🇸🇬', title: 'Premium & Clean', desc: 'High purchasing power. Preference for "Clean Beauty", eco-friendly, and premium clinical brands.' },
  { id: 'ID', country: 'Indonesia', flag: '🇮🇩', title: 'Halal Mandatory', desc: 'Massive volume potential. BPOM & Halal certification effectively mandatory. Young demographic driving basic skincare growth.' },
];

// Coordinates roughly relative to a 800x600 viewBox
const LOCATIONS = [
  { id: 'VN', name: 'Vietnam', x: 260, y: 180, delay: 2000 },
  { id: 'TH', name: 'Thailand', x: 200, y: 220, delay: 3500 },
  { id: 'PH', name: 'Philippines', x: 400, y: 200, delay: 1500 },
  { id: 'MY', name: 'Malaysia', x: 220, y: 350, delay: 4200 },
  { id: 'SG', name: 'Singapore', x: 230, y: 390, delay: 800 },
  { id: 'ID', name: 'Indonesia', x: 280, y: 450, delay: 5000 },
];

const RECENT_ORDERS = [
  { country: 'SG', user: 'Angie L.', item: 'R-minu Hard Wax 500g', time: 'Just now' },
  { country: 'VN', user: 'Nguyen T.', item: 'Lacan Pro Kit', time: '2m ago' },
  { country: 'MY', user: 'Fattah A.', item: 'Soothing Oil', time: '5m ago' },
  { country: 'PH', user: 'Maria C.', item: 'R-minu Hard Wax 1kg', time: '12m ago' },
  { country: 'TH', user: 'Somchai P.', item: 'Lacan Wax Warmer', time: '15m ago' },
];

export default function SEALiveMap() {
  const [activeNodes, setActiveNodes] = useState<string[]>([]);

  // Simulation loop
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    LOCATIONS.forEach(loc => {
      const interval = setInterval(() => {
        // Trigger ping
        setActiveNodes(prev => [...prev, loc.id]);
        setTimeout(() => {
          setActiveNodes(prev => prev.filter(id => id !== loc.id));
        }, 1000); // Ping duration
      }, loc.delay + Math.random() * 2000);
      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className={styles.componentContainer} style={{ background: '#0f172a', color: 'white', border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 className={styles.title} style={{ color: 'white', marginBottom: '5px' }}>SEA Market Analysis</h2>
          <p className={styles.desc} style={{ color: '#94a3b8' }}>Real-time monitoring & Regional Beauty Market Insights</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
           <div className="flex flex-col items-end">
             <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total Active Users</span>
             <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8' }}>1,284</span>
           </div>
           <div className="flex flex-col items-end">
             <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Daily Rev (Est)</span>
             <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>$4,250</span>
           </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', marginBottom: '30px' }}>
        
        {/* Map Visualization */}
        <div style={{ position: 'relative', height: '500px', background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
          {/* Grid Lines */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }}></div>

          <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%' }}>
            {/* Abstract Map Paths (Simplified) */}
            <g transform="translate(100, 50) scale(0.8)">
               {/* Indochina (VN, TH, LA, KH) */}
               <path d="M150,100 L250,80 L280,150 L260,250 L200,300 L150,250 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
               
               {/* Malaysia (Peninsula) */}
               <path d="M190,320 L240,310 L250,380 L200,390 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
               
               {/* Borneo (MY, ID, BN) */}
               <path d="M280,300 L350,290 L380,350 L340,400 L270,380 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />

               {/* Philippines */}
               <path d="M380,180 L420,150 L450,220 L400,250 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
               <path d="M400,260 L440,260 L430,320 L390,300 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />

               {/* Indonesia (Sumatra, Java) */}
               <path d="M150,380 L220,350 L250,450 L180,480 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
               <path d="M260,450 L380,440 L400,480 L280,490 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />

               {/* Connecting Lines */}
               {LOCATIONS.map((loc, i) => (
                 <React.Fragment key={i}>
                   {LOCATIONS.slice(i + 1).map((target, j) => (
                      <line 
                        key={j} 
                        x1={loc.x} y1={loc.y} 
                        x2={target.x} y2={target.y} 
                        stroke="#38bdf8" 
                        strokeWidth="0.5" 
                        opacity="0.1" 
                      />
                   ))}
                 </React.Fragment>
               ))}

               {/* Country Nodes */}
               {LOCATIONS.map(loc => (
                 <g key={loc.id} className="cursor-pointer">
                   {/* Pulse Effect */}
                   <circle 
                      cx={loc.x} cy={loc.y} r={activeNodes.includes(loc.id) ? 30 : 0} 
                      fill="none" 
                      stroke="#38bdf8" 
                      opacity={activeNodes.includes(loc.id) ? 0 : 0.5}
                      style={{ transition: 'all 1s ease-out' }}
                   />
                   
                   {/* Node Dot */}
                   <circle cx={loc.x} cy={loc.y} r="6" fill={activeNodes.includes(loc.id) ? "#38bdf8" : "#475569"} />
                   
                   {/* Label */}
                   <text x={loc.x + 15} y={loc.y + 5} fill="#e2e8f0" fontSize="12" fontWeight="bold">{loc.name}</text>
                   
                   {/* Active Order Pop (Simulated) */}
                   {activeNodes.includes(loc.id) && (
                     <g transform={`translate(${loc.x - 20}, ${loc.y - 30})`}>
                       <rect width="80" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1"/>
                       <text x="10" y="16" fill="#38bdf8" fontSize="10">+1 Order</text>
                     </g>
                   )}
                 </g>
               ))}
            </g>
          </svg>

          {/* Legend */}
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Active Order</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#475569' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Offline</span>
            </div>
          </div>
        </div>

        {/* Live Feed Sidebar */}
        <div style={{ background: '#1e293b', padding: '15px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
           <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Recent Orders</h3>
           
           <div style={{  display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
             {RECENT_ORDERS.map((order, i) => (
                <div key={i} className="animate-fadeRight" style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                     <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>{order.user}</span>
                     <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{order.time}</span>
                   </div>
                   <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>{order.item}</div>
                   <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                     <span style={{ width: '16px', height: '12px', background: '#334155', display: 'inline-block', borderRadius: '2px' }}></span>
                     {order.country} Warehouse
                   </div>
                </div>
             ))}
             {/* Fake Skeleton for 'Streaming' feel */}
             <div style={{ height: '50px', border: '1px dashed #334155', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: '0.8rem' }}>
                Waiting for incoming data...
             </div>
           </div>
        </div>
      </div>

      {/* Market Insights Section (New) */}
      <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '15px', borderLeft: '4px solid #38bdf8', paddingLeft: '10px' }}>
         Regional Beauty Market Insights
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
         {MARKET_INSIGHTS.map(m => (
            <div key={m.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{m.flag}</span>
                  <h4 style={{ color: 'white', margin: 0, fontSize: '1rem' }}>{m.country}</h4>
               </div>
               <div style={{ background: '#0f172a', padding: '8px 12px', borderRadius: '6px', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '10px', display: 'inline-block' }}>
                  {m.title}
               </div>
               <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                  {m.desc}
               </p>
            </div>
         ))}
      </div>

    </div>
  );
}
