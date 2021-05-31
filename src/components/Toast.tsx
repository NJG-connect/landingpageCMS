import React, { useContext, useEffect } from "react";
import images from "../assets/images";
import { ToastContext } from "../contexts/ToastContext";
import styles from "./Toast.module.css";

export const Toast = () => {
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    if (toast.visible) {
      printToast();
    }
  }, [toast]);

  // function setBackgroundColor() {
  //   if (toast.type === 'sucess') {
  //     return styles.success;
  //   }
  //   if (toast.type === 'error') {
  //     return styles.fail;
  //   }
  //   if (toast.type === 'info') {
  //     return styles.info;
  //   }
  // }

  const printToast = () => {
    const toastElement: HTMLElement = document.getElementById("toast")!;
    // Add the "show" class to DIV
    toastElement.className = `${styles.toast} ${styles.show}`;
    // After 5 seconds, remove the show class from DIV
    setTimeout(function () {
      toastElement.className = toastElement.className.replace(styles.show, "");
    }, 5000);
  };

  return (
    <div id="toast" className={styles.toast}>
      <div className={styles.divImg}>
        <img src={images.icon} alt="icon" className={styles.img} />
      </div>
      <p id="textToast" className={styles.desc}>
        {toast.message}
      </p>
    </div>
  );
};

export default Toast;
