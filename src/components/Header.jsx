import { useNavigate, useLocation } from "react-router-dom";
import { getToken, removeToken } from "../utils/token";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = getToken();

  // 로그인 안 한 상태: Products / Login만 보여주기
  let role = null;
  if (token) {
    try {
      role = jwtDecode(token)?.role;
    } catch (e) {
      // 토큰이 깨진 경우 대비
      role = null;
    }
  }

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const go = (path) => navigate(path);

  const isAdmin = role === "ADMIN";
  const isLogin = location.pathname === "/login";

  return (
    <div
      style={{
        padding: 16,
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => go("/products")}>
        MiniBackoffice
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {/* 누구나 볼 수 있는 버튼 */}
        <button onClick={() => go("/products")}>상품목록</button>

        {/* 로그인 했을 때만 보이는 버튼 */}
        {token && (
          <>
            <button onClick={() => go("/me")}>MyPage</button>

            {/* 관리자만 보이는 버튼 */}
            {isAdmin && (
              <button onClick={() => go("/admin/products")}>관리자</button>
            )}

            <button onClick={handleLogout}>로그아웃</button>
          </>
        )}

        {/* 로그인 안 했고, 지금이 로그인 페이지가 아닐 때만 로그인 버튼 */}
        {!token && !isLogin && (
          <button onClick={() => go("/login")}>로그인</button>
        )}
      </div>
    </div>
  );
}
