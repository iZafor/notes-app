import { useState } from "react";

import styles from "./index.module.css";

import { ReactComponent as LightModeIcon } from "./assets/light.svg";
import { ReactComponent as DarkModeIcon } from "./assets/dark.svg";

const App = () => {
  const [currNote, setCurrNote] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [mode, setMode] = useState("dark");

  const handleChange = (e) => {
    const text = e.target.value;
    setCurrNote(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllNotes((prev) => [...prev, currNote]);
    setCurrNote("");
  };

  const clearAll = (e) => {
    e.preventDefault();
    setAllNotes([]);
    setCurrNote("");
  };

  const changeBgColor = (color) => {
    document.querySelector("body").style.backgroundColor = `${color}`;
    document.querySelector("button").style.backgroundColor = `${color}`;
  };

  const switchMode = () => {
    if (mode == "dark") {
      setMode("light");
      changeBgColor("#fff");
    } else {
      setMode("dark");
      changeBgColor("#181d31");
    }
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="enter your note"
          value={currNote}
          rows="5"
          onChange={handleChange}
        />
        <input type="submit" value="Add Note" />
      </form>
      <div className={styles.contentsDiv}>
        {allNotes.map((inputContent, idx) => (
          <div className={styles.content} key={idx}>
            <p>{idx + 1}.</p>
            <p className={styles.mainContent}>{inputContent}</p>
          </div>
        ))}
      </div>
      <input
        className={styles.clearBtn}
        type="submit"
        value="Clear all"
        onClick={clearAll}
      />
      <button className={styles.switchMode} onClick={switchMode}>
        {mode == "dark" ? (
          <LightModeIcon className={styles.lightModeIcon} />
        ) : (
          <DarkModeIcon className={styles.darkModeIcon} />
        )}
      </button>
    </div>
  );
};

export default App;
