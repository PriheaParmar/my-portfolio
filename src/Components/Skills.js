import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Styles/Skills.css';

const TECH_STACK = [
  { key: 'react', label: 'React.js', x: '50%', y: '10%', size: 'lg' },
  { key: 'next', label: 'Next.js', x: '68%', y: '14%', size: 'md' },
  { key: 'js', label: 'JavaScript', x: '84%', y: '24%', size: 'lg' },
  { key: 'ts', label: 'TypeScript', x: '91%', y: '38%', size: 'md' },
  { key: 'python', label: 'Python', x: '90%', y: '56%', size: 'lg' },
  { key: 'java', label: 'Java', x: '81%', y: '72%', size: 'sm' },
  { key: 'php', label: 'PHP', x: '66%', y: '84%', size: 'sm' },
  { key: 'sql', label: 'SQL', x: '50%', y: '89%', size: 'sm' },
  { key: 'cpp', label: 'C++', x: '34%', y: '84%', size: 'sm' },
  { key: 'html', label: 'HTML5', x: '18%', y: '73%', size: 'sm' },
  { key: 'css', label: 'CSS3', x: '10%', y: '56%', size: 'sm' },
  { key: 'tailwind', label: 'Tailwind CSS', x: '9%', y: '39%', size: 'md' },
  { key: 'bootstrap', label: 'Bootstrap', x: '16%', y: '24%', size: 'sm' },
  { key: 'jquery', label: 'jQuery', x: '30%', y: '14%', size: 'sm' },
  { key: 'gsap', label: 'GSAP', x: '42%', y: '10%', size: 'sm' },

  { key: 'node', label: 'Node.js', x: '72%', y: '28%', size: 'md' },
  { key: 'express', label: 'Express.js', x: '77%', y: '44%', size: 'md' },
  { key: 'flask', label: 'Flask', x: '72%', y: '62%', size: 'sm' },
  { key: 'django', label: 'Django', x: '61%', y: '74%', size: 'sm' },
  { key: 'mysql', label: 'MySQL', x: '50%', y: '78%', size: 'sm' },
  { key: 'postgres', label: 'PostgreSQL', x: '39%', y: '74%', size: 'md' },
  { key: 'mongodb', label: 'MongoDB', x: '28%', y: '62%', size: 'md' },
  { key: 'sqlite', label: 'SQLite', x: '23%', y: '45%', size: 'sm' },
  { key: 'firebase', label: 'Firebase', x: '28%', y: '28%', size: 'sm' },

  { key: 'git', label: 'Git', x: '40%', y: '22%', size: 'sm' },
  { key: 'github', label: 'GitHub', x: '50%', y: '20%', size: 'sm' },
  { key: 'postman', label: 'Postman', x: '60%', y: '22%', size: 'sm' },
  { key: 'figma', label: 'Figma', x: '66%', y: '36%', size: 'sm' },
  { key: 'rest', label: 'REST APIs', x: '50%', y: '66%', size: 'sm' },
  { key: 'openai', label: 'OpenAI API', x: '34%', y: '36%', size: 'md' },
];

function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-vault">
        <div className="skills-header">
          <h2 className="skills-title">Tech Stack</h2>

          <div className="vault-core">
            <span className="core-glow glow-one" />
            <span className="core-glow glow-two" />

            <div className="vault-core-shell">
              <DotLottieReact
                className="vault-lottie"
                src="https://lottie.host/f36dc3ca-9393-4914-8c76-b8e2693f35f1/D73QSta52O.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>

        <div className="orbit-zone">
          <span className="orbit-ring orbit-one" />
          <span className="orbit-ring orbit-two" />
          <span className="orbit-ring orbit-three" />

          <span className="orbit-dot dot-one" />
          <span className="orbit-dot dot-two" />
          <span className="orbit-dot dot-three" />

          {TECH_STACK.map((skill) => (
            <button
              key={skill.key}
              type="button"
              className={`skill-chip ${skill.size}`}
              style={{
                '--x': skill.x,
                '--y': skill.y,
              }}
            >
              <span className="skill-chip-label">{skill.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(Skills);