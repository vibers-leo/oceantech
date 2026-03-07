'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './shop.module.css';

// Global marketplace configuration - update URLs as stores go live
const GLOBAL_STORES = {
  amazon: {
    url: '', // Add Amazon store URL when ready
    status: 'coming_soon' as const, // 'active' | 'coming_soon'
  },
  shopee: {
    url: '', // Add Shopee store URL when ready (user will provide later)
    status: 'coming_soon' as const,
  },
};

export default function ShopPage() {
  const { language, t } = useLanguage();

  return (
    <div className={styles.container}>
      {/* Header */}
      <section className={styles.header}>
        <h1 className="fade-in">{t.shopPage.title}</h1>
        <p className="fade-in" style={{ animationDelay: '0.2s' }}>{t.shopPage.subtitle}</p>
      </section>

      {/* KR: Brand Selection */}
      {language === 'ko' && (
        <section className={styles.selectionGrid}>
          {/* LACAN Card */}
          <div className={`${styles.card} fade-in`} style={{ animationDelay: '0.4s' }}>
            <div className={styles.cardImage}>
              <Image
                src="/lacan-bg.png"
                alt="Lacan Wax"
                fill
                style={{ objectFit: 'cover' }}
                className={styles.bgImage}
              />
              <div className={styles.overlay}></div>
              <span className={styles.badge}>PROFESSIONAL ONLY</span>
            </div>
            <div className={styles.cardContent}>
              <h2>{t.shopPage.lacan.title}</h2>
              <p>{t.shopPage.lacan.desc}</p>
              <div className={styles.note}>{t.shopPage.lacan.note}</div>
              <a href="https://lacanwax.com/" target="_blank" rel="noopener noreferrer" className={styles.button}>
                {t.shopPage.lacan.btn} →
              </a>
            </div>
          </div>

          {/* ALMINER Card */}
          <div className={`${styles.card} fade-in`} style={{ animationDelay: '0.6s' }}>
            <div className={styles.cardImage}>
              <Image
                src="/rminu/알마이너-추가-썸네일.jpg"
                alt="Alminer"
                fill
                style={{ objectFit: 'cover' }}
                className={styles.bgImage}
              />
              <div className={styles.overlayLight}></div>
              <span className={styles.badgeAlminer}>HOME CARE</span>
            </div>
            <div className={styles.cardContent}>
              <h2>{t.shopPage.alminer.title}</h2>
              <p>{t.shopPage.alminer.desc}</p>
              <div className={styles.note}>{t.shopPage.alminer.note}</div>
              <Link href="/shop/alminer" className={`${styles.button} ${styles.btnAlminer}`}>
                {t.shopPage.alminer.btn} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* EN / TH: Global Marketplaces */}
      {(language === 'en' || language === 'th') && (
        <section className={styles.globalSection}>
          <div className={styles.globalHeader}>
            <h2>{t.shopPage.global.title}</h2>
            <p>{t.shopPage.global.desc}</p>
          </div>

          <div className={styles.globalList}>
            {/* Amazon */}
            {GLOBAL_STORES.amazon.status === 'active' && GLOBAL_STORES.amazon.url ? (
              <a href={GLOBAL_STORES.amazon.url} target="_blank" rel="noreferrer" className={styles.globalLink}>
                <span className={styles.marketIcon}>A</span>
                <span className={styles.marketName}>{t.shopPage.global.amazon}</span>
                <span className={styles.arrow}>→</span>
              </a>
            ) : (
              <div className={`${styles.globalLink} ${styles.comingSoon}`}>
                <span className={styles.marketIcon}>A</span>
                <span className={styles.marketName}>{t.shopPage.global.amazon}</span>
                <span className={styles.comingSoonBadge}>Coming Soon</span>
              </div>
            )}

            {/* Shopee */}
            {GLOBAL_STORES.shopee.status === 'active' && GLOBAL_STORES.shopee.url ? (
              <a href={GLOBAL_STORES.shopee.url} target="_blank" rel="noreferrer" className={styles.globalLink}>
                <span className={styles.marketIcon}>S</span>
                <span className={styles.marketName}>{t.shopPage.global.shopee}</span>
                <span className={styles.arrow}>→</span>
              </a>
            ) : (
              <div className={`${styles.globalLink} ${styles.comingSoon}`}>
                <span className={styles.marketIcon}>S</span>
                <span className={styles.marketName}>{t.shopPage.global.shopee}</span>
                <span className={styles.comingSoonBadge}>Coming Soon</span>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
