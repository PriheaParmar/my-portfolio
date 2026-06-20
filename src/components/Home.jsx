import { memo, useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import RotatingText from './ui/RotatingText';
import ResumeButton from './ui/ResumeButton';
import '../styles/Home.css';

function Home() {
  const sectionRef = useRef(null);
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowLottie(entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: '260px 0px',
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="home-page" id="home">
      <div className="page-bg-reveal" />
      <div className="hero-grain" />
      <div className="hero-light hero-light-1" />
      <div className="hero-light hero-light-2" />

      <div className="home-page-inner">
        <div className="welcome-text">
          <h1 className="hero-main-title reveal-mask reveal-2">
            <span className="hero-name-stack">
              <span className="hero-name-back">Hello! I’m Priya,</span>
              <span className="hero-name-front">Hello! I’m Priya,</span>
            </span>
            <br />
            <span className="no-break">
              <span className="cursive"> I Design and Develop </span>
              <span className="hero-main-title rotate">
                <RotatingText />
              </span>
            </span>
          </h1>

          <p className="hero-text-block reveal-line reveal-3">
            I’m a software and full-stack developer focused on clean, reliable,
            user-focused digital products — building responsive interfaces, REST APIs,
            backend systems, and database-driven workflows that turn real problems into
            smooth, practical experiences.
          </p>

          <div className="hero-actions reveal-line reveal-4">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <ResumeButton />
            </a>
          </div>
        </div>

        <div className="hero-visual-wrap">
          <div className="hero-lottie-shell">
            {showLottie && (
              <DotLottieReact
                className="hero-lottie"
                src="https://lottie.host/49e81a9c-f9bc-4050-92ef-e24a1cbfaf2f/Oa7l3AESht.lottie"
                loop
                autoplay
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Home);
