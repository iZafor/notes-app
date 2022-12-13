import styles from "../index.module.css";

const DeleteAlert = ({ clearAll, animationClass, makeHidden }) => {
  return (
    <div
      id="deleteAlert"
      className={`${styles.deletetionAlert} ${animationClass}`}
    >
      <p>Delete all?</p>
      <div className={styles.deleteConfirmationButtons}>
        <input
          className={styles.yesButton}
          type="submit"
          value="Yes"
          onClick={clearAll}
        />
        <input type="submit" value="No" onClick={makeHidden} />
      </div>
    </div>
  );
};

export default DeleteAlert;

export const makeVisible = () => {
  document
    .querySelector("#deleteAlert")
    .style.setProperty("visibility", "visible");
};

export const giveStylesBodyBefore = () => {
  const r = document.querySelector(":root");
  r.style.setProperty("--body-before-bg-color", "gray");
  r.style.setProperty("--zindex-body-before", "999");
  let body = document.body,
    html = document.documentElement,
    height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  r.style.setProperty("--body-before-height", `${height}px`);
};

export const removeStylesBodyBefore = () => {
  const r = document.querySelector(":root");
  r.style.setProperty("--body-before-bg-color", "");
  r.style.setProperty("--zindex-body-before", "-99999");
  r.style.setProperty("--body-before-height", "0px");
};
