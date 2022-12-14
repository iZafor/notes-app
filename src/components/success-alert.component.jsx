import { ReactComponent as OkIconSvg } from "../assets/ok.svg";
import { ReactComponent as CrossIconSvg } from "../assets/cross.svg";

import styles from "/src/index.module.css";

const SuccessAlert = ({ animationClass }) => {
  return (
    <div id="alertBox" className={`${styles.successAlert} ${animationClass}`}>
      <OkIconSvg className={styles.alertIcon} />
      <span className={styles.alertMessage}>submisson succesfull</span>
      <CrossIconSvg
        className={styles.crossIcon}
        onClick={removeVisibilityClass}
      />
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
  document.querySelector("#alertBox").style.setProperty("visibility", "hidden");
};

const showTotalCount = () => {
  document
    .querySelector("#totalCount")
    .style.setProperty("visibility", "visible");
};

const hideTotalCount = () => {
  document
    .querySelector("#totalCount")
    .style.setProperty("visibility", "hidden");
};

export const showAlertMessage = (setAnimationClass, animate) => {
  hideTotalCount();
  addVisibilityClass();
  setAnimationClass(animate);
  setTimeout(() => {
    removeVisibilityClass();
    setAnimationClass("");
    showTotalCount();
  }, 5000);
};
