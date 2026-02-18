'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pw: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 어드민 이메일 목록: 환경변수에서 읽음 (쉼표 구분)
const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean);

// 데모 모드: .env.local에서 NEXT_PUBLIC_DEMO_MODE=true 일 때만 활성화
const IS_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 데모 모드일 때만 localStorage 세션 복원
    if (IS_DEMO_MODE) {
      const storedDemoUser = localStorage.getItem('demo_user');
      if (storedDemoUser) {
        try {
          const parsedUser = JSON.parse(storedDemoUser);
          setUser(parsedUser);
          setIsLoading(false);
          return;
        } catch {
          localStorage.removeItem('demo_user');
        }
      }
    }

    // Firebase Auth 상태 감지
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = !!firebaseUser.email && ADMIN_EMAILS.includes(firebaseUser.email);
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Member',
          role: isAdmin ? 'admin' : 'user',
          email: firebaseUser.email || '',
        });
      } else {
        if (!IS_DEMO_MODE || !localStorage.getItem('demo_user')) {
          setUser(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pw: string) => {
    // 데모 모드 전용 바이패스 (프로덕션에서는 비활성화됨)
    if (IS_DEMO_MODE && ADMIN_EMAILS.includes(email) && pw === 'admin1234') {
      const demoUser: User = {
        id: `demo-${email.split('@')[0]}`,
        name: email.split('@')[0],
        role: 'admin',
        email,
      };
      setUser(demoUser);
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      return { success: true };
    }

    try {
      await signInWithEmailAndPassword(auth, email, pw);
      return { success: true };
    } catch (error: unknown) {
      console.error('Login Error:', error);
      const code = (error as { code?: string }).code;
      let msg = '로그인에 실패했습니다.';
      if (code === 'auth/invalid-credential') msg = '이메일 또는 비밀번호가 올바르지 않습니다.';
      if (code === 'auth/user-not-found') msg = '존재하지 않는 사용자입니다.';
      if (code === 'auth/wrong-password') msg = '비밀번호가 일치하지 않습니다.';
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    localStorage.removeItem('demo_user');
    try {
      await signOut(auth);
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
