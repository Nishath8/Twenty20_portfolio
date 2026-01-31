import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = ({ theme, toggleTheme }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        const endpoint = isLogin ? '/auth/login' : '/auth/register';
        const payload = isLogin ? { email, password } : { name, email, password };

        try {
            const response = await api.post(endpoint, payload);

            if (isLogin) {
                // Login Logic
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    navigate('/portfolio');
                }
            } else {
                // Registration Logic
                setIsLogin(true);
                setSuccess('Registration successful! Please login to continue.');
                // Clear inputs if desired, or keep email
                setPassword('');
                setConfirmPassword('');
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

            <div className="login-content-wrapper">
                <div className="login-branding">
                    <h1 className="brand-title">Nishath Anjum P</h1>
                    <p className="brand-subtitle">Full-Stack Developer Portfolio</p>
                    <p className="brand-description">
                        Showcasing my journey in building secure, scalable AI-driven web applications.
                        Login to explore my projects, skills, and experience.
                    </p>
                </div>

                <div className={`login-card ${!isLogin ? 'register-mode' : ''}`}>
                    <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                    <p className="subtitle">{isLogin ? 'Login to continue' : 'Sign up to get started'}</p>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                />
                            </div>
                        )}
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
        </div>
    );
};

export default Login;
