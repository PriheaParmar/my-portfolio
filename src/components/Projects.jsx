import { memo, useState } from 'react';

import { projects } from '../data/projects';
import ScrollFloat from './effects/ScrollFloat';
import '../styles/Projects.css';

const planetLayouts = [
  { orbitSize: 'clamp(520px, 42vw, 680px)',   angle: 338, focus: -4, size: 48, speed: 46, direction: 'normal',  ca: 'rgba(255,226,245,0.95)', cb: 'rgba(255,61,122,0.78)',  cc: 'rgba(146,87,255,0.60)', glow: 'rgba(255,61,122,0.55)',  cardSide: 'right' },
  { orbitSize: 'clamp(640px, 52vw, 820px)',   angle:  22, focus:  5, size: 40, speed: 54, direction: 'reverse', ca: 'rgba(229,205,255,0.90)', cb: 'rgba(163,93,255,0.72)',  cc: 'rgba(94,205,255,0.40)',  glow: 'rgba(163,93,255,0.50)', cardSide: 'right' },
  { orbitSize: 'clamp(760px, 64vw, 980px)',   angle: 346, focus: -3, size: 58, speed: 64, direction: 'normal',  ca: 'rgba(255,236,248,0.95)', cb: 'rgba(255,93,148,0.78)',  cc: 'rgba(118,81,246,0.58)', glow: 'rgba(255,93,148,0.54)', cardSide: 'top'   },
  { orbitSize: 'clamp(880px, 76vw, 1140px)',  angle:  17, focus:  4, size: 44, speed: 58, direction: 'reverse', ca: 'rgba(196,240,255,0.78)', cb: 'rgba(160,105,255,0.68)', cc: 'rgba(255,61,122,0.48)', glow: 'rgba(134,222,255,0.46)', cardSide: 'bottom'},
  { orbitSize: 'clamp(1000px, 88vw, 1320px)', angle: 353, focus: -2, size: 66, speed: 76, direction: 'normal',  ca: 'rgba(255,218,238,0.90)', cb: 'rgba(246,61,122,0.78)',  cc: 'rgba(163,93,255,0.55)', glow: 'rgba(255,61,122,0.54)', cardSide: 'left'  },
  { orbitSize: 'clamp(1120px,100vw, 1500px)', angle:  27, focus:  6, size: 50, speed: 88, direction: 'reverse', ca: 'rgba(224,186,255,0.84)', cb: 'rgba(255,93,148,0.66)',  cc: 'rgba(67,211,255,0.36)', glow: 'rgba(190,130,255,0.50)', cardSide: 'left'  },
  { orbitSize: 'clamp(1240px,112vw, 1680px)', angle: 341, focus: -4, size: 42, speed: 70, direction: 'normal',  ca: 'rgba(173,235,255,0.76)', cb: 'rgba(112,96,255,0.68)',  cc: 'rgba(255,93,148,0.46)', glow: 'rgba(122,226,255,0.42)', cardSide: 'top'   },
  { orbitSize: 'clamp(1360px,124vw, 1840px)', angle:  12, focus:  5, size: 52, speed: 82, direction: 'reverse', ca: 'rgba(242,188,255,0.82)', cb: 'rgba(103,199,255,0.58)', cc: 'rgba(255,61,122,0.50)', glow: 'rgba(210,140,255,0.50)', cardSide: 'bottom'},
  { orbitSize: 'clamp(1480px,136vw, 1980px)', angle: 356, focus: -2, size: 38, speed: 52, direction: 'normal',  ca: 'rgba(255,240,249,0.90)', cb: 'rgba(255,61,122,0.68)',  cc: 'rgba(135,90,255,0.48)', glow: 'rgba(255,184,227,0.46)', cardSide: 'left'  },
  { orbitSize: 'clamp(1580px,146vw, 2100px)', angle:  30, focus:  7, size: 46, speed: 60, direction: 'reverse', ca: 'rgba(214,145,255,0.78)', cb: 'rgba(125,86,255,0.68)',  cc: 'rgba(255,93,148,0.44)', glow: 'rgba(190,110,255,0.46)', cardSide: 'left'  },
  { orbitSize: 'clamp(1680px,154vw, 2220px)', angle: 344, focus: -5, size: 42, speed: 72, direction: 'normal',  ca: 'rgba(255,143,213,0.82)', cb: 'rgba(155,91,255,0.66)',  cc: 'rgba(112,228,255,0.38)', glow: 'rgba(255,93,148,0.44)', cardSide: 'left'  },
  { orbitSize: 'clamp(1780px,162vw, 2340px)', angle:  19, focus:  4, size: 36, speed: 66, direction: 'reverse', ca: 'rgba(255,255,255,0.82)', cb: 'rgba(220,199,255,0.64)', cc: 'rgba(255,93,148,0.42)', glow: 'rgba(255,230,246,0.40)', cardSide: 'left'  },
];

