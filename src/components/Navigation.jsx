import { memo, useEffect, useMemo, useState } from 'react';

import '../styles/Navigation.css';

const NAV_ITEMS = ['home', 'experience', 'projects', 'contact'];

const formatLabel = (id) => id.charAt(0).toUpperCase() + id.slice(1);

function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const sections = useMemo(() => NAV_ITEMS.map((id) => ({ id, label: formatLabel(id) })), []);

  useEffect(() => {
    let orderedSections = [];
    let ticking = false;

    const collectSections = () => {
      orderedSections = sections
        .map(({ id }) => {
          const spyTarget = document.querySelector(`[data-nav="${id}"]`);
          const fallback = document.getElementById(id);
          const el = spyTarget || fallback;

          return el ? { id, top: el.offsetTop } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.top - b.top);
    };

    const updateActiveSection = () => {
      if (!orderedSections.length) {
        collectSections();
      }

      if (!orderedSections.length) {
        ticking = false;
        return;
      }

      const offset = window.innerWidth <= 640 ? 110 : 140;
      const scrollLine = window.scrollY + offset;
      let currentId = orderedSections[0].id;

      for (let i = 0; i < orderedSections.length; i += 1) {
        if (scrollLine >= orderedSections[i].top) {
          currentId = orderedSections[i].id;
        } else {
          break;
        }
      }

      setActiveSection((prev) => (prev === currentId ? prev : currentId));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    const onLayoutChange = () => {
      collectSections();
      updateActiveSection();
    };

    onLayoutChange();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onLayoutChange);
    window.addEventListener('load', onLayoutChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onLayoutChange);
      window.removeEventListener('load', onLayoutChange);
    };
  }, [sections]);

  return (
    <nav className="header" aria-label="Primary">
      <div className="nav-shell">
        <ul className="nav-list">
          {sections.map(({ id, label }, index) => (
            <li key={id} className="nav-item" style={{ '--nav-delay': `${0.55 + index * 0.12}s` }}>
              <a
                href={`#${id}`}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                <span className="nav-link-text">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default memo(Navigation);
