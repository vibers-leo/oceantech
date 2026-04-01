'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import PopupBanner from '@/components/PopupBanner';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <PopupBanner />
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image 
            src="/hero-beauty.png" 
            alt="Ocean Tech Beauty" 
            fill 
            priority
            quality={90}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.heroContent}>
          <h1 className="fade-in">Ultimate Waxing<br />Experience</h1>
          <p className="fade-in" style={{ animationDelay: '0.2s' }}>The Gold Standard for Professionals and You</p>
        </div>
        <div className={`${styles.scrollIndicator} fade-in`} style={{ animationDelay: '1.2s' }}>
           <span>DISCOVER MORE</span>
           <div className={styles.scrollLine}></div>
        </div>
        <div className={styles.heroOverlay}></div>
      </section>

      {/* Brands Section */}
      <section className={styles.brands}>
        {/* Lacan Card */}
        <div className={styles.brandCard}>
          <div className={styles.brandContent}>
            <span className={styles.brandLabel}>FOR PROFESSIONALS</span>
            <h3>{t.lacan.title}</h3>
            <p>{t.lacan.description}</p>
            <Link href="/lacan" className={styles.lacanBtn}>
              EXPLORE LACAN
            </Link>
          </div>
          <div className={`${styles.brandVisual} ${styles.lacanVisual}`}>
            <Image 
              src="/lacan/products/hard_wax.jpeg" 
              alt="Lacan Premium Wax" 
              fill
              quality={90}
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.visualOverlay}></div>
          </div>
        </div>

        {/* Alminer Card */}
        <div className={styles.brandCard}>
          <div className={styles.brandContent}>
            <span className={styles.brandLabel}>FOR HOME CARE</span>
            <h3>{t.alminer.title}</h3>
            <p>{t.alminer.description}</p>
            <Link href="/alminer" className={styles.alminerBtn}>
              EXPLORE R-MINU
            </Link>
          </div>
          <div className={`${styles.brandVisual} ${styles.alminerVisual}`}>
             <Image 
              src="/rminu/알마이너-썸네일-200g-2종.jpg" 
              alt="R-minu Home Waxing" 
              fill
              quality={90}
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.visualOverlayLight}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
