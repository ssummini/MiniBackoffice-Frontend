import { useState } from 'react'

function ReactWarmUp() {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
        console.log(e.target.value);
    };

    return (
        <div>
            <h2>React Warm up</h2>

            <input
                type='text'
                value={email}
                onChange={handleChange}
                placeholder='이메일 입력' 
            />

            <p>입력값: {email}</p>
        </div>
    );
}

export default ReactWarmUp;