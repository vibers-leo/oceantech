'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PriceSimulator from '@/components/admin/PriceSimulator';
import OrderManager from '@/components/admin/OrderManager';
import AdminSettings from '@/components/admin/AdminSettings';
import BannerManager from '@/components/admin/BannerManager';
import StoreStatus from '@/components/admin/StoreStatus';
import MemberManager from '@/components/admin/MemberManager';
import ShopeeOptimizer from '@/components/admin/ShopeeOptimizer';
import SEALiveMap from '@/components/admin/SEALiveMap';
import TradeKoreaAnalysis from '@/components/admin/TradeKoreaAnalysis';
import MarketComparison from '@/components/admin/MarketComparison';

import { Menu, X, ChevronLeft, ChevronRight, LayoutPanelLeft } from 'lucide-react';
import TeamCalendar, { CalendarEvent } from '@/components/admin/TeamCalendar';

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open

  // Persistent Schedule State
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('team_result_events');
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse events', e);
      }
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('team_result_events', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (newEvent: CalendarEvent) => {
    setEvents(prev => [...prev, newEvent]);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Protect Route
  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);
  
  // Mobile responsive helper: close sidebar on route change or initial load if small screen?
  // For now, simple toggle logic.

  if (isLoading || !user || user.role !== 'admin') {
     return <div className="loading">Loading Admin Panel...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Mobile Overlay */}
      <div 
        className={`${styles.overlay} ${isSidebarOpen ? styles.show : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.show : styles.hidden}`}>
        <div className={styles.logo} style={{ padding: '24px 20px' }}>
            <span style={{ letterSpacing: '2px', color: '#3498db' }}>R-MINU</span> ADMIN
        </div>
        <nav className={styles.nav}>
          {/* ... existing nav items ... */}
          <div 
            className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => { setActiveTab('dashboard'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '대시보드' : 'Dashboard'}
          </div>
          
          <div className={styles.navGroupTitle}>GLOBAL EXPANSION</div>
          
          <div 
            className={`${styles.navItem} ${activeTab === 'shopee_opt' ? styles.active : ''}`}
            onClick={() => { setActiveTab('shopee_opt'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '쇼피 리스팅 (AI)' : 'Shopee Listing (AI)'}
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'live_map' ? styles.active : ''}`}
            onClick={() => { setActiveTab('live_map'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '동남아 시장분석 (Market Analysis)' : 'SEA Market Analysis'}
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'tradekorea' ? styles.active : ''}`}
            onClick={() => { setActiveTab('tradekorea'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '트레이드코리아 분석' : 'TradeKorea Strategy'}
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'market_compare' ? styles.active : ''}`}
            onClick={() => { setActiveTab('market_compare'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '마켓별 정책 비교' : 'Market Policy Comparison'}
          </div>

          <div className={styles.navGroupTitle}>OPERATIONS</div>

          <div 
            className={`${styles.navItem} ${activeTab === 'schedule' ? styles.active : ''}`}
            onClick={() => { setActiveTab('schedule'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '일정 관리' : 'Schedule Management'}
          </div>

          <div 
            className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
            onClick={() => { setActiveTab('orders'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '주문 관리' : 'Orders'}
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'members' ? styles.active : ''}`}
            onClick={() => { setActiveTab('members'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '회원 승인/관리' : 'Members'}
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'pricing' ? styles.active : ''}`}
            onClick={() => { setActiveTab('pricing'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '글로벌 가격' : 'Global Pricing'}
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'banners' ? styles.active : ''}`}
            onClick={() => { setActiveTab('banners'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '배너 관리' : 'Banner Manager'}
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'stores' ? styles.active : ''}`}
            onClick={() => { setActiveTab('stores'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '입점 현황' : 'Store Status'}
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => { setActiveTab('settings'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
          >
            {language === 'ko' ? '설정' : 'Settings'}
          </div>

          <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#bdc3c7', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              <ChevronLeft size={18} />
              {language === 'ko' ? '사이드바 숨기기' : 'Hide Sidebar'}
            </button>
          </div>
        </nav>
      </div>

      <div className={styles.main}>
        <header className={styles.header}>
          <button className={styles.toggleBtn} onClick={() => setIsSidebarOpen(!isSidebarOpen)} title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}>
            {isSidebarOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
          </button>
          <h1>
            {(() => {
              if (language === 'ko') {
                switch (activeTab) {
                  case 'dashboard': return '대시보드';
                  case 'shopee_opt': return '쇼피 리스팅 최적화 (AI)';
                  case 'live_map': return '동남아 시장분석 및 관제탑';
                  case 'tradekorea': return '트레이드코리아 활용 전략';
                  case 'schedule': return '일정 관리';
                  case 'orders': return '주문 관리';
                  case 'members': return '회원 승인 및 관리';
                  case 'pricing': return '글로벌 가격 전략';
                  case 'banners': return '배너 및 팝업 관리';
                  case 'stores': return '입점 스토어 현황';
                  case 'market_compare': return '글로벌 정산 및 배송 정책 비교';
                  case 'settings': return '시스템 설정';
                  default: return activeTab;
                }
              }
              return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
            })()}
          </h1>
          <div className={styles.profile} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '8px 16px', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3498db', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
              {user.name.charAt(0)}
            </div>
            <span style={{ fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>{user.name}</span>
          </div>
        </header>

        <div className={styles.contentArea}>
          {activeTab === 'dashboard' && (
            <>
              {/* Team Calendar Section - Top Priority */}
              <TeamCalendar events={events} onAddEvent={handleAddEvent} onDeleteEvent={handleDeleteEvent} />

              <div className={styles.statsGrid}>
                {/* Stat cards content... same as before */}
                <div className={styles.statCard}>
                  <h3>{language === 'ko' ? '총 주문 수' : 'Total Orders'}</h3>
                  <div className={styles.value}>1,024</div>
                  <div className={styles.trend}>{language === 'ko' ? '지난달 대비 +12%' : '+12% from last month'}</div>
                </div>
                <div className={styles.statCard}>
                  <h3>{language === 'ko' ? '매출액' : 'Revenue'}</h3>
                  <div className={styles.value}>₩84,320,000</div>
                  <div className={styles.trend}>{language === 'ko' ? '지난달 대비 +5%' : '+5% from last month'}</div>
                </div>
                <div className={styles.statCard}>
                  <h3>{language === 'ko' ? '배송 대기' : 'Pending Shipments'}</h3>
                  <div className={styles.value}>42</div>
                  <div className={styles.trend} style={{color: 'orange'}}>{language === 'ko' ? '처리 필요' : 'Action Needed'}</div>
                </div>
              </div>

              <div className={styles.recentOrders}>
                <h2>{language === 'ko' ? '최근 활동' : 'Recent Activity'}</h2>
                <div className={styles.alertBox}>
                  <strong>{language === 'ko' ? '글로벌 확장 준비 완료' : 'Global Expansion Ready'}</strong>
                  <p>
                    {language === 'ko' 
                      ? '새로운 쇼피 리스팅 AI와 동남아 관제탑 기능이 추가되었습니다. 왼쪽 메뉴에서 확인하세요.' 
                      : 'New features Shopee AI and SEA Live Map are live. Check the sidebar.'}
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'schedule' && (
             <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <TeamCalendar events={events} onAddEvent={handleAddEvent} onDeleteEvent={handleDeleteEvent} />
             </div>
          )}

          {activeTab === 'shopee_opt' && <ShopeeOptimizer />}
          {activeTab === 'live_map' && <SEALiveMap />}
          {activeTab === 'tradekorea' && <TradeKoreaAnalysis />}
          {activeTab === 'orders' && <OrderManager />}
          {activeTab === 'members' && <MemberManager />}
          {activeTab === 'pricing' && <PriceSimulator />}
          {activeTab === 'market_compare' && <MarketComparison />}
          {activeTab === 'banners' && <BannerManager />}
          {activeTab === 'stores' && <StoreStatus />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </div>
    </div>
  );
}
