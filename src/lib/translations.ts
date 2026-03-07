export type Language = 'ko' | 'en' | 'th';

export const translations = {
  ko: {
    nav: {
      home: '홈',
      about: '연구소 소개',
      lacan: '라캉 왁스',
      alminer: 'R-minu',
      shop: '제품구매',
    },
    shopPage: {
      title: '제품 구매',
      subtitle: '구매하실 브랜드를 선택해주세요.',
      lacan: {
        title: 'LACAN WAX',
        desc: '전문가들을 위한 하이엔드 왁스 솔루션',
        btn: '라캉몰 바로가기 (전문가용)',
        note: '라캉 왁스는 전문가 인증 후 구매 가능합니다.'
      },
      alminer: {
        title: 'R-MINU',
        desc: '집에서 만나는 전문가의 손길, 프리미엄 셀프 왁싱',
        btn: 'R-minu 구매하기 (일반용)',
        note: '공식 홈페이지 단독 혜택을 만나보세요.'
      },
      global: {
        title: 'Global Store',
        desc: 'Select your preferred global marketplace',
        amazon: 'Amazon US',
        shopee: 'Shopee SEA',
        qoo10: 'Qoo10 Japan',
        rakuten: 'Rakuten'
      }
    },
    shopDetail: {
      tabs: {
        detail: '상세정보',
        reviews: '상품평',
        qna: 'Q&A',
        policy: '반품/교환정보'
      },
      shipping: '배송',
      freeShipping: '무료배송',
      arrivalGuarantee: '도착 보장',
      selectOption: '옵션 선택 (필수)',
      totalPrice: '총 상품금액',
      reviewCount: '개의 상품평',
    },
    checkout: {
      title: '주문 결제',
      shippingInfo: '배송 정보',
      paymentInfo: '결제 수단',
      orderSummary: '주문 상품 정보',
      labels: {
        recipient: '받는 분',
        phone: '연락처',
        address: '주소',
        memo: '배송 메모'
      },
      btn: '결제하기',
      processing: '결제 진행 중...',
      complete: '결제가 완료되었습니다!',
      failed: '결제에 실패했습니다.',
      continueShopping: '쇼핑 계속하기',
    },
    global: {
      title: 'Global Network',
      subtitle: '전 세계와 함께하는 뷰티 솔루션',
      description: '아마존, 쇼피, 큐텐 등 글로벌 주요 유통 채널을 통해 K-Beauty의 우수성을 알리고 있습니다.',
      partners: [
        { name: 'Amazon US', region: 'North America' },
        { name: 'Shopee', region: 'Southeast Asia' },
        { name: 'Qoo10', region: 'Japan' },
        { name: 'Rakuten', region: 'Japan' }
      ]
    },
    business: {
      title: 'BUSINESS CENTER',
      subtitle: 'Resources for Partners',
      download: {
        title: '브랜드 리소스 다운로드',
        desc: '고해상도 제품 이미지, 국/영문 브로슈어, 로고 파일을 다운로드하실 수 있습니다.',
        kit: '미디어 킷',
        catalog: '제품 카탈로그 (PDF)',
        bi: '브랜드 로고 (AI/PNG)'
      },
      inquiry: {
        title: '수출 및 대량 구매 문의',
        desc: '글로벌 파트너십 및 대량 구매(Wholesale) 관련 문의를 남겨주세요.',
        btn: '문의하기',
        submitting: '접수 중...',
        allRequired: '모든 항목을 입력해주세요.',
        success: '문의가 성공적으로 접수되었습니다.',
        error: '문의 접수에 실패했습니다. 다시 시도해주세요.',
        form: {
          company: '회사명',
          email: '이메일',
          region: '지역 선택',
          inquiryType: '문의 유형',
          message: '메시지',
          regions: {
            northAmerica: '북미',
            europe: '유럽',
            southeastAsia: '동남아시아',
            japan: '일본',
            other: '기타'
          },
          types: {
            wholesale: '대량 구매',
            export: '수출 / 유통',
            oem: 'OEM / ODM'
          }
        }
      }
    },
    pro: {
      title: 'PRO MEMBER ZONE',
      login: {
        title: '전문가 회원 로그인',
        desc: '라캉 프로 회원은 전용 최저가 혜택과 교육 자료를 이용하실 수 있습니다.',
        idLabel: '사업자/면허 번호',
        pwLabel: '비밀번호',
        btn: '로그인',
        register: '전문가 회원가입 신청'
      }
    },
    hero: {
      title: 'Premium Waxing',
      subtitle: '전문가를 위한 라캉, 당신을 위한 알마이너',
      cta: '자세히 보기',
    },
    about: {
      title: 'Company Info',
      description: '우리는 최고의 왁싱 기술력으로 전문가와 개인 모두를 위한 최적의 제모 솔루션을 제공합니다.',
      ceo: '대표이사: 조제복',
      address: '부산광역시 남구 못골번영로 71번길 74 (대연동, 부산예술대학교 본관 4층)',
      contact: '문의하기',
      vision: 'Brand Philosophy',
      visionText: 'Experts Choice, Premium Standard',
      history: {
        title: 'HISTORY & MILESTONES',
        items: [
          { year: '2024', text: '알마이너 (Alminer) 브랜드 런칭' },
          { year: '2023', text: '기업부설연구소 인증 획득' },
          { year: '2020', text: '라캉 (Lacan) 살롱 멤버십 500호점 돌파' }
        ]
      }
    },
    lacan: {
      title: 'LACAN WAX',
      subtitle: 'The Absolute Standard for Professionals',
      description: '라캉 왁스는 오직 검증된 전문가(Authorized Personnel)만을 위해 설계된 하이엔드 왁스 브랜드입니다. 수많은 살롱 데이터와 피드백을 기반으로 완성된 완벽한 그립감과 저자극 포뮬러는, 당신의 시술 가치를 한 차원 더 높여줍니다.',
      introTitle: 'The Gold Standard',
      whyTitle: 'Why Professionals Choose Lacan',
      lineupTitle: 'Product Lineup',
      features: [
        { title: 'Exclusive Membership', desc: '철저한 멤버십 승인 절차를 통해 비전문가의 무분별한 접근을 차단하고 전문가의 권익을 보호합니다.' },
        { title: 'Hypoallergenic Formula', desc: '민감한 Y존 시술에도 자극을 최소화하는 최상급 로진과 천연 에센셜 오일 블렌딩.' },
        { title: 'Perfect Grip & Control', desc: '가는 연모부터 굵은 모근까지 한 번에 제어하는 강력한 그립력과 빠른 건조 속도.' },
        { title: 'Technical Education', desc: '라캉 아카데미를 통해 단순 제품 공급을 넘어, 시술 테크닉과 살롱 경영 노하우를 공유합니다.' }
      ],
      products: [
        { name: 'Lacan Hard Wax', desc: '하이엔드 하드왁스 라캉 왁싱샵 전용 (1Kg)', tag: 'Signature', img: '/lacan/products/hard_wax.jpeg' },
        { name: 'Rocket Solution Quick 5 (240 Sheets)', desc: '라캉 로켓솔루션 Quick 5 브라질리언 팩-240장', tag: 'Professional', img: '/lacan/products/pack_240.jpeg' },
        { name: 'Rocket Solution Quick 5 (160 Sheets)', desc: '라캉 로켓솔루션 Quick 5 브라질리언 팩-160장', tag: 'Best Seller', img: '/lacan/products/pack_160.jpeg' },
        { name: 'Rocket Solution Quick 5 (80 Sheets)', desc: '라캉 로켓솔루션 Quick 5 브라질리언 팩-80장', tag: 'Starter', img: '/lacan/products/pack_80.jpeg' }
      ],
      cta: '전문가 인증 및 파트너 신청',
      viewDetail: '상세보기'
    },
    alminer: {
      title: 'R-MINU',
      subtitle: 'Expertise Made Easy, Professional Self-Waxing',
      description: '알마이너는 전문가용 왁스 브랜드 "라캉(LA CAN)"의 기술력을 홈케어로 확장한 프리미엄 셀프 왁싱 브랜드입니다. 집에서도 실수가 없도록 안전하고 완벽한 제모를 위해 3단계 핵심 테크놀로지를 적용했습니다.',
      comingSoon: '저자극 & 고밀착 프리미엄 포뮬러',
      heritageLabel: 'THE HERITAGE',
      heritageTitle: 'LA CAN Expertise for Home',
      coreTitle: '3 Core Technologies',
      lineupTitle: 'Product Lineup',
      visionTitle: 'Safe & Professional',
      visionText1: '알마이너는 왁싱 전문가의 노하우와 실제 샵에서 사용되는 프리미엄 원료를 그대로 담았습니다.',
      visionText2: '집에서도 안전하고 완벽한 제모를 경험하세요.',
      buyProduct: '구매하기',
      features: [
        { title: '엘라스틱 테크 (Elasticity)', desc: '공중합체(Copolymer MI 150) 성분으로 시술 후에도 왁스가 끊어지거나 부서지지 않으며, 특유의 탄성으로 넓고 얇은 롱 스트립 시술이 가능합니다.' },
        { title: '모발 응집 테크 (Hair Cohesion)', desc: 'Pinus Massoniana 나무에서 추출한 아비에트산(Abietic acid) 85% 이상의 접착 성분으로 짧고 미세한 모발까지 완벽하게 응집하여 제거합니다.' },
        { title: '밀착 코팅 테크 (Adhesion Coating)', desc: '점착성분(Tackifier)과 분리성분(Paraffin #55)의 최적 배합으로 피부 자극은 낮추고 모근에 가장 가까운 모발까지 확실하게 잡아줍니다.' }
      ],
      product: {
        name: '알마이너 하드 왁스',
        desc: '페이스부터 바디, 브라질리언까지 하나로 끝내는 올인원 프리미엄 하드 왁스. 50-55도의 낮은 융점으로 피부 자극을 최소화했습니다.',
        price: '49,800',
        originalPrice: '69,000',
        discount: '28%',
        specs: [
          'Elasticity Tech: MI 150 고탄성 포뮬러',
          'Hair Cohesion Tech: 아비에트산 85% 함양',
          'Adhesion Coating: 모근 밀착 제어',
          'Food Grade: 저자극 식품등급 원료 사용'
        ]
      },
      cta: '지금 쿠팡에서 구매하기',
      shop: {
        buyNow: '바로 구매하기',
        addToCart: '장바구니',
        total: '총 상품 금액',
        quantity: '수량',
        soldOut: '일시품절',
        options: [
          { label: '200g × 1개', price: 9500 },
          { label: '400g × 1개', price: 14400 },
          { label: '500g × 1개', price: 14450 },
          { label: '1000g × 1개', price: 21140 },
        ],
        selectOption: '옵션 선택'
      },
      gallery: {
        pro1kg: 'R-minu 1kg 전문가용',
        home200g: 'R-minu 200g 홈케어 키트',
        texture: '프리미엄 텍스처 (무색/무향)'
      }
    },
    reviews: {
      title: '상품평',
      photoReviews: '포토 상품평',
      allReviews: '전체 리뷰',
      source: '출처',
      purchaseVerified: '구매확인'
    },
    footer: {
      rights: '© 2025 Ocean Tech Co., Ltd. All rights reserved.',
      companyName: '(주)오션테크',
      businessNum: '사업자등록번호: 000-00-00000',
      tel: 'Tel: 010-7169-3438',
      email: 'Email: jbanion@naver.com'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      lacan: 'Lacan Wax',
      alminer: 'R-minu',
      business: 'Business',
      shop: 'Shop',
    },
    shopPage: {
      title: 'Shop',
      subtitle: 'Select a brand to purchase.',
      lacan: {
        title: 'LACAN WAX',
        desc: 'High-end wax solutions for professionals',
        btn: 'Go to Lacan Mall',
        note: 'Lacan Wax is for authorized professionals.'
      },
      alminer: {
        title: 'R-MINU',
        desc: 'Professional expertise for home use',
        btn: 'Buy R-minu',
        note: 'Exclusive offers on official site.'
      },
      global: {
        title: 'Global Store',
        desc: 'Select your preferred global marketplace',
        amazon: 'Amazon US',
        shopee: 'Shopee SEA',
        qoo10: 'Qoo10 Japan',
        rakuten: 'Rakuten'
      }
    },
    shopDetail: {
      tabs: {
        detail: 'Details',
        reviews: 'Reviews',
        qna: 'Q&A',
        policy: 'Return / Exchange'
      },
      shipping: 'Shipping',
      freeShipping: 'Free Shipping',
      arrivalGuarantee: 'Guaranteed Arrival',
      selectOption: 'Select Option (Required)',
      totalPrice: 'Total Amount',
      reviewCount: 'Reviews',
    },
    checkout: {
      title: 'Checkout',
      shippingInfo: 'Shipping Info',
      paymentInfo: 'Payment Method',
      orderSummary: 'Order Summary',
      labels: {
        recipient: 'Recipient',
        phone: 'Phone',
        address: 'Address',
        memo: 'Note'
      },
      btn: 'Pay Now',
      processing: 'Processing...',
      complete: 'Payment Complete!',
      failed: 'Payment failed.',
      continueShopping: 'Continue Shopping',
    },
    global: {
      title: 'Global Network',
      subtitle: 'Connecting with the World',
      description: 'We are promoting the excellence of K-Beauty through major global distribution channels such as Amazon, Shopee, and Qoo10.',
      partners: [
        { name: 'Amazon US', region: 'North America' },
        { name: 'Shopee', region: 'Southeast Asia' },
        { name: 'Qoo10', region: 'Japan' },
        { name: 'Rakuten', region: 'Japan' }
      ]
    },
    business: {
      title: 'BUSINESS CENTER',
      subtitle: 'Resources for Partners',
      download: {
        title: 'Download Resources',
        desc: 'Access high-resolution product images, brochures, and brand logos.',
        kit: 'Media Kit',
        catalog: 'Product Catalog (PDF)',
        bi: 'Brand Logo (AI/PNG)'
      },
      inquiry: {
        title: 'Wholesale & Export Inquiry',
        desc: 'Please contact us for global partnership and wholesale inquiries.',
        btn: 'Contact Us',
        submitting: 'Submitting...',
        allRequired: 'Please fill in all fields.',
        success: 'Your inquiry has been submitted successfully.',
        error: 'Failed to submit. Please try again.',
        form: {
          company: 'Company Name',
          email: 'Email Address',
          region: 'Select Region',
          inquiryType: 'Inquiry Type',
          message: 'Message',
          regions: {
            northAmerica: 'North America',
            europe: 'Europe',
            southeastAsia: 'Southeast Asia',
            japan: 'Japan',
            other: 'Other'
          },
          types: {
            wholesale: 'Wholesale',
            export: 'Export / Distribution',
            oem: 'OEM / ODM'
          }
        }
      }
    },
    pro: {
      title: 'PRO MEMBER ZONE',
      login: {
        title: 'Professional Login',
        desc: 'Lacan Pro members get exclusive pricing and educational resources.',
        idLabel: 'License / Biz Number',
        pwLabel: 'Password',
        btn: 'Login',
        register: 'Apply for Pro Membership'
      }
    },
    hero: {
      title: 'Premium Waxing',
      subtitle: 'Professional Standards for Every Need',
      cta: 'Learn More',
    },
    about: {
      title: 'About Us',
      description: 'We provide optimal hair removal solutions for both professionals and individuals with top-tier waxing technology.',
      ceo: 'CEO: Jo Je-bok',
      address: '4F Main Bldg, Busan All Arts College, 74 Motgol-beonyeong-ro 71-beongil, Nam-gu, Busan, Korea',
      contact: 'Contact Us',
      vision: 'Brand Philosophy',
      visionText: 'Experts Choice, Premium Standard',
      history: {
        title: 'HISTORY & MILESTONES',
        items: [
          { year: '2024', text: 'Alminer (R-minu) Brand Launch' },
          { year: '2023', text: 'Certified Corporate R&D Center' },
          { year: '2020', text: 'Lacan Salon Membership Surpasses 500 Locations' }
        ]
      }
    },
    lacan: {
      title: 'LACAN WAX',
      subtitle: 'The Absolute Standard for Professionals',
      description: 'Lacan Wax is a high-end wax brand designed exclusively for verified professionals. Perfected through extensive salon data and feedback, its unmatched grip and hypoallergenic formula elevate the value of every treatment.',
      introTitle: 'The Gold Standard',
      whyTitle: 'Why Professionals Choose Lacan',
      lineupTitle: 'Product Lineup',
      features: [
        { title: 'Exclusive Membership', desc: 'A rigorous approval process blocks unauthorized access and protects professional rights and interests.' },
        { title: 'Hypoallergenic Formula', desc: 'Premium-grade rosin blended with natural essential oils to minimize irritation, even for sensitive Brazilian treatments.' },
        { title: 'Perfect Grip & Control', desc: 'Powerful grip that captures everything from fine vellus hair to coarse roots in a single pull, with rapid drying speed.' },
        { title: 'Technical Education', desc: 'Beyond product supply, the Lacan Academy shares advanced treatment techniques and salon management know-how.' }
      ],
      products: [
        { name: 'Lacan Hard Wax', desc: 'High-End Hard Wax for Professional Use (1Kg)', tag: 'Signature', img: '/lacan/products/hard_wax.jpeg' },
        { name: 'Rocket Solution Quick 5 (240 Sheets)', desc: 'Lacan Rocket Solution Quick 5 Brazilian Pack - 240 Sheets', tag: 'Professional', img: '/lacan/products/pack_240.jpeg' },
        { name: 'Rocket Solution Quick 5 (160 Sheets)', desc: 'Lacan Rocket Solution Quick 5 Brazilian Pack - 160 Sheets', tag: 'Best Seller', img: '/lacan/products/pack_160.jpeg' },
        { name: 'Rocket Solution Quick 5 (80 Sheets)', desc: 'Lacan Rocket Solution Quick 5 Brazilian Pack - 80 Sheets', tag: 'Starter', img: '/lacan/products/pack_80.jpeg' }
      ],
      cta: 'Apply for Professional Certification & Partnership',
      viewDetail: 'VIEW DETAIL'
    },
    alminer: {
      title: 'R-MINU',
      subtitle: 'Expertise Made Easy, Professional Self-Waxing',
      description: 'R-minu is a premium self-waxing brand that translates the expertise of "LA CAN" for home use. It incorporates 3 core technologies to ensure safe, flawless hair removal for beginners at home.',
      comingSoon: 'Low Irritation & High Adhesion Premium Formula',
      heritageLabel: 'THE HERITAGE',
      heritageTitle: 'LA CAN Expertise for Home',
      coreTitle: '3 Core Technologies',
      lineupTitle: 'Product Lineup',
      visionTitle: 'Safe & Professional',
      visionText1: 'R-minu captures the expertise of professional waxing technicians and the premium ingredients used in real salons.',
      visionText2: 'Experience safe and flawless hair removal at home.',
      buyProduct: 'Buy Now',
      features: [
        { title: 'Elasticity Tech', desc: 'Using Copolymer MI 150, the wax remains flexible without breaking, enabling perfect long-strip application with high elasticity.' },
        { title: 'Hair Cohesion Tech', desc: 'Contains over 85% Abietic acid extracted from Pinus Massoniana for powerful grip on even short and fine hairs.' },
        { title: 'Adhesion Coating Tech', desc: 'Optimal blending of Tackifier and Paraffin #55 to minimize skin adhesion while maximizing hair grip near the root.' }
      ],
      product: {
        name: 'R-minu Hard Wax',
        desc: 'An all-in-one premium hard wax for face, body, and Brazilian. Minimized skin irritation with a low melting point of 50-55°C.',
        price: '49,800',
        originalPrice: '69,000',
        discount: '28%',
        specs: [
          'Elasticity Tech: MI 150 High Elasticity',
          'Hair Cohesion Tech: 85% Abietic Acid Content',
          'Adhesion Coating: Root-Focused Control',
          'Food Grade: Safe Food-Grade Ingredients'
        ]
      },
      cta: 'Buy on Coupang',
      shop: {
        buyNow: 'Buy Now',
        addToCart: 'Add to Cart',
        total: 'Total',
        quantity: 'Qty',
        soldOut: 'Sold Out',
        options: [
          { label: '200g × 1 Piece', price: 9500 },
          { label: '400g × 1 Piece', price: 14400 },
          { label: '500g × 1 Piece', price: 14450 },
          { label: '1000g × 1 Piece', price: 21140 },
        ],
        selectOption: 'Select Option'
      },
      gallery: {
        pro1kg: 'R-minu 1kg Professional',
        home200g: 'R-minu 200g Home Kit',
        texture: 'Premium Texture'
      }
    },
    reviews: {
      title: 'Reviews',
      photoReviews: 'Photo Reviews',
      allReviews: 'All Reviews',
      source: 'Source',
      purchaseVerified: 'Verified Purchase'
    },
    footer: {
      rights: '© 2025 Ocean Tech Co., Ltd. All rights reserved.',
      companyName: 'Ocean Tech Co., Ltd.',
      businessNum: 'Registration No: 000-00-00000',
      tel: 'Tel: +82 10-7169-3438',
      email: 'Email: jbanion@naver.com'
    }
  },
  th: {
    nav: {
      home: 'หน้าแรก',
      about: 'เกี่ยวกับเรา',
      lacan: 'Lacan Wax',
      alminer: 'R-minu',
      business: 'ธุรกิจ',
      shop: 'ร้านค้า',
    },
    shopPage: {
      title: 'ร้านค้า',
      subtitle: 'เลือกแบรนด์ที่ต้องการซื้อ',
      lacan: {
        title: 'LACAN WAX',
        desc: 'โซลูชั่นแว็กซ์ระดับไฮเอนด์สำหรับมืออาชีพ',
        btn: 'ไปที่ Lacan Mall',
        note: 'Lacan Wax สำหรับมืออาชีพที่ได้รับอนุญาตเท่านั้น'
      },
      alminer: {
        title: 'R-MINU',
        desc: 'ความเชี่ยวชาญระดับมืออาชีพสำหรับใช้ที่บ้าน',
        btn: 'ซื้อ R-minu',
        note: 'ข้อเสนอพิเศษเฉพาะเว็บไซต์ทางการ'
      },
      global: {
        title: 'ร้านค้าทั่วโลก',
        desc: 'เลือกตลาดออนไลน์ที่คุณต้องการ',
        amazon: 'Amazon US',
        shopee: 'Shopee SEA',
        qoo10: 'Qoo10 Japan',
        rakuten: 'Rakuten'
      }
    },
    shopDetail: {
      tabs: {
        detail: 'รายละเอียด',
        reviews: 'รีวิว',
        qna: 'ถาม-ตอบ',
        policy: 'การคืน/เปลี่ยนสินค้า'
      },
      shipping: 'การจัดส่ง',
      freeShipping: 'จัดส่งฟรี',
      arrivalGuarantee: 'รับประกันการจัดส่ง',
      selectOption: 'เลือกตัวเลือก (จำเป็น)',
      totalPrice: 'ยอมรวมทั้งหมด',
      reviewCount: 'รีวิว',
    },
    checkout: {
      title: 'ชำระเงิน',
      shippingInfo: 'ข้อมูลการจัดส่ง',
      paymentInfo: 'วิธีการชำระเงิน',
      orderSummary: 'สรุปคำสั่งซื้อ',
      labels: {
        recipient: 'ผู้รับ',
        phone: 'โทรศัพท์',
        address: 'ที่อยู่',
        memo: 'หมายเหตุ'
      },
      btn: 'ชำระเงินเลย',
      processing: 'กำลังดำเนินการ...',
      complete: 'ชำระเงินสำเร็จ!',
      failed: 'การชำระเงินล้มเหลว',
      continueShopping: 'ช้อปต่อ',
    },
    global: {
      title: 'เครือข่ายทั่วโลก',
      subtitle: 'เชื่อมต่อกับโลก',
      description: 'เรากำลังส่งเสริมความเป็นเลิศของ K-Beauty ผ่านช่องทางจัดจำหน่ายระดับโลก เช่น Amazon, Shopee และ Qoo10',
      partners: [
        { name: 'Amazon US', region: 'North America' },
        { name: 'Shopee', region: 'Southeast Asia' },
        { name: 'Qoo10', region: 'Japan' },
        { name: 'Rakuten', region: 'Japan' }
      ]
    },
    business: {
      title: 'ศูนย์ธุรกิจ',
      subtitle: 'ทรัพยากรสำหรับพันธมิตร',
      download: {
        title: 'ดาวน์โหลดทรัพยากร',
        desc: 'เข้าถึงภาพสินค้าความละเอียดสูง โบรชัวร์ และโลโก้แบรนด์',
        kit: 'Media Kit',
        catalog: 'แคตตาล็อกสินค้า (PDF)',
        bi: 'โลโก้แบรนด์ (AI/PNG)'
      },
      inquiry: {
        title: 'สอบถามการขายส่งและส่งออก',
        desc: 'กรุณาติดต่อเราสำหรับพันธมิตรระดับโลกและการสอบถามการขายส่ง',
        btn: 'ติดต่อเรา',
        submitting: 'กำลังส่ง...',
        allRequired: 'กรุณากรอกข้อมูลทุกช่อง',
        success: 'ส่งคำถามเรียบร้อยแล้ว',
        error: 'ส่งไม่สำเร็จ กรุณาลองอีกครั้ง',
        form: {
          company: 'ชื่อบริษัท',
          email: 'อีเมล',
          region: 'เลือกภูมิภาค',
          inquiryType: 'ประเภทคำถาม',
          message: 'ข้อความ',
          regions: {
            northAmerica: 'อเมริกาเหนือ',
            europe: 'ยุโรป',
            southeastAsia: 'เอเชียตะวันออกเฉียงใต้',
            japan: 'ญี่ปุ่น',
            other: 'อื่นๆ'
          },
          types: {
            wholesale: 'ขายส่ง',
            export: 'ส่งออก / จัดจำหน่าย',
            oem: 'OEM / ODM'
          }
        }
      }
    },
    pro: {
      title: 'โซนสมาชิกมืออาชีพ',
      login: {
        title: 'เข้าสู่ระบบมืออาชีพ',
        desc: 'สมาชิก Lacan Pro จะได้รับราคาพิเศษและทรัพยากรการศึกษา',
        idLabel: 'หมายเลขใบอนุญาต',
        pwLabel: 'รหัสผ่าน',
        btn: 'เข้าสู่ระบบ',
        register: 'สมัครสมาชิก Pro'
      }
    },
    hero: {
      title: 'Premium Waxing',
      subtitle: 'มาตรฐานระดับมืออาชีพสำหรับทุกความต้องการ',
      cta: 'เรียนรู้เพิ่มเติม',
    },
    about: {
      title: 'เกี่ยวกับเรา',
      description: 'เราให้บริการโซลูชั่นกำจัดขนที่ดีที่สุดสำหรับทั้งมืออาชีพและบุคคลทั่วไปด้วยเทคโนโลยีแว็กซ์ชั้นนำ',
      ceo: 'CEO: Jo Je-bok',
      address: '4F Main Bldg, Busan All Arts College, Nam-gu, Busan, Korea',
      contact: 'ติดต่อเรา',
      vision: 'ปรัชญาแบรนด์',
      visionText: 'Experts Choice, Premium Standard',
      history: {
        title: 'HISTORY & MILESTONES',
        items: [
          { year: '2024', text: 'เปิดตัวแบรนด์ Alminer (R-minu)' },
          { year: '2023', text: 'ได้รับการรับรองศูนย์วิจัยและพัฒนา' },
          { year: '2020', text: 'สมาชิกร้าน Lacan ทะลุ 500 สาขา' }
        ]
      }
    },
    lacan: {
      title: 'LACAN WAX',
      subtitle: 'มาตรฐานสูงสุดสำหรับมืออาชีพ',
      description: 'Lacan Wax เป็นแบรนด์แว็กซ์ระดับไฮเอนด์ที่ออกแบบมาเฉพาะสำหรับมืออาชีพที่ผ่านการรับรอง สูตรที่ลดการระคายเคืองและการยึดเกาะที่สมบูรณ์แบบช่วยยกระดับคุณค่าของการทำทรีทเมนต์ของคุณ',
      introTitle: 'The Gold Standard',
      whyTitle: 'ทำไมมืออาชีพเลือก Lacan',
      lineupTitle: 'สายผลิตภัณฑ์',
      features: [
        { title: 'สมาชิกเอ็กซ์คลูซีฟ', desc: 'กระบวนการอนุมัติที่เข้มงวดเพื่อป้องกันการเข้าถึงโดยไม่ได้รับอนุญาตและปกป้องสิทธิ์ของมืออาชีพ' },
        { title: 'สูตรลดการระคายเคือง', desc: 'โรซินคุณภาพสูงสุดผสมกับน้ำมันหอมระเหยธรรมชาติเพื่อลดการระคายเคือง' },
        { title: 'การยึดเกาะและควบคุมที่สมบูรณ์', desc: 'พลังการยึดเกาะที่จับได้ตั้งแต่ขนอ่อนไปจนถึงรากขนหนา' },
        { title: 'การศึกษาเทคนิค', desc: 'Lacan Academy แบ่งปันเทคนิคการทำทรีทเมนต์และความรู้ด้านการบริหารร้าน' }
      ],
      products: [
        { name: 'Lacan Hard Wax', desc: 'แว็กซ์แข็งระดับไฮเอนด์สำหรับมืออาชีพ (1Kg)', tag: 'Signature', img: '/lacan/products/hard_wax.jpeg' },
        { name: 'Rocket Solution Quick 5 (240 แผ่น)', desc: 'Lacan Rocket Solution Quick 5 Brazilian Pack - 240 แผ่น', tag: 'Professional', img: '/lacan/products/pack_240.jpeg' },
        { name: 'Rocket Solution Quick 5 (160 แผ่น)', desc: 'Lacan Rocket Solution Quick 5 Brazilian Pack - 160 แผ่น', tag: 'Best Seller', img: '/lacan/products/pack_160.jpeg' },
        { name: 'Rocket Solution Quick 5 (80 แผ่น)', desc: 'Lacan Rocket Solution Quick 5 Brazilian Pack - 80 แผ่น', tag: 'Starter', img: '/lacan/products/pack_80.jpeg' }
      ],
      cta: 'สมัครการรับรองมืออาชีพและพันธมิตร',
      viewDetail: 'ดูรายละเอียด'
    },
    alminer: {
      title: 'R-MINU',
      subtitle: 'ความเชี่ยวชาญที่ง่ายขึ้น การแว็กซ์ด้วยตัวเองระดับมืออาชีพ',
      description: 'R-minu เป็นแบรนด์เซลฟ์แว็กซ์ระดับพรีเมียมที่นำความเชี่ยวชาญของ "LA CAN" มาใช้ที่บ้าน ด้วยเทคโนโลยีหลัก 3 ประการเพื่อการกำจัดขนที่ปลอดภัยและสมบูรณ์แบบ',
      comingSoon: 'สูตรพรีเมียมระคายเคืองต่ำ & ยึดเกาะสูง',
      heritageLabel: 'THE HERITAGE',
      heritageTitle: 'ความเชี่ยวชาญ LA CAN สำหรับบ้าน',
      coreTitle: 'เทคโนโลยีหลัก 3 ประการ',
      lineupTitle: 'สายผลิตภัณฑ์',
      visionTitle: 'ปลอดภัยและเป็นมืออาชีพ',
      visionText1: 'R-minu รวบรวมความเชี่ยวชาญของช่างแว็กซ์มืออาชีพและวัตถุดิบพรีเมียมที่ใช้ในร้านจริง',
      visionText2: 'สัมผัสประสบการณ์กำจัดขนที่ปลอดภัยและสมบูรณ์แบบที่บ้าน',
      buyProduct: 'ซื้อเลย',
      features: [
        { title: 'Elasticity Tech', desc: 'ใช้ Copolymer MI 150 แว็กซ์ยังคงยืดหยุ่นไม่แตกหัก ทำให้สามารถทำลองสตริปที่สมบูรณ์แบบ' },
        { title: 'Hair Cohesion Tech', desc: 'มี Abietic acid มากกว่า 85% สกัดจาก Pinus Massoniana เพื่อการยึดเกาะที่ทรงพลังแม้กับขนสั้นและบาง' },
        { title: 'Adhesion Coating Tech', desc: 'การผสม Tackifier และ Paraffin #55 อย่างเหมาะสมเพื่อลดการยึดเกาะผิวหนังและเพิ่มการจับขนใกล้ราก' }
      ],
      product: {
        name: 'R-minu Hard Wax',
        desc: 'แว็กซ์แข็งพรีเมียมออลอินวันสำหรับใบหน้า ร่างกาย และบราซิลเลียน ลดการระคายเคืองผิวด้วยจุดหลอมเหลวต่ำ 50-55°C',
        price: '49,800',
        originalPrice: '69,000',
        discount: '28%',
        specs: [
          'Elasticity Tech: MI 150 ยืดหยุ่นสูง',
          'Hair Cohesion Tech: Abietic Acid 85%',
          'Adhesion Coating: ควบคุมรากขน',
          'Food Grade: วัตถุดิบระดับอาหารปลอดภัย'
        ]
      },
      cta: 'ซื้อบน Coupang',
      shop: {
        buyNow: 'ซื้อเลย',
        addToCart: 'เพิ่มลงตะกร้า',
        total: 'ยอดรวม',
        quantity: 'จำนวน',
        soldOut: 'สินค้าหมด',
        options: [
          { label: '200g × 1 ชิ้น', price: 9500 },
          { label: '400g × 1 ชิ้น', price: 14400 },
          { label: '500g × 1 ชิ้น', price: 14450 },
          { label: '1000g × 1 ชิ้น', price: 21140 },
        ],
        selectOption: 'เลือกตัวเลือก'
      },
      gallery: {
        pro1kg: 'R-minu 1kg มืออาชีพ',
        home200g: 'R-minu 200g ชุดใช้ที่บ้าน',
        texture: 'พรีเมียมเท็กซ์เจอร์'
      }
    },
    reviews: {
      title: 'รีวิว',
      photoReviews: 'รีวิวพร้อมรูปภาพ',
      allReviews: 'รีวิวทั้งหมด',
      source: 'แหล่งที่มา',
      purchaseVerified: 'ยืนยันการซื้อ'
    },
    footer: {
      rights: '© 2025 Ocean Tech Co., Ltd. All rights reserved.',
      companyName: 'Ocean Tech Co., Ltd.',
      businessNum: 'Registration No: 000-00-00000',
      tel: 'Tel: +82 10-7169-3438',
      email: 'Email: jbanion@naver.com'
    }
  }
};
