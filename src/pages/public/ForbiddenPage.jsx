import { useNavigate } from "react-router-dom";

function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h2>접근 권한이 없습니다</h2>
      <p>관리자 권한이 필요한 페이지입니다.</p>

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button onClick={() => navigate("/products")}>상품 목록으로</button>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    </div>
  );
}

export default ForbiddenPage;
