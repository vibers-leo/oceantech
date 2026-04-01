'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './about.module.css';
import Section from '@/components/ui/Section';
import GlobalMap from '@/components/GlobalMap';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerBg}></div>
        <div className="container">
          <h1 className="reveal-anim">{t.about.title}</h1>
        </div>
      </div>
      
      <Section>
        <div className={styles.content}>
          <div className={`${styles.vision} reveal-anim`} style={{ animationDelay: '0.2s' }}>
            <span>{t.about.vision}</span>
            <h2 className="gradient-text">{t.about.visionText}</h2>
          </div>
          
          <p className={styles.description}>{t.about.description}</p>

          <div className={styles.globalSection}>
            <div className={styles.sectionHeader}>
              <h3>GLOBAL NETWORK</h3>
              <p>{t.global.description}</p>
            </div>
            <GlobalMap />
          </div>

          <div className={styles.historySection}>
            <h3>HISTORY & MILESTONES</h3>
            <div className={styles.timeline}>
               <div className={styles.timelineItem}>
                 <span className={styles.year}>2024</span>
                 <p>알마이너 (Alminer) 브랜드 런칭</p>
               </div>
               <div className={styles.timelineItem}>
                 <span className={styles.year}>2023</span>
                 <p>기업부설연구소 인증 획득</p>
               </div>
               <div className={styles.timelineItem}>
                 <span className={styles.year}>2020</span>
                 <p>라캉 (Lacan) 살롱 멤버십 500호점 돌파</p>
               </div>
            </div>
          </div>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h3>CHIEF EXECUTIVE</h3>
              <p>{t.about.ceo}</p>
            </div>
            <div className={styles.infoItem}>
              <h3>HEADQUARTERS</h3>
              <p>{t.about.address}</p>
              <div className={styles.techMap}>
                 <div className={styles.mapGrid}></div>
                 <span className={styles.mapPin}></span>
                 <span className={styles.mapLabel}>HQ: BUSAN</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <h3>DIRECT CONTACT</h3>
              <p>+82 10-7169-3438</p>
              <p>jbanion@naver.com</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
