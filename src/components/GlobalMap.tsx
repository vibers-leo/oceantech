'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './GlobalMap.module.css';
import Image from 'next/image';

export default function GlobalMap() {
  const { t } = useLanguage();

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapBackground}>
        <Image 
          src="/about/global_network.png" 
          alt="Global Network" 
          fill 
          style={{ objectFit: 'cover', opacity: 0.8 }}
        />

        {/* Dynamic Pins */}
        <div className={styles.pin} style={{ top: '30%', left: '20%' }}>
          <span className={styles.pinDot}></span>
          <span className={styles.pinPulse}></span>
          <div className={styles.pinLabel}>
            <strong>Amazon US</strong>
            <span>North America</span>
          </div>
        </div>

        <div className={styles.pin} style={{ top: '45%', left: '75%' }}>
          <span className={styles.pinDot}></span>
          <span className={styles.pinPulse}></span>
          <div className={styles.pinLabel}>
            <strong>Qoo10 JP</strong>
            <span>Japan</span>
          </div>
        </div>

        <div className={styles.pin} style={{ top: '55%', left: '70%' }}>
          <span className={styles.pinDot}></span>
          <span className={styles.pinPulse}></span>
          <div className={styles.pinLabel}>
            <strong>Shopee</strong>
            <span>Southeast Asia</span>
          </div>
        </div>
      </div>
      
      <div className={styles.partnerList}>
        {t.global.partners.map((partner, index) => (
          <div key={index} className={styles.partnerItem}>
            <h3>{partner.name}</h3>
            <p>{partner.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
