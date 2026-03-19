import React, { useEffect, useState } from 'react';
import './RotatingText.css';

const words = [
  'modern websites',
  'expressive interfaces',
  'immersive experiences',
  'aesthetic digital products',
];

const RotatingText = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 350);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`rotating-word ${visible ? 'show' : 'hide'}`}>
      {words[index]}
    </span>
  );
};

export default RotatingText;