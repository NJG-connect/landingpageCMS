import React from "react";
import contactImage, { contactImageType } from "../assets/images/contact";
import { ContactWithSociety } from "../screens/ContactScreen";
import styles from "./SpecificContact.module.css";
var vCardsJS = require("vcards-js");

interface Props {
  info: ContactWithSociety;
}

function SpecificContact({ info }: Props) {
  function donwload() {
    // GOOGLE ANALYTICS
    import("../utils/reactAnalytics").then(({ createEventGA }) => {
      createEventGA({
        category: "contact",
        action: "Download Contact",
      });
    });

    // //create a new vCard
    var vCard = vCardsJS();
    //set properties
    vCard.firstName = info.contact.firstname;
    vCard.lastName = info.contact.lastname;
    vCard.organization = info.society.name;
    vCard.photo = info.contact.photo;
    vCard.workPhone = info.contact.phone;
    vCard.title = info.contact.role;
    vCard.url = info.society.web;
    vCard.socialUrls["linkedIn"] = info.contact.linkedIn;

    const url = window.URL.createObjectURL(
      new Blob([vCard.getFormattedString()])
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `vcard_${info.contact.firstname}_${info.contact.lastname}.vcf`
    );
    document.body.appendChild(link);
    link.click();
  }

  function onPressOnSocialNetworks(
    value: "mail" | "phone" | "linkedIn" | "pdf"
  ) {
    // GOOGLE ANALYTICS
    import("../utils/reactAnalytics").then(({ createEventGA }) => {
      createEventGA({
        category: "contact",
        action: `click on ${value}`,
      });
    });
  }

  return (
    <div className={styles.specificContact}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerInfo}>
            <img
              src={info.contact.photo}
              className={styles.avatar}
              alt="avatar"
            />
            <h2>
              {info.contact.firstname} {info.contact.lastname}
            </h2>
          </div>
          <div className={styles.headerButton}>
            <a
              className={styles.headerButtonContent}
              href={`tel:${info.contact.phone}`}
              onClick={() => onPressOnSocialNetworks("phone")}
            >
              <img
                className={styles.headerIcon}
                alt="Telephone"
                src={contactImage.call}
              />
              <p>APPELER</p>
            </a>
            <a
              className={styles.headerButtonContent}
              href={`mailto:${info.contact.email}?subject=Prise de Contact&body=`}
              onClick={() => onPressOnSocialNetworks("mail")}
            >
              <img
                className={styles.headerIcon}
                alt="Email"
                src={contactImage.sendmail}
              />
              <p>E-EMAIL</p>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <RowWithIcon title={info.contact.role} />
        <RowWithIcon
          title={info.contact.phone}
          placeholder="Mobile"
          icon="callGrey"
          link={`tel:${info.contact.phone}`}
          onClick={() => onPressOnSocialNetworks("phone")}
        />
        <RowWithIcon
          title={info.contact.email}
          placeholder="E-mail"
          icon="mail"
          link={`mailto:${info.contact.email}?subject=Prise de Contact&body=`}
          onClick={() => onPressOnSocialNetworks("mail")}
        />
        <RowWithIcon title={info.society.name} icon="entreprise" />
        <RowWithIcon
          title="Consulter la plaquette"
          icon="brochure"
          link={`${process.env.PUBLIC_URL}/docs/plaquette.njgconnect.pdf`}
          onClick={() => onPressOnSocialNetworks("pdf")}
          newTab
        />
        <RowWithIcon
          title={info.society.web}
          placeholder="Site Web"
          icon="web"
          link={"/"}
        />

        <h4>Médias Sociaux</h4>
        <div className={styles.socialMediaContent}>
          <a
            href={info.contact.linkedIn}
            className={styles.link}
            target="_blank"
            rel="noreferrer"
            onClick={() => onPressOnSocialNetworks("linkedIn")}
          >
            <img
              src={contactImage.linkedin}
              className={styles.iconSocial}
              alt="linkedIn"
            />
          </a>
        </div>
        <button onClick={donwload} className={styles.buttonVCard}>
          <img src={contactImage.personAdd} alt="addContact" />
          <p>Inserer le Contact</p>
        </button>
      </div>
    </div>
  );
}

export default SpecificContact;

interface RowWithIconProps {
  icon?: contactImageType;
  title: string;
  placeholder?: string;
  link?: string;
  onClick?: () => void;
  newTab?: boolean;
}

function RowWithIcon(props: RowWithIconProps) {
  return (
    <div className={styles.rowContainer}>
      <div className={styles.iconRow}>
        {props.icon && (
          <img
            className={styles.iconSizeRow}
            src={contactImage[props.icon!]}
            alt="logoIcon"
          />
        )}
      </div>
      <div className={styles.contentInfoRow}>
        <a
          href={props.link}
          className={props.link ? styles.link : ""}
          onClick={props.onClick}
          target={props.newTab ? "_blank" : ""}
          rel="noreferrer"
        >
          <p>{props.title}</p>
          {props.placeholder && (
            <p className={styles.placeholderRow}>{props.placeholder}</p>
          )}
        </a>
      </div>
    </div>
  );
}
