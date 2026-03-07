'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import styles from './alminerShop.module.css';
import ProductDetail from '@/components/ProductDetail';
import Reviews from '@/components/Reviews';
import ProductQnA from '@/components/ProductQnA';
import ProductPolicy from '@/components/ProductPolicy';
import Button from '@/components/ui/Button';
import { ProductJsonLd } from '@/components/JsonLd';
import { setCheckoutItems } from '@/lib/cart';

export default function AlminerShopPage() {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<{ label: string; price: number; quantity: number }[]>([]);
  const [mainImage, setMainImage] = useState('/rminu/알마이너-썸네일-1000g-2종.jpg'); // Default image
  const [activeTab, setActiveTab] = useState('detail');

  // Define product data locally for now or import
  const currentOptions = t.alminer.shop.options || [];
  
  // Sort options by price for display logic if needed, but usually kept in order.
  // We want to show the lowest price as the "Main Price" initially, 
  // or update it when a user selects an option.
  
  // Find min price for display
  const minPrice = currentOptions.length > 0 
    ? Math.min(...currentOptions.map(o => o.price)) 
    : 49800; // Fallback

  // Logic: If options selected, show the price of the LAST selected option (or maybe sum? no, typically unit price changes).
  // Actually, typical e-commerce shows specific price appearing when option selected.
  // If no option selected, show range or min price.
  // Let's us a state for "Display Price".
  const [displayPrice, setDisplayPrice] = useState(minPrice);
  const [originalDisplayPrice, setOriginalDisplayPrice] = useState(Math.round(minPrice * 1.4 / 100) * 100);

  const formatPrice = (p: number) => new Intl.NumberFormat('ko-KR').format(p);

  const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = parseInt(e.target.value, 10);
    if (isNaN(idx) || idx < 0) return;
    const option = currentOptions[idx];

    // Update display price to selected option
    setDisplayPrice(option.price);
    // Mock original price ratio (~1.4x)
    setOriginalDisplayPrice(Math.round(option.price * 1.4 / 100) * 100); 

    const existingItemIndex = selectedOptions.findIndex(item => item.label === option.label);
    if (existingItemIndex > -1) {
      const newItems = [...selectedOptions];
      newItems[existingItemIndex].quantity += 1;
      setSelectedOptions(newItems);
    } else {
      setSelectedOptions([...selectedOptions, { ...option, quantity: 1 }]);
    }
    e.target.value = "-1";
  };

  const updateQuantity = (index: number, delta: number) => {
    const newItems = [...selectedOptions];
    const newQty = newItems[index].quantity + delta;
    if (newQty < 1) newItems.splice(index, 1);
    else newItems[index].quantity = newQty;
    setSelectedOptions(newItems);
  };

  const totalPrice = selectedOptions.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Calculate estimated arrival (Simple Logic: If before 3PM -> Tomorrow, else Day after tomorrow)
  const getEstimatedArrival = () => {
    const now = new Date();
    const cutoffHour = 15; // 3 PM cutoff
    let arrivalDate = new Date();

    if (now.getHours() < cutoffHour) {
      arrivalDate.setDate(now.getDate() + 1); // Tomorrow
    } else {
      arrivalDate.setDate(now.getDate() + 2); // Day after tomorrow
    }
    
    // Add logic to skip Sunday/Holidays if needed, keeping it simple for now
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const month = arrivalDate.getMonth() + 1;
    const date = arrivalDate.getDate();
    const day = dayNames[arrivalDate.getDay()];
    
    return `${month}/${date}(${day}) 도착 보장`;
  };

  return (
    <div className={styles.container}>
      <ProductJsonLd />
      {/* Top Section: Gallery & Info */}
      <div className={styles.topSection}>
        {/* Left: Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImageWrapper}>
            <Image src={mainImage} alt="Alminer Product" fill className={styles.mainImage} />
          </div>
          <div className={styles.thumbnails}>
             <div className={`${styles.thumb} ${mainImage === '/rminu/알마이너-썸네일-1000g-2종.jpg' ? styles.activeThumb : ''}`} onClick={() => setMainImage('/rminu/알마이너-썸네일-1000g-2종.jpg')}>
               <Image src="/rminu/알마이너-썸네일-1000g-2종.jpg" alt="Thumb 1" fill className={styles.thumbImg} />
             </div>
             <div className={`${styles.thumb} ${mainImage === '/rminu/알마이너-썸네일-200g-1종.jpg' ? styles.activeThumb : ''}`} onClick={() => setMainImage('/rminu/알마이너-썸네일-200g-1종.jpg')}>
               <Image src="/rminu/알마이너-썸네일-200g-1종.jpg" alt="Thumb 2" fill className={styles.thumbImg} />
             </div>
             <div className={`${styles.thumb} ${mainImage === '/rminu/알마이너-추가-썸네일.jpg' ? styles.activeThumb : ''}`} onClick={() => setMainImage('/rminu/알마이너-추가-썸네일.jpg')}>
               <Image src="/rminu/알마이너-추가-썸네일.jpg" alt="Thumb 3" fill className={styles.thumbImg} />
             </div>
          </div>
        </div>

        {/* Right: Product Info & Options */}
        <div className={styles.infoArea}>
          <div className={styles.headerInfo}>
             <h1 className={styles.productTitle}>{t.alminer.product.name}</h1>
             <div className={styles.rating}>
               ⭐⭐⭐⭐⭐ <span className={styles.reviewCount}>(5 Reviews)</span>
             </div>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.discountRate}>{t.alminer.product.discount}</span>
            <span className={styles.finalPrice}>{formatPrice(displayPrice)}원</span>
            <span className={styles.originalPrice}>{formatPrice(originalDisplayPrice)}원</span>
          </div>
          
          <div className={styles.shippingInfo}>
             <span className={styles.shipLabel}>{t.shopDetail.shipping}</span>
             <span className={styles.shipValue}>{t.shopDetail.freeShipping} • <strong>{getEstimatedArrival()}</strong></span>
          </div>

          <div className={styles.divider}></div>

          {/* Option Selector */}
          <div className={styles.optionSection}>
            <select className={styles.selectInput} onChange={handleOptionSelect} defaultValue="-1">
               <option value="-1" disabled>{t.shopDetail.selectOption}</option>
               {currentOptions.map((opt, idx) => (
                 <option key={idx} value={idx}>
                   {opt.label} - {formatPrice(opt.price)}원
                 </option>
               ))}
            </select>
          </div>

          {/* Selected Items */}
          <div className={styles.selectedList}>
            {selectedOptions.map((item, idx) => (
              <div key={idx} className={styles.selectedItem}>
                <div className={styles.itemTop}>
                  <span className={styles.itemLabel}>{item.label}</span>
                  <button onClick={() => updateQuantity(idx, -100)} className={styles.deleteBtn}>×</button>
                </div>
                <div className={styles.itemBottom}>
                  <div className={styles.qtyControl}>
                    <button onClick={() => updateQuantity(idx, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(idx, 1)}>+</button>
                  </div>
                  <span className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}원</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className={styles.totalRow}>
             <span>{t.shopDetail.totalPrice}</span>
             <span className={styles.totalPriceText}>{formatPrice(totalPrice)}원</span>
          </div>

          {/* Buttons */}
          <div className={styles.btnGroup}>
            <Button
              variant="outline"
              size="lg"
              className={styles.cartBtn}
              onClick={() => {
                if (selectedOptions.length === 0) {
                  showToast(language === 'ko' ? '옵션을 선택해주세요.' : 'Please select an option.', 'error');
                  return;
                }
                setCheckoutItems(selectedOptions);
                showToast(language === 'ko' ? '장바구니에 담았습니다.' : 'Added to cart.', 'success');
              }}
            >
              {t.alminer.shop.addToCart}
            </Button>
            <Button
              variant="alminer"
              size="lg"
              className={styles.buyBtn}
              onClick={() => {
                if (selectedOptions.length === 0) {
                  showToast(language === 'ko' ? '옵션을 선택해주세요.' : 'Please select an option.', 'error');
                  return;
                }
                setCheckoutItems(selectedOptions);
                router.push('/shop/checkout');
              }}
            >
              {t.alminer.shop.buyNow}
            </Button>
          </div>
        </div>
      </div>

      {/* Detail Tabs */}
      <div className={styles.tabNav}>
        <div
          className={`${styles.tab} ${activeTab === 'detail' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('detail')}
        >
          {t.shopDetail.tabs.detail}
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          {t.shopDetail.tabs.reviews} (5)
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'qna' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('qna')}
        >
          {t.shopDetail.tabs.qna}
        </div>
        <div
           className={`${styles.tab} ${activeTab === 'policy' ? styles.activeTab : ''}`}
           onClick={() => setActiveTab('policy')}
        >
          {t.shopDetail.tabs.policy}
        </div>
      </div>

      {/* Detail Content */}
      <div className={styles.detailContent}>
        {activeTab === 'detail' && <ProductDetail />}
        {activeTab === 'reviews' && <Reviews />}
        {activeTab === 'qna' && <ProductQnA />}
        {activeTab === 'policy' && <ProductPolicy />}
      </div>
    </div>
  );
}
