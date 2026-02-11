# MiniBackoffice Frontend

MiniBackoffice는 관리자용 백오피스 프로젝트입니다.  
React 기반으로 화면을 구성하고, JWT 인증을 통해 백엔드 API와 연동했습니다.

---

## 🛠 Tech Stack
- React (Vite)
- React Router
- Axios
- JWT (localStorage 저장 방식)

---

## 🚀 실행 방법

```bash
npm install
npm run dev
```

---

## 🔐 Environment 설정
### .env 파일에 API 서버 주소를 설정합니다.
- 로컬 개발 시 localhost 주소 사용
- 배포 시 Render 서버 주소 사용

---

## 📁 폴더 구조
```bash
src/
 ├─ api/
 │   ├─ axios.js         // 공통 axios 인스턴스 + 인터셉터
 │   ├─ authApi.js       // 로그인 API
 │   ├─ productApi.js    // 상품 CRUD API
 │   └─ userApi.js       // 내 정보 조회
 ├─ auth/
 │   ├─ RequireAdmin.jsx // 관리자 전용 접근 제어
 │   └─ RequireAuth.jsx  // 로그인 여부 체크
 ├─ pages/
 │   ├─ public/
 │   │   ├─ LoginPage.jsx
 │   │   └─ ForbiddenPage.jsx
 │   ├─ user/
 │   │   ├─ ProductListPage.jsx
 │   │   └─ MyPage.jsx
 │   └─ admin/
 │       ├─ AdminProductPage.jsx
 │       ├─ AdminProductForm.jsx
 │       └─ AdminProductItem.jsx
 └─ utils/
     └─ token.js         // accessToken 저장/조회/삭제
```

---

## 🔐 인증 흐름

1. 로그인 성공 시 JWT 토큰을 localStorage에 저장
2. axios 요청 인터셉터에서 Authorization 자동 첨부
3. 401 응답 발생 시 토큰 삭제 후 로그인 페이지로 이동

```
Authorization: Bearer {token}
```

---

## 🧭 라우팅 및 권한 정책

프론트에서는 UX 개선을 위해 권한 분기를 처리하고,
실제 보안 검증은 백엔드에서 수행합니다.

- RequireAdmin 컴포넌트로 관리자 페이지 접근 제어
- 로그인 여부는 RequireAuth에서 1차 체크

---

## 🛒 관리자 상품 CRUD 구현 방식
- editingId로 등록/수정 모드 분기
- 등록/수정/삭제 후 fetchProducts() 재호출
- saving 상태로 중복 요청 방지
- validateForm()으로 1차 입력 검증
- reload 없이 상태 기반 화면 갱신

---

## 🎯 프로젝트에서 중점적으로 구현한 부분
- JWT 인증 구조 이해 및 연결
- 프론트/백엔드 권한 분리 흐름 구현
- axios 인터셉터 기반 토큰 자동 처리
- 역할 기반 컴포넌트 구조 분리
- 상태 기반 UI 업데이트 (reload 제거)