'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Header.module.css';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect y="4" width="22" height="2" rx="1" fill="currentColor" />
      <rect y="10" width="22" height="2" rx="1" fill="currentColor" />
      <rect y="16" width="22" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <line x1="2" y1="2" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="2" x2="2" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${!scrolled && isDarkHero ? styles.darkHero : ''}`}
    >
      <div className="container">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            OCEANTECH
          </Link>

          <nav className={styles.nav} aria-label="주 메뉴">
            <Link href="/lacan" className={styles.link}>{t.nav.lacan}</Link>
            <Link href="/alminer" className={styles.link}>{t.nav.alminer}</Link>
            <Link href="/shop" className={styles.shopBtn}>{t.nav.shop}</Link>
          </nav>

          <div className={styles.authMenu}>
            {user ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>{user.name}님</span>
                {user.role === 'admin' && (
                  <Link href="/admin" className={styles.adminLink}>ADMIN</Link>
                )}
                <button onClick={logout} className={styles.authLink}>Logout</button>
              </div>
            ) : (
              <div className={styles.guestMenu}>
                <Link href="/login" className={styles.authLink}>Login</Link>
                <Link href="/signup" className={styles.authLink}>Join</Link>
              </div>
            )}
          </div>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-drawer"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Mobile Menu Drawer */}
          {isMenuOpen && (
            <div
              id="mobile-drawer"
              className={styles.mobileDrawer}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
                <nav className={styles.mobileNav} aria-label="모바일 메뉴">
                  {/* Language Switcher */}
                  <div className={styles.mobileLangSwitch} role="group" aria-label="언어 선택">
                    {(['ko', 'en', 'th'] as const).map((lang, i, arr) => (
                      <span key={lang} className={styles.langGroup}>
                        <button
                          className={language === lang ? styles.activeLang : ''}
                          onClick={() => { setLanguage(lang); setIsMenuOpen(false); }}
                          aria-pressed={language === lang}
                        >
                          {lang.toUpperCase()}
                        </button>
                        {i < arr.length - 1 && <span className={styles.mobileDivider} aria-hidden="true">|</span>}
                      </span>
                    ))}
                  </div>

                  <Link href="/lacan" onClick={() => setIsMenuOpen(false)}>{t.nav.lacan}</Link>
                  <Link href="/alminer" onClick={() => setIsMenuOpen(false)}>{t.nav.alminer}</Link>
                  <Link href="/shop" onClick={() => setIsMenuOpen(false)}>{t.nav.shop}</Link>

                  <div className={styles.drawerDivider} role="separator" />

                  {user ? (
                    <>
                      {user.role === 'admin' && (
                        <Link href="/admin" onClick={() => setIsMenuOpen(false)} className={styles.mobileAdminLink}>
                          Admin Panel
                        </Link>
                      )}
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

          {/* Desktop Language Switcher */}
          <div className={styles.langSwitch} role="group" aria-label="언어 선택">
            {(['ko', 'en', 'th'] as const).map((lang, i, arr) => (
              <span key={lang} className={styles.langGroup}>
                <button
                  className={`${styles.langBtn} ${language === lang ? styles.active : ''}`}
                  onClick={() => setLanguage(lang)}
                  aria-pressed={language === lang}
                >
                  {lang.toUpperCase()}
                </button>
                {i < arr.length - 1 && <span className={styles.divider} aria-hidden="true">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