function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex,  setActiveIndex]  = useState(0);
  const selectedIndex   = hoveredIndex ?? activeIndex;
  const selectedProject = projects[activeIndex];

  const focusProject = (nextIndex) => {
    const safeIndex = (nextIndex + projects.length) % projects.length;
    setHoveredIndex(null);
    setActiveIndex(safeIndex);
  };

  const clearHover = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setHoveredIndex(null);
    }
  };

  return (
    <section className="project" data-nav="projects">
      <div id="projects" className="section-anchor" aria-hidden="true" />

      <div className="project-header">
        <span className="project-eyebrow">selected work</span>
        <div className="project-title">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Project Universe
          </ScrollFloat>
        </div>
      </div>

      <div className="project-universe" aria-label="Interactive project solar system">
        {/* Star field */}
        <div className="space-depth" aria-hidden="true" />

        {/* Shooting stars */}
        <div className="shooting-stars" aria-hidden="true">
          <span className="shooting-star" />
          <span className="shooting-star" />
          <span className="shooting-star" />
          <span className="shooting-star" />
          <span className="shooting-star" />
        </div>

        {/* Sun */}
        <div className="project-sun" aria-hidden="true">
          <span className="sun-aura" />
          <span className="sun-pulse" />
          <span className="sun-ring sun-ring-one" />
          <span className="sun-ring sun-ring-two" />
          <span className="sun-body" />
          <span className="sun-core" />
          <span className="sun-shine" />
        </div>

        {/* Orbit lines */}
        <div className="project-orbits" aria-hidden="true">
          {planetLayouts.map((layout, index) => (
            <span
              key={`orbit-${index + 1}`}
              className="orbit-line"
              style={{ '--orbit-size': layout.orbitSize }}
            />
          ))}
        </div>

        {/* Planets */}
        <div className="project-planets">
          {projects.map((project, index) => {
            const layout    = planetLayouts[index % planetLayouts.length];
            const isHovered = hoveredIndex === index;
            const isActive  = activeIndex  === index;
            const isSelected = selectedIndex === index;
            const cardSide  = isActive ? 'left' : layout.cardSide;

            return (
              <div
                key={project.title}
                className={`project-orbit-shell ${layout.direction === 'reverse' ? 'reverse' : ''} ${isHovered ? 'is-hovered' : ''} ${isActive ? 'is-focused' : ''}`}
                style={{
                  '--orbit-size':   layout.orbitSize,
                  '--orbit-angle':  `${layout.angle}deg`,
                  '--focus-angle':  `${layout.focus}deg`,
                  '--orbit-speed':  `${layout.speed}s`,
                }}
              >
                <div
                  className="project-planet-node"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={clearHover}
                >
                  <button
                    type="button"
                    className={`project-planet ${isActive ? 'active' : ''}`}
                    style={{
                      '--planet-size':    `${layout.size}px`,
                      '--planet-glow':    layout.glow,
                      '--planet-color-a': layout.ca,
                      '--planet-color-b': layout.cb,
                      '--planet-color-c': layout.cc,
                    }}
                    onClick={() => focusProject(index)}
                    aria-current={isActive ? 'true' : undefined}
                    aria-label={`Select ${project.title}`}
                  >
                    <span className="planet-atmosphere" aria-hidden="true" />
                    <span className="planet-orb"        aria-hidden="true" />
                    <span className="planet-band"       aria-hidden="true" />
                    <span className="planet-ring"       aria-hidden="true" />
                    <span className="planet-shine"      aria-hidden="true" />
                  </button>

                  <article className="planet-detail-card" data-side={cardSide} aria-hidden={!isSelected}>
                    <div className="detail-card-media" aria-hidden="true">
                      <img src={project.image} alt="" loading="lazy" />
                    </div>
                    <div className="detail-card-content">
                      <span>{project.period}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="detail-card-stack">
                        {project.stack.slice(0, 4).map((item) => (
                          <small key={item}>{item}</small>
                        ))}
                      </div>
                      {project.link && project.link !== '#' ? (
                        <a href={project.link} target="_blank" rel="noreferrer">
                          Open project
                        </a>
                      ) : (
                        <em>Coming soon</em>
                      )}
                    </div>
                  </article>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nav controls */}
        <div className="project-nav-controls" aria-label="Project planet controls">
          <button
            type="button"
            className="project-nav-arrow"
            onClick={() => focusProject(activeIndex - 1)}
            aria-label="Show previous project"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <div className="project-nav-status" aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <strong>{selectedProject.title}</strong>
          </div>
          <button
            type="button"
            className="project-nav-arrow"
            onClick={() => focusProject(activeIndex + 1)}
            aria-label="Show next project"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      {/* Mobile fallback */}
      <div className="project-mobile-list" aria-label="Project list">
        {projects.map((project, index) => (
          <article key={`${project.title}-mobile`} className="project-mobile-card">
            <div className="project-mobile-top">
              <span className="project-mobile-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="project-mobile-thumb" aria-hidden="true">
                {project.image ? <img src={project.image} alt="" loading="lazy" /> : <span />}
              </div>
            </div>

            <div className="project-mobile-body">
              <span className="project-mobile-period">{project.period}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="project-mobile-stack" aria-label={`${project.title} stack`}>
                {project.stack.slice(0, 4).map((item) => (
                  <small key={`${project.title}-${item}`}>{item}</small>
                ))}
              </div>

              {project.link && project.link !== '#' ? (
                <a href={project.link} target="_blank" rel="noreferrer">Open project</a>
              ) : (
                <span className="project-mobile-disabled">Coming soon</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default memo(Projects);
