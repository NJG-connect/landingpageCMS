import React from "react";
import images from "../assets/images";
import styles from "./Header.module.css";

function Header() {
  return (
    <div id="header" className={styles.header}>
      <div id={styles.container}>
        <img src={images.circle} className={styles.circle} alt="Logo" />
        <img src={images.tiles} className={styles.tiles} alt="Logo" />
        <div className={styles.firstContent}>
          <img src={images.logo} className={styles.logoImage} alt="Logo" />
        </div>
        <div>
          <h1 className={styles.subtile}>L'AGENCE DIGITALE QUI</h1>
          <h1 className={styles.subtile}>VOUS CONNECTE Á VOTRE AVENIR</h1>
        </div>
        <div className={styles.thirdContent}>
          <img
            src={images.mobile}
            className={styles.platformImageMobile}
            alt="mobile"
          />
          <div>
            <p className={styles.text}>Android</p>
            <p className={styles.text}>IOS</p>
          </div>
          <div className={styles.separator} />
          <p className={styles.text}>WEB</p>
          <img src={images.web} className={styles.platformImageWeb} alt="web" />
        </div>
      </div>
      <div className={styles.waveView}>
        <div className={styles.arrow} />
        <img src={images.waveTop} className={styles.waveImage} alt="wave" />
        <div className={styles.waveBackground} />
      </div>
    </div>
  );
}

export default Header;
