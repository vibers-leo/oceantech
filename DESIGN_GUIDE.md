# Rminu (오션해양테크) — 디자인 가이드

> 상위 브랜드: 계발자들 (Vibers)
> 사업체: 오션해양테크 (OceanTech)

## 프로젝트 디자인 컨셉

프리미엄 왁싱 브랜드 듀얼 웹사이트. 전문가용 Lacan과 홈케어용 Alminer(R-minu) 두 브랜드를 하나의 사이트에서 운영한다.
고급스럽고 따뜻한 크림/골드 톤을 기반으로, 각 브랜드별 고유 컬러를 분리하여 브랜드 아이덴티티를 유지한다.

## 타이포그래피

- 한글/본문: Inter (`--font-sans`, `var(--font-sans)`)
- 영문 제목/세리프: Playfair Display (`--font-serif`, `var(--font-serif)`)
- 제목 사이즈: h1 56px (3.5rem), h2 40px (2.5rem), h3 28px (1.75rem)
- 본문 사이즈: 16px (1rem)
- 제목 굵기: 600 (semi-bold)
- 제목 행간: 1.2
- 본문 행간: 1.6
- 자간: h1 -0.02em, h2 -0.01em
- 한글 줄바꿈: `word-break: keep-all` (단어 단위 줄바꿈)

## 컬러 시스템

### 공통 (전역 CSS 변수)
| 변수명 | 값 | 용도 |
|--------|------|------|
| `--background` | `#fdfbf7` | 페이지 배경 (크림색) |
| `--foreground` | `#1a1a1a` | 기본 텍스트 |
| `--primary` | `#1a1a1a` | 주요 요소, 버튼 |
| `--secondary` | `#666666` | 보조 텍스트, 단락 |
| `--accent` | `#c5a065` | 골드 강조, 포커스 링 |
| `--accent-light` | `#e8dcc5` | 밝은 골드 (배경용) |
| `--surface` | `#FFFFFF` | 카드/패널 배경 |
| `--border` | `#E5E5E5` | 테두리 |

### Lacan 브랜드 (전문가용)
| 변수명 | 값 | 용도 |
|--------|------|------|
| `--lacan-primary` | `#5D4037` | 라캉 메인 (다크 브라운) |
| `--lacan-bg` | `#EDE0D4` | 라캉 배경 (베이지) |

### Alminer 브랜드 (홈케어용, R-minu)
| 변수명 | 값 | 용도 |
|--------|------|------|
| `--alminer-primary` | `#ff5c00` | 알마이너 메인 (비비드 오렌지) |
| `--alminer-accent` | `#ff8c00` | 알마이너 보조 (밝은 오렌지) |

## 레이아웃

- 최대 너비: 1200px (`.container`)
- 컨테이너 패딩: 0 20px
- 섹션 간격: `padding: 100px 0` (`.section`)
- 헤더 높이: 80px (`paddingTop: 80px`)
- 본문 최소 높이: 100vh

## 반응형 브레이크포인트

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## 컴포넌트 규칙

### 버튼 (`.btn`)
- 패딩: `12px 32px`
- 배경: `var(--primary)` (검정)
- 테두리: `1px solid var(--primary)`
- 텍스트: `uppercase`, `letter-spacing: 0.05em`, `font-size: 0.9rem`
- 전환: `all 0.3s ease`
- 호버: 배경 투명 + 텍스트 검정

### 아웃라인 버튼 (`.btn-outline`)
- 배경: 투명
- 테두리: `1px solid var(--primary)`
- 호버: 배경 검정 + 텍스트 흰색 (`.btn`의 역)

### 라우트 구조 (브랜드별 분리)
- `/` — 메인 (공통)
- `/lacan/` — Lacan 브랜드 전용 페이지
- `/alminer/` — Alminer 브랜드 전용 페이지
- `/shop/` — 쇼핑 (공통)
- `/shop/alminer/` — Alminer 전용 쇼핑
- `/about/` — 회사 소개
- `/business/` — B2B

## 애니메이션

- 전환: `all 0.3s ease` (기본)
- 페이드인: `fadeIn 0.8s ease-out forwards` (opacity 0→1, translateY 20px→0)
- 모션 줄이기 존중: `prefers-reduced-motion: reduce` 시 모든 애니메이션 비활성화

## 접근성

- 포커스 표시: `outline: 2px solid var(--accent)`, `outline-offset: 3px` (키보드 사용 시만)
- 마우스 사용 시: `outline: none` (`*:focus`)
- 키보드 전용: `*:focus-visible`로 분리
- 모션 줄이기: `@media (prefers-reduced-motion: reduce)` 지원
- 스크롤 동작: `scroll-behavior: smooth`

## 다국어 지원

- 기본 언어: 한국어 (ko)
- 지원 언어: 영어 (en), 태국어 (th)
- LanguageContext를 통한 동적 번역
