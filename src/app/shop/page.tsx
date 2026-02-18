'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './shop.module.css';

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
              <a href="http://lacanwax.com/" target="_blank" rel="noopener noreferrer" className={styles.button}>
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
            <a href="https://amazon.com" target="_blank" rel="noreferrer" className={styles.globalLink}>
              <span className={styles.marketIcon}>A</span>
              <span className={styles.marketName}>{t.shopPage.global.amazon}</span>
              <span className={styles.arrow}>→</span>
            </a>
            <a href="https://shopee.com" target="_blank" rel="noreferrer" className={styles.globalLink}>
              <span className={styles.marketIcon}>S</span>
              <span className={styles.marketName}>{t.shopPage.global.shopee}</span>
              <span className={styles.arrow}>→</span>
            </a>

          </div>
        </section>
      )}
    </div>
  );
}
