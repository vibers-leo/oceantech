'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Header.module.css';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Define routes that have dark hero sections (requiring white header text)
  const isDarkHero = pathname === '/lacan' || pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${!scrolled && isDarkHero ? styles.darkHero : ''}`}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            OCEANTECH
          </Link>

          <nav className={styles.nav}>
            <Link href="/lacan" className={styles.link}>{t.nav.lacan}</Link>
            <Link href="/alminer" className={styles.link}>{t.nav.alminer}</Link>
            <Link href="/shop" className={styles.shopBtn}>
              {t.nav.shop}
            </Link>
          </nav>

          <div className={styles.authMenu}>
            {user ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>{user.name}님</span>
                {user.role === 'admin' && (
                  <Link href="/admin" className={styles.adminLink}>ADMIN</Link>
                )}
                {/* <button className={styles.authLink}>My Page</button> */}
                <button onClick={logout} className={styles.authLink}>Logout</button>
              </div>
            ) : (
              <div className={styles.guestMenu}>
                <Link href="/login" className={styles.authLink}>Login</Link>
                <Link href="/signup" className={styles.authLink}>Join</Link>
              </div>
            )}
          </div>

          <div className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>{isMenuOpen ? '✕' : '☰'}</span>
          </div>

          {/* Mobile Menu Drawer */}
          {isMenuOpen && (
            <div className={styles.mobileDrawer} onClick={() => setIsMenuOpen(false)}>
              <div className={styles.drawerContent} onClick={e => e.stopPropagation()}>
                <nav className={styles.mobileNav}>
                  <Link href="/lacan" onClick={() => setIsMenuOpen(false)}>{t.nav.lacan}</Link>
                  <Link href="/alminer" onClick={() => setIsMenuOpen(false)}>{t.nav.alminer}</Link>
                  <Link href="/shop" onClick={() => setIsMenuOpen(false)}>{t.nav.shop}</Link>
                  <div className={styles.drawerDivider}></div>
                  {user ? (
                    <>
                      <Link href="/admin" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
                      <button onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                      <Link href="/signup" onClick={() => setIsMenuOpen(false)}>Join</Link>
                    </>
                  )}
                </nav>
              </div>
            </div>
          )}

          <div className={styles.langSwitch}>
            <button 
              className={`${styles.langBtn} ${language === 'ko' ? styles.active : ''}`}
              onClick={() => setLanguage('ko')}
            >
              KR
            </button>
            <span className={styles.divider}>|</span>
            <button 
              className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <span className={styles.divider}>|</span>
            <button 
              className={`${styles.langBtn} ${language === 'th' ? styles.active : ''}`}
              onClick={() => setLanguage('th')}
            >
              TH
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
