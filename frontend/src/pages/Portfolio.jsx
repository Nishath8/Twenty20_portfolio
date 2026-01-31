import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Portfolio = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Protect route
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            fetchUserData();
        }
    }, [navigate]);

    const fetchUserData = async () => {
        try {
            const response = await api.get('/auth/me');
            setUser(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch user data', err);
            if (err.response && err.response.status === 401) {
                handleLogout();
            } else {
                setError('Failed to load profile data.');
                setLoading(false);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (loading) return <div className="loading">Loading portfolio...</div>;

    return (
        <div className="portfolio-container">
            <header className="portfolio-header">
                <div className="header-branding">
                    <h1 className="header-name">Nishath Anjum P</h1>
                    <p className="header-role">Full Stack Developer</p>
                </div>
                <div className="user-info">
                    <button onClick={toggleTheme} className="theme-toggle-btn header-toggle">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <span>{user?.email || 'User'}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </header>

            <main className="portfolio-content">
                {error && <div className="error-banner">{error}</div>}

                <section className="hero-section">
                    <h1>Welcome, {user?.email?.split('@')[0] || 'Developer'}!</h1>
                    <p className="tagline">
                        Computer Science undergraduate specializing in AI-driven systems, full-stack web applications, and secure, scalable architectures.
                    </p>
                    <p className="sub-tagline">Focused on building production-ready platforms, not demos.</p>
                </section>

                <section className="content-grid">
                    {/* About Me */}
                    <div className="card about-card">
                        <h2>About Me</h2>
                        <p className="about-text">
                            I am a Computer Science undergraduate at M.S. Ramaiah University of Applied Sciences with a strong academic record (CGPA 9.42). I focus on building AI-driven and full-stack web applications that are secure, scalable, and practical for real-world use. My experience spans backend system design, databases, and modern React-based frontends, with hands-on work in deploying production-ready applications. I enjoy solving complex problems and turning ideas into reliable software systems.
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="card skills-card">
                        <h2>Skills</h2>

                        <div className="skill-category">
                            <h3>Programming Languages</h3>
                            <div className="skills-list">
                                <span className="skill-tag">Python</span>
                                <span className="skill-tag">JavaScript</span>
                                <span className="skill-tag">TypeScript</span>
                                <span className="skill-tag">HTML/CSS</span>
                            </div>
                        </div>

                        <div className="skill-category">
                            <h3>Frameworks & Databases</h3>
                            <div className="skills-list">
                                <span className="skill-tag">React (Vite)</span>
                                <span className="skill-tag">Flask</span>
                                <span className="skill-tag">Node.js</span>
                                <span className="skill-tag">PostgreSQL</span>
                                <span className="skill-tag">MySQL</span>
                                <span className="skill-tag">Streamlit</span>
                            </div>
                        </div>

                        <div className="skill-category">
                            <h3>Libraries & AI Tools</h3>
                            <div className="skills-list">
                                <span className="skill-tag">OpenCV</span>
                                <span className="skill-tag">face_recognition</span>
                                <span className="skill-tag">Dlib</span>
                                <span className="skill-tag">NumPy</span>
                                <span className="skill-tag">Pandas</span>
                                <span className="skill-tag">LightGBM</span>
                                <span className="skill-tag">Agentic AI</span>
                            </div>
                        </div>

                        <div className="skill-category">
                            <h3>Developer & Cloud Tools</h3>
                            <div className="skills-list">
                                <span className="skill-tag">Git</span>
                                <span className="skill-tag">GitHub</span>
                                <span className="skill-tag">Vercel</span>
                                <span className="skill-tag">Render</span>
                                <span className="skill-tag">Neon DB</span>
                                <span className="skill-tag">Docker</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section - Moved outside grid */}
                <section className="projects-section">
                    <div className="card projects-card">
                        <h2>Projects</h2>
                        <ul className="project-list">
                            <li>
                                <h3>Face Recognition Attendance System</h3>
                                <div className="tech-stack">Python, Streamlit, OpenCV, face_recognition</div>
                                <p>A real-time face recognition-based attendance system built using Python, Streamlit, and OpenCV. Supports admin login, camera-based attendance marking, and dynamic addition of new known faces via UI.</p>
                                <div className="project-links">
                                    <a href="https://github.com/Nishath8/Face_Recognition_App" target="_blank" rel="noopener noreferrer" className="github-btn">GitHub Repo</a>
                                </div>
                            </li>
                            <li>
                                <h3>AI Restaurant Manager App</h3>
                                <div className="tech-stack">React (Vite), Flask, PostgreSQL, JWT, Gemini API</div>
                                <p>AI-assisted restaurant manager with table bookings, customer scheduling, and a simple dashboard for staff. Designed using React, Node.js, and Prisma.</p>
                                <div className="project-links">
                                    <a href="https://github.com/Nishath8/restaurant-manager" target="_blank" rel="noopener noreferrer" className="github-btn">GitHub Repo</a>
                                </div>
                            </li>
                            <li>
                                <h3>Cybersafe</h3>
                                <div className="tech-stack">Python, Streamlit, Docker, SSL/TLS, DNSPython</div>
                                <p>Cybersafe is a production-ready, open-source Streamlit application for performing non-intrusive and optionally intrusive cybersecurity hygiene checks on websites.</p>
                                <div className="project-links">
                                    <a href="https://github.com/Nishath8/Cybersafe" target="_blank" rel="noopener noreferrer" className="github-btn">GitHub Repo</a>
                                </div>
                            </li>
                            <li>
                                <h3>QPDS – Question Paper Design System</h3>
                                <div className="tech-stack">React, Flask, PostgreSQL, GenAI, RBAC</div>
                                <p>A comprehensive, AI-powered system designed to streamline the entire lifecycle of question paper management for educational institutions. QPDS enables faculty to collaboratively create, review, and distribute high-quality question papers while providing administrators with robust oversight tools.</p>
                                <div className="project-links">
                                    <a href="https://qpds-ui.vercel.app/" target="_blank" rel="noopener noreferrer" className="demo-btn">Live Demo</a>
                                    <a href="https://github.com/Muzammil0777/QPDS-UI" target="_blank" rel="noopener noreferrer" className="github-btn">GitHub Repo</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>

            <footer className="portfolio-footer">
                <p>&copy; {new Date().getFullYear()} Portfolio App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Portfolio;
