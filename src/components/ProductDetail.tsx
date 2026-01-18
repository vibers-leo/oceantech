"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { language } = useLanguage();

  // Map 'ko' to 'kr' for folder name, 'th' to 'th'
  const langFolder = language === "ko" ? "kr" : (language === "th" ? "th" : "en");
  const prefix = language === "ko" ? "rminu-kr" : (language === "th" ? "rminu-th" : "rminu-en");

  // Total number of images
  const totalImages = language === "th" ? 13 : 17;

  // Helper to get extension
  const getExtension = (index: number, lang: string) => {
    if (lang === "ko" || lang === "th") return "jpg";
    // English logic
    if (index === 2) return "jpg";
    return "jpeg";
  };

  const images = Array.from({ length: totalImages }, (_, i) => {
    const index = i + 1;
    const paddedIndex = index.toString().padStart(2, "0");
    const ext = getExtension(index, language);
    return `/${langFolder}/${prefix}_${paddedIndex}.${ext}`;
  });

  return (
    <div className={styles.container}>
      {images.map((src, index) => (
        <div key={index} className={styles.imageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Product Detail ${index + 1}`}
            loading={index < 2 ? "eager" : "lazy"}
            className={styles.detailImage}
          />
        </div>
      ))}
      
      {/* Review Section Image from User Request */}
      <div className={styles.imageWrapper} style={{ marginTop: '0' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/20260101_230847.png" 
          alt="Customer Reviews from Coupang"
          loading="lazy"
          className={styles.detailImage}
        />
      </div>
    </div>
  );
}
