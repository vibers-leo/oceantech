'use client';

import React from 'react';
import styles from './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'light' | 'dark' | 'none';
  fullWidth?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

export default function Section({
  children,
  className = '',
  background = 'white',
  fullWidth = false,
  id,
  style,
}: SectionProps) {
  return (
    <section 
      id={id}
      className={`${styles.section} ${styles[background]} ${className}`}
      style={style}
    >
      <div className={fullWidth ? '' : 'container'}>
        {children}
      </div>
    </section>
  );
}
