'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import styles from './forgot-password.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email.length < 1) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      let msg = '비밀번호 재설정 이메일 전송에 실패했습니다.';
      if (code === 'auth/user-not-found') msg = '등록되지 않은 이메일입니다.';
      if (code === 'auth/invalid-email') msg = '올바른 이메일 형식을 입력해주세요.';
      setError(msg);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        {success ? (
          <>
            <h1 className={styles.title}>이메일 전송 완료</h1>
            <p className={styles.subtitle}>
              비밀번호 재설정 링크가 전송되었습니다.
              <br />
              이메일을 확인해주세요.
            </p>
            <Link href="/login" className={styles.backLink}>
              로그인으로 돌아가기
            </Link>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>비밀번호 찾기</h1>
            <p className={styles.subtitle}>
              가입 시 사용한 이메일을 입력하시면
              <br />
              비밀번호 재설정 링크를 보내드립니다.
            </p>

            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? '전송 중...' : '재설정 링크 보내기'}
            </button>

            <Link href="/login" className={styles.backLink}>
              로그인으로 돌아가기
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
