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
        <div className="container">
          <h1 className="fade-in">{t.about.title}</h1>
        </div>
      </div>

      <Section>
        <div className={styles.content}>
          <div className={`${styles.vision} fade-in`}>
            <span>{t.about.vision}</span>
            <h2>{t.about.visionText}</h2>
          </div>

          <p className={styles.description}>{t.about.description}</p>

          <div className={styles.globalSection}>
            <div className={styles.sectionHeader}>
              <h3>{t.global.title}</h3>
              <p>{t.global.description}</p>
            </div>
            <GlobalMap />
          </div>

          <div className={styles.historySection}>
            <h3>{t.about.history.title}</h3>
            <div className={styles.timeline}>
              {t.about.history.items.map((item, index) => (
                <div key={index} className={styles.timelineItem}>
                  <span className={styles.year}>{item.year}</span>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h3>CEO</h3>
              <p>{t.about.ceo}</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Location</h3>
              <p>{t.about.address}</p>
              <div className={styles.techMap}>
                 <div className={styles.mapGrid}></div>
                 <span className={styles.mapPin}></span>
                 <span className={styles.mapLabel}>HQ: BUSAN</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <h3>{t.about.contact}</h3>
              <p>{t.footer.tel}</p>
              <p>{t.footer.email}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
