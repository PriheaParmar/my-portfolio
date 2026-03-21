import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Styles/Home.css';
import RotatingText from './Assets/RotatingText';
import Button from './Assets/Buttonhom';

const Home = () => {
  return (
    <section className="home-page" id="home">
      <div className="page-bg-reveal"></div>
      <div className="hero-grain"></div>
      <div className="hero-light hero-light-1"></div>
      <div className="hero-light hero-light-2"></div>

      <div className="home-page-inner">
        <div className="welcome-text">


          <h1 className="hero-main-title reveal-mask reveal-2">
            <span className="hero-name-stack">
              <span className="hero-name-back">Hello! I’m Priya,</span>
              <span className="hero-name-front">Hello! I’m Priya,</span>
            </span>
            <br />
            <span className="no-break">
              <span className='cursive'> I Design and Develop </span><span className='hero-main-title rotate'><RotatingText /> </span>
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
            >
               <Button></Button>
            </a>
          </div>
        </div>

        <div className="hero-visual-wrap">

          <div className="hero-lottie-shell">
            <DotLottieReact style={{ height: '650px', width: '650px', zIndex: '2000', opacity: '70%', transform: 'ScaleX(-1)' }}
              className="hero-lottie"
              src="https://lottie.host/49e81a9c-f9bc-4050-92ef-e24a1cbfaf2f/Oa7l3AESht.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Home);