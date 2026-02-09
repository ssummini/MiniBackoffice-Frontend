function AdminProductForm({
    form,
    editingId,
    saving,
    onChange,
    onSubmit,
    onCancel,
}) {
    return (
        <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 16 }}>
            <h2>{editingId ? 'Admin - Product Edit' : 'Admin - Product Create'}</h2>

            <div style={{ marginBottom: 8 }}>
                <input
                    name="name"
                    placeholder="상품명"
                    value={form.name}
                    onChange={onChange}
                />
            </div>

            <div style={{ marginBottom: 8 }}>
                <input
                    name="price"
                    type="number"
                    placeholder="가격"
                    value={form.price}
                    onChange={onChange}
                />
            </div>

            <div style={{ marginBottom: 8 }}>
                <input
                    name="stockQuantity"
                    type="number"
                    placeholder="재고"
                    value={form.stockQuantity}
                    onChange={onChange}
                />
            </div>

            <div style={{ marginBottom: 8 }}>
                <select name="status" value={form.status} onChange={onChange}>
                    <option value="SELLING">SELLING</option>
                    <option value="SOLD_OUT">SOLD_OUT</option>
                    <option value="HIDDEN">HIDDEN</option>
                </select>
            </div>

            <div style={{ marginBottom: 8 }}>
                <input
                    name="thumbnailUrl"
                    placeholder="썸네일 URL"
                    value={form.thumbnailUrl}
                    onChange={onChange}
                />
            </div>

            <button onClick={onSubmit} disabled={saving}>
                {saving ? '저장중...' : (editingId ? '상품 수정' : '상품 등록')}
            </button>

            {editingId && (
                <button onClick={onCancel} style={{ marginLeft: 8 }}>
                    취소
                </button>
            )}
        </div>
    );
}

export default AdminProductForm;
