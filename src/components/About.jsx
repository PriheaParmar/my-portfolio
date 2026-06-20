import { memo } from 'react';

import { experiences } from '../data/experiences';
import ScrollFloat from './effects/ScrollFloat';
import '../styles/About.css';

function About() {
  return (
    <section className="about experience-section" id="experience">
      <div className="experience-layout mission-layout">
        <aside className="experience-left mission-control" aria-label="Experience overview">
          <div className="experience-left-inner mission-control-inner">
            <span className="mission-eyebrow">career log</span>

            <ScrollFloat animationDuration={0.55} stagger={0.025}>
              Experience
            </ScrollFloat>

            <p className="timeline-intro mission-intro">
              A compact timeline of the roles, internships, and product work that shaped my development journey.
            </p>
          </div>
        </aside>

        <div className="experience-right mission-right">
          <div className="timeline-list mission-timeline">
            {experiences.map((item, index) => {
              const missionNumber = String(index + 1).padStart(2, '0');

              return (
                <article
                  className="timeline-card mission-card"
                  key={`${item.company}-${item.role}-${item.duration}`}
                  style={{ '--card-index': index }}
                >
                  <div className="mission-node" aria-hidden="true">
                    <span>{missionNumber}</span>
                  </div>

                  <div className="timeline-card-head mission-card-head">
                    <div className="timeline-title-block mission-title-block">
                      <span className="timeline-company mission-company">{item.company}</span>
                      <h3>{item.role}</h3>
                    </div>

                    <div className="timeline-meta mission-meta">
                      <span className="timeline-duration">{item.duration}</span>
                      <span className="timeline-location">{item.location}</span>
                    </div>
                  </div>

                  <div className="timeline-stackline mission-stackline">
                    <span className="stack-title">Toolkit</span>
                    <p>{item.tech.join(' - ')}</p>
                  </div>

                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(About);
