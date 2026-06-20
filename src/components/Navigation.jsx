import { memo, useEffect, useMemo, useState } from 'react';

import '../styles/Navigation.css';

const NAV_ITEMS = ['home', 'experience', 'projects', 'contact'];

const formatLabel = (id) => id.charAt(0).toUpperCase() + id.slice(1);

function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const sections = useMemo(() => NAV_ITEMS.map((id) => ({ id, label: formatLabel(id) })), []);

  useEffect(() => {
    let ticking = false;

    const getTargets = () => sections
      .map(({ id }) => {
        const spyTarget = document.querySelector(`[data-nav="${id}"]`);
        const fallback = document.getElementById(id);
        const el = spyTarget || fallback;

        return el ? { id, el } : null;
      })
      .filter(Boolean);

    const updateActiveSection = () => {
      const targets = getTargets();

      if (!targets.length) {
        ticking = false;
        return;
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const pageBottom = scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 8;

      // Avoid mobile browsers keeping the next section highlighted while the
      // hero is still fully visible at the top of the page.
      if (scrollTop < 80) {
        setActiveSection('home');
        ticking = false;
        return;
      }

      if (pageBottom) {
        setActiveSection(targets[targets.length - 1].id);
        ticking = false;
        return;
      }

      const triggerLine = window.innerWidth <= 640
        ? window.innerHeight * 0.34
        : window.innerHeight * 0.40;

      let currentId = targets[0].id;
      let nearestDistance = Number.POSITIVE_INFINITY;

      targets.forEach(({ id, el }) => {
        const rect = el.getBoundingClientRect();
        const containsTrigger = rect.top <= triggerLine && rect.bottom >= triggerLine;

        if (containsTrigger) {
          currentId = id;
          nearestDistance = 0;
          return;
        }

        if (nearestDistance !== 0) {
          const distance = Math.abs(rect.top - triggerLine);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            currentId = id;
          }
        }
      });

      setActiveSection((prev) => (prev === currentId ? prev : currentId));
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('orientationchange', requestUpdate);
    window.addEventListener('load', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('orientationchange', requestUpdate);
      window.removeEventListener('load', requestUpdate);
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
                onClick={() => setActiveSection(id)}
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
