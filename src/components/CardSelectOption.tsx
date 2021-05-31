import React from "react";
import imagesDevis, { ImageDevisType } from "../assets/images/devis";
import styles from "./CardSelectOption.module.css";

interface Props {
  selected?: boolean;
  onClick: () => void;
  info: {
    title: string;
    description: string;
    images: ImageDevisType[];
  };
}

function CardSelectOption({
  selected,
  onClick,
  info: { title, description, images },
}: Props) {
  return (
    <div className={styles.card} onClick={() => onClick()}>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <div>
          <img
            src={
              selected
                ? imagesDevis.checkboxValided
                : imagesDevis.checkboxNotValided
            }
            alt="checkbox"
            className={styles.checkbox}
          />
        </div>
      </div>
      <div className={styles.separator} />
      <p className={styles.description}>{description}</p>
      <div className={styles.logoPart}>
        {images.map((el, index) => (
          <div key={index} className={styles.divImageForm}>
            <img
              src={imagesDevis[el]}
              className={styles.imageForm}
              alt={el}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardSelectOption;
