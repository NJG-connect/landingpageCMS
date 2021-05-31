import React, { useContext, useState } from "react";
import sendEmailFromEmailJS from "../api/sendEmail";
import { addInfoAirtableForContact } from "../api/stockInfoOnAirtable";
import images from "../assets/images";
import { TextInput } from "../components";
import { ToastContext } from "../contexts/ToastContext";
import { validePhoneOrEmail } from "../utils/validators";
import styles from "./Contact.module.css";

interface Props {
  sendEmail: () => void;
  mailHasSent: boolean;
}

const contactNumber = "07 56 99 74 93";

const initialUserValue = {
  name: undefined,
  society: undefined,
  contact: undefined,
};

function Contact(props: Props) {
  const { show } = useContext(ToastContext);
  const [infoUser, setInfoUser] = useState<{
    name?: string;
    society?: string;
    contact?: string;
  }>(initialUserValue);

  const handleSendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      Object.entries(infoUser).every(
        ([key, value]) => !!value || key === "society"
      ) &&
      !props.mailHasSent
    ) {
      setInfoUser(initialUserValue);
      const response: { succes: boolean } = await addInfoAirtableForContact(
        infoUser
      );

      // if fail on Airtable, send email to us
      if (!response.succes) {
        await sendEmailFromEmailJS(infoUser, "makingContact", "us");
      }

      // if user have email send a confirmation Email
      const emailOrTel: false | "Tel" | "Email" = validePhoneOrEmail(
        infoUser.contact
      );
      if (emailOrTel === "Email") {
        await sendEmailFromEmailJS(
          { ...infoUser, mail: infoUser.contact },
          "makingContact",
          "user"
        );
      }
      props.sendEmail();

      // GOOGLE ANALYTICS
      import("../utils/reactAnalytics").then(({ createEventGA }) => {
        createEventGA({
          category: "send",
          action: "send email",
        });
      });

      show({ message: "l'email a bien été envoyé" });
      return false;
    } else {
      // GOOGLE ANALYTICS
      import("../utils/reactAnalytics").then(({ createEventGA }) => {
        createEventGA({
          category: "send",
          action: "want send mail before the deadline",
        });
      });
      show({ message: "Votre message a déjà été transmis" });
    }
  };

  return (
    <div id="contact" className={styles.contact}>
      <div id={styles.container}>
        <h2 className={styles.title}>
          …alors ne perdons pas de temps entrons en contact !
        </h2>
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <img
              src={images.phoneCall}
              className={styles.phoneCallImage}
              alt="phoneCall"
            />
            <p className={styles.phoneCallText}>{contactNumber}</p>
          </div>
          <div className={styles.separator}>
            <p className={styles.separatorText}>ou</p>
          </div>
          <div className={styles.rightContent}>
            <form
              method="post"
              onSubmit={(e) => handleSendEmail(e)}
              className={styles.form}
              autoComplete="on"
            >
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
                value={infoUser.contact}
                onChange={(contact: string) =>
                  setInfoUser({ ...infoUser, contact })
                }
                label="Mail / Tel"
                nameForAutoComplete="phone"
              />
              <button type="submit" className={styles.button}>
                <p>Entrer en contact</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
