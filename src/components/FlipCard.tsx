import React, { useEffect, useState } from "react";
import images, { ImageType } from "../assets/images";
import styles from "./FlipCard.module.css";

interface Props {
  data: {
    title: string;
    description?: string;
    logo?: string;
    subDescription?: string;
    logoDescription?: string;
    submit?: string;
    link?: string;
  };
}

function FlipCard({ data }: Props) {
  const [canFlip, setFlip] = useState<boolean>(!!data.subDescription);
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
    if (!!data.subDescription === true) {
      setFlip(true);
    } else {
      setFlip(false);
    }
  }, [canFlip, data.subDescription]);

  function createMarkup(data: string) {
    return { __html: `<p>${data}</p>` };
  }

  function handleClick() {
    if (canFlip) {
      // GOOGLE ANALYTICS
      import("../utils/reactAnalytics").then(({ createEventGA }) => {
        createEventGA({
          category: "scrollTo",
          action: "go to contact part",
        });
      });
      setisActive(!isActive);
    }
    return;
  }

  return (
    <div
      className={`${styles.flipCard} ${canFlip && styles.flipCardHover}`}
      onClick={() => handleClick()}
    >
      <div
        className={`${styles.flipCardInner} ${
          isActive && styles.flipCardForButton
        }`}
      >
        <div className={styles.flipCardFront}>
          <p className={styles.title}>{data.title}</p>
          {data.logoDescription ? (
            <img
              src={images[data.logoDescription as ImageType]}
              alt="solution"
              className={styles.imageDescription}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={createMarkup(data.description!)}
              className={styles.description}
            />
          )}

          {data.logo && (
            <img
              src={images[data.logo as ImageType]}
              alt="solution"
              className={styles.image}
            />
          )}

          {data.submit && data.link && (
            <a
              href={data.link}
              className={styles.button}
              target="_blank"
              rel="noreferrer"
            >
              {data.submit}
            </a>
          )}
        </div>
        <div className={styles.flipCardBack}>
          {!!data.subDescription && (
            <div
              dangerouslySetInnerHTML={createMarkup(data.subDescription)}
              className={styles.description}
            />
          )}
        </div>
        {canFlip && (
          <div className={styles.viewPager}>
            <div className={styles.boundBlue} />
            <div className={styles.boundWhite} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FlipCard;
