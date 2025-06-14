import React, { useEffect } from 'react';
import ScrollFloat from './Assets/ScrollFloat';
import TiltedCard from './Assets/TiltedCard';
import BlurText from './Assets/BlurText';
import AOS from 'aos';
import 'aos/dist/aos.css';


import './Styles/About.css';


function About() {
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
    <div className="about">
      <div className="heading">
        <ScrollFloat className="heading-about" animationDuration={1} ease='back.inOut(2)' scrollStart='center bottom+=50%' scrollEnd='bottom bottom-=40%' stagger={0.03} >
          About Me
        </ScrollFloat>
      </div>

      <div className="content">

        <div className="content-text" data-aos="fade-right">
          <BlurText
            text="Hey! Visitor"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-4"
          />

          <div className="name">
            <BlurText
              text="I'm  "
              delay={200}
              animateBy="words"
              direction="top"
              className="text-2xl mb-4"
            />
            <BlurText
              text="Priya Parmar"
              className="priya"
            />
          </div>

          <div className="name">
            <BlurText
              text="a developer, designer, and dreamer from  "
              delay={200}
              animateBy="words"
              direction="top"
              className="text-2xl mb-4"
            />
            <BlurText
              text="Gujarat, India"
              className="priya"
            />
          </div>

          <BlurText
            text="I’ve recently completed my BCA and now diving deep into full-stack development."
            delay={300}
            animateBy="words"
            direction="top"
            className="char text-xl mb-4"
          />

          <BlurText
            text="I love building beautiful & functional experiences with React, Python, and .NET."
            delay={350}
            animateBy="words"
            direction="top"
            className="char text-xl mb-4"
          />
          {/* <PCSetup /> */}

          <BlurText
            text="Outside coding, I paint 🎨, play Valorant 🎮, and dream big 🚀."
            delay={400}
            animateBy="words"
            direction="top"
            className="char test text-xl mb-4"
          />

          <BlurText
            text="Let’s build something meaningful together!"
            delay={450}
            animateBy="words"
            direction="top"
            className="char text-xl mb-4"
          />

        </div>
      </div>


    </div>
  </div>;
}

export default About;
