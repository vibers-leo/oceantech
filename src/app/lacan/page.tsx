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
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image 
            src="/lacan/lacan_hero_1.jpg" 
            alt="Lacan Professional Wax" 
            fill 
            className={styles.heroImg}
            priority
            quality={100}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={`${styles.badge} reveal-anim`}>AUTHORIZED PERSONNEL ONLY</span>
            <h1 className="reveal-anim" style={{ animationDelay: '0.2s' }}>{t.lacan.title}</h1>
            <p className="reveal-anim" style={{ animationDelay: '0.4s' }}>{t.lacan.subtitle}</p>
            <div className="reveal-anim" style={{ animationDelay: '0.6s', marginTop: '40px' }}>
              <Button href="/lacan/pro/login" variant="lacan" size="lg">
                {t.lacan.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <Section className={styles.intro} style={{ background: 'white' }}>
        <div className={styles.introText} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span className={styles.label} style={{ letterSpacing: '0.3em', color: 'var(--lacan-primary)', fontWeight: 800, fontSize: '0.8rem', display: 'block', marginBottom: '20px' }}>
             THE GOLD STANDARD
          </span>
          <h2 style={{ fontSize: '3rem', marginBottom: '30px' }}>Excellence for Professionals</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>{t.lacan.description}</p>
        </div>
      </Section>

      {/* Features Grid */}
      <Section style={{ background: 'var(--lacan-bg)' }}>
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

      {/* Product Lineup (Premium Cards) */}
      <Section style={{ background: 'white' }}>
        <h2 className={styles.sectionTitle}>Professional Signature Line</h2>
        <div className={styles.productList}>
          {t.lacan.products.map((product: any, index: number) => (
            <div key={index} className={styles.productCard}>
              <div className={styles.productImage}>
                 <Image 
                   src={product.img || "/lacan/products/hard_wax.jpeg"} 
                   alt={product.name} 
                   fill 
                   className={styles.pImg} 
                   quality={100}
                   style={{ objectFit: 'cover' }}
                 />
              </div>
              <div className={styles.productInfo}>
                <span className={styles.tag}>{product.tag}</span>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}>{product.name}</h3>
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

      {/* Branding / Vision Focus */}
      <section style={{ height: '600px', position: 'relative', overflow: 'hidden' }}>
         <Image 
           src="/lacan/products/hard_wax.jpeg" 
           alt="Lacan Aesthetic" 
           fill 
           style={{ objectFit: 'cover', transform: 'scale(1.1)', filter: 'brightness(0.5)' }} 
         />
         <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white' }}>
            <div style={{ maxWidth: '800px' }}>
               <h2 style={{ color: 'white', fontSize: '3.5rem', fontStyle: 'italic', marginBottom: '20px' }}>Elevating Salon Value</h2>
               <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem' }}>Through rigorous testing and premium ingredients, we set the absolute standard for waxing professionals across the globe.</p>
            </div>
         </div>
      </section>
    </div>
  );
}
