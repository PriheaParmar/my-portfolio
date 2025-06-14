import React from 'react';
import { useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import smoothscroll from 'smoothscroll-polyfill';
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
    smoothscroll.polyfill();

    const scrollOptions = {
      damping: 0.1,  
      alwaysShowTracks: true
    };

    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);
  return (
    <>
      <Navigation />
      <main>
        <SplashCursor/>
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects" className='projects-section'><Projects /></section>
        <section id="contact" className='contact-section'><Contact /></section>
      </main>
    </>
  );
}

export default App;
