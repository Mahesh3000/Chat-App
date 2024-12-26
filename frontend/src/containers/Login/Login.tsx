import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        if (!email || !password) {
            setError('Both email and password are required.');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:4000/auth/login', { email, password });

            if (response.status === 200) {
                localStorage.setItem(response?.data?.user?.username, JSON.stringify(response?.data));
                navigate('/dashboard');
            }
        } catch (error: unknown) {
            console.error('Error during login:', error);

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.message || 'Login failed. Please try again.');
                } else {
                    setError('Network error. Please check your internet connection.');
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="containeryash">
            <div className="login-form">
                <h2 className="login-header">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="form"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        className="form"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>

                    <button type="submit" className="btn btn-primary">Login</button>
                    {error && <div className="error-message">{error}</div>}

                    <Link to="/signup" className="already-registered-text">Go to Signup</Link>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
        </div>
    );
}

export default Login;
