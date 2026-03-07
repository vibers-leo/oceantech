'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Footer.module.css';
import Link from 'next/link';

// SNS links configuration - update with actual URLs when available
const SNS_LINKS = {
  instagram: '', // e.g. 'https://instagram.com/oceantech_official'
  kakao: '',     // e.g. 'https://pf.kakao.com/_xxxxx'
  blog: '',      // e.g. 'https://blog.naver.com/oceantech'
};

export default function Footer() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.brand}>
              <h3 className={styles.companyName}>{t.footer.companyName}</h3>
              <p className={styles.address}>{t.about.address}</p>
            </div>
            <div className={styles.contact}>
              <p>{t.about.ceo}</p>
              <p>{t.footer.tel}</p>
              <p>{t.footer.email}</p>
            </div>
            <div className={styles.links}>
              <h4 className={styles.linkTitle}>Quick Links</h4>
              <Link href="/about">{t.nav.about}</Link>
              <Link href="/lacan">{t.nav.lacan}</Link>
              <Link href="/alminer">{t.nav.alminer}</Link>
              <Link href="/business">Business</Link>
              {user?.role === 'admin' && (
                <Link href="/admin" className={styles.adminLink}>Admin Panel</Link>
              )}
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.socials}>
              {SNS_LINKS.instagram ? (
                <a href={SNS_LINKS.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                  Instagram
                </a>
              ) : (
                <span className={`${styles.socialLink} ${styles.socialDisabled}`} aria-label="Instagram">
                  Instagram
                </span>
              )}
              {SNS_LINKS.kakao ? (
                <a href={SNS_LINKS.kakao} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Kakao">
                  Kakao
                </a>
              ) : (
                <span className={`${styles.socialLink} ${styles.socialDisabled}`} aria-label="Kakao">
                  Kakao
                </span>
              )}
              {SNS_LINKS.blog ? (
                <a href={SNS_LINKS.blog} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Blog">
                  Blog
                </a>
              ) : (
                <span className={`${styles.socialLink} ${styles.socialDisabled}`} aria-label="Blog">
                  Blog
                </span>
              )}
            </div>
            <p className={styles.copyright}>{t.footer.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
