import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
                email,
                password
            });
            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                navigate('dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Error logging in. Please try again.');
        }
    };

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    );
};

export default Login;
