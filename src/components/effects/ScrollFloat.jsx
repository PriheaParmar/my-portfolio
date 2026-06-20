import { useEffect, useMemo, useRef } from 'react';

import '../../styles/ScrollFloat.css';

function ScrollFloat({
  children,
  containerClassName = '',
  textClassName = '',
  animationDuration = 0.55,
  stagger = 0.018,
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';

    return text.split('').map((char, index) => (
      <span className="char" key={`${char}-${index}`} style={{ '--char-delay': `${index * stagger}s` }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children, stagger]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.24,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={containerRef}
      className={`scroll-float ${containerClassName}`.trim()}
      style={{ '--scroll-float-duration': `${animationDuration}s` }}
    >
      <span className={`scroll-float-text ${textClassName}`.trim()}>{splitText}</span>
    </h2>
  );
}

export default ScrollFloat;
