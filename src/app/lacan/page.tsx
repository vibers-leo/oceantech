'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './lacan.module.css';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function LacanPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image 
            src="/lacan/lacan_hero_1.jpg" 
            alt="Lacan Professional Wax" 
            fill 
            className={styles.heroImg}
            priority
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.badge}>AUTHORIZED PERSONNEL ONLY</span>
            <h1 className="fade-in">{t.lacan.title}</h1>
            <p className="fade-in" style={{ animationDelay: '0.2s' }}>{t.lacan.subtitle}</p>
            <div className="fade-in" style={{ animationDelay: '0.4s', marginTop: '30px' }}>
              <Button href="/lacan/pro/login" variant="lacan" size="lg">
                {t.lacan.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <Section className={styles.intro}>
        <div className={styles.introText}>
          <h2>The Gold Standard</h2>
          <p>{t.lacan.description}</p>
        </div>
      </Section>

      {/* Features Grid */}
      <Section background="light">
        <h2 className={styles.sectionTitle}>Why Professionals Choose Lacan</h2>
        <div className={styles.grid}>
          {t.lacan.features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>0{index + 1}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Product Lineup */}
      <Section>
        <h2 className={styles.sectionTitle}>Product Lineup</h2>
        <div className={styles.productList}>
          {t.lacan.products.map((product: any, index: number) => (
            <div key={index} className={styles.productCard}>
              <div className={styles.productImage}>
                 <Image 
                   src={product.img || (index % 2 === 0 ? "/lacan/lacan_thumb_1.jpg" : "/lacan/lacan_thumb_2.jpg")} 
                   alt={product.name} 
                   fill 
                   className={styles.pImg} 
                 />
              </div>
              <div className={styles.productInfo}>
                <span className={styles.tag}>{product.tag}</span>
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <div className={styles.btnWrapper}>
                  <Button href="http://lacanwax.com/" variant="outline" size="sm" external>
                    VIEW DETAIL
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
