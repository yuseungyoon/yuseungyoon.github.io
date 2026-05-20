# Vercel React Best Practices 성능 리뷰

> **대상 프로젝트:** Next.js 16 + React 19 블로그
> **리뷰 기준:** [Vercel React Best Practices v1.0.0](https://github.com/vercel/react-best-practices) — 58개 규칙, 8개 카테고리
> **리뷰 일자:** 2026-03-12

---

## 목차

1. [Eliminating Waterfalls (CRITICAL)](#1-eliminating-waterfalls-critical)
2. [Bundle Size Optimization (CRITICAL)](#2-bundle-size-optimization-critical)
3. [Server-Side Performance (HIGH)](#3-server-side-performance-high)
4. [Client-Side Data Fetching (MEDIUM-HIGH)](#4-client-side-data-fetching-medium-high)
5. [Re-render Optimization (MEDIUM)](#5-re-render-optimization-medium)
6. [Rendering Performance (MEDIUM)](#6-rendering-performance-medium)
7. [JavaScript Performance (LOW-MEDIUM)](#7-javascript-performance-low-medium)
8. [총평 요약](#8-총평-요약)

---

## 1. Eliminating Waterfalls (CRITICAL)

### 잘 된 점

- **`app/(routes)/server.ts:7`** — `Promise.allSettled`로 postList와 aboutPost를 병렬 fetch
- **`notionFetch.server.ts:87`** — `Promise.all`로 하위 블록을 병렬 재귀 resolve
- **`processBlock/index.server.ts:11`** — `pMap`으로 concurrency 제한된 병렬 처리

### 문제점

#### [async-parallel] `[year]/[slug]/page.tsx` — 3회 중복 호출

`generateStaticParams`, `generateMetadata`, `Post` 함수 모두 `getCachedPostList()`를 각각 호출합니다. `'use cache'`로 cross-request 캐싱은 되지만, 같은 요청 내에서 `React.cache()`로 deduplicate하면 더 효율적입니다.

```ts
// 현재: 3곳에서 각각 호출
export async function generateStaticParams() {
  const posts = await getCachedPostList(...)  // 1번째
}
export async function generateMetadata() {
  const posts = await getCachedPostList(...)  // 2번째
}
export default async function Post() {
  const posts = await getCachedPostList(...)  // 3번째
}
```

**권장:** `getCachedPostList`를 `React.cache()`로 감싸서 per-request deduplication 추가.

---

## 2. Bundle Size Optimization (CRITICAL)

### [bundle-barrel-imports] Barrel file `export *` 사용

7개의 barrel file이 `export *`로 re-export 중:

| 파일 | 패턴 |
|------|------|
| `features/about/index.ts` | `export * from './About'` |
| `features/navigation/index.ts` | `export * from './containers/Navigation'` |
| `features/tableOfContents/index.ts` | `export *` |
| `features/theme/index.ts` | `export *` |
| `features/notion/types/index.ts` | 5개 파일에서 `export *` |

대부분 소규모 모듈이고, 소비자도 barrel을 통해 import합니다. 타입 전용 barrel(`notion/types/index.ts`)은 런타임 영향 없으므로 무해합니다. 나머지도 모듈 크기가 작아 실질적 영향은 미미하지만, 규칙상 직접 import가 권장됩니다.

### [bundle-dynamic-imports] highlight.js 전체 번들 임포트 — 심각

**파일:** `features/notion/components/code/Code.tsx:3`

```ts
import hljs from 'highlight.js'
```

highlight.js 전체 번들(**~1MB**)을 클라이언트에 포함시킵니다. 이것이 이 프로젝트에서 **가장 큰 번들 사이즈 이슈**입니다.

**권장:**

```ts
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
// 필요한 언어만 등록
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
```

또는 서버 컴포넌트로 전환하여 코드 하이라이팅을 서버에서 처리 (클라이언트 번들 0).

### [bundle-dynamic-imports] katex 전체 번들

**파일:** `features/notion/components/equation/Equation.tsx:2`

```ts
import katex from 'katex'
```

katex(**~300KB+ CSS 포함**)를 모든 포스트에서 로드합니다. 수식이 없는 포스트에서도 번들에 포함됩니다. `Equation` 컴포넌트는 `componentMap.ts`에서 정적 import되어 있어, 모든 포스트 페이지에 katex가 포함됩니다.

**권장:** `next/dynamic`으로 lazy load:

```ts
const Equation = dynamic(
  () => import('../components/equation/Equation').then(m => ({ default: m.Equation }))
)
```

### [bundle-dynamic-imports] Youtube iframe

`Youtube.tsx`도 `componentMap.ts`에서 정적 import되어 있어, YouTube 없는 포스트에서도 로드됩니다. iframe 자체는 가벼우나, 별도 동적 import가 이상적입니다.

---

## 3. Server-Side Performance (HIGH)

### 잘 된 점

- `'use cache'` + `cacheLife('minutes')` 적절히 활용
- `'server-only'` import guard 사용
- bookmark metadata fetch에 `cacheLife('hours')` 적용

### [server-cache-react] React.cache() 미사용

위 1번에서 언급한 것처럼, `getCachedPostList`를 `React.cache()`로 감싸면 같은 렌더 패스 내에서 중복 호출을 제거할 수 있습니다.

### [server-serialization] 과도한 클라이언트 직렬화

**파일:** `[year]/[slug]/page.tsx:74`

```tsx
<Hydrate state={{ currentPost }} />
```

전체 Notion 블록 트리(재귀적으로 중첩된 children 포함)를 RSC → Client로 직렬화합니다. 포스트 길이에 따라 수백 KB의 JSON이 될 수 있습니다. 현재 `About` 컴포넌트도 동일 패턴(`HydrateOnce`)으로 전체 aboutBlocks를 직렬화합니다.

**권장:** `RenderNotion`을 서버 컴포넌트로 유지하고, 클라이언트에는 TOC용 heading 데이터만 전달하는 것을 고려.

### [server-auth-actions] API route 인증 미비

**파일:** `app/(server)/api/reload-img/route.ts`

```ts
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { id } = body
  const block = await getSingleBlock(id as string)
```

임의의 block ID로 Notion API를 호출할 수 있습니다. rate limiting이나 인증이 없어 남용 가능성이 있습니다.

---

## 4. Client-Side Data Fetching (MEDIUM-HIGH)

### [client-localstorage-schema] localStorage 매 렌더마다 읽기

**파일:** `features/theme/ThemeProvider.tsx:31`

```ts
const localSetting = typeof window !== 'undefined'
  ? (localStorage.getItem(localStorageKey) as Theme | null)
  : null
```

컴포넌트 함수 본문에서 매 렌더마다 `localStorage.getItem`을 호출합니다.

**권장:** `useState`의 lazy initializer로 이동:

```ts
const [theme, setTheme] = useState<Theme>(() => {
  if (typeof window === 'undefined') return 'system'
  return (localStorage.getItem(localStorageKey) as Theme) ?? 'system'
})
```

---

## 5. Re-render Optimization (MEDIUM)

### [rerender-memo-with-default-value] ThemeProvider context value 재생성

**파일:** `ThemeProvider.tsx:50-56`

```tsx
<ThemeContext.Provider value={{ theme, appliedTheme, setTheme, toggleTheme }}>
```

매 렌더마다 새 객체가 생성되어, 모든 `useContext(ThemeContext)` 소비자가 re-render됩니다.

**권장:** `useMemo`로 감싸기:

```ts
const value = useMemo(
  () => ({ theme, appliedTheme, setTheme, toggleTheme }),
  [theme, appliedTheme]
)
```

> 참고: `NavigationProvider.tsx:20`은 이미 `useMemo`를 올바르게 적용 — 좋은 패턴입니다.

### [rerender-derived-state-no-effect] Hydrate.tsx의 불필요한 useEffect

**파일:** `app/(routes)/[year]/[slug]/(client)/Hydrate.tsx:18`

```ts
useHydrateAtoms([[currentPostAtom, state.currentPost]])
const setCurrentPost = useSetAtom(currentPostAtom)
useEffect(() => {
  setCurrentPost(state.currentPost)
}, [state.currentPost, setCurrentPost])
```

`useHydrateAtoms`는 최초 1회만 hydrate하므로, 이후 포스트 이동 시 atom을 업데이트하기 위한 `useEffect`입니다. 이 패턴 자체는 의도적이지만, effect 대신 렌더 중에 직접 상태를 동기화하는 것이 더 빠릅니다:

```ts
// React 19에서는 렌더 중 setState가 가능 (조건부)
const prevRef = useRef(state.currentPost)
if (state.currentPost !== prevRef.current) {
  prevRef.current = state.currentPost
  setCurrentPost(state.currentPost)
}
```

### [rerender-simple-expression-in-memo] HamburgerMenu 중복 호출

**파일:** `HamburgerMenu.tsx:23-24`

```tsx
<Link href={`/${y}/${getNotionPageMeta(p).slug}`}>
  {getNotionPageMeta(p).title}
</Link>
```

같은 `p`에 대해 `getNotionPageMeta`를 2번 호출합니다. 변수로 추출하면 됩니다:

```ts
const meta = getNotionPageMeta(p)
<Link href={`/${y}/${meta.slug}`}>{meta.title}</Link>
```

---

## 6. Rendering Performance (MEDIUM)

### [rendering-conditional-render] && 대신 삼항 권장

**파일:** `TableOfContentsContainer.tsx:11`

```tsx
headings.length > 0 && (<aside>...</aside>)
```

`headings.length > 0`이 boolean을 반환하므로 `0` 렌더링 버그는 없지만, 규칙상 삼항이 권장됩니다:

```tsx
headings.length > 0 ? (<aside>...</aside>) : null
```

### [rendering-hydration-no-flicker] 테마 깜빡임 가능성

`ThemeProvider.tsx`는 `'use client'`로 클라이언트에서 `localStorage`를 읽고 `document.body.dataset.theme`을 설정합니다. SSR → hydration 사이에 테마가 적용되지 않아 **FOUC(Flash of Unstyled Content)**가 발생할 수 있습니다.

**권장:** `<head>`에 인라인 `<script>`로 초기 테마를 설정하여 깜빡임 방지.

---

## 7. JavaScript Performance (LOW-MEDIUM)

### [js-hoist-regexp] Bookmark에서 렌더마다 RegExp 생성

**파일:** `Bookmark.tsx:10`

```ts
const editedUrl = (url: string) => {
  const edited = url.replace(/^(http?:\/\/)?(https?:\/\/)?(www\.)?/, '')
```

함수가 렌더마다 재생성됩니다. 모듈 스코프로 호이스트하면 됩니다:

```ts
const URL_PREFIX_RE = /^(http?:\/\/)?(https?:\/\/)?(www\.)?/
const editedUrl = (url: string) => {
  const edited = url.replace(URL_PREFIX_RE, '').replace(/\/$/, '')
  // ...
}
```

### [js-combine-iterations] filter 대신 find 사용

**파일:** `[year]/[slug]/page.tsx:60`

```ts
const [matchPost] = posts.filter(post => getNotionPageMeta(post).slug === slug)
```

`filter`는 전체 배열을 순회합니다. `find`가 더 효율적입니다:

```ts
const matchPost = posts.find(post => getNotionPageMeta(post).slug === slug)
```

---

## 8. 총평 요약

| 우선순위 | 카테고리 | 현재 상태 | 핵심 개선 사항 |
|---------|---------|----------|--------------|
| **CRITICAL** | Waterfalls | Good | `React.cache()`로 per-request dedup |
| **CRITICAL** | Bundle Size | **문제 있음** | hljs core import, katex dynamic import |
| **HIGH** | Server-Side | Good | 직렬화 최소화, API route 인증 |
| **MEDIUM-HIGH** | Client Data | OK | localStorage lazy init |
| **MEDIUM** | Re-renders | Minor | ThemeProvider useMemo, 중복 함수 호출 제거 |
| **MEDIUM** | Rendering | Minor | 테마 FOUC 방지 |
| **LOW-MEDIUM** | JS Perf | Minor | RegExp/함수 호이스트, `filter` → `find` |

### 가장 임팩트 큰 3가지 액션

1. **`highlight.js` → `highlight.js/lib/core`** + 필요 언어만 등록 (번들 ~800KB 절감)
2. **`Equation` 컴포넌트를 `next/dynamic`으로** lazy load (katex ~300KB 절감)
3. **`ThemeProvider`의 context value를 `useMemo`로** 감싸기 (전역 re-render 방지)
