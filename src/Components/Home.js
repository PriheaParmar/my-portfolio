import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Styles/Home.css';
import RotatingText from './Assets/RotatingText';

const Home = () => {
  return (
    <section className="home-page" id="home">
      <div className="page-bg-reveal"></div>
      <div className="hero-grain"></div>
      <div className="hero-light hero-light-1"></div>
      <div className="hero-light hero-light-2"></div>

      <div className="home-page-inner">
        <div className="hero-visual-wrap">
          <div className="hero-orbit hero-orbit-1"></div>
          <div className="hero-orbit hero-orbit-2"></div>

          <div className="hero-lottie-shell">
            <DotLottieReact
              className="hero-lottie"
              src="https://lottie.host/f36dc3ca-9393-4914-8c76-b8e2693f35f1/D73QSta52O.lottie"
              loop
              autoplay
            />
          </div>
        </div>

        <div className="welcome-text">
          <p className="hero-kicker reveal-line reveal-1">
            Creative Developer • Full Stack • Based in India

          </p>
          <h1 className="hero-main-title reveal-mask reveal-2">
            Hello! I’m Priya,
            <br />
            <span className="no-break">
              I design and develop <RotatingText />
            </span>
          </h1>

          <p className="hero-text-block reveal-line reveal-3">
            I’m a full-stack developer passionate about building
            aesthetic, immersive, and meaningful digital experiences through code and design.
          </p>

          <div className="hero-actions reveal-line reveal-4">


            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-secondary"
            >
              View Resume
            </a>


          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Home);