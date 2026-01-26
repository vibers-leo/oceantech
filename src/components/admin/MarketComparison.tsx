'use client';

import React from 'react';
import styles from './MarketComparison.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { Info, Truck, DollarSign, Clock, ShieldCheck } from 'lucide-react';

interface PlatformData {
  id: string;
  name: string;
  settlement: {
    period: string;
    periodKO: string;
    note: string;
    noteKO: string;
  };
  fees: {
    category: string;
    categoryKO: string;
    rate: string;
    extra: string;
    extraKO: string;
  };
  shipping: {
    primary: string;
    primaryKO: string;
    strategy: string;
    strategyKO: string;
  };
  features: string[];
  featuresKO: string[];
}

const COMPARISON_DATA: PlatformData[] = [
  {
    id: 'amazon',
    name: 'Amazon (Global)',
    settlement: {
      period: '14 Days',
      periodKO: '14일 주기',
      note: 'Standard cycle, balance paid out every 2 weeks',
      noteKO: '표준 정기 정산, 2주마다 잔액 지급'
    },
    fees: {
      category: 'Health & Beauty',
      categoryKO: '뷰티/헬스케어',
      rate: '8% - 15%',
      extra: 'FBA storage fees apply',
      extraKO: 'FBA 창고 보관료 별도 발생'
    },
    shipping: {
      primary: 'FBA (Fulfillment by Amazon)',
      primaryKO: 'FBA 전담 배송',
      strategy: 'High inventory cost, high trust & Prime badge',
      strategyKO: '재고 부담 있으나 북미 고객 신뢰도 압도적'
    },
    features: ['Prime Badge', 'Global Expansion', 'Buy Box'],
    featuresKO: ['프라임 배지', '글로벌 확장성', '바이박스 경쟁']
  },
  {
    id: 'shopee',
    name: 'Shopee (SEA)',
    settlement: {
      period: 'R+3 / Weekly',
      periodKO: '구매확정 +3일',
      note: 'Fast settlement for Managed/Preferred sellers',
      noteKO: '우수 셀러는 실시간/주간 정산 가능'
    },
    fees: {
      category: 'Cosmetics',
      categoryKO: '코스메틱 (화장품)',
      rate: '3% - 5%',
      extra: 'Transaction fees + Service fees (CCB/FSS)',
      extraKO: '결제 수수료 + 마케팅 참여 수수료 별도'
    },
    shipping: {
      primary: 'SLS (Shopee Logistics)',
      primaryKO: 'SLS 플랫폼 물류',
      strategy: 'Low cost, local warehouse delivery',
      strategyKO: '국내 집하지(김포/용인) 입고로 간단한 프로세스'
    },
    features: ['Low Entry Barrier', 'Chat-based Selling', 'Flash Sales'],
    featuresKO: ['낮은 진입장벽', '라이브/채팅 판매 강점', '플래시 세일']
  },
  {
    id: 'ebay',
    name: 'eBay (Global)',
    settlement: {
      period: '2 Working Days',
      periodKO: '영업일 2일',
      note: 'Funds available quickly after shipping',
      noteKO: '발송 후 익익일 정산 가능 (Managed Payments)'
    },
    fees: {
      category: 'Health & Beauty',
      categoryKO: '뷰티/케어',
      rate: '13.25% + $0.30',
      extra: 'Final value fee includes shipping charges',
      extraKO: '판매 수수료에 배송비 포함 계산 주의'
    },
    shipping: {
      primary: 'Seller Direct / GSP',
      primaryKO: '셀러 직접배송 / GSP',
      strategy: 'Flexible, suitable for individual items',
      strategyKO: '배송 정책 설정 자유로움, 소량 다품종 유리'
    },
    features: ['Direct Communication', 'Auction System', 'SEO friendly'],
    featuresKO: ['셀러-구매자 직접 소통', '경매 시스템', '구글 검색 노출']
  },
  {
    id: 'coupang',
    name: 'Coupang (Korea)',
    settlement: {
      period: 'Weekly / Monthly',
      periodKO: '주정산 / 월정산 선택',
      note: 'Can take up to 60+ days depending on contract',
      noteKO: '로켓 배송 등 계약 방식에 따라 정산 주기 김'
    },
    fees: {
      category: 'Beauty (Waxing)',
      categoryKO: '뷰티 (제모/왁싱)',
      rate: '9.6%',
      extra: '3% Delivery processing fee on shipping',
      extraKO: '배송비에 대한 3% 배송 운영 수수료 발생'
    },
    shipping: {
      primary: 'Rocket / Jet / Seller',
      primaryKO: '로켓 / 제트 / 판매자배송',
      strategy: 'Rocket delivery for massive volume',
      strategyKO: '로켓배송 입점 시 폭발적 매출이나 재고관리 필수'
    },
    features: ['Next Day Delivery', 'Powerful Search', 'Membership'],
    featuresKO: ['익일 배송 호감도', '독보적 검색 트래픽', '와우 멤버십']
  }
];

