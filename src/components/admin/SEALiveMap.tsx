'use client';

import React, { useEffect, useState } from 'react';
import styles from './AdminComponents.module.css';
import { getOrders, getDashboardStats, type Order, type DashboardStats } from '@/lib/firestore';

const MARKET_INSIGHTS = [
  { id: 'VN', country: 'Vietnam', flag: '🇻🇳', title: 'K-뷰티 고관여층', desc: '한국 화장품에 대한 신뢰도 높음. 가격 민감도가 있지만 품질 중시. 인플루언서 마케팅 필수.' },
  { id: 'TH', country: 'Thailand', flag: '🇹🇭', title: '트렌드 리더', desc: '경쟁이 치열하고 성숙한 시장. 미백 및 안티에이징 수요 강력. 소셜 커머스(틱톡샵 등) 강세.' },
  { id: 'PH', country: 'Philippines', flag: '🇵🇭', title: '미백(Whitening) 집중', desc: '영어 친화적 시장. 미백 제품에 대한 압도적 수요. 소포장(Sachet) 제품 선호.' },
  { id: 'MY', country: 'Malaysia', flag: '🇲🇾', title: '할랄 / 스킨케어', desc: '다민족 국가. 할랄 인증이 중요하며 도시 거주층을 중심으로 스킨케어에 대한 인식 높음.' },
  { id: 'SG', country: 'Singapore', flag: '🇸🇬', title: '프리미엄 & 클린뷰티', desc: '높은 구매력. 클린 뷰티, 친환경, 프리미엄 더마 코스메틱 선호.' },
  { id: 'ID', country: 'Indonesia', flag: '🇮🇩', title: '할랄 필수 (BPOM)', desc: '거대한 내수 시장. BPOM 및 할랄 인증 사실상 필수. 젊은 층 중심의 기초 화장품 성장세.' },
];

const LOCATIONS = [
  { id: 'VN', name: 'Vietnam', x: 260, y: 180 },
  { id: 'TH', name: 'Thailand', x: 200, y: 220 },
  { id: 'PH', name: 'Philippines', x: 400, y: 200 },
  { id: 'MY', name: 'Malaysia', x: 220, y: 350 },
  { id: 'SG', name: 'Singapore', x: 230, y: 390 },
  { id: 'ID', name: 'Indonesia', x: 280, y: 450 },
];

export default function SEALiveMap() {
  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [ordersData, statsData] = await Promise.all([
          getOrders(),
          getDashboardStats()
        ]);
        
        setRecentOrders(ordersData.slice(0, 8));
        setStats(statsData);
        
        // 실제 주문 이메일 도메인 분석을 통한 국가 핑 노출 (데모용 로직 유지)
        const orderCountries = ordersData
          .map(o => o.email?.split('@')[1]?.includes('vn') ? 'VN' : o.email?.split('@')[1]?.includes('th') ? 'TH' : '')
          .filter(c => c !== '');
        
        if (orderCountries.length > 0) {
           setActiveNodes([orderCountries[0]]);
        }
      } catch (error) {
        console.error('Failed to load orders for map:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    // Simulation loop for visual effect (only if no real orders or just as ambient)
    const interval = setInterval(() => {
      const randomLoc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      setActiveNodes(prev => [...prev, randomLoc.id]);
      setTimeout(() => {
        setActiveNodes(prev => prev.filter(id => id !== randomLoc.id));
      }, 1500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.componentContainer} style={{ background: '#0f172a', color: 'white', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 className={styles.title} style={{ color: 'white', marginBottom: '5px' }}>동남아 시장 분석 (SEA Market Analysis)</h2>
          <p className={styles.desc} style={{ color: '#94a3b8' }}>실시간 주문 관제 및 국가별 뷰티 시장 핵심 인사이트</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
           <div className="flex flex-col items-end">
             <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>누적 주문 건수</span>
             <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8' }}>{stats?.totalOrders || 0}</span>
           </div>
           <div className="flex flex-col items-end">
             <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>실시간 누적 매출</span>
             <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>₩{(stats?.revenue || 0).toLocaleString()}</span>
           </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', marginBottom: '30px' }}>
        
        {/* Map Visualization */}
        <div style={{ position: 'relative', height: '500px', background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
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
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>주문 발생</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#475569' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>오프라인</span>
            </div>
          </div>
        </div>

        {/* Live Feed Sidebar */}
        <div style={{ background: '#1e293b', padding: '15px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
           <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>최근 주문 현황</h3>
           
           <div style={{  display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
             {recentOrders.length > 0 ? recentOrders.map((order, i) => (
                <div key={i} className="animate-fadeRight" style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                     <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>{order.user}</span>
                     <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{order.date}</span>
                   </div>
                   <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>{order.item}</div>
                </div>
             )) : (
               <div style={{ padding: '20px', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
                 최근 주문 내역이 없습니다.
               </div>
             )}
           </div>
        </div>
      </div>

      {/* Market Insights Section (New) */}
      <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '15px', borderLeft: '4px solid #38bdf8', paddingLeft: '10px' }}>
         국가별 뷰티 시장 분석 요약
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
