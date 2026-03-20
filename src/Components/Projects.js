import React, { useEffect, useRef, useState } from 'react';
import './Styles/Project.css';

const items = [
  {
    image: 'https://c0.wallpaperflare.com/preview/136/42/382/gray-galaxy.jpg',
    link: 'https://sppacee-h.vercel.app/',
    title: 'SpaceH',
    description: 'A universe of space wonders designed and built by me.',
  },
  {
    image: 'https://m.media-amazon.com/images/I/51-WOQHsWOL.jpg',
    link: 'https://verdecer.vercel.app/',
    title: 'Verdecer',
    description: 'Nature-inspired visuals blended with a clean modern web experience.',
  },
  {
    image: 'https://images.pexels.com/photos/10585474/pexels-photo-10585474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://lamborghini-x.vercel.app/',
    title: 'LamborghiniX',
    description: 'A luxury-inspired experience focused on speed, style, and interaction.',
  },
  {
    image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=1974&auto=format&fit=crop',
    link: 'https://google.com/',
    title: 'LegalBot',
    description: 'An AI-powered legal assistant that makes guidance feel simpler and smarter.',
  },
];

function Projects() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const triggers = sectionRef.current?.querySelectorAll('.project-trigger');
    if (!triggers?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    triggers.forEach((trigger) => observer.observe(trigger));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="project" id="projects" ref={sectionRef}>
      <div className="project-header">
        <p className="project-eyebrow">Selected Work</p>
        <h2 className="project-title">Projects in the Spotlight</h2>
        <p className="project-subtext">
          Each project steps into focus one by one as you scroll.
        </p>
      </div>

      <div className="project-scroll-area">
        <div className="project-stage">
          <span className="stage-star stage-star-left" />
          <span className="stage-star stage-star-right" />

          <div className="project-card-stack">
            {items.map((item, index) => {
              const state =
                index === activeIndex
                  ? 'active'
                  : index < activeIndex
                  ? 'past'
                  : 'next';

              return (
                <article
                  key={item.title}
                  className={`project-card ${state}`}
                >
                  <span className="stage-count">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="project-image-wrap">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>

                  <div className="project-info">
                    <p className="project-kicker">Featured Project</p>
                    <h3>{item.title}</h3>
                    <p className="project-description">{item.description}</p>

                    <a
                      className="project-link"
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Project
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="project-triggers">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="project-trigger"
              data-index={index}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(Projects);