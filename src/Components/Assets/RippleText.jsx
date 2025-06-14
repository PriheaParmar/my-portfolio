// RippleText.jsx
import React, { useEffect, useRef } from "react";
import "./RippleText.css";

const RippleText = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const chars = container.querySelectorAll(".char");

    const ripple = (centerIndex) => {
      chars.forEach((char, i) => {
        const distance = Math.abs(i - centerIndex);
        const delay = distance * 30;

        setTimeout(() => {
          const direction = i < centerIndex ? -1 : 1;
          const magnitude = 10 - Math.min(distance * 2, 10);
          char.style.transform = `translateX(${direction * magnitude}px)`;

          setTimeout(() => {
            char.style.transform = "translateX(0)";
          }, 150);
        }, delay);
      });
    };

    chars.forEach((char, i) => {
      char.addEventListener("mouseenter", () => ripple(i));
    });

    return () => {
      chars.forEach((char, i) => {
        char.removeEventListener("mouseenter", () => ripple(i));
      });
    };
  }, [text]);

  return (
    <div className="quake-text" ref={containerRef}>
      {[...text].map((char, i) => (
        <span key={i} className="char" data-index={i}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default RippleText;
