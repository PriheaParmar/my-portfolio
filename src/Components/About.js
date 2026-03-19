import React, { useEffect, useRef } from 'react';
import ScrollFloat from './Assets/ScrollFloat';
import './Styles/About.css';

function About() {
  const sectionRef = useRef(null);

  const experiences = [
    {
      company: 'Invent Tech',
      role: 'Software Developer (Project-Based)',
      duration: 'Jan 2026 – Present',
      location: 'Ahmedabad, India',
      tech: ['Python', 'Flask', 'JavaScript', 'ERP'],
      points: [
        'Worked on startup products including a branding website and ERP application.',
        'Built workflow-based features with frontend and backend logic.',
        'Focused on creating clean, functional, and modern user experiences.',
      ],
    },
    {
      company: 'Devam Technologies',
      role: 'Web Developer',
      duration: 'Jun 2025 – Present',
      location: 'Ahmedabad, India',
      tech: ['React', 'APIs', 'Responsive UI'],
      points: [
        'Built interactive web applications and reusable frontend modules.',
        'Collaborated with teams to improve usability and product flow.',
        'Integrated APIs and delivered polished real-world web features.',
      ],
    },
    {
      company: 'Devam Technologies',
      role: 'Web Developer Intern',
      duration: 'Dec 2024 – May 2025',
      location: 'Ahmedabad, India',
      tech: ['HTML', 'CSS', 'JavaScript'],
      points: [
        'Created responsive frontend modules and reusable UI components.',
        'Assisted with debugging, testing, and feature improvements.',
        'Improved UI consistency and responsiveness across pages.',
      ],
    },
    {
      company: 'DGP Investigation Agency',
      role: 'Web Developer Intern',
      duration: 'Apr 2024 – Jul 2024',
      location: 'Ahmedabad, India',
      tech: ['Python', 'PHP', 'MySQL'],
      points: [
        'Built internal web interfaces and backend-connected pages.',
        'Worked on authentication logic and structured database interactions.',
        'Improved functionality, testing, and overall delivery flow.',
      ],
    },
  ];

  useEffect(() => {
    const steps = sectionRef.current?.querySelectorAll('.experience-step');
    if (!steps) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.45,
      }
    );

    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about experience-section" id="experience" ref={sectionRef}>
      <div className="heading">
        <ScrollFloat
          className="heading-about"
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Experience
        </ScrollFloat>
      </div>

      <p className="experience-intro">
        Scroll through the roles where I built products, improved interfaces,
        and grew as a developer.
      </p>

      <div className="experience-steps">
        {experiences.map((item, index) => (
          <div className="experience-step" key={index}>
            <article className="experience-card">
              <span className="experience-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="experience-card-top">
                <div>
                  <p className="experience-eyebrow">Experience</p>
                  <h3>{item.role}</h3>
                  <h4>{item.company}</h4>
                </div>

                <div className="experience-meta">
                  <span>{item.duration}</span>
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="experience-tech">
                {item.tech.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>

              <ul>
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(About);