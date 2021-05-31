import React, { useEffect, useRef, useState } from 'react';
import styles from './LoaderAnimation.module.css';
import AnimationImage from '../assets/images/animation';


interface Props {
  setLoadingAnimation: () => void;
}
function LoaderAnimation({ setLoadingAnimation }: Props) {
  const elementRef = useRef<HTMLImageElement>(null);
  const [animationIsFinish, setAnimationIsFinish] = useState(false);
  const [fadePage, setFadePage] = useState(false);

  useEffect(() => {
    if (elementRef.current) {
      const timeout = setTimeout(() => {
        setAnimationIsFinish(true);
      }, 3200);
      return () => clearTimeout(timeout);
    }
  }, [elementRef]);

  return (
    <div
      className={`${styles.loader} ${fadePage ? styles.animatedPage : ''}`}
      onAnimationEnd={setLoadingAnimation}>
      <img
        onAnimationEnd={() => setFadePage(true)}
        ref={elementRef} id="gifLogo"
        src={AnimationImage.logoAnim}
        alt="Animation NJG Connect"
        className={`${styles.image} ${animationIsFinish ? styles.animatedLogo : ''}`}
      />
    </div >
  );
}

export default LoaderAnimation;