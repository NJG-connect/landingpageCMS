import React from 'react';
import images from '../../assets/images';
import styles from './HeaderDevis.module.css';

interface Props {
  onClose: () => void;
  step: number;
  moveStep: (value: number) => void;
  seeTimeline: boolean
}

function HeaderDevis({ onClose, step, moveStep, seeTimeline }: Props) {
  return (
    <div className={styles.header}>
      <img
        src={images.logo}
        className={styles.logo}
        alt="Logo NJG Connect"
      />
      <h4 className={styles.headerTitle}>préparation d'un Devis</h4>
      <div className={styles.goBackDiv} onClick={() => onClose()}>
        <img
          src={images.close}
          className={styles.goBack}
          alt="Fermer le Devis"
        />
      </div>
      {seeTimeline && <div className={styles.lineStep} >
        <div className={styles.timeline} />
        <div
          className={`${styles.bubbleTimeline} ${step === 0 ? styles.bubbleTimelineActivated : ''} ${step > 0 ? styles.bubbleTimelineDisabled : ''}`}
          onClick={() => step > 0 && moveStep(0)}>1</div>
        <div
          className={`${styles.bubbleTimeline} ${step === 1 ? styles.bubbleTimelineActivated : ''} ${step > 1 ? styles.bubbleTimelineDisabled : ''}`}
          onClick={() => step >= 1 && moveStep(1)}>2</div>
        <div
          className={`${styles.bubbleTimeline} ${step === 2 ? styles.bubbleTimelineActivated : ''}`}>3</div>
      </div>}
    </div >
  );
}

export default HeaderDevis;
