# MiniBackoffice Frontend

MiniBackoffice는 관리자용 백오피스 프로젝트입니다.  
React 기반으로 화면을 구성하고, JWT 인증을 통해 백엔드 API와 연동했습니다.

---

## 🌐 Live Demo
- https://mini-backoffice-frontend.vercel.app

### 🔑 Test Account
- ADMIN: admin@test.com / 1234
- USER: user@test.com / 1234

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

## 🔐 Environment 변수
```env
VITE_API_BASE_URL=https://minibackoffice.onrender.com/api
```
- 로컬 개발 시 localhost 주소 사용
- 배포 시 Render 서버 주소 사용

---

## 🔐 인증 흐름

1. 로그인 성공 시 JWT 토큰을 localStorage에 저장
2. axios 요청 인터셉터에서 Authorization 자동 첨부
3. 401 응답 발생 시 토큰 삭제 후 로그인 페이지로 이동

```
Authorization: Bearer {token}
```

---

## 🧭 권한 정책
- /products : 누구나 접근 가능
- /me : 로그인 필요 (RequireAuth)
- /admin/products : ADMIN 전용 (RequireAdmin)

프론트에서는 UX 차원의 접근 제어를 수행하며,
실제 보안 검증은 백엔드에서 처리합니다.

---

## 🛒 관리자 상품 CRUD 구현 방식
- editingId로 등록/수정 모드 분기
- 등록/수정/삭제 후 fetchProducts() 재호출
- reload 없이 상태 기반 UI 갱신
- saving 상태로 중복 요청 방지
- validateForm()으로 1차 입력 검증

---
