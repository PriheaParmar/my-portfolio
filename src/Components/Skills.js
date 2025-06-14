import React, { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ScrollFloat from './Assets/ScrollFloat'
import './Styles/Skills.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Skills() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,       // Allow animations to replay
      mirror: true,      // Animate when scrolling up
      easing: 'ease-in-out',
      offset: 100,
    });
  }, []);

  return <div>
    <div className="skills">


      <div className="skill-container" data-aos="fade-down">
        <DotLottieReact style={{ height: '620px', width: '620px', zIndex: '2000', opacity: '70%', transform: 'ScaleX(-1)' }}
          src="https://lottie.host/49e81a9c-f9bc-4050-92ef-e24a1cbfaf2f/Oa7l3AESht.lottie"
          loop autoplay />
      </div>

      <div className="tech-stack" >
        <button className='html' data-aos="zoom-in" >
          <a href="#"><span>HTML </span></a>
        </button>
        <button className='css' data-aos="zoom-in" data-aos-delay="300">
          <a href="#"><span>CSS</span></a>
        </button>
        <button className='bootstrap' data-aos="zoom-in" data-aos-delay="400">
          <a href="#"><span>BootStrap</span></a>
        </button>
        <button className='js' data-aos="zoom-in" data-aos-delay="300">
          <a href="#"><span>JavaScript</span></a>
        </button>
        <button className='tail' data-aos="zoom-in" data-aos-delay="300">
          <a href="#"><span>Tailwind</span></a>
        </button>
        <button className='python' data-aos="zoom-in" data-aos-delay="400" >
          <a href="#"><span>Python</span></a>
        </button>
        <button className='flask' data-aos="zoom-in" data-aos-delay="300">
          <a href="#"><span>Flask</span></a>
        </button>
        <button className='django' data-aos="zoom-in" data-aos-delay="300">
          <a href="#"><span>Django</span></a>
        </button>
        <button className='mongo' data-aos="zoom-in" data-aos-delay="400">
          <a href="#"><span>MongoDB</span></a>
        </button>
        <button className='mysql' data-aos="zoom-in" data-aos-delay="300">
          <a href="#"><span>MySQL</span></a>
        </button>
        <button className='postman' data-aos="zoom-in" data-aos-delay="400">
          <a href="#"><span>Postman</span></a>
        </button>
        <button className='vscode' data-aos="zoom-in" data-aos-delay="300">
          <a href="#"><span>VSCode</span></a>
        </button>
        <button className='node' data-aos="zoom-in" data-aos-delay="600">
          <a href="#"><span>Node.js</span></a>
        </button>
        <button className='react' data-aos="zoom-in" data-aos-delay="300">
          <a href="#"><span>React.js</span></a>
        </button>
        <button className='csharp' data-aos="zoom-in" data-aos-delay="300">
          <a href="#"><span>C#</span></a>
        </button>
      </div>


    </div>
  </div>;
}

export default Skills;
