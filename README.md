# Notion API를 이용한 블로그

## 실행 및 배포

- 로컬 `.env`에 `NOTION_TECH_KEY`, `NOTION_TECH_DATABASE_ID`를 설정합니다. Notion에서 해당 데이터베이스를 통합에 연결해야 합니다.
- `bun run build`는 공개 글의 스냅샷과 이미지 파일을 만든 뒤 Next.js 정적 사이트를 `out/`에 생성합니다.
- `bun run dev`는 기존 스냅샷을 재사용합니다. 최신 글을 가져오려면 `bun run notion:fetch`를 실행한 뒤 개발 서버를 다시 시작합니다.
- GitHub Pages 배포에서는 `NOTION_TECH_KEY`를 GitHub Actions Secret에, `NOTION_TECH_DATABASE_ID`를 Repository Variable에 설정합니다. 수동 실행과 매일 자정(한국 시간) 빌드로 Notion 변경사항을 반영합니다.

## 링크

- [스타일 및 컨벤션 가이드](https://github.com/yhoiy/blog/blob/main/.gemini/styleguide.md)
- [이전 코드(v1)](https://github.com/yhoiy/blog-with-notion)

## 기술 스택

- 언어: JavaScript, TypeScript
- 런타임: bun
- 코어: React, Next.js
- 상태 관리: Jotai, Context API
- 스타일링: Vanilla Extract
- CMS: Notion SDK
- 코드 리뷰: Gemini Code Assist
