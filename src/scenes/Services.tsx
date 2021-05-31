import React, { useEffect, useState } from "react";
import images from "../assets/images";
import { FlipCard } from "../components";
import styles from "./Services.module.css";
import servicesJson from "../data/services.json";
import { useTransition, animated } from "react-spring";
import useContentIsVisible from "../hooks/useElementIsVisible";

function Services() {
  const visible = useContentIsVisible("refService");
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    if (isVisible === false) {
      if (visible) {
        setVisible(true);
      }
      return;
    }
    return;
  }, [isVisible, visible]);

  const transitions = useTransition(
    isVisible
      ? [...servicesJson].map((el) => ({
          ...el,
          link:
            el.link === "pdf-link"
              ? `${process.env.PUBLIC_URL}/docs/plaquette.njgconnect.pdf`
              : el.link,
        }))
      : [],
    (item) => item.title,
    {
      unique: true,
      trail: 350,
      from: { opacity: 0, transform: "scale(0.9)" },
      enter: { opacity: 1, transform: "scale(1)" },
    }
  );

  return (
    <div id="services" className={styles.services}>
      <div id={styles.container}>
        <h2 className={styles.title}>NOS SERVICES</h2>
        <div
          id="refService"
          className={
            isVisible ? styles.scrollContent : styles.scrollContentWait
          }
        >
          {transitions.map(({ item, key, props }) => (
            <animated.div
              className={styles.card}
              key={key}
              style={{ ...props }}
            >
              <FlipCard data={item} />
            </animated.div>
          ))}
        </div>
        <p className={styles.description}>Vers une évolution digitale...</p>
      </div>
      <img src={images.waveBottom} className={styles.waveImage} alt="wave" />
    </div>
  );
}

export default Services;
