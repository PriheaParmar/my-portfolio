import { memo, useEffect, useState } from 'react';

import '../../styles/RotatingText.css';

const words = [
  'full-stack web apps',
  'clean user interfaces',
  'reliable REST APIs',
  'database workflows',
  'thoughtful digital products',
];

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3200);

    return () => clearInterval(intervalId);
  }, []);

  return <span key={words[index]} className="rotating-word">{words[index]}</span>;
}

export default memo(RotatingText);
