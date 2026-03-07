'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Reviews.module.css';

interface Review {
  id: number;
  reviewerName: string;
  starRating: number;
  date: string;
  content: string;
  images?: string[];
  source?: string;
}
const reviews: Review[] = [
  {
    id: 1,
    reviewerName: "김*은",
    starRating: 5,
    date: "2023.08.30",
    content: "원래 쓰던 제품이 품절이라 급하게 알마이너로 갈아탔는데 대만족이에요! 냄새도 거의 없고 발림성이 정말 부드럽네요. 입자가 고와서 그런지 털도 한 번에 깔끔하게 뽑히고 자극이 덜해서 초보자분들이 쓰기에 딱 좋습니다. 1000g 대용량이라 한참 쓰겠어요.",
    images: ['/review_1.png'],
    source: 'Coupang'
  },
  {
    id: 2,
    reviewerName: "박*연",
    starRating: 5,
    date: "2023.09.12",
    content: "왁싱샵에서 시술받을 때 맡았던 은은한 향이랑 똑같네요. 집에서 셀프 왁싱 시작한 지 얼마 안 됐는데, 타사 제품보다 훨씬 낮은 온도에서 녹아서 화상 위험이 없어서 안심돼요. 모근까지 확실하게 잡아주는 느낌입니다. 가성비 최고예요!",
    images: ['/review_2.png'],
    source: 'Coupang'
  },
  {
    id: 3,
    reviewerName: "최*진",
    starRating: 5,
    date: "2023.10.05",
    content: "유튜브 보고 알마이너가 유명하다길래 사봤는데 소문대로네요. 왁스 굳는 속도도 적당하고 뗄 때 끊어짐이 전혀 없어요 (엘라스틱 테크 진짜인 듯). 민감성 피부인데 붉은기도 금방 가라앉고 매끈하게 잘 제모되었습니다. 재구매 의사 100%입니다.",
    images: ['/review_3.png'],
    source: 'Coupang'
  },
  {
    id: 4,
    reviewerName: "에이블리뷰어",
    starRating: 5,
    date: "2024.01.15",
    content: "남자친구 다리 털이 많고 억센 편인데 알마이너로 해결했습니다. 뿌리까지 시원하게 뽑히네요. 자극이 적어서 그런지 신기하게 안 아파해요. 같이 들어있는 스패출러도 튼튼해서 좋아요.",
    images: [],
    source: 'A-bly'
  },
  {
    id: 5,
    reviewerName: "설**",
    starRating: 5,
    date: "2024.02.20",
    content: "당일 출고로 배송 진짜 빨랐구요! 기존 왁스보다 훨씬 빨리 녹아서 시간 절약 많이 됩니다. 굳고 나서도 말랑말랑한 느낌이 있어서 뗄 때 피부 자극이 확실히 덜해요. 올인원이라 페이스부터 바디까지 다 가능해서 편해요.",
    images: [],
    source: 'Coupang'
  }
];

export default function Reviews() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{t.reviews.title} ({reviews.length})</h3>
        <div className={styles.sourceBadge}>
          <span className={styles.sourceLogo}>C</span>
          {t.reviews.source}: Coupang
        </div>
      </div>

      <div className={styles.ratingOverview}>
        <div className={styles.bigRating}>4.8</div>
        <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
        <div className={styles.countText}>{reviews.length} {t.reviews.title}</div>
      </div>

      {/* Photo Reviews Grid */}
      <h4 className={styles.sectionTitle}>{t.reviews.photoReviews}</h4>
      <div className={styles.photoGrid}>
        {reviews.filter(r => r.images && r.images.length > 0).map(review => (
          <div key={review.id} className={styles.photoCard}>
            <div className={styles.photoWrapper}>
              {review.images && <Image src={review.images[0]} alt="Review" fill className={styles.photoImg} />}
              <div className={styles.photoOverlay}>
                <span className={styles.photoUser}>{review.reviewerName}</span>
                <span className={styles.photoRating}>⭐{review.starRating}</span>
              </div>
            </div>
            <div className={styles.photoContent}>
               <p>{review.content.substring(0, 50)}...</p>
            </div>
          </div>
        ))}
      </div>

      {/* Normal List */}
      <h4 className={styles.sectionTitle} style={{marginTop: '40px'}}>{t.reviews.allReviews}</h4>
      <div className={styles.reviewList}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <div className={styles.userInfo}>
                <span className={styles.name}>{review.reviewerName}</span>
                <span className={styles.date}>{review.date}</span>
                <span className={styles.sourceTag}>{review.source} {t.reviews.purchaseVerified}</span>
              </div>
              <div className={styles.stars}>
                {'⭐'.repeat(review.starRating)}
              </div>
            </div>

            <p className={styles.content}>{review.content}</p>

            {review.images && review.images.length > 0 && (
               <div className={styles.reviewImages}>
                 {review.images.map((img, idx) => (
                   <div key={idx} className={styles.thumbWrapper}>
                      <Image src={img} alt="review" fill className={styles.reviewImg} />
                   </div>
                 ))}
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