export default function MarketComparison() {
  const { language } = useLanguage();
  const isKO = language === 'ko';

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '10px' }}>
          {isKO ? '글로벌 이커머스 채널 비교 분석' : 'Global E-commerce Channel Analysis'}
        </h2>
        <p style={{ color: '#718096' }}>
          {isKO 
            ? '알마이너 왁스 제품군(뷰티/코스메틱) 기준 마켓별 정산 및 배송 정책 비교' 
            : 'Settlement & Shipping comparison for R-minu Wax products (Beauty/Cosmetics category).'}
        </p>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th>{isKO ? '플랫폼' : 'Platform'}</th>
              <th>{isKO ? '정산 정책' : 'Settlement'}</th>
              <th>{isKO ? '판매 수수료 (뷰티)' : 'Sales Fee (Beauty)'}</th>
              <th>{isKO ? '배송 전략' : 'Shipping Strategy'}</th>
              <th>{isKO ? '핵심 특징' : 'Key Features'}</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_DATA.map((item) => (
              <tr key={item.id}>
                <td className={styles.platformCell}>
                  <div className={styles.platformIcon} style={{ background: item.id === 'amazon' ? '#232f3e' : item.id === 'shopee' ? '#ee4d2d' : item.id === 'ebay' ? '#0064d2' : '#00aaff', color: 'white' }}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className={styles.platformName}>{item.name}</div>
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>{isKO ? item.settlement.periodKO : item.settlement.period}</div>
                  <div className={styles.subText}>{isKO ? item.settlement.noteKO : item.settlement.note}</div>
                </td>
                <td>
                  <div className={styles.feeValue}>{item.fees.rate}</div>
                  <div className={styles.subText}>{isKO ? item.fees.extraKO : item.fees.extra}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{isKO ? item.shipping.primaryKO : item.shipping.primary}</div>
                  <div className={styles.subText}>{isKO ? item.shipping.strategyKO : item.shipping.strategy}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {(isKO ? item.featuresKO : item.features).map((tag, idx) => (
                      <span key={idx} className={`${styles.tag} ${idx % 2 === 0 ? styles.tagBlue : styles.tagGreen}`}>{tag}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.titleSection}>
        <h3 style={{ fontSize: '1.4rem', color: '#1a202c', marginBottom: '20px' }}>
          {isKO ? '채널별 상세 분석 리포트' : 'Detailed Channel Report'}
        </h3>
        <div className={styles.cardGrid}>
          {COMPARISON_DATA.map((item) => (
            <div key={item.id} className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <h3>{item.name}</h3>
                <ShieldCheck size={20} color="#10b981" />
              </div>
              <ul className={styles.detailList}>
                <li>
                  <span><Clock size={14} /> {isKO ? '정산 속도' : 'Payout Speed'}</span>
                  <span>{isKO ? item.settlement.periodKO : item.settlement.period}</span>
                </li>
                <li>
                  <span><DollarSign size={14} /> {isKO ? '카테고리 수수료' : 'Category Fee'}</span>
                  <span>{item.fees.rate}</span>
                </li>
                <li>
                  <span><Truck size={14} /> {isKO ? '물류 방식' : 'Logistics'}</span>
                  <span>{isKO ? item.shipping.primaryKO : item.shipping.primary}</span>
                </li>
                <li>
                  <span><Info size={14} /> {isKO ? '주요 세그먼트' : 'Primary Segment'}</span>
                  <span style={{ color: '#2563eb' }}>{isKO ? item.fees.categoryKO : item.fees.category}</span>
                </li>
              </ul>
              <div style={{ marginTop: '20px', padding: '12px', background: '#f8fafc', borderRadius: '8px', fontSize: '0.85rem', color: '#4a5568' }}>
                <p><strong>{isKO ? '전략 제언:' : 'Strategy:'}</strong> {isKO ? item.shipping.strategyKO : item.shipping.strategy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
