import React, { useEffect, useMemo, useState } from 'react';
import './Styles/Navigation.css';

import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/proza-libre/400.css';
import '@fontsource/proza-libre/500.css';

const NAV_ITEMS = ['home', 'about', 'skills', 'projects', 'contact'];

const label = (id) => id.charAt(0).toUpperCase() + id.slice(1);

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const sections = useMemo(() => NAV_ITEMS.map((id) => ({ id, label: label(id) })), []);

  useEffect(() => {
    const els = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6],
        rootMargin: '-150px 0px -55% 0px',
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="header" aria-label="Primary">
      <div className="nav-shell">
        <ul className="nav-list">
          {sections.map(({ id, label: text }, index) => (
            <li
              key={id}
              className="nav-item"
              style={{ '--nav-delay': `${0.55 + index * 0.12}s` }}
            >
              <a
                href={`#${id}`}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                <span className="nav-link-text">{text}</span>
              </a>
            </li>
          ))}

          
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(Navigation);