import { updateProduct } from '../../api/productApi';

function AdminProductItem({ product, onEdit, onDelete, onStatusChanged }) {
    const statusColor =
        product.status === 'SELLING'
            ? 'green'
            : product.status === 'SOLD_OUT'
            ? 'red'
            : '#ccc';

    return (
        <div
            style={{
                border: '1px solid #ddd',
                padding: 12,
                marginBottom: 8,
                opacity: product.status === 'HIDDEN' ? 0.5 : 1,
            }}
        >
            {product.status === 'HIDDEN' && (
                <div style={{ fontSize: 12, marginBottom: 6 }}>
                    🔒 숨김 상품
                </div>
            )}

            {product.thumbnailUrl && (
                <img
                    src={product.thumbnailUrl}
                    alt={product.name}
                    style={{
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                        marginBottom: 8,
                        borderRadius: 4,
                    }}
                />
            )}

            <div><b>{product.name}</b></div>
            <div>가격: {product.price}</div>
            <div>재고: {product.stockQuantity}</div>

            <div style={{ marginBottom: 8 }}>
                상태:{' '}
                <select
                    value={product.status}
                    onChange={async (e) => {
                        const newStatus = e.target.value;

                        try {
                            await updateProduct(product.id, {
                                name: product.name,
                                price: product.price,
                                stockQuantity: product.stockQuantity,
                                status: newStatus,
                                thumbnailUrl: product.thumbnailUrl,
                            });
                            alert('상태 변경 완료');
                            await onStatusChanged(); // 목록 재조회(새로고침 X)
                        } catch (e) {
                            console.error(e);
                            alert('상태 변경 실패');
                        }
                    }}
                    style={{ color: statusColor }}
                >
                    <option value="SELLING">SELLING</option>
                    <option value="SOLD_OUT">SOLD_OUT</option>
                    <option value="HIDDEN">HIDDEN</option>
                </select>
            </div>

            <button
                onClick={() => onEdit(product)}
                disabled={product.status === 'SOLD_OUT'}
                style={{
                    opacity: product.status === 'SOLD_OUT' ? 0.5 : 1,
                    cursor: product.status === 'SOLD_OUT' ? 'not-allowed' : 'pointer',
                    marginRight: 8,
                }}
            >
                수정
            </button>

            <button onClick={() => onDelete(product.id)}>삭제</button>
        </div>
    );
}

export default AdminProductItem;
