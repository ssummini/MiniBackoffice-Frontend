import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/token';
import { jwtDecode } from 'jwt-decode';

function RequireAdmin({ children }) {
  const token = getToken();

  // 1) 토큰 없으면 로그인으로
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2) 토큰 해독해서 role 확인
  const decoded = jwtDecode(token);

  // 3) ADMIN 아니면 권한 없음 페이지로
  if (decoded.role !== 'ADMIN') {
    return <Navigate to="/forbidden" replace />;
  }

  // 4) ADMIN이면 통과 → 관리자 페이지 보여줌
  return children;
}

export default RequireAdmin;
