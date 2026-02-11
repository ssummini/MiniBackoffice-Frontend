import { updateProduct } from '../../api/productApi';

function AdminProductItem({ product, onEdit, onDelete, onStatusChanged }) {
    const statusColor =
        product.status === 'SELLING'
            ? 'green'
            : product.status === 'SOLD_OUT'
                ? 'red'
                : '#ccc';

    const handleChangeStatus = async (nextStatus) => {
        try {
            // 기존 값 유지 + status만 변경
            const payload = {
                name: product.name,
                price: product.price,
                stockQuantity: product.stockQuantity,
                thumbnailUrl: product.thumbnailUrl ?? '',
                status: nextStatus,
            };

            await updateProduct(product.id, payload);
            alert(`상태 변경 완료: ${nextStatus}`);

            // 목록 새로고침(부모가 넘겨준 함수)
            if (onStatusChanged) await onStatusChanged();
        } catch (e) {
            console.error(e);
            alert('상태 변경 실패');
        }
    };


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

            <div style={{ color: statusColor }}>
                상태: {product.status}
            </div>

            <div style={{ marginTop: 8 }}>
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

            {/* 상태 빠른 변경 */}
            <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <button onClick={() => handleChangeStatus('SELLING')}>
                    SELLING
                </button>
                <button onClick={() => handleChangeStatus('SOLD_OUT')}>
                    SOLD_OUT
                </button>
                <button onClick={() => handleChangeStatus('HIDDEN')}>
                    HIDDEN
                </button>
            </div>
        </div>
    );
}

export default AdminProductItem;
