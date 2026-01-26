import { useEffect, useState } from 'react';
import { createProduct, getProducts } from '../../api/productApi';

function AdminProductPage() {
  // 등록 폼 state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [status, setStatus] = useState('SELLING');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  // 목록 state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 목록 불러오기 함수
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

  // 등록 버튼
  const handleCreate = async () => {
    try {
      // 숫자형은 Number로 변환 (중요)
      const payload = {
        name,
        price: Number(price),
        stockQuantity: Number(stockQuantity),
        status, // "SELLING" 그대로
        thumbnailUrl,
      };

      await createProduct(payload);
      alert('등록 완료!');

      // 입력 초기화(선택)
      setName('');
      setPrice('');
      setStockQuantity('');
      setStatus('SELLING');
      setThumbnailUrl('');

      // 등록 후 목록 갱신
      await fetchProducts();
    } catch (e) {
      console.error(e);
      alert('등록 실패 (콘솔 확인)');
    }
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Admin - Product Create</h2>

      <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="상품명"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="가격"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="재고"
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="SELLING">SELLING</option>
            <option value="SOLD_OUT">SOLD_OUT</option>
            <option value="HIDDEN">HIDDEN</option>
          </select>
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="썸네일 URL"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
        </div>

        <button onClick={handleCreate}>상품 등록</button>
      </div>

      <h3>상품 목록</h3>

      {products.length === 0 ? (
        <div>상품이 없습니다.</div>
      ) : (
        products.map((p) => (
          <div
            key={p.id}
            style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}
          >
            <div>
              <b>{p.name}</b>
            </div>
            <div>가격: {p.price}</div>
            <div>재고: {p.stockQuantity}</div>
            <div>상태: {p.status}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminProductPage;
