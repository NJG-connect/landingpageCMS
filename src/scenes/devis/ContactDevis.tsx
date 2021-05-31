import React, { useState } from "react";
import imagesDevis from "../../assets/images/devis";
import { TextInput } from "../../components";
import styles from "./ContactDevis.module.css";
import { ContactDevisType } from "./Devis";

interface Props {
  onSubmit: (value: ContactDevisType) => void;
  initialValue: ContactDevisType;
  isSending: boolean;
}

function ContactDevis({ onSubmit, initialValue, isSending }: Props) {
  const [infoUser, setInfoUser] = useState(initialValue);
  const [isSend, setisSend] = useState(false);
  function handleSubmit() {
    setisSend(true);
    onSubmit(infoUser);
  }

  return (
    <div className={styles.contact} id="contact">
      <div className={styles.content}>
        <div className={styles.form}>
          <h3 className={styles.title}>Et pour échanger avec vous ?</h3>
          <TextInput
            value={infoUser.name}
            onChange={(name: string) => setInfoUser({ ...infoUser, name })}
            label="Nom"
            required
            nameForAutoComplete="nom"
          />
          <TextInput
            value={infoUser.society}
            onChange={(society: string) =>
              setInfoUser({ ...infoUser, society })
            }
            label="Société"
            nameForAutoComplete="organization"
          />
          <TextInput
            required
            value={infoUser.tel}
            onChange={(tel: string) => setInfoUser({ ...infoUser, tel })}
            label="Tel"
            nameForAutoComplete="phone"
          />
          <TextInput
            required
            value={infoUser.mail}
            onChange={(mail: string) => setInfoUser({ ...infoUser, mail })}
            label="Mail"
            nameForAutoComplete="email"
          />
        </div>
        <div className={styles.timbreDiv}>
          <div
            className={`${styles.stamp} ${isSend ? styles.stampIsReady : ""}`}
          >
            <img
              src={imagesDevis.approved}
              alt="stamp"
              className={styles.imageSend}
            />
          </div>
          <img
            src={imagesDevis.stamp}
            alt="stamp"
            className={styles.imageStamp}
          />
        </div>
      </div>
      <div className={styles.submit}>
        <div
          onClick={() => !isSending && handleSubmit()}
          className={`${styles.button}  ${isSending ? styles.isSending : ""}`}
        >
          <p>Envoyer</p>
        </div>
      </div>
    </div>
  );
}

export default ContactDevis;
