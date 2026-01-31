import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = ({ theme, toggleTheme }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        const endpoint = isLogin ? '/auth/login' : '/auth/register';
        const payload = isLogin ? { email, password } : { email, password };

        try {
            const response = await api.post(endpoint, payload);
            // Backend should return token on both login and register
            // If register doesn't return token, we might need to login after register
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/portfolio');
            } else {
                // Auto-login after register logic if needed, or just redirect to login view
                // For now assuming backend returns token on register as per previous context
                setIsLogin(true);
                setError('Registration successful! Please login.');
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="login-container">
            <div className="theme-toggle-container-login">
                <button onClick={toggleTheme} className="theme-toggle-btn">
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </div>
            <div className={`login-card ${!isLogin ? 'register-mode' : ''}`}>
                <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                <p className="subtitle">{isLogin ? 'Login to continue' : 'Sign up to get started'}</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    <button type="submit" className={`primary-btn ${!isLogin ? 'register-btn' : ''}`}>
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <p className="toggle-mode">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        className="link-btn"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
