import React from "react";
import styles from "./CookiesToaster.module.css";

interface Props {
  onDecline: () => void;
  onAccept: () => void;
}

function CookiesToaster({ onDecline, onAccept }: Props) {
  return (
    <div className={styles.cookies}>
      <div className={styles.header}>
        <p className={styles.title}>Infos cookies !</p>
      </div>
      <div className={styles.divDescription}>
        <p className={styles.description}>
          Nous procédons à l'utilisation de cookies afin d'optimiser votre
          navigation et vous proposer la meilleure expérience possible.
          Evidemment, vous êtes libre de refuser nos cookies. 🍪🍪🍪
        </p>
      </div>
      <div className={styles.footer}>
        <div className={styles.button} onClick={onDecline}>
          <p className={styles.buttonTitle}>Non merci 😞</p>
        </div>
        <div className={styles.button} onClick={onAccept}>
          <p className={styles.buttonTitle}>Oui 😁</p>
        </div>
      </div>
    </div>
  );
}

export default CookiesToaster;
