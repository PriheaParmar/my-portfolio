import { memo, useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { projects } from '../data/projects';
import ScrollFloat from './effects/ScrollFloat';
import '../styles/Projects.css';

const projectPositions = [
  { x: '25%', y: '18%', size: 'md', cardSide: 'bottom' },
  { x: '35%', y: '12%', size: 'sm', cardSide: 'bottom' },
  { x: '50%', y: '10%', size: 'lg', cardSide: 'bottom' },
  { x: '65%', y: '12%', size: 'sm', cardSide: 'bottom' },
  { x: '75%', y: '18%', size: 'md', cardSide: 'bottom' },
  { x: '18%', y: '34%', size: 'lg', cardSide: 'right' },
  { x: '32%', y: '42%', size: 'sm', cardSide: 'right' },
  { x: '68%', y: '42%', size: 'sm', cardSide: 'left' },
  { x: '82%', y: '34%', size: 'lg', cardSide: 'left' },
  { x: '28%', y: '68%', size: 'md', cardSide: 'top' },
  { x: '50%', y: '78%', size: 'lg', cardSide: 'top' },
  { x: '72%', y: '68%', size: 'md', cardSide: 'top' },
];

function Projects() {
  const sectionRef = useRef(null);
  const [showLottie, setShowLottie] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const projectAnimationObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('project-animate');
          projectAnimationObserver.unobserve(section);
        }
      },
      {
        threshold: 0.22,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    const lottieObserver = new IntersectionObserver(
      ([entry]) => {
        setShowLottie(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: '260px 0px',
      }
    );

    projectAnimationObserver.observe(section);
    lottieObserver.observe(section);

    return () => {
      projectAnimationObserver.disconnect();
      lottieObserver.disconnect();
    };
  }, []);

  const clearHover = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setHoveredIndex(null);
    }
  };

  return (
    <section ref={sectionRef} className="project project-lottie-section" data-nav="projects">
      <div id="projects" className="section-anchor" aria-hidden="true" />

      <div className="project-header">
        <span className="project-eyebrow">selected work</span>
        <div className="project-title">
          <ScrollFloat
            animationDuration={0.55}
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.018}
          >
            Projects
          </ScrollFloat>
        </div>
      </div>

      <div className="project-lottie-stage" aria-label="Project showcase">
        <div className="project-swing-center" aria-hidden="true">
          <span className="project-swing-hook" />
          <span className="project-swing-rope project-rope-left" />
          <span className="project-swing-rope project-rope-right" />

          <div className="project-swing-shell">
            {showLottie && (
              <DotLottieReact
                className="project-swing-lottie"
                src="https://lottie.host/f36dc3ca-9393-4914-8c76-b8e2693f35f1/D73QSta52O.lottie"
                loop
                autoplay
              />
            )}
          </div>
        </div>

        {projects.map((project, index) => {
          const position = projectPositions[index % projectPositions.length];
          const isHovered = hoveredIndex === index;
          const isActive = activeIndex === index;

          return (
            <div
              key={project.title}
              className={`project-orb-wrap project-orb-${position.size} ${isHovered ? 'is-hovered' : ''} ${isActive ? 'is-active' : ''}`}
              style={{
                '--x': position.x,
                '--y': position.y,
                '--delay': `${index * 0.045}s`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={clearHover}
            >
              <button
                type="button"
                className="project-orb"
                onClick={() => setActiveIndex(index)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`View ${project.title}`}
                title={project.title}
              >
                <span className="project-orb-core">
                  <span className="project-orb-aura" />
                  <span className="project-orb-image">
                    {project.image ? (
                      <img src={project.image} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <span className="project-orb-placeholder" />
                    )}
                  </span>
                </span>
                <span className="project-orb-name">{project.title}</span>
              </button>

              <article className="project-hover-card" data-side={position.cardSide}>
                <span>{project.period}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-hover-stack">
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
              </article>
            </div>
          );
        })}
      </div>

      <div className="project-mobile-list" aria-label="Project list">
        {projects.map((project, index) => (
          <article key={`${project.title}-mobile`} className="project-mobile-card">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span className="project-mobile-thumb" aria-hidden="true">
              {project.image ? (
                <img src={project.image} alt="" loading="lazy" decoding="async" />
              ) : null}
            </span>
            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            {project.link && project.link !== '#' ? (
              <a href={project.link} target="_blank" rel="noreferrer">Open</a>
            ) : (
              <span className="project-mobile-disabled">Soon</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default memo(Projects);
