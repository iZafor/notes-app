import { useState, useEffect } from "react";

import styles from "./index.module.css";

import { ReactComponent as LightModeIcon } from "./assets/light.svg";
import { ReactComponent as DarkModeIcon } from "./assets/dark.svg";

import { addDataToDB, getDataFromDB } from "./api";

const App = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [currNote, setCurrNote] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [mode, setMode] = useState("dark");

  const handleNoteTitleChange = (e) => {
    const title = e.target.value;
    setNoteTitle(title);
  };

  const handleCurrNoteChange = (e) => {
    const text = e.target.value;
    setCurrNote(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAllNotes((prev) => [
      ...prev,
      {
        title: noteTitle,
        content: currNote,
      },
    ]);
    await addDataToDB({
      title: noteTitle,
      content: currNote,
    }).then(() => {
      setNoteTitle("");
      setCurrNote("");
    });
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

  useEffect(() => {
    const getFetchedData = async () => {
      await getDataFromDB().then((result) => {
        result?.length && setAllNotes([...result]);
      });
    };
    getFetchedData();
  }, []);

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="note title"
          value={noteTitle}
          onChange={handleNoteTitleChange}
        />
        <textarea
          type="text"
          placeholder="your note"
          value={currNote}
          rows="5"
          onChange={handleCurrNoteChange}
        />
        <input type="submit" value="Add Note" />
      </form>
      <div className={styles.contentsDiv}>
        {allNotes.map((inputContent, idx) => (
          <div className={styles.content} key={idx}>
            <p>{idx + 1}.</p>
            <h3 className={styles.mainContentTitle}>
              {inputContent.title.toUpperCase()}
            </h3>
            <p className={styles.mainContent}>{inputContent.content}</p>
          </div>
        ))}
      </div>
      {/* <input
        className={styles.clearBtn}
        type="submit"
        value="Clear all"
        onClick={clearAll}
      /> */}
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
