import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Styles/Skills.css';

const SKILLS = [
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'bootstrap', label: 'BootStrap' },
  { key: 'js', label: 'JavaScript' },
  { key: 'tail', label: 'Tailwind' },
  { key: 'python', label: 'Python' },
  { key: 'flask', label: 'Flask' },
  { key: 'django', label: 'Django' },
  { key: 'mongo', label: 'MongoDB' },
  { key: 'mysql', label: 'MySQL' },
  { key: 'postman', label: 'Postman' },
  { key: 'vscode', label: 'VSCode' },
  { key: 'node', label: 'Node.js' },
  { key: 'react', label: 'React.js' },
  { key: 'csharp', label: 'C#' },
];

function Skills() {
  return (
    <div className="skills">
      <div className="skill-container" data-aos="fade-down">
        <DotLottieReact
          style={{
            height: '620px',
            width: '620px',
            zIndex: '2000',
            opacity: '70%',
            transform: 'ScaleX(-1)',
          }}
          src="https://lottie.host/49e81a9c-f9bc-4050-92ef-e24a1cbfaf2f/Oa7l3AESht.lottie"
          loop
          autoplay
        />
      </div>

      <div className="tech-stack" role="list">
        {SKILLS.map((s, idx) => (
          <button
            key={s.key}
            type="button"
            role="listitem"
            className={s.key}
            data-aos="zoom-in"
            data-aos-delay={idx % 3 === 0 ? 300 : idx % 3 === 1 ? 400 : 600}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Skills);
