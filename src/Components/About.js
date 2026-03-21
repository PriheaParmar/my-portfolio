import React from 'react';
import ScrollFloat from './Assets/ScrollFloat';
import './Styles/About.css';

function About() {
  const experiences = [
    {
      company: 'Invent Tech',
      role: 'Software Developer',
      duration: 'Jan 2026 – Present',
      location: 'Remote',
      tech: ['Python', 'Flask', 'JavaScript', 'ERP'],
      points: [
        'Worked on startup products from idea to usable product.',
        'Built web flows and backend logic for branding and ERP needs.',
      ],
    },
    {
      company: 'Devam Technologies',
      role: 'Web Developer',
      duration: 'Jun 2025 – Mar 2026',
      location: 'Ahmedabad, India',
      tech: ['React', 'REST APIs', 'Responsive UI'],
      points: [
        'Built responsive pages and reusable frontend components.',
        'Shipped polished features with cleaner UI and better usability.',
      ],
    },
    {
      company: 'Devam Technologies',
      role: 'Web Developer Intern',
      duration: 'Dec 2024 – May 2025',
      location: 'Ahmedabad, India',
      tech: ['HTML', 'CSS', 'JavaScript'],
      points: [
        'Supported frontend development, testing, and UI consistency.',
        'Improved layouts, responsiveness, and debugging workflows.',
      ],
    },
    {
      company: 'DGP Investigation Agency',
      role: 'Web Developer Intern',
      duration: 'Apr 2024 – Jul 2024',
      location: 'Ahmedabad, India',
      tech: ['Python', 'PHP', 'MySQL'],
      points: [
        'Built internal web pages connected with backend systems.',
        'Worked on authentication, data handling, and stability fixes.',
      ],
    },
  ];

  return (
    <section className="about experience-section" id="experience">
      <div className="experience-layout">
        <div className="experience-left">
          <div className="experience-left-inner">
            <ScrollFloat
              className="heading-about"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              style={{ color: 'white' }}
            >
              Experience
            </ScrollFloat>

            <p className="timeline-intro">
              Places where I built, learned, and grew through real work.
            </p>
          </div>
        </div>

        <div className="experience-right">
          <div className="timeline-list">
            {experiences.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-track">
                  <span className="timeline-dot" />
                  {index !== experiences.length - 1 && <span className="timeline-line" />}
                </div>

                <article className="timeline-card">
                  <div className="timeline-card-head">
                    <div className="timeline-card-left">
                      <span className="timeline-card-index">0{index + 1}</span>
                      <div className="timeline-title-block">
                        <h3>{item.role}</h3>
                        <h4>{item.company}</h4>
                      </div>
                    </div>

                    <div className="timeline-meta">
                      <span className="timeline-duration">{item.duration}</span>
                      <span className="timeline-location">{item.location}</span>
                    </div>
                  </div>

                  <div className="timeline-stackline">
                    <span className="stack-title">Stack</span>
                    <p>{item.tech.join('  /  ')}</p>
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
        </div>
      </div>
    </section>
  );
}

export default React.memo(About);