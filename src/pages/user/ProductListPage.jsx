import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";

function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
                alert('상품 목록 불러오기 실패');
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) return <div>로딩중...</div>

    return (
        <div>
            <h2>Products</h2>

            {products.length === 0 ? (
                <div>상품이 없습니다.</div>
            ) : (
                products.map((p) => (
                    <div key={p.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
                        <div><b>{p.name}</b></div>
                        <div>가격: {p.price}</div>
                        <div>재고: {p.stockQuantity}</div>
                        <div>상태: {p.status}</div>
                        {p.thumbnailUrl ? (
                            <div>썸네일: {p.thumbnailUrl}</div>
                        ) : null}
                    </div>
                ))
            )}
        </div>
    )
}
export default ProductListPage;
