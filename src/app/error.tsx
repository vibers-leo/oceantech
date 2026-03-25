"use client";

import { useEffect } from "react";
import styles from './404.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>
          문제가 발생했습니다
        </h2>
        <p className={styles.desc}>
          일시적인 오류일 수 있습니다.
          페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
        </p>
        <div className={styles.actions}>
          <button onClick={() => reset()} className={styles.primaryBtn}>
            다시 시도하기
          </button>
          <a href="/" className={styles.outlineBtn}>
            홈으로 가기
          </a>
        </div>
      </div>
    </div>
  );
}
