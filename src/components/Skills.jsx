import { memo, useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { floatingSkills } from '../data/floatingSkills';
import ScrollFloat from './effects/ScrollFloat';
import '../styles/Skills.css';


const projectMobilePositions = [
  { x: '18%', y: '18%' },
  { x: '50%', y: '12%' },
  { x: '82%', y: '18%' },
  { x: '11%', y: '37%' },
  { x: '89%', y: '37%' },
  { x: '14%', y: '59%' },
  { x: '86%', y: '59%' },
  { x: '22%', y: '79%' },
  { x: '78%', y: '79%' },
  { x: '50%', y: '90%' },
  { x: '32%', y: '48%' },
  { x: '68%', y: '48%' },
];

function getCardSide(x, y) {
  const xValue = Number.parseFloat(x);
  const yValue = Number.parseFloat(y);

  if (yValue < 25) return 'bottom';
  if (xValue > 72) return 'left';
  if (xValue < 28) return 'right';
  return 'top';
}

function Skills() {
  const sectionRef = useRef(null);
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const skillsAnimationObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('skills-animate');
          skillsAnimationObserver.unobserve(section);
        }
      },
      {
        threshold: 0.25,
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

    skillsAnimationObserver.observe(section);
    lottieObserver.observe(section);

    return () => {
      skillsAnimationObserver.disconnect();
      lottieObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="skills-section" id="projects" data-nav="projects">
      <div className="skills-header">
        <div className="skills-title">
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

      <div className="skills-stage">
        <div className="swing-center" aria-hidden="true">
          <div className="swing-shell">
            {showLottie && (
              <DotLottieReact
                className="swing-lottie"
                src="https://lottie.host/f36dc3ca-9393-4914-8c76-b8e2693f35f1/D73QSta52O.lottie"
                loop
                autoplay
              />
            )}
          </div>
        </div>

        {floatingSkills.map((item, index) => {
          const isProject = Boolean(item.description);
          const projectIndex = isProject
            ? floatingSkills.slice(0, index).filter((skill) => Boolean(skill.description)).length
            : -1;
          const mobilePosition = projectMobilePositions[projectIndex % projectMobilePositions.length];
          const hasProjectLink = item.link && item.link !== '#';
          const cardSide = isProject ? getCardSide(item.x, item.y) : undefined;
          const imageUrl = item.image ? `${process.env.PUBLIC_URL}/${item.image}` : undefined;

          return (
            <div
              key={item.key}
              className={`skill-orb ${item.size}${isProject ? ' project-orb' : ' decorative-orb'}`}
              style={{
                '--x': item.x,
                '--y': item.y,
                '--mobile-x': mobilePosition?.x,
                '--mobile-y': mobilePosition?.y,
                '--delay': `${index * 0.035}s`,
                ...(imageUrl ? { '--project-image': `url("${imageUrl}")` } : {}),
              }}
              tabIndex={isProject ? 0 : undefined}
              role={isProject ? 'group' : undefined}
              aria-label={isProject ? `${item.label} project` : undefined}
              aria-hidden={isProject ? undefined : 'true'}
            >
              <span className="skill-orb-core" aria-hidden="true">
                <span className="skill-orb-aura" />
                {isProject && item.image && <span className="skill-project-image" />}
              </span>

              {isProject && <span className="skill-name">{item.label}</span>}

              {isProject && (
                <span className="project-hover-card" data-side={cardSide}>
                  <span className="project-card-period">{item.period}</span>
                  <strong>{item.label}</strong>
                  <span className="project-card-description">{item.description}</span>

                  <span className="project-card-stack" aria-label={`${item.label} tech stack`}>
                    {item.stack.map((stackItem) => (
                      <small key={`${item.key}-${stackItem}`}>{stackItem}</small>
                    ))}
                  </span>

                  {hasProjectLink ? (
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.linkLabel || 'View Live'}
                    </a>
                  ) : (
                    <em>Live link soon</em>
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default memo(Skills);
