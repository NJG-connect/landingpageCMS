import React from "react";
import images, { ImageType } from "../assets/images";
import styles from "./Footer.module.css";

const footerOption: { image: ImageType; link: string }[] = [
  {
    image: "google",
    link: "https://g.page/njg-connect?gm",
  },
  {
    image: "linkedin",
    link: "https://www.linkedin.com/company/njgconnect/",
  },
  { image: "contact", link: "/contact" },
  { image: "cgu", link: "/cgu" },
];

function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div>
        {footerOption.map((el, index) => (
          <a
            href={el.link}
            target="_blank"
            rel="noreferrer"
            key={index}
            className={styles.link}
          >
            <img src={images[el.image]} className={styles.img} alt={el.image} />
          </a>
        ))}
      </div>
      <p>NJG Connect © 2021</p>
    </footer>
  );
}

export default Footer;
