import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, TrendingUp, Globe, FileText, 
  LayoutDashboard, ListChecks, Store, User, Mail, 
  Sparkles, Package, ShieldCheck
} from 'lucide-react';
import styles from './TradeKoreaAnalysis.module.css';
import { getTradeKoreaChecklist, updateTradeKoreaChecklist, type ChecklistItem } from '@/lib/firestore';

export default function TradeKoreaAnalysis() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  
  // --- STATE: Setup Checklist ---
  const [setupSteps, setSetupSteps] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    async function loadChecklist() {
      setLoading(true);
      try {
        const data = await getTradeKoreaChecklist();
        setSetupSteps(data);
      } catch (error) {
        console.error('Failed to load checklist:', error);
      } finally {
        setLoading(false);
      }
    }
    loadChecklist();
  }, []);

  const toggleStep = async (id: number) => {
    const updated = setupSteps.map(step => step.id === id ? { ...step, completed: !step.completed } : step);
    setSetupSteps(updated);
    try {
      await updateTradeKoreaChecklist(updated);
    } catch (error) {
      console.error('Failed to update checklist:', error);
    }
  };

  const progress = Math.round((setupSteps.filter(s => s.completed).length / setupSteps.length) * 100);

  // --- STATE: Listing Builder ---
  const [waxOption, setWaxOption] = useState({
    type: 'Hard Wax Beans',
    scent: 'Lavender',
    target: 'Professional Salon',
    feature: 'Low Melting Point'
  });

  const generateTitle = () => {
    return `[OEM/ODM] Premium ${waxOption.feature} ${waxOption.type} - ${waxOption.scent} Scent for ${waxOption.target} (Made in Korea)`;
  };

  const generateTags = () => {
    return `#${waxOption.type.replace(/\s/g, '')} #HairRemoval #${waxOption.scent}Wax #KBeauty #PrivateLabel`;
  };

  return (
    <div className={styles.container}>
      
      {/* Top Header */}
      <div className={styles.header}>
        <div className={styles.brandArea}>
            <div className={styles.logoIcon}>
                <Store size={28} strokeWidth={2.5} />
            </div>
            <div className={styles.brandText}>
                <h2>트레이드코리아 허브 <span style={{fontSize: '0.8rem', fontWeight: 400, color: '#666'}}>(TradeKorea Hub)</span></h2>
                <div className={styles.subBrand}>
                    <span className={styles.oceanTag}>Ocean Tech</span>
                    <span>글로벌 B2B 수출 매니저</span>
                </div>
            </div>
        </div>
        
        <div className={styles.tabBar}>
            {[
                { id: 'dashboard', label: '대시보드 (Dashboard)', icon: LayoutDashboard },
                { id: 'listing_ai', label: '리스팅 AI (Listing AI)', icon: Sparkles },
                { id: 'strategy', label: 'B2B 전략 (Strategy)', icon: TrendingUp },
                { id: 'setup', label: '입점 설정 (Setup)', icon: ListChecks },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
                >
                    <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ minHeight: '600px' }}>
        {loading && <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>데이터 로드 중...</div>}
        {!loading && (
          <>
            {/* === TAB 1: DASHBOARD === */}
        {activeTab === 'dashboard' && (
            <div className={styles.gridMain}>
                
                {/* Intro Card */}
                <div className={styles.card}>
                    <div className={styles.profileHeader}>
                        <div className={styles.avatarContainer}>
                            <div className={styles.avatar}>
                                <User size={40} />
                            </div>
                            <div className={styles.verifiedBadge}>
                                <CheckCircle size={14} fill="white" color="#10B981" />
                            </div>
                        </div>
                        
                        <div className={styles.profileInfo} style={{ flex: 1 }}>
                            <h3>오션테크 (Ocean Tech)</h3>
                            <p style={{ color: '#6B7280', margin: 0 }}>목표 등급: <span style={{ color: '#00ACC1', fontWeight: 700 }}>골드 티어 셀러 (Gold Tier)</span></p>
                            
                            <div className={styles.profileTags}>
                                <span className={`${styles.tag} ${styles.tagGreen}`}>인증 셀러 (Verified)</span>
                                <span className={`${styles.tag} ${styles.tagPurple}`}>K-뷰티 (K-Beauty)</span>
                                <span className={`${styles.tag} ${styles.tagOrange}`}>제조사 (Manufacturer)</span>
                            </div>
                        </div>

                        <div className={styles.healthScore}>
                             <div className={styles.scoreVal}>85<span className={styles.scoreMax}>/100</span></div>
                             <div className={styles.scoreLabel}>스토어 건강도</div>
                        </div>
                    </div>

                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <div className={styles.statVal}>12</div>
                            <div className={styles.statLabel}>등록 상품 (Products)</div>
                        </div>
                        <div className={styles.statItem} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee' }}>
                            <div className={styles.statVal}>3</div>
                            <div className={styles.statLabel}>신규 문의 (Inquiries)</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statVal}>138</div>
                            <div className={styles.statLabel}>주간 조회수 (Views)</div>
                        </div>
                    </div>
                </div>

                {/* Inquiry Alert */}
                <div className={styles.inquiryCard}>
                    <div className={styles.inquiryGlow}></div>
                    
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <div className={styles.inquiryHeader}>
                            <div className={styles.iconBox}>
                                <Mail size={20} color="#22D3EE" />
                            </div>
                            <span style={{ fontSize: '1.125rem', fontWeight: 700 }}>최근 문의 내역 <span style={{fontSize:'0.8em', opacity:0.7}}>(Inquiries)</span></span>
                        </div>
                        
                        <div className={styles.alertList}>
                            <div className={styles.alertItem}>
                                <div className={styles.alertTop}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span className={styles.dot}></span>
                                        <span className={styles.buyerName}>베트남 바이어 (Vietnam)</span>
                                    </div>
                                    <span className={styles.time}>2시간 전</span>
                                </div>
                                <p className={styles.msgPreview}>하드 왁스 OEM 공급 업체를 찾고 있습니다...</p>
                            </div>
                             <div className={styles.alertItem}>
                                <div className={styles.alertTop}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', border: '1px solid #666', marginRight: 8 }}></span>
                                        <span className={styles.buyerName}>미국 유통사 (USA Dist.)</span>
                                    </div>
                                    <span className={styles.time}>1일 전</span>
                                </div>
                                <p className={styles.msgPreview}>1kg 벌크 포장 샘플 받아볼 수 있을까요?</p>
                            </div>
                        </div>
                    </div>
                    
                    <button className={styles.actionBtn}>
                        메시지함 전체보기 (View All)
                    </button>
                </div>
            </div>
        )}

        {/* === TAB 2: LISTING AI === */}
        {activeTab === 'listing_ai' && (
            <div className={styles.listingWrapper}>
                
                {/* Input Section (Left) */}
                <div className={styles.configPanel}>
                    <div className={styles.panelTitle}>
                        <div className={styles.iconPurple}>
                            <Sparkles size={22} />
                        </div>
                        상품 설정 (Configuration)
                    </div>
                    
                    <div className={styles.formField}>
                        <label className={styles.formLabel}>🎯 제품 타입 (Product Type)</label>
                        <div className={styles.selectWrapper}>
                            <select 
                                className={styles.select}
                                value={waxOption.type}
                                onChange={(e) => setWaxOption({...waxOption, type: e.target.value})}
                            >
                                <option>Hard Wax Beans</option>
                                <option>Soft Strip Wax</option>
                                <option>Film Wax (Hybrid)</option>
                                <option>Sugar Paste</option>
                            </select>
                            <span className={styles.arrow}>▼</span>
                        </div>
                    </div>
                    
                    <div className={styles.formField}>
                        <label className={styles.formLabel}>🌸 향 / 성분 (Scent)</label>
                        <div className={styles.selectWrapper}>
                            <select 
                                className={styles.select}
                                value={waxOption.scent}
                                onChange={(e) => setWaxOption({...waxOption, scent: e.target.value})}
                            >
                                <option>Lavender (라벤더)</option>
                                <option>Aloe Vera (알로에)</option>
                                <option>Honey (꿀)</option>
                                <option>Charcoal (차콜/숯)</option>
                                <option>Azulene (아줄렌)</option>
                                <option>Pink Rose (장미)</option>
                            </select>
                            <span className={styles.arrow}>▼</span>
                        </div>
                    </div>

                    <div className={styles.formField} style={{ marginBottom: 0 }}>
                        <label className={styles.formLabel}>⭐ 핵심 특징 (Key Feature)</label>
                        <div className={styles.selectWrapper}>
                            <select 
                                className={styles.select}
                                value={waxOption.feature}
                                onChange={(e) => setWaxOption({...waxOption, feature: e.target.value})}
                            >
                                <option>Low Melting Point (저온용해)</option>
                                <option>Hypoallergenic (저자극)</option>
                                <option>Strong Grip (강력한 제모력)</option>
                                <option>Rosin Free (송진 프리)</option>
                            </select>
                            <span className={styles.arrow}>▼</span>
                        </div>
                    </div>
                </div>

                {/* Arrow Connector */}
                <div className={styles.connector}>
                    <div className={styles.arrowCircle}>➜</div>
                </div>

                {/* Output Section (Right) */}
                <div className={styles.aiOutputPanel}>
                    <div style={{ flex: 1 }}>
                        <div className={styles.aiTitle}>
                            <h3>AI 생성 리스팅 <span style={{fontSize:'0.7em', opacity:0.7}}>(Generated Result)</span></h3>
                            <span className={styles.b2bBadge}>B2B 최적화</span>
                        </div>

                        <div className={styles.outputGroup}>
                            <span className={styles.outputLabel}>영문 상품명 (Product Title)</span>
                            <div className={styles.codeBlock}>
                                {generateTitle()}
                            </div>
                        </div>

                        <div className={styles.outputGroup}>
                            <span className={styles.outputLabel}>추천 검색 태그 (Search Tags)</span>
                            <div className={styles.tags}>
                                {generateTags().split(' ').map(tag => (
                                    <span key={tag} className={styles.aiTag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.tipBox}>
                         <div className={styles.tipHeader}>
                            <TrendingUp size={14} /> 세일즈 팁 (Sales Tip)
                         </div>
                         <p className={styles.tipText}>
                            <strong>{waxOption.type}</strong> 제품을 찾는 바이어는 '탄성(Elasticity)'을 중요하게 봅니다. 상세페이지에 왁스가 끊어지지 않고 늘어나는 GIF 영상을 반드시 추가하세요.
                         </p>
                    </div>
                </div>
            </div>
        )}

        {/* === TAB 3: STRATEGY === */}
        {activeTab === 'strategy' && (
            <div className={styles.gridCols3}>
                 {/* Card 1 */}
                 <div className={`${styles.strategyCard} ${styles.borderRed}`}>
                    <div className={styles.cardHeader}>
                        <div className={`${styles.iconCircle} ${styles.iconRed}`}>
                            <Globe size={24} strokeWidth={2.5} />
                        </div>
                        <span className={styles.cardLabel}>Positioning</span>
                    </div>
                    <h3 className={styles.cardTitle}>프리미엄 전략 <span style={{fontSize:'0.6em', color:'#999'}}>(Premium)</span></h3>
                    <p className={styles.cardDesc}>
                        저가 중국산 제품과 차별화하기 위해 <span className={styles.highlightRed}>"안전한 성분"</span>과 <span className={styles.highlightRed}>"저통증 기술"</span>을 강조하세요. 
                        고급 살롱을 타겟팅해야 합니다.
                    </p>
                 </div>

                 {/* Card 2 */}
                 <div className={`${styles.strategyCard} ${styles.borderBlue}`}>
                    <div className={styles.cardHeader}>
                        <div className={`${styles.iconCircle} ${styles.iconBlue}`}>
                            <Package size={24} strokeWidth={2.5} />
                        </div>
                        <span className={styles.cardLabel}>Service</span>
                    </div>
                    <h3 className={styles.cardTitle}>OEM / 프라이빗 라벨</h3>
                    <p className={styles.cardDesc}>
                        <span className={styles.highlightBlue}>"Private Label 가이드"</span> PDF를 미리 준비하세요.
                        MOQ(예: 50kg)와 스티커 라벨링 옵션을 명확히 제시하면 커뮤니케이션 비용을 줄일 수 있습니다.
                    </p>
                 </div>

                 {/* Card 3 */}
                 <div className={`${styles.strategyCard} ${styles.borderGreen}`}>
                    <div className={styles.cardHeader}>
                        <div className={`${styles.iconCircle} ${styles.iconGreen}`}>
                            <ShieldCheck size={24} strokeWidth={2.5} />
                        </div>
                        <span className={styles.cardLabel}>Compliance</span>
                    </div>
                    <h3 className={styles.cardTitle}>수출 필수 서류</h3>
                    <p className={styles.cardDesc}>
                        <strong>MSDS (영문)</strong>와 <strong>원산지 증명서(CoC)</strong>는 필수입니다.
                        유럽 수출을 목표로 한다면 CPNP 등록 여부가 바이어에게 큰 신뢰를 줍니다.
                    </p>
                 </div>
            </div>
        )}

        {/* === TAB 4: SETUP === */}
        {activeTab === 'setup' && (
            <div className={styles.checklistContainer}>
                <div className={styles.progressHeader}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: 4, marginTop: 0 }}>입점 체크리스트 <span style={{fontSize:'0.6em', color:'#999'}}>(Store Launch Checklist)</span></h3>
                        <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>셀러 스페이스 오픈을 위한 필수 단계를 확인하세요.</p>
                    </div>
                    <div className={styles.progressStats}>
                        <span className={styles.percent}>{progress}%</span>
                        <span className={styles.progressLabel}>진행률 (Progress)</span>
                    </div>
                </div>
                
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                </div>

                <div className={styles.stepList}>
                    {setupSteps.map((step, index) => (
                        <div 
                            key={step.id} 
                            onClick={() => toggleStep(step.id)}
                            className={`${styles.stepItem} ${step.completed ? styles.completed : ''}`}
                        >
                            <div className={styles.stepContent}>
                                <div className={styles.checkCircle}>
                                    <CheckCircle size={18} />
                                </div>
                                <div>
                                    <div className={styles.stepTitle}>{step.title}</div>
                                    {!step.completed && index === setupSteps.findIndex(s => !s.completed) && (
                                        <div className={styles.nextPriority}>다음 우선순위 (Next Step)</div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.actionTag}>
                                바로가기 (Action) ➜
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

          </>
        )}
      </div>
    </div>
  );
}
