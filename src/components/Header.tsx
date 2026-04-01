'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Header.module.css';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isDarkHero = pathname === '/lacan' || pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${!scrolled && isDarkHero ? styles.darkHero : ''}`}
    >
      <div className="container">
        <div className={styles.inner}>
          {/* Logo & Navigation */}
          <div className={styles.leftSection}>
            <Link href="/" className={styles.logo}>
              OCEANTECH
            </Link>

            <nav className={styles.nav} aria-label="주 메뉴">
              <Link href="/lacan" className={styles.link}>{t.nav.lacan}</Link>
              <Link href="/alminer" className={styles.link}>{t.nav.alminer}</Link>
            </nav>
          </div>

          {/* Right Controls */}
          <div className={styles.rightSection}>
            <nav className={styles.nav}>
              <Link href="/shop" className={styles.shopBtn}>{t.nav.shop}</Link>
            </nav>

            <div className={styles.langSwitch} role="group" aria-label="언어 선택">
               {(['ko', 'en', 'th'] as const).map((lang, i, arr) => (
                 <span key={lang} style={{ display: 'flex', alignItems: 'center' }}>
                   <button
                     className={`${styles.langBtn} ${language === lang ? styles.active : ''}`}
                     onClick={() => setLanguage(lang)}
                     aria-pressed={language === lang}
                   >
                     {lang.toUpperCase()}
                   </button>
                   {i < arr.length - 1 && <span className={styles.divider} aria-hidden="true" />}
                 </span>
               ))}
            </div>

            <div className={styles.authMenu}>
              {user ? (
                <div className={styles.userMenu}>
                  <span className={styles.userName}>{user.name}</span>
                  {user.role === 'admin' && (
                    <Link href="/admin" className={styles.adminLink}>ADMIN</Link>
                  )}
                  <button onClick={logout} className={styles.authLink}>LOGOUT</button>
                </div>
              ) : (
                <div className={styles.guestMenu} style={{ display: 'flex', gap: '20px' }}>
                  <Link href="/login" className={styles.authLink}>LOGIN</Link>
                  <Link href="/signup" className={styles.authLink}>JOIN</Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className={styles.mobileDrawer} onClick={() => setIsMenuOpen(false)}>
          <div className={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
            <nav className={styles.mobileNav}>
              <Link href="/lacan">LACAN</Link>
              <Link href="/alminer">ALMINER</Link>
              <Link href="/shop">SHOP</Link>
              <div style={{ height: '1px', background: '#eee', margin: '20px 0' }} />
              {user ? (
                <button onClick={logout} style={{ textAlign: 'left', background: 'none', border: 'none', font: 'inherit', fontWeight: 800 }}>LOGOUT</button>
              ) : (
                <>
                  <Link href="/login">LOGIN</Link>
                  <Link href="/signup">JOIN</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
