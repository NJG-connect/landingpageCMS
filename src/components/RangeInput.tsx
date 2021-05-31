import React, { useMemo } from "react";
import styles from "./RangeInput.module.css";

interface Props {
  onChange: (value: string) => void;
  data: {
    value: number;
    label: string;
  }[];
  step?: number;
  value?: string;
}

function RangeInput({ onChange, data, step, value }: Props) {
  const sortValue = useMemo(() => data.sort((a, b) => a.value - b.value), [
    data,
  ]);

  return (
    <div className={styles.content}>
      <input
        className={styles.slider}
        type="range"
        list="tickmarks"
        step={step}
        value={value}
        min={sortValue[0].value}
        max={sortValue[sortValue.length - 1].value}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          onChange(ev.target.value)
        }
      />
      <div className={styles.contentSeparator}>
        {sortValue.map((el, index) => (
          <div className={styles.separator} key={`divSeparator-${index}`} />
        ))}
      </div>
      <datalist id="tickmarks">
        {sortValue.map((el, index) => (
          <option value={el.value} key={`option-${index}`} />
        ))}
      </datalist>
      <div className={styles.flexContentOption}>
        {sortValue.map((el) => (
          <div className={styles.contentOption} key={`div-${el.label}`}>
            <p className={styles.textOption}>{el.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RangeInput;
