import { generateRandomUniqueNumbersArray } from '@/utils/getRandomUniqueNumbers.ts';
import { useEffect, useRef, useState } from 'react';

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
      const newRotation = prevRotation + .75;

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
    <div style={ {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    } }>
      <div style={ {
        width: '30px',
        height: '55px',
        transform: `rotateY(${ rotation }deg)`,
      } }>
        <div style={ {
          width: '100%',
          height: '100%',
          position: 'relative',
        } }>
          <div style={ {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(beers/${ currentImage }.jpeg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          } }/>
        </div>
      </div>
    </div>
  )
}

