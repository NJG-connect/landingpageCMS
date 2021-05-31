import React, { useState } from "react";
import imagesDevis from "../../assets/images/devis";
import imagesProjectDevis from "../../assets/images/devis/services";
import RangeInput from "../../components/RangeInput";
import devisService, {
  OptionDevisType,
  supportProjetDevis,
  budgetValue,
} from "../../types/Devis";
import { formatDate } from "../../utils/date";
import styles from "./SelectProjectDevis.module.css";
import { AnswersType } from "./Devis";
interface Props {
  onSubmit: (value: AnswersType) => void;
  optionDevisSelected: OptionDevisType[];
  initialValue: AnswersType;
}

function SelectProjectDevis({
  onSubmit,
  optionDevisSelected,
  initialValue,
}: Props) {
  const [answersProject, setAnswersProject] = useState<AnswersType>(
    initialValue
  );

  function onSelect(value: string, keyAnswer: "project" | "support") {
    let newAnswer = [];
    if (answersProject[keyAnswer].includes(value)) {
      newAnswer = [...answersProject[keyAnswer]].filter((el) => el !== value);
    } else {
      newAnswer = [...answersProject[keyAnswer], value];
    }
    setAnswersProject({
      ...answersProject,
      [keyAnswer]: newAnswer,
    });
  }

  function handleSubmit() {
    onSubmit(answersProject);
  }

  function handleChangeInfo(
    value: string,
    keyAnswer: "deadline" | "moreDescription" | "budget"
  ) {
    setAnswersProject({ ...answersProject, [keyAnswer]: value });
  }

  return (
    <div className={styles.selectProjectDevis}>
      <p className={styles.title}>Votre projet :</p>
      {optionDevisSelected.map((type, indexType) => (
        <div className={styles.contentScroll} key={type}>
          {devisService[type].projects.map((el, indexProject) => {
            const cardWidth =
              el.description.length > 25
                ? styles.cardProjectMax
                : styles.cardProjectMin;
            return (
              <div
                className={`${styles.cardProject} ${cardWidth} ${
                  answersProject.project.includes(el.title)
                    ? styles.cardProjectSelected
                    : ""
                }`}
                key={indexProject}
                onClick={() => onSelect(el.title, "project")}
              >
                <img
                  src={imagesProjectDevis[el.image]}
                  className={styles.projectImage}
                  alt={el.title}
                />
                <p className={styles.projectTitle}>{el.title}</p>
                <p className={styles.projectDescription}>{el.description}</p>
              </div>
            );
          })}
        </div>
      ))}

      {optionDevisSelected.includes(OptionDevisType.dev) && (
        <>
          <p className={styles.title}>Support :</p>
          <div className={styles.contentScroll}>
            {supportProjetDevis.map((oneSupport, index) => {
              return (
                <div
                  className={`${styles.cardProject} ${styles.cardProjectMin} ${
                    answersProject.support.includes(oneSupport.title)
                      ? styles.cardProjectSelected
                      : ""
                  }`}
                  key={oneSupport + index.toString()}
                  onClick={() => onSelect(oneSupport.title, "support")}
                >
                  <img
                    src={imagesDevis[oneSupport.image]}
                    className={styles.projectImage}
                    alt={oneSupport.title}
                  />
                  <p className={styles.supporTitle}>{oneSupport.title}</p>
                </div>
              );
            })}
          </div>
        </>
      )}

      <p className={styles.title}>Dites nous en plus :</p>
      <div className={styles.contentTextArea}>
        <textarea
          id="story"
          name="story"
          className={styles.textArea}
          value={answersProject.moreDescription}
          placeholder="Quoi ? Pour qui ?&#10;Vous avez déjà prévu d'implémenter votre projet dans le système d'armement de la NASA, faites le nous savoir :) Ou pas..."
          onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>): void =>
            handleChangeInfo(ev.target.value, "moreDescription")
          }
        />
      </div>

      <div className={styles.subContent}>
        <p className={styles.desc}>
          A titre indicatifs donnez-nous une ordre d'idée des contraintes
          financières / temporelles.
        </p>
        <label htmlFor="deadline" style={{ position: "relative" }}>
          Dead line :
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          placeholder="jj/mm/aaaa"
          value={answersProject.deadline}
          className={styles.dateField}
          min={formatDate(new Date(), "-")}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            handleChangeInfo(ev.target.value, "deadline")
          }
        />
      </div>
      <div className={styles.subContent}>
        <p className={styles.desc}>Budget</p>
        <div className={styles.sliderWrapper}>
          <RangeInput
            step={10}
            data={budgetValue}
            value={answersProject.budget}
            onChange={(value) => handleChangeInfo(value, "budget")}
          />
        </div>
      </div>
      <div className={styles.submit}>
        <div onClick={handleSubmit} className={styles.button}>
          <p>Finaliser mon devis</p>
        </div>
      </div>
    </div>
  );
}

export default SelectProjectDevis;
