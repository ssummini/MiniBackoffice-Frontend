// src/api/authApi.js
import api from './axios';

/**
 * 로그인 API
 * @param {Object} loginData
 * @param {string} loginData.email
 * @param {string} loginData.password
 */
export async function login(loginData) {
  const response = await api.post('/users/login', loginData);
  return response.data;
}
