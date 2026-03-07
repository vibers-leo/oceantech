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
            src="/rminu/알마이너-추가-썸네일.jpg"
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
            <div className={`${styles.statusBadge} fade-in`} style={{ animationDelay: '0.4s' }}>
              <span className={styles.pulse}></span>
              {t.alminer.comingSoon}
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <Section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.label}>{t.alminer.heritageLabel}</span>
          <h2>{t.alminer.heritageTitle}</h2>
          <p>{t.alminer.description}</p>
        </div>
      </Section>

      {/* Product Highlight Section */}
      <Section background="light">
        <div className={styles.productHighlight}>
          <div className={styles.productVisual}>
            <Image
              src="/rminu/알마이너-썸네일-1000g-2종.jpg"
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
              {t.alminer.buyProduct}
            </Button>
          </div>
        </div>
      </Section>

      {/* Features Grid - 3 Core Technologies */}
      <Section>
        <h2 className={styles.sectionTitle}>{t.alminer.coreTitle}</h2>
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
        <h2 className={styles.sectionTitle}>{t.alminer.lineupTitle}</h2>
        <div className={styles.galleryGrid}>
          <div className={styles.galleryItem}>
            <div className={styles.imgWrapper}>
              <Image src="/rminu/알마이너-썸네일-1000g-2종.jpg" alt="1000g Package" fill className={styles.gImg} />
            </div>
            <span>{t.alminer.gallery.pro1kg}</span>
          </div>
          <div className={styles.galleryItem}>
            <div className={styles.imgWrapper}>
              <Image src="/rminu/알마이너-썸네일-200g-1종.jpg" alt="200g Package" fill className={styles.gImg} />
            </div>
            <span>{t.alminer.gallery.home200g}</span>
          </div>
          <div className={styles.galleryItem}>
             <div className={styles.imgWrapper}>
               <Image src="/rminu/알마이너-추가-썸네일.jpg" alt="Detail View" fill className={styles.gImg} />
             </div>
             <span>{t.alminer.gallery.texture}</span>
          </div>
        </div>
      </Section>

      {/* Roadmap / Vision Statement */}
      <Section background="dark" className={styles.visionSection}>
        <div className={styles.visionContent}>
          <span className={styles.visionLabel}>BRAND PHILOSOPHY</span>
          <h2>{t.alminer.visionTitle}</h2>
          <p>{t.alminer.visionText1}</p>
          <p style={{ marginTop: '20px', fontSize: '1.2rem', opacity: 0.9 }}>{t.alminer.visionText2}</p>
        </div>
      </Section>
    </div>
  );
}
