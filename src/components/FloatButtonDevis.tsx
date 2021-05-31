import React, { useCallback, useEffect, useMemo, useState } from "react";
import images from "../assets/images";
import styles from "./FloatButtonDevis.module.css";
import ContentIsVisible from "../hooks/useElementIsVisible";

interface Props {
  onClick: () => void;
}

function FloatButtonDevis({ onClick }: Props) {
  const [contentIsOpen, setContentIsOpen] = useState(true);
  const visible = ContentIsVisible("contact");

  const handleScroll = useCallback(() => {
    if (contentIsOpen && visible === false) {
      setContentIsOpen(false);
    }
  }, [contentIsOpen, visible]);

  useEffect(() => {
    document.body.addEventListener("scroll", () => handleScroll());
    return () => document.body.removeEventListener("scroll", () => {});
  }, [handleScroll]);

  const finishContentIsOpen = useMemo(() => {
    if (contentIsOpen) {
      return true;
    }
    if (visible && contentIsOpen === false) {
      return true;
    }
    return false;
  }, [contentIsOpen, visible]);

  const openContent = useCallback(() => {
    finishContentIsOpen ? onClick() : setContentIsOpen(true);
  }, [finishContentIsOpen, onClick]);

  return (
    <div
      className={`${styles.bubble} ${
        finishContentIsOpen ? styles.contentIsOpen : styles.contentIsClose
      }`}
      onClick={openContent}
    >
      <img
        src={images.devis}
        alt="devis"
        className={`${styles.image} ${
          finishContentIsOpen ? styles.ImageIsOpen : styles.ImageIsClose
        }`}
      />
      <div>
        <p className={styles.title}>Devis</p>
        <p className={styles.subtitle}>Déposer ma demande</p>
      </div>
    </div>
  );
}

export default FloatButtonDevis;
