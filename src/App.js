import { useEffect, useLayoutEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ConstellationCursor from './components/effects/ConstellationCursor';

import './styles/App.css';

function App() {
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <>
      <ConstellationCursor />
      <Navigation />
      <main>
        <Home />
        <About />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

export default App;
