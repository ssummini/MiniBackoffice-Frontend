// src/app/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/public/LoginPage';
import ProductListPage from '../pages/user/ProductListPage';
import MyPage from '../pages/user/MyPage';
import AdminProductPage from '../pages/admin/AdminProductPage';
import ForbiddenPage from '../pages/public/ForbiddenPage';
import RequireAdmin from '../auth/RequireAdmin';

function App() {
    return (
        <Routes>
            {/* 기본 진입 */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* public */}
            <Route path="/login" element={<LoginPage />} />

            {/* user */}
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/me" element={<MyPage />} />

            {/* admin */}
            <Route
                path="/admin/products"
                element={
                    <RequireAdmin>
                        <AdminProductPage />
                    </RequireAdmin>
                }
            />

            <Route path="/forbidden" element={<ForbiddenPage />} />

            {/* 없는 경로 */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}

export default App;
