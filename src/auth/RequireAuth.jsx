import { Navigate } from "react-router-dom";
import { getToken } from "../utils/token";

function RequireAuth({ children }) {
  const token = getToken();

  // 토큰이 없으면 로그인 페이지로 보냄
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 토큰이 있으면 자식 컴포넌트를 그대로 보여줌
  return children;
}

export default RequireAuth;