'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (id.length < 1) { // Changed form 4 to 1 to allow short admin id if needed, though admin is 5 chars
      setError('아이디를 입력해주세요.');
      return;
    }
    if (pw.length < 1) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);

    // Auto-map 'admin' to the correct email for Firebase
    const emailToUse = id === 'admin' ? 'admin@rminu.com' : id;

    const result = await login(emailToUse, pw);
    
    if (result.success) {
      // Allow some time for AuthContext to update the user state
      // But for better UX, we can optimistically redirect if it was the admin account
      if (id === 'admin' || emailToUse.includes('admin')) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      setError(result.error || '아이디 또는 비밀번호가 올바르지 않습니다.');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>로그인하여 계속하세요</p>
        
        <div className={styles.inputGroup}>
          <input 
            type="text" 
            placeholder="ID" 
            className={styles.input}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <input 
            type="password" 
            placeholder="Password" 
            className={styles.input}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}
        
        <button type="submit" className={styles.loginBtn} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className={styles.hint}>
          Hint: admin / 1234
        </div>
      </form>
    </div>
  );
}
