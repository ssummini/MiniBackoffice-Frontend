import { useEffect, useState } from "react";
import { getMe } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

function MyPage() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  useEffect(() => {
    async function fetchMe() {
      try {
        const data = await getMe(); // 토큰이 있으면 axios 인터셉터가 자동으로 Authorization 붙임
        setMe(data);
      } catch (e) {
        console.error(e);
        alert("내 정보 조회 실패");
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (!me) return <div>내 정보가 없습니다.</div>;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>My Page</h2>
        <button onClick={handleLogout}>로그아웃</button>
      </div>

      <div style={{ border: "1px solid #ddd", padding: 12, marginTop: 12 }}>
        <div>이메일: {me.email}</div>
        <div>이름: {me.name}</div>
        <div>권한: {me.role}</div>
        <div>상태: {me.status}</div>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate("/products")}>상품 목록으로</button>
      </div>
    </div>
  );
}

export default MyPage;
