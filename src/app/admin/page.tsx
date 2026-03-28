'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
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
import VibersBanner from '@/components/VibersBanner';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import TeamCalendar from '@/components/admin/TeamCalendar';
import type { CalendarEvent as TeamCalendarEvent } from '@/components/admin/TeamCalendar';
import {
  type DashboardStats,
  getCalendarEvents,
  addCalendarEvent,
  deleteCalendarEvent,
  getDashboardStats,
} from '@/lib/firestore';

// Firestore string ID → TeamCalendar number ID 매핑
interface MappedEvent extends TeamCalendarEvent {
  _firestoreId?: string;
}

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Firestore 캘린더 이벤트
  const [events, setEvents] = useState<MappedEvent[]>([]);
  // 대시보드 실시간 통계
  const [stats, setStats] = useState<DashboardStats>({ totalOrders: 0, revenue: 0, pendingShipments: 0, totalInquiries: 0 });

  const loadEvents = useCallback(async () => {
    try {
      const data = await getCalendarEvents();
      setEvents(data.map((e, i) => ({
        id: i + 1,
        date: e.date,
        title: e.title,
        type: e.type,
        participants: e.participants,
        _firestoreId: e.id,
      })));
    } catch (err) {
      console.error('캘린더 로드 실패:', err);
      // 폴백: localStorage
      const saved = localStorage.getItem('team_result_events');
      if (saved) {
        try { setEvents(JSON.parse(saved)); } catch { /* ignore */ }
      }
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const s = await getDashboardStats();
      setStats(s);
    } catch (err) {
      console.error('통계 로드 실패:', err);
    }
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadEvents();
      loadStats();
    }
  }, [user, loadEvents]);

  const handleAddEvent = async (newEvent: TeamCalendarEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    try {
      await addCalendarEvent({
        date: newEvent.date,
        title: newEvent.title,
        type: newEvent.type,
        participants: newEvent.participants,
      });
      await loadEvents();
    } catch (err) {
      console.error('일정 추가 실패:', err);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    const target = events.find((e) => e.id === id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    try {
      if (target?._firestoreId) {
        await deleteCalendarEvent(target._firestoreId);
      }
    } catch (err) {
      console.error('일정 삭제 실패:', err);
    }
  };

  // Protect Route
  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'admin') {
    return <div className="loading">Loading Admin Panel...</div>;
  }

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const navItem = (tab: string, labelKo: string, labelEn: string) => (
    <div
      className={`${styles.navItem} ${activeTab === tab ? styles.active : ''}`}
      onClick={() => { setActiveTab(tab); closeSidebarOnMobile(); }}
    >
      {language === 'ko' ? labelKo : labelEn}
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Mobile Overlay */}
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.show : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.show : styles.hidden}`}>
        <div className={styles.logo} style={{ padding: '24px 20px' }}>
          <span style={{ letterSpacing: '2px', color: '#3498db' }}>R-MINU</span> ADMIN
        </div>
        <nav className={styles.nav}>
          {navItem('dashboard', '대시보드', 'Dashboard')}

          <div className={styles.navGroupTitle}>GLOBAL EXPANSION</div>
          {navItem('shopee_opt', '쇼피 리스팅 (AI)', 'Shopee Listing (AI)')}
          {navItem('live_map', '동남아 시장분석 (Market Analysis)', 'SEA Market Analysis')}
          {navItem('tradekorea', '트레이드코리아 분석', 'TradeKorea Strategy')}
          {navItem('market_compare', '마켓별 정책 비교', 'Market Policy Comparison')}

          <div className={styles.navGroupTitle}>OPERATIONS</div>
          {navItem('schedule', '일정 관리', 'Schedule Management')}
          {navItem('orders', '주문 관리', 'Orders')}
          {navItem('members', '회원 승인/관리', 'Members')}
          {navItem('pricing', '글로벌 가격', 'Global Pricing')}
          {navItem('banners', '배너 관리', 'Banner Manager')}
          {navItem('stores', '입점 현황', 'Store Status')}
          {navItem('settings', '설정', 'Settings')}

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
          <button className={styles.toggleBtn} onClick={() => setIsSidebarOpen(!isSidebarOpen)} title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}>
            {isSidebarOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
          </button>
          <h1>
            {(() => {
              if (language === 'ko') {
                const titles: Record<string, string> = {
                  dashboard: '대시보드',
                  shopee_opt: '쇼피 리스팅 최적화 (AI)',
                  live_map: '동남아 시장분석 및 관제탑',
                  tradekorea: '트레이드코리아 활용 전략',
                  schedule: '일정 관리',
                  orders: '주문 관리',
                  members: '회원 승인 및 관리',
                  pricing: '글로벌 가격 전략',
                  banners: '배너 및 팝업 관리',
                  stores: '입점 스토어 현황',
                  market_compare: '글로벌 정산 및 배송 정책 비교',
                  settings: '시스템 설정',
                };
                return titles[activeTab] || activeTab;
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
              <TeamCalendar events={events} onAddEvent={handleAddEvent} onDeleteEvent={handleDeleteEvent} />
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <h3>{language === 'ko' ? '총 주문 수' : 'Total Orders'}</h3>
                  <div className={styles.value}>{stats.totalOrders.toLocaleString()}</div>
                  <div className={styles.trend}>{language === 'ko' ? `문의 ${stats.totalInquiries}건` : `${stats.totalInquiries} inquiries`}</div>
                </div>
                <div className={styles.statCard}>
                  <h3>{language === 'ko' ? '매출액' : 'Revenue'}</h3>
                  <div className={styles.value}>₩{stats.revenue.toLocaleString()}</div>
                  <div className={styles.trend}>{language === 'ko' ? '취소 제외 합계' : 'Excl. cancelled'}</div>
                </div>
                <div className={styles.statCard}>
                  <h3>{language === 'ko' ? '배송 대기' : 'Pending Shipments'}</h3>
                  <div className={styles.value}>{stats.pendingShipments}</div>
                  <div className={styles.trend} style={{ color: stats.pendingShipments > 0 ? 'orange' : 'green' }}>
                    {stats.pendingShipments > 0
                      ? (language === 'ko' ? '처리 필요' : 'Action Needed')
                      : (language === 'ko' ? '처리 완료' : 'All Clear')}
                  </div>
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

          {/* 계발자들 프로젝트 */}
          <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>계발자들 프로젝트</p>
            <VibersBanner size="medium" currentProject="oceantechlab" />
          </div>
        </div>
      </div>
    </div>
  );
}
