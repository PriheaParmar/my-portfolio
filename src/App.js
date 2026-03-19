import React, { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navigation from './Components/Navigation';
import Home from './Components/Home';
import About from './Components/About';
import Skills from './Components/Skills';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import SplashCursor from './Components/Assets/SplashCursor';

import './App.css';

function App() {
  useEffect(() => {
    // Smooth scrolling polyfill for older browsers
    smoothscroll.polyfill();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize AOS once for the entire app
    AOS.init({
      duration: prefersReducedMotion ? 0 : 800,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
      offset: 100,
      disable: prefersReducedMotion,
    });

    return () => {
      // Avoid keeping observers/listeners around
      AOS.refreshHard();
    };
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <SplashCursor />
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects" className="projects-section"><Projects /></section>
        <section id="contact" className="contact-section"><Contact /></section>
      </main>
    </>
  );
}

export default App;
