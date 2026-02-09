import { useEffect, useState } from 'react';
import { createProduct, getProducts, deleteProduct, updateProduct } from '../../api/productApi';

function AdminProductPage() {
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


  // 공통 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    // 저장 중 연타 방지 (중복 요청 방지)
    if (saving) return;

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
      <h2>{editingId ? 'Admin - Product Edit' : 'Admin - Product Create'}</h2>

      <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <input
            name='name'
            placeholder="상품명"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            name='price'
            type="number"
            placeholder="가격"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            name='stockQuantity'
            type="number"
            placeholder="재고"
            value={form.stockQuantity}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <select name='status'
            value={form.status}
            onChange={handleChange}
          >
            <option value="SELLING">SELLING</option>
            <option value="SOLD_OUT">SOLD_OUT</option>
            <option value="HIDDEN">HIDDEN</option>
          </select>
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            name='thumbnailUrl'
            placeholder="썸네일 URL"
            value={form.thumbnailUrl}
            onChange={handleChange}
          />
        </div>

        <button onClick={handleSubmit} disabled={saving}>
          {saving ? '저장중...' : (editingId ? '상품 수정' : '상품 등록')}
        </button>

        {editingId && (
          <button onClick={resetForm}>
            취소
          </button>
        )}

      </div>

      <h3>상품 목록</h3>

      {products.length === 0 ? (
        <div>상품이 없습니다.</div>
      ) : (
        products.map((p) => {
          const statusColor =
            p.status === 'SELLING'
              ? 'green'
              : p.status === 'SOLD_OUT'
              ? 'red'
              : '#ccc';

          return (
              <div
                key={p.id}
                style={{
                  border: '1px solid #ddd',
                  padding: 12,
                  marginBottom: 8,
                  opacity: p.status === 'HIDDEN' ? 0.5 : 1,
                }}
              >

              {p.thumbnailUrl && (
                <img
                  src={p.thumbnailUrl}
                  alt={p.name}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: 'cover',
                    marginBottom: 8,
                    borderRadius: 4,
                  }}
                />
              )}
              
              {p.status === 'HIDDEN' && (
                <div style={{ fontSize: 12, marginBottom: 6 }}>
                  🔒 숨김 상품
                </div>
              )}
              
              <div><b>{p.name}</b></div>
              <div>가격: {p.price}</div>
              <div>재고: {p.stockQuantity}</div>

              <div style={{ color: statusColor }}>
                상태: {p.status}
              </div>

              <button
                onClick={() => handleEdit(p)}
                disabled={p.status === 'SOLD_OUT'}
                style={{
                  opacity: p.status === 'SOLD_OUT' ? 0.5 : 1,
                  cursor: p.status === 'SOLD_OUT' ? 'not-allowed' : 'pointer',
                }}
              >
                수정
              </button>
              <button onClick={() => handleDelete(p.id)}>삭제</button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default AdminProductPage;
