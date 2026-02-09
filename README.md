# MiniBackoffice Frontend

## 역할
- React 기반 관리자/유저 화면 구성
- JWT 인증 기반 API 연동

## 구조
- api/
  - axios.js : 공통 axios 인스턴스 + 인터셉터
  - authApi.js / productApi.js
- utils/
  - token.js : accessToken 관리
- pages/
  - LoginPage
  - ProductListPage
  - AdminProductPage

## 인증 흐름
Login → token 저장 → axios 인터셉터로 Authorization 자동 첨부

## 관리자 상품 CRUD
- editingId로 등록/수정 모드 분기
- 등록/수정/삭제 후 fetchProducts로 목록 재조회
