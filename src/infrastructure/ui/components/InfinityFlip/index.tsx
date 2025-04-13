import styles from './style.module.css';

import { useEffect, useRef, useState } from 'react';
import { generateRandomUniqueNumbersArray } from '@/application/utils/generateRandomUniqueNumbersArray';

export const InfinityFlip = () => {

  const imageUrls = generateRandomUniqueNumbersArray(88);

  const [currentImage, setCurrentImage] = useState(imageUrls[0]);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>(0);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  const animate = () => {

    setRotation(prevRotation => {
      const newRotation = prevRotation + 1;

      if (newRotation === 90 || newRotation === 270) {
        setCurrentImage(getRandomImage());
      }

      if (newRotation === 360) {
        return 0;
      }

      return newRotation;
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className={ styles.container }>
      <div
        className={ styles.card }
        style={ {transform: `rotateY(${ rotation }deg)`} }
      >
        <div
          className={ styles.image }
          style={ {backgroundImage: `url(bottle/${ currentImage }.jpeg)`} }
        />
      </div>
    </div>
  )
}

