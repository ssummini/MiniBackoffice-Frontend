import { useEffect, useState } from 'react';
import { createProduct, getProducts, deleteProduct, updateProduct } from '../../api/productApi';

import AdminProductForm from './AdminProductForm';
import AdminProductItem from './AdminProductItem';

import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

function AdminProductPage() {
  const navigate = useNavigate();

  // 로그아웃
  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  // 등록 폼 state
  const [form, setForm] = useState({
    name: '',
    price: '',
    stockQuantity: '',
    status: 'SELLING',
    thumbnailUrl: '',
  });

  // 목록 state
  const [products, setProducts] = useState([]);

  // 수정 state
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  // 폼 초기화(등록/수정 완료, 수정 취소 시 공통으로 사용)
  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: '',
      price: '',
      stockQuantity: '',
      status: 'SELLING',
      thumbnailUrl: '',
    });
  };


  // 입력값 1차 검증(프론트)
  // 통과하면 null, 실패하면 에러 메시지 문자열 반환
  const validateForm = () => {
    if (!form.name.trim()) return "상품명을 입력해주세요.";

    const price = Number(form.price);
    if (!Number.isFinite(price) || price <= 0) return "가격은 0보다 큰 숫자여야 합니다.";

    const stock = Number(form.stockQuantity);
    if (!Number.isFinite(stock) || stock < 0) return "재고는 0 이상 숫자여야 합니다.";

    // 상태는 select라 보통 문제 없지만, 안전하게 체크
    const allowed = ["SELLING", "SOLD_OUT", "HIDDEN"];
    if (!allowed.includes(form.status)) return "상품 상태 값이 올바르지 않습니다.";

    return null;
  };


  // 공통 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 목록 재조회 함수 (등록/수정/삭제 후 화면 갱신용)
  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };


  // 페이지 들어오면 목록 로드
  useEffect(() => {
    async function init() {
      try {
        await fetchProducts();
      } catch (e) {
        console.error(e);
        alert('상품 목록 불러오기 실패');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);


  // 이벤트 핸들러 (3개)
  // 1. 수정 버튼
  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      stockQuantity: product.stockQuantity,
      status: product.status,
      thumbnailUrl: product.thumbnailUrl ?? '',
    });
  };

  // 2. editingId 있으면 수정 없으면 등록
  const handleSubmit = async () => {
    if (saving) return;  // 저장 중 연타 방지 

    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    setSaving(true);

    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
        status: form.status,
        thumbnailUrl: form.thumbnailUrl,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        alert('수정 완료');
      } else {
        await createProduct(payload);
        alert('등록 완료');
      }

      resetForm();
      await fetchProducts();
    } catch (e) {
      console.error(e);
      alert(editingId ? '수정 실패' : '등록 실패');
    } finally {
      setSaving(false);
    }
  };


  // 3. 삭제 버튼
  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteProduct(id);
      alert('삭제 완료');
      await fetchProducts(); // 목록 재조회
    } catch (e) {
      console.error(e);
      alert('삭제 실패');
    }
  };


  if (loading) return <div>로딩중...</div>;

  return (
    <div style={{ padding: 16 }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Admin - Product</h2>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => navigate("/products")}>유저 상품목록</button>
          <button onClick={() => navigate("/me")}>MyPage</button>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      </div>

      <AdminProductForm
        form={form}
        editingId={editingId}
        saving={saving}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <h3>상품 목록</h3>

      {products.length === 0 ? (
        <div>상품이 없습니다.</div>
      ) : (
        products.map((p) => (
          <AdminProductItem
            key={p.id}
            product={p}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChanged={fetchProducts}
          />
        ))
      )}
    </div>
  );
}

export default AdminProductPage;
