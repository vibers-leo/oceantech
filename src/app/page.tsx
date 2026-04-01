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
            quality={100}
            className={styles.heroImg}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <span className="reveal-anim" style={{ letterSpacing: '0.4em', display: 'block', marginBottom: '20px', color: 'var(--accent)' }}>
            EMBODYING THE PRESTIGE
          </span>
          <h1 className="reveal-anim" style={{ animationDelay: '0.2s' }}>
            The New Standard<br />of <span className="gradient-text">Premium Waxing</span>
          </h1>
          <p className="reveal-anim" style={{ animationDelay: '0.4s' }}>
            FOR PROFESSIONALS & HOME EXPERTISE
          </p>
        </div>

        <div className={`${styles.scrollIndicator} reveal-anim`} style={{ animationDelay: '1.2s' }}>
           <span>SCROLL</span>
           <div className={styles.scrollLine}></div>
        </div>
      </section>

      {/* Brands Section */}
      <section className={styles.brands}>
        {/* Lacan Card */}
        <div className={styles.brandCard}>
          <div className={styles.brandVisual}>
            <Image 
              src="/lacan/products/hard_wax.jpeg" 
              alt="Lacan Premium Wax" 
              fill
              quality={100}
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.visualOverlay}></div>
          </div>
          <div className={styles.brandContent}>
            <span className={styles.brandLabel}>PROFESSIONAL EXPERTISE</span>
            <h3>{t.lacan.title}</h3>
            <p>{t.lacan.description}</p>
            <div>
              <Link href="/lacan" className={styles.lacanBtn}>
                EXPLORE LACAN 
                <span style={{ marginLeft: '12px', fontSize: '1.2rem' }}>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Alminer Card */}
        <div className={styles.brandCard}>
          <div className={styles.brandContent} style={{ alignItems: 'flex-end', textAlign: 'right' }}>
            <span className={styles.brandLabel}>HOME RITUALS</span>
            <h3>{t.alminer.title}</h3>
            <p style={{ marginLeft: 'auto' }}>{t.alminer.description}</p>
            <div>
              <Link href="/alminer" className={styles.alminerBtn}>
                EXPLORE R-MINU
                <span style={{ marginLeft: '12px', fontSize: '1.2rem' }}>→</span>
              </Link>
            </div>
          </div>
          <div className={styles.brandVisual}>
             <Image 
              src="/rminu/알마이너-썸네일-200g-2종.jpg" 
              alt="R-minu Home Waxing" 
              fill
              quality={100}
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.visualOverlayLight}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
