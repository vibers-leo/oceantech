## 전략 문서 (개발 전 반드시 숙지)
- **전략 진단 리포트**: `data/STRATEGY_ANALYSIS.md`
- **PM 공통 지침**: 맥미니 루트 `pm.md`

### 전략 핵심 요약
- Vibers 주요 수익 프로젝트 — 듀얼 브랜드 E-commerce 운영 중
- Firebase + PortOne 결제 통합, 다국어(한/영/태) 지원
- 고객 리뷰 기능 및 추천 엔진으로 반복 구매 유도 강화

---

# Rminu (오션해양테크)

## 프로젝트 개요
오션해양테크의 듀얼 브랜드 웹사이트. 전문가용 Lacan 왁스와 홈케어용 Alminer(R-minu) 브랜드를 통합 운영한다.
Firebase 인증/DB + PortOne 결제 연동. 다국어(한/영/태) 지원.

## 브랜드 구조
- **오션해양테크 (OceanTech)**: 모회사 (rminu.com)
- **Lacan (라캉)**: 전문가용 프리미엄 왁스 브랜드 — 다크 브라운 (`#5D4037`) / 베이지 배경 (`#EDE0D4`)
- **Alminer (알마이너, R-minu)**: 홈케어용 왁스 브랜드 — 비비드 오렌지 (`#ff5c00`) / 밝은 오렌지 (`#ff8c00`)

## 기술 스택
- Framework: Next.js 16.1
- Language: TypeScript
- Styling: CSS Modules (`.module.css`) + 전역 CSS 변수
- Auth/DB: Firebase
- 결제: PortOne
- 폰트: Inter (본문), Playfair Display (제목)
- AI: AIChatBot 컴포넌트 내장
- Package Manager: bun (권장) / npm

## 프로젝트 구조
```
rminu/
├── src/
│   ├── app/
│   │   ├── globals.css        ← 전역 CSS 변수, 컬러 토큰
│   │   ├── layout.tsx          ← 루트 레이아웃 (Inter, Playfair Display)
│   │   ├── page.tsx            ← 메인 페이지
│   │   ├── lacan/              ← Lacan 브랜드 전용 라우트
│   │   ├── alminer/            ← Alminer 브랜드 전용 라우트
│   │   ├── shop/               ← 쇼핑 (공통 + alminer 하위)
│   │   ├── about/              ← 회사 소개
│   │   ├── business/           ← B2B 페이지
│   │   ├── admin/              ← 관리자 (가격 시뮬레이터, 스토어 상태)
│   │   └── export-voucher/     ← 수출바우처 관련
│   ├── components/
│   │   ├── Header.tsx          ← 네비게이션 헤더
│   │   ├── Footer.tsx          ← 푸터
│   │   ├── AIChatBot.tsx       ← AI 챗봇
│   │   ├── ScrollToTop.tsx     ← 스크롤 상단 이동
│   │   ├── ui/                 ← 공통 UI (Button, Section)
│   │   └── admin/              ← 관리자 전용 컴포넌트
│   ├── context/
│   │   ├── LanguageContext.tsx  ← 다국어 컨텍스트
│   │   ├── AuthContext.tsx      ← 인증 컨텍스트
│   │   └── ToastContext.tsx     ← 토스트 알림
│   ├── lib/
│   │   └── translations.ts     ← 번역 데이터
│   └── data/
│       └── export-voucher.json ← 수출바우처 데이터
```

## 디자인 특징
- 크림/골드 기반 고급스러운 톤 (배경 #fdfbf7, 액센트 #c5a065)
- 브랜드별 컬러 분리: Lacan(브라운) vs Alminer(오렌지)
- CSS Modules 사용 (Tailwind CSS 미사용)
- 세리프 폰트(Playfair Display)로 프리미엄 감성 표현
- 상세 내용은 DESIGN_GUIDE.md 참조

## 개발 규칙

### 코드 스타일
- 시맨틱 라인 브레이크: UI 텍스트는 의미 단위로 줄바꿈
- 한글 우선 원칙: 모든 UI 텍스트와 주석은 한국어
- TypeScript strict mode 사용
- 스타일링: CSS Modules (`.module.css`) — Tailwind 아님

### 디자인 준수
- 반응형 브레이크포인트: 640, 768, 1024, 1280px
- 브랜드별 컬러 토큰 준수 (globals.css 변수)
- 접근성: WCAG 2.1 AA 기준, 키보드 포커스 표시, 모션 줄이기 지원
- 상세 규칙은 DESIGN_GUIDE.md 참조

### Git 규칙
- 커밋 메시지: 한글 (feat:, fix:, refactor:, chore: 접두사)
- 브랜치: main → feature/기능명
- PR 필수 (셀프 리뷰 가능)

### 배포
- 도메인: rminu.com
- 대상 서버: NCP (server.vibers.co.kr)
- Docker 컨테이너 기반 배포 예정
- CI/CD: GitHub Actions

## 주요 명령어
```bash
bun install        # 의존성 설치
bun dev            # 개발 서버
bun run build      # 빌드
bun test           # 테스트
```

## 환경 변수
- Firebase 관련: `NEXT_PUBLIC_FIREBASE_*`
- PortOne 결제: `NEXT_PUBLIC_PORTONE_*`
- 사이트 URL: `NEXT_PUBLIC_SITE_URL`

## AI Recipe 이미지 API

이 프로젝트는 **AI Recipe 중앙 이미지 서비스**를 사용합니다.

### 사용 가능한 함수

```typescript
import { searchStockImage, generateAIImage } from '@/lib/ai-recipe-client';
```

### Stock Image 검색
```typescript
const image = await searchStockImage('premium beauty product wax', {
  orientation: 'squarish',
  size: 'medium',
});
// → { url, provider, alt, photographer, ... }
```

### AI 이미지 생성
```typescript
const image = await generateAIImage('luxury hair wax product photography, cream gold aesthetic', {
  size: 'large',
  provider: 'auto',
});
// → { url, prompt, provider }
```

### 주요 용도
- 제품 이미지 (Lacan/Alminer)
- 브랜드 비주얼
- 배너/프로모션 이미지

### 주의사항
- Server Action이나 API Route에서만 사용 (API 키 보호)
- Rate Limit: 1000회/일
- AI Recipe 서버 실행 필요: http://localhost:3300

## 상위 브랜드
- 회사: 계발자들 (Vibers)
- 도메인: vibers.co.kr
- 서버: server.vibers.co.kr


## 세션로그 기록 (필수)
- 모든 개발 대화의 주요 내용을 `session-logs/` 폴더에 기록할 것
- 파일명: `YYYY-MM-DD_한글제목.md` / 내용: 한글
- 세션 종료 시, 마일스톤 달성 시, **컨텍스트 압축 전**에 반드시 저장
- 상세 포맷은 상위 CLAUDE.md 참조
