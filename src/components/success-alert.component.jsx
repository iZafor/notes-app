const SuccessAlert = ({
  cssClass,
  alertIconClass,
  alertMessageClass,
  crossIconClass,
  animationClass,
  hideMessage,
}) => {
  return (
    <div
      id="alertBox"
      className={`${cssClass} ${animationClass}`}
    >
      <span className={alertIconClass}>
        <img src="ok.png" alt="ok.png" />
      </span>
      <span className={alertMessageClass}>submisson succesfull</span>
      <span className={crossIconClass} onClick={hideMessage}>
        <img src="cross.png" alt="cross.png" />
      </span>
    </div>
  );
};

export default SuccessAlert;
