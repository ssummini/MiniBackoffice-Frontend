import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { login } from '../../api/authApi';
import { setToken } from '../../utils/token';

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await login({ email, password });
            setToken(response.token);

            const role = response.user?.role;

            if (role === 'ADMIN') {
                navigate('/admin/products');
            } else {
                navigate('/products');
            }
        } catch (error) {
            alert('로그인 실패');
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>로그인</button>
        </div>
    );
}

export default LoginPage;
