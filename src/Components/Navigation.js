import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Styles/Navigation.css';// Import all weights you need
import '@fontsource/cormorant-garamond/300.css'; // Light
import '@fontsource/cormorant-garamond/400.css'; // Regular
import '@fontsource/cormorant-garamond/600.css'; // SemiBold
import '@fontsource/proza-libre/400.css'; // Regular
import '@fontsource/proza-libre/500.css'; // Medium

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

const Navigation = () => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sectionIds = navItems.map(item => item.toLowerCase());
            for (let id of sectionIds) {
                const section = document.getElementById(id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // initialize
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="header">
            <ul className="nav-list" data-aos="fade-up">
                {navItems.map((item, index) => {
                    const id = item.toLowerCase();
                    return (
                        <li key={index}>
                            <a
                                href={`#${id}`}
                                className={`nav-link ${activeSection === id ? 'active' : ''}`}
                            >
                                {item}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navigation;
