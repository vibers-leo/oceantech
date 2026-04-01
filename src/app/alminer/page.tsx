'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './alminer.module.css';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function AlminerPage() {
  const { t, language } = useLanguage();

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image 
            src="/th/rminu-th_01.jpg" 
            alt="Alminer R-minu" 
            fill 
            className={styles.heroImg}
            style={{ objectFit: 'cover' }}
            priority
            quality={100}
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={`${styles.badge} reveal-anim`}>PREMIUM SELF WAXING</span>
            <h1 className="reveal-anim" style={{ animationDelay: '0.2s' }}>{t.alminer.title}</h1>
            <p className="reveal-anim" style={{ animationDelay: '0.4s' }}>{t.alminer.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Intro Section - The Heritage */}
      <Section className={styles.intro} style={{ background: 'white' }}>
        <div className={styles.introText} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span className={styles.label}>THE HERITAGE</span>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>LA CAN Expertise for Home</h2>
          <p style={{ fontSize: '1.25rem', color: '#64748b' }}>{t.alminer.description}</p>
        </div>
      </Section>

      {/* Product Highlight Section - High Impact Grid */}
      <Section style={{ background: 'rgba(255, 92, 0, 0.02)' }}>
        <div className={styles.productHighlight}>
          <div className={styles.productVisual}>
            <Image 
              src="/rminu/알마이너-썸네일-200g-2종.jpg" 
              alt="R-minu Hard Wax" 
              fill 
              className={styles.highlightImg} 
              quality={100}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.productDetail}>
            <h3>{t.alminer.product.name}</h3>
            <p className={styles.productDesc}>{t.alminer.product.desc}</p>
            <ul className={styles.specs}>
              {t.alminer.product.specs.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
               <Button href="/shop/alminer" variant="alminer" size="lg">
                 지금 바로 구매하기
               </Button>
               <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--alminer-primary)' }}>₩{t.alminer.product.price}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Grid - 3 Core Technologies */}
      <Section>
        <span className={styles.label}>INNOVATION</span>
        <h2 className={styles.sectionTitle}>3 Core Technologies</h2>
        <div className={styles.grid}>
          {t.alminer.features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconBox}>
                <div className={`${styles.iconShape} ${styles[`shape${index + 1}`]}`}></div>
                <span style={{ position: 'relative', zIndex: 1, fontWeight: 900, fontSize: '1.5rem', color: 'var(--primary-dark)' }}>{index + 1}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800 }}>{feature.title}</h3>
              <p style={{ color: '#475569' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery Section - Product Lineup */}
      <Section style={{ background: '#fcfcfc' }}>
        <span className={styles.label}>LINEUP</span>
        <h2 className={styles.sectionTitle}>Essential Collection</h2>
        <div className={styles.galleryGrid}>
          <div className={styles.galleryItem}>
            <div className={styles.imgWrapper}>
              <Image 
                src="/rminu/알마이너-썸네일-1000g-2종.jpg" 
                alt="1000g Package" 
                fill 
                className={styles.gImg}
                quality={100}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <span>{t.alminer.gallery.pro1kg}</span>
          </div>
          <div className={styles.galleryItem}>
            <div className={styles.imgWrapper}>
              <Image 
                src="/rminu/알마이너-썸네일-200g-1종.jpg" 
                alt="200g Package" 
                fill 
                className={styles.gImg}
                quality={100}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <span>{t.alminer.gallery.home200g}</span>
          </div>
          <div className={styles.galleryItem}>
             <div className={styles.imgWrapper}>
               <Image 
                 src="/th/rminu-th_02.jpg" 
                 alt="Detail View" 
                 fill 
                 className={styles.gImg}
                 quality={100}
                 style={{ objectFit: 'cover' }}
               />
             </div>
             <span>{t.alminer.gallery.texture}</span>
          </div>
        </div>
      </Section>

      {/* Vision Statement - Fixed Background Impression */}
      <section style={{ height: '500px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
         <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'var(--alminer-gradient)', opacity: 0.9 }}></div>
         <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}>
            <span style={{ letterSpacing: '0.5em', fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '20px' }}>
              BRAND PHILOSOPHY
            </span>
            <h2 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 900, marginBottom: '25px', letterSpacing: '-0.03em' }}>Safe & Professional</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
              알마이너는 왁싱 전문가의 노하우를 그대로 담아, <br />
              집에서도 살롱 수준의 완벽한 케어를 가능하게 합니다.
            </p>
         </div>
      </section>
    </div>
  );
}
