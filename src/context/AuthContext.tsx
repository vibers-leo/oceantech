'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Check LocalStorage for Demo User first (Persist "Demo Mode")
    const storedDemoUser = localStorage.getItem('demo_user');
    if (storedDemoUser) {
      try {
             const parsedUser = JSON.parse(storedDemoUser);
             setUser(parsedUser);
             setIsLoading(false);
             // If we are in demo mode, we might still want to listen to firebase or just ignore it.
             // For simplicity, we can return early or keep the listener but prioritize demo user?
             // Returning early is safer to prevent flickering if firebase returns null.
             return; 
      } catch (e) {
             console.error('Failed to parse demo user', e);
             localStorage.removeItem('demo_user');
      }
    }

    // 2. Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Map Firebase user to our app user
        // Simple Admin Check logic (replace with Firestore roles later)
        const adminEmails = [
          'admin@rminu.com', 
          'jbanion@naver.com', 
          'juuuno@naver.com', 
          'designdlab@designdlab.co.kr'
        ];
        const isAdmin = firebaseUser.email && adminEmails.includes(firebaseUser.email);
        
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Member',
          role: isAdmin ? 'admin' : 'user',
          email: firebaseUser.email || ''
        });
      } else {
        // Only reset if NO demo user is found (double check to be safe, though return above handles it)
        if (!localStorage.getItem('demo_user')) {
             setUser(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pw: string) => {
    // [DEMO MODE] Bypass Firebase for specific demo admin account
    if ((email === 'admin@rminu.com' || email === 'juuuno@naver.com') && pw === 'admin1234') {
      const demoUser: User = {
        id: email === 'admin@rminu.com' ? 'demo-admin-id' : 'demo-juuuno-id',
        name: email === 'admin@rminu.com' ? 'Demo Admin' : 'Juno (Admin)',
        role: 'admin',
        email: email
      };
      
      setUser(demoUser);
      localStorage.setItem('demo_user', JSON.stringify(demoUser)); // Persist session
      return { success: true };
    }

    try {
      await signInWithEmailAndPassword(auth, email, pw);
      return { success: true };
    } catch (error: any) {
      console.error("Login Error:", error);
      let msg = '로그인에 실패했습니다.';
      if (error.code === 'auth/invalid-credential') msg = '이메일 또는 비밀번호가 올바르지 않습니다.';
      if (error.code === 'auth/user-not-found') msg = '존재하지 않는 사용자입니다.';
      if (error.code === 'auth/wrong-password') msg = '비밀번호가 일치하지 않습니다.';
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    localStorage.removeItem('demo_user'); // Clear demo session
    try {
      await signOut(auth);
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error("Logout Error:", error);
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
