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
            src="/rminu/products/home_wax_kit.png" 
            alt="Alminer R-minu" 
            fill 
            className={styles.heroImg}
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.badge}>PREMIUM SELF WAXING</span>
            <h1 className="fade-in">{t.alminer.title}</h1>
            <p className="fade-in" style={{ animationDelay: '0.2s' }}>{t.alminer.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <Section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.label}>THE HERITAGE</span>
          <h2>LA CAN Expertise for Home</h2>
          <p>{t.alminer.description}</p>
        </div>
      </Section>

      {/* Product Highlight Section */}
      <Section background="light">
        <div className={styles.productHighlight}>
          <div className={styles.productVisual}>
            <Image 
              src="/rminu/products/home_wax_kit.png" 
              alt="R-minu Hard Wax" 
              fill 
              className={styles.highlightImg} 
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
            <Button href="/shop/alminer" variant="alminer" size="lg">
              {t.alminer.product.name} 구매하기
            </Button>
          </div>
        </div>
      </Section>

      {/* Features Grid - 3 Core Technologies */}
      <Section>
        <h2 className={styles.sectionTitle}>3 Core Technologies</h2>
        <div className={styles.grid}>
          {t.alminer.features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconBox}>
                <div className={`${styles.iconShape} ${styles[`shape${index + 1}`]}`}></div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery Section */}
      <Section background="light">
        <h2 className={styles.sectionTitle}>Product Lineup</h2>
        <div className={styles.galleryGrid}>
          <div className={styles.galleryItem}>
            <div className={styles.imgWrapper}>
              <Image src="/rminu/products/home_wax_kit.png" alt="1000g Package" fill className={styles.gImg} />
            </div>
            <span>{t.alminer.gallery.pro1kg}</span>
          </div>
          <div className={styles.galleryItem}>
            <div className={styles.imgWrapper}>
              <Image src="/rminu/products/home_wax_kit.png" alt="200g Package" fill className={styles.gImg} />
            </div>
            <span>{t.alminer.gallery.home200g}</span>
          </div>
          <div className={styles.galleryItem}>
             <div className={styles.imgWrapper}>
               <Image src="/rminu/products/texture_macro.png" alt="Detail View" fill className={styles.gImg} />
             </div>
             <span>{t.alminer.gallery.texture}</span>
          </div>
        </div>
      </Section>

      {/* Roadmap / Vision Statement */}
      <Section background="dark" className={styles.visionSection}>
        <div className={styles.visionContent}>
          <span className={styles.visionLabel}>BRAND PHILOSOPHY</span>
          <h2>Safe & Professional</h2>
          <p>알마이너는 왁싱 전문가의 노하우와 실제 샵에서 사용되는 프리미엄 원료를 그대로 담았습니다.</p>
          <p style={{ marginTop: '20px', fontSize: '1.2rem', opacity: 0.9 }}>집에서도 안전하고 완벽한 제모를 경험하세요.</p>
        </div>
      </Section>
    </div>
  );
}
