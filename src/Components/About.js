import React from 'react';
import ScrollFloat from './Assets/ScrollFloat';
import './Styles/About.css';

function About() {
  const experiences = [
    {
      company: 'Invent Tech',
      role: 'Software Developer (Project-Based)',
      duration: 'Jan 2026 – Present',
      location: 'Ahmedabad, India',
      tech: ['Python', 'Flask', 'JavaScript', 'ERP'],
      points: [
        'Built startup products including a branding website and ERP workflows.',
        'Worked across frontend and backend to create clean, functional experiences.',
      ],
    },
    {
      company: 'Devam Technologies',
      role: 'Web Developer',
      duration: 'Jun 2025 – Present',
      location: 'Ahmedabad, India',
      tech: ['React', 'APIs', 'Responsive UI'],
      points: [
        'Built interactive web apps and reusable frontend modules.',
        'Improved usability and delivered polished production-ready features.',
      ],
    },
    {
      company: 'Devam Technologies',
      role: 'Web Developer Intern',
      duration: 'Dec 2024 – May 2025',
      location: 'Ahmedabad, India',
      tech: ['HTML', 'CSS', 'JavaScript'],
      points: [
        'Created responsive UI components and improved page consistency.',
        'Supported debugging, testing, and feature improvements.',
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
        'Worked with authentication logic and database interactions.',
      ],
    },
  ];

  return (
    <section className="about timeline-section" id="experience">
      <div className="heading">
        <ScrollFloat
  className="heading-about"
  animationDuration={1}
  ease="back.inOut(2)"
  scrollStart="center bottom+=50%"
  scrollEnd="bottom bottom-=40%"
  stagger={0.03}
  style={{ color: "white" }}
>
  Experience
</ScrollFloat>
      </div>

      <p className="timeline-intro">
        A compact timeline of the roles where I learned, built, and grew as a developer.
      </p>

      <div className="timeline-list">
        {experiences.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-date">
              <span>{item.duration}</span>
            </div>

            <div className="timeline-track">
              <span className="timeline-dot" />
              {index !== experiences.length - 1 && <span className="timeline-line" />}
            </div>

            <article className="timeline-card">
              <div className="timeline-card-top">
                <div>
                  <h3>{item.role}</h3>
                  <h4>{item.company}</h4>
                </div>

                <span className="timeline-location">{item.location}</span>
              </div>

              <div className="timeline-tech">
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