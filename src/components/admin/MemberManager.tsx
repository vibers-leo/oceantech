'use client';

import React, { useEffect, useState } from 'react';
import styles from './AdminComponents.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, query, deleteDoc } from 'firebase/firestore';
import { Trash2 } from 'lucide-react';

interface UserData {
  uid: string;
  email: string;
  name: string;
  role: string;
  businessNumber?: string;
  salonName?: string;
  isApproved?: boolean;
  createdAt?: any;
}

export default function MemberManager() {
  const { language } = useLanguage();
  const [members, setMembers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'users')); // You might want to orderBy createdAt
      const querySnapshot = await getDocs(q);
      const users: UserData[] = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data() as UserData);
      });
      // Sort manually if needed or use orderBy in query if indexes exist
      // Priority: pro_pending first
      users.sort((a, b) => {
        if (a.role === 'pro_pending' && b.role !== 'pro_pending') return -1;
        if (a.role !== 'pro_pending' && b.role === 'pro_pending') return 1;
        return 0;
      });
      
      setMembers(users);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const approveMember = async (uid: string) => {
    if (!confirm(language === 'ko' ? '이 회원을 전문가로 승인하시겠습니까?' : 'Approve this member as Pro?')) return;
    
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        role: 'pro',
        isApproved: true
      });
      alert(language === 'ko' ? '승인되었습니다.' : 'Approved.');
      fetchMembers(); // Refresh list
    } catch (error) {
      console.error("Error approving member:", error);
      alert('Error approving member');
    }
  };

  const deleteMember = async (uid: string) => {
    if (!confirm(language === 'ko' ? '이 회원을 영구 삭제하시겠습니까? 데이터 복구가 불가능합니다.' : 'Permanently delete this member?')) return;
    try {
      await deleteDoc(doc(db, 'users', uid));
      setMembers(prev => prev.filter(m => m.uid !== uid));
    } catch (error) {
      console.error("Error deleting member:", error);
      alert('Error deleting member');
    }
  };

  if (loading) return <div className={styles.desc}>Loading members...</div>;

  return (
    <div className={styles.componentContainer}>
      <h2 className={styles.title}>{language === 'ko' ? '회원 관리 & 승인' : 'Member Management'}</h2>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{language === 'ko' ? '이름' : 'Name'}</th>
              <th>{language === 'ko' ? '이메일' : 'Email'}</th>
              <th>{language === 'ko' ? '상호명' : 'Salon Name'}</th>
              <th>{language === 'ko' ? '사업자번호' : 'Business No'}</th>
              <th>{language === 'ko' ? '구분' : 'Type'}</th>
              <th>{language === 'ko' ? '상태' : 'Status'}</th>
              <th>{language === 'ko' ? '관리' : 'Action'}</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.uid}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.salonName || '-'}</td>
                <td>{member.businessNumber || '-'}</td>
                <td>
                  {member.role === 'admin' ? '관리자' : 
                   member.role === 'pro' ? '전문가' : 
                   member.role === 'pro_pending' ? '승인 대기' : '일반'}
                </td>
                <td>
                  {member.isApproved ? (
                    <span className={`${styles.badge} ${styles.badgePaid}`}>Active</span>
                  ) : member.role === 'pro_pending' ? (
                    <span className={`${styles.badge} ${styles.badgePending}`}>Pending</span>
                  ) : (
                    <span className={`${styles.badge} ${styles.badgeShipped}`}>General</span>
                  )}
                </td>
                <td>
                  {member.role === 'pro_pending' && !member.isApproved && (
                    <button 
                      className={styles.viewBtn}
                      style={{backgroundColor: '#2563eb', color: 'white', border: 'none', marginRight: '5px'}} 
                      onClick={() => approveMember(member.uid)}
                    >
                      {language === 'ko' ? '승인하기' : 'Approve'}
                    </button>
                  )}
                  {member.role !== 'admin' && (
                    <button 
                      className={styles.viewBtn}
                      style={{color: '#ef4444', borderColor: '#fee2e2'}} 
                      onClick={() => deleteMember(member.uid)}
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={7} style={{textAlign:'center', padding:'30px'}}>
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
