# 성능 평가 보고서: 적용 전/후 비교 분석

> **대상 프로젝트:** Next.js 16 + React 19 블로그
> **기준 빌드:** `.next/static/` 기반 (Turbopack dev build, 2026-03-12)
> **분석 도구:** 파일 크기 측정 + gzip 압축 비교
> **참조 문서:** [`performance-review.md`](./performance-review.md)

---

## 목차

1. [현재 상태 (Before)](#1-현재-상태-before)
2. [최적화 후 예상 (After)](#2-최적화-후-예상-after)
3. [항목별 상세 분석](#3-항목별-상세-분석)
4. [예상 사용자 체감 영향](#4-예상-사용자-체감-영향)
5. [권장 적용 순서](#5-권장-적용-순서)

---

## 1. 현재 상태 (Before)

### 클라이언트 JS 번들 전체

| 항목 | Raw | Gzip |
|------|-----|------|
| **전체 JS** | 2,838 KB | 889 KB |
| highlight.js (2 chunks) | 1,919 KB | 610 KB |
| katex (1 chunk) | 269 KB | 77 KB |
| **hljs + katex 합계** | **2,188 KB** | **688 KB** |
| 나머지 (React, Next.js, App) | 651 KB | 201 KB |

> highlight.js + katex가 전체 클라이언트 JS의 **77.3%** (gzip 기준)를 차지합니다.

### 청크별 상세

| 청크 | Raw | Gzip | 내용 |
|------|-----|------|------|
| `75f28a6a.js` | 960 KB | 305 KB | highlight.js (194개 언어) + 컴포넌트 |
| `a30638696.js` | 960 KB | 305 KB | highlight.js (194개 언어) + 컴포넌트 |
| `b270f51e.js` | 269 KB | 77 KB | katex |
| `aee6c772.js` | 219 KB | ~65 KB | Next.js App Router |
| `a6dad97d.js` | 110 KB | ~35 KB | Polyfills |
| `7d6514a9.js` | 108 KB | ~33 KB | React runtime |
| `0a16bee2.js` | 81 KB | ~25 KB | React DOM |
| 기타 7개 청크 | 131 KB | ~44 KB | Turbopack, manifest 등 |

### CSS

| 파일 | 크기 |
|------|------|
| `9adc65f9.css` (Vanilla Extract + hljs + katex) | 27 KB |
| `03139046.css` | 105 B |

---

## 2. 최적화 후 예상 (After)

### 2.1 highlight.js: 전체 → core + 선택적 언어

**현재:** `import hljs from 'highlight.js'` → 194개 언어 전체 포함

**최적화:** `import hljs from 'highlight.js/lib/core'` + 실제 사용 언어만 등록

| 항목 | Before (Gzip) | After (Gzip) | 절감 |
|------|--------------|-------------|------|
| highlight.js core | — | 22 KB | — |
| 23개 주요 언어 | — | 63 KB | — |
| **highlight.js 합계** | **610 KB** | **~85 KB** | **-525 KB (86% 감소)** |

> **주요 언어 목록 (23개):** JavaScript, TypeScript, Python, CSS, XML, JSON, Bash, Shell, YAML, Markdown, Go, Rust, Java, C, C++, Kotlin, Swift, SQL, Ruby, PHP, Dart, Dockerfile, Makefile
>
> 이 목록은 `getCodeLang.ts`에서 정의된 언어와 블로그 기술 특성을 기반으로 선정했습니다.

### 2.2 katex: 정적 import → next/dynamic

**현재:** `componentMap.ts`에서 `Equation`을 정적 import → 모든 포스트에 katex 번들 포함

**최적화:** `next/dynamic`으로 lazy load → 수식이 있는 포스트에서만 로드

| 항목 | Before (Gzip) | After (Gzip) | 절감 |
|------|--------------|-------------|------|
| 수식 없는 포스트 | 77 KB | 0 KB | **-77 KB (100%)** |
| 수식 있는 포스트 | 77 KB | 77 KB (lazy) | 0 (지연 로드) |

### 2.3 ThemeProvider useMemo

**현재:** Context value 객체를 매 렌더마다 재생성 → 모든 소비자 re-render

**최적화:** `useMemo`로 안정적 참조 유지

| 항목 | Before | After | 영향 |
|------|--------|-------|------|
| Theme 변경 시 re-render | Navigation + 모든 소비자 | theme 변경 시에만 | 불필요 re-render 제거 |

### 2.4 기타 최적화

| 항목 | 영향 규모 | 설명 |
|------|----------|------|
| `filter` → `find` | Negligible | 포스트 수 적어 실질 차이 미미 |
| `getNotionPageMeta` 중복 호출 제거 | Negligible | 함수 자체가 가벼움 |
| localStorage lazy init | Minor | 렌더당 ~0.1ms 절감 |
| Bookmark RegExp 호이스트 | Negligible | 서버 컴포넌트로 렌더 |
| `React.cache()` 추가 | Minor | `'use cache'`로 이미 캐싱 중 |

---

## 3. 항목별 상세 분석

### 3.1 번들 사이즈 종합 비교

```
Before (Gzip)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
highlight.js  ████████████████████████████ 610 KB (68.6%)
katex         ███                           77 KB  (8.7%)
나머지         █████████                    201 KB (22.6%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
총합: 889 KB

After (Gzip) - 수식 없는 포스트 기준
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
highlight.js  ██████                        85 KB (29.7%)
katex                                        0 KB  (0.0%)
나머지         ██████████████████████       201 KB (70.3%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
총합: 286 KB
```

### 3.2 네트워크 전송 시간 추정

| 네트워크 | Before | After | 개선 |
|---------|--------|-------|------|
| 4G (10 Mbps) | ~711 ms | ~229 ms | **-482 ms (67.8%)** |
| 3G (1.5 Mbps) | ~4,741 ms | ~1,525 ms | **-3,216 ms (67.8%)** |
| WiFi (50 Mbps) | ~142 ms | ~46 ms | **-96 ms (67.8%)** |

> 계산 기준: `파일크기(KB) × 8 / 속도(Kbps) × 1000 = ms`
> 실제로는 HTTP/2 멀티플렉싱, CDN 캐시, 브라우저 캐시 등으로 차이가 있을 수 있습니다.

### 3.3 Parse/Compile 시간 추정

JavaScript 파싱/컴파일은 일반적으로 1MB당 ~100-200ms (모바일 기준)입니다.

| 기기 | Before (889 KB) | After (286 KB) | 개선 |
|------|----------------|---------------|------|
| 모바일 (저사양) | ~178 ms | ~57 ms | **-121 ms** |
| 모바일 (고사양) | ~89 ms | ~29 ms | **-60 ms** |
| 데스크톱 | ~22 ms | ~7 ms | **-15 ms** |

### 3.4 Core Web Vitals 영향 예측

| 지표 | 영향 | 설명 |
|------|------|------|
| **LCP** (Largest Contentful Paint) | 간접 개선 | JS 로드 감소 → 메인 스레드 여유 → 렌더 빨라짐 |
| **FID/INP** (Interaction to Next Paint) | 직접 개선 | JS 파싱 시간 감소 → 인터랙션 응답 시간 개선 |
| **CLS** (Cumulative Layout Shift) | 변화 없음 | 번들 최적화와 무관 |
| **TTFB** (Time to First Byte) | 변화 없음 | 서버 응답 시간에는 영향 없음 |
| **FCP** (First Contentful Paint) | 간접 개선 | 클라이언트 JS 감소로 hydration 빨라짐 |
| **TTI** (Time to Interactive) | **직접 개선** | 가장 큰 체감 차이 예상 |

---

## 4. 예상 사용자 체감 영향

### 첫 방문 (빈 캐시)

| 시나리오 | Before | After | 체감 |
|---------|--------|-------|------|
| 모바일 4G, 첫 포스트 진입 | JS 다운로드 ~711ms + 파싱 ~178ms | JS 다운로드 ~229ms + 파싱 ~57ms | **~603ms 빨라짐** |
| 데스크톱 WiFi, 첫 포스트 진입 | JS 다운로드 ~142ms + 파싱 ~22ms | JS 다운로드 ~46ms + 파싱 ~7ms | **~111ms 빨라짐** |

### 재방문 (브라우저 캐시)

번들 해시가 변경되지 않는 한 차이 없음. 다만 **최초 캐시 적재 시간이 짧아지므로** 캐시 miss 시 이점이 큼.

### 수식이 포함된 포스트

katex가 lazy load되므로 초기 로드는 빨라지지만, 수식 영역이 처음 렌더될 때 순간적으로 로딩 상태가 보일 수 있습니다. `next/dynamic`의 `loading` prop으로 적절한 placeholder를 제공하면 됩니다.

---

## 5. 권장 적용 순서

### Phase 1: 고임팩트, 저위험 (즉시 적용)

| # | 작업 | 예상 효과 | 난이도 |
|---|------|----------|--------|
| 1 | **highlight.js → core + 선택적 언어** | gzip -525 KB | 낮음 |
| 2 | **Equation → next/dynamic** | gzip -77 KB (조건부) | 낮음 |
| 3 | **ThemeProvider useMemo** | re-render 감소 | 매우 낮음 |

**Phase 1 예상 결과:** 전체 gzip 889 KB → **~286 KB (67.8% 감소)**

### Phase 2: 중간 임팩트 (점진적 적용)

| # | 작업 | 예상 효과 | 난이도 |
|---|------|----------|--------|
| 4 | Code 컴포넌트 서버 컴포넌트 전환 | hljs 클라이언트 번들 완전 제거 | 중간 |
| 5 | 테마 FOUC 방지 인라인 스크립트 | UX 개선 | 중간 |
| 6 | React.cache() 적용 | 서버 요청 중복 제거 | 낮음 |

### Phase 3: 저임팩트, 코드 품질 (선택적 적용)

| # | 작업 | 예상 효과 | 난이도 |
|---|------|----------|--------|
| 7 | Barrel file → 직접 import | Tree-shaking 개선 (미미) | 낮음 |
| 8 | localStorage lazy init | 렌더당 ~0.1ms | 매우 낮음 |
| 9 | filter → find 변환 | Negligible | 매우 낮음 |
| 10 | HamburgerMenu 중복 호출 제거 | Negligible | 매우 낮음 |
| 11 | Hydrate.tsx useEffect 제거 | Minor | 낮음 |

---

## 부록: 측정 데이터 원본

### A. 청크별 상세 크기

| 청크 해시 | Raw (bytes) | Gzip (bytes) | 주요 내용 |
|-----------|-------------|-------------|-----------|
| `75f28a6a` | 982,569 | 312,595 | hljs 194 langs + 컴포넌트 |
| `a3063869` | 982,569 | 312,604 | hljs 194 langs + 컴포넌트 |
| `b270f51e` | 275,641 | 79,511 | katex |
| `aee6c772` | 224,413 | — | Next.js App Router |
| `a6dad97d` | 112,594 | — | Polyfills (core-js) |
| `7d6514a9` | 111,078 | — | React runtime |
| `0a16bee2` | 82,740 | — | React DOM |
| `119132cc` | 53,116 | — | 앱 컴포넌트 |
| `a5db1114` | 30,758 | — | 앱 컴포넌트 |
| `ce8fca4c` | 24,984 | — | 앱 컴포넌트 |
| `05525d53` | 11,336 | — | 앱 컴포넌트 |
| `turbopack` | 10,232 | — | Turbopack runtime |
| `f170b233` | 4,295 | — | 소형 청크 |
| `ff1a16fa` | 282 | — | 소형 청크 |

### B. highlight.js 언어별 gzip 크기

| 언어 | Raw | Gzip |
|------|-----|------|
| Swift | 22,512 B | 6,622 B |
| TypeScript | 21,354 B | 6,658 B |
| CSS | 18,879 B | 5,448 B |
| JavaScript | 17,751 B | 5,573 B |
| PHP | 14,420 B | 4,439 B |
| C++ | 12,684 B | 4,001 B |
| SQL | 11,985 B | 3,698 B |
| Ruby | 9,939 B | 3,423 B |
| Python | 9,185 B | 2,725 B |
| C | 8,287 B | 3,051 B |
| Kotlin | 7,459 B | 2,419 B |
| XML | 7,002 B | 1,749 B |
| Bash | 6,518 B | 2,367 B |
| Rust | 6,125 B | 2,016 B |
| Java | 6,228 B | 2,122 B |
| YAML | 5,017 B | 1,919 B |
| Markdown | 5,248 B | 1,806 B |
| Dart | 4,706 B | 1,527 B |
| Go | 3,190 B | 1,112 B |
| Makefile | 2,198 B | 1,029 B |
| JSON | 1,338 B | 765 B |
| Shell | 786 B | 501 B |
| Dockerfile | 904 B | 550 B |
| **Core** | **76,800 B** | **22,405 B** |

### C. CSS 크기

| 파일 | 크기 |
|------|------|
| 메인 CSS (vanilla-extract + hljs + katex) | 27 KB |
| 기타 CSS | 105 B |
