import { ReactComponent as OkIconSvg } from "../assets/ok.svg";
import { ReactComponent as CrossIconSvg } from "../assets/cross.svg";

import styles from "/src/index.module.css";

const SuccessAlert = ({animationClass}) => {
  return (
    <div id="alertBox" className={`${styles.alert} ${animationClass}`}>
      <OkIconSvg className={styles.alertIcon} />
      <span className={styles.alertMessage}>submisson succesfull</span>
      <CrossIconSvg className={styles.crossIcon} onClick={removeVisibilityClass} />
    </div>
  );
};

export default SuccessAlert;

export const addVisibilityClass = () => {
  document
    .querySelector("#alertBox")
    .style.setProperty("visibility", "visible");
};

export const removeVisibilityClass = () => {
  document
    .querySelector("#alertBox")
    .style.setProperty("visibility", "hidden");
};

export const showAlertMessage = (setAnimationClass, animate) => {
  addVisibilityClass();
  setAnimationClass(animate);
  setTimeout(() => {
    removeVisibilityClass();
    setAnimationClass("");
  }, 5000);
};