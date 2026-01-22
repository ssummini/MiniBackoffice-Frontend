// src/utils/token.js

const TOKEN_KEY = 'accessToken';

// 토큰 저장
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// 토큰 조회
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// 토큰 삭제 (로그아웃)
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
