import { useState, useEffect } from "react";
import uniqid from "uniqid";

import styles from "./index.module.css";

import LightModeIcon from "./components/light-mode-icon.component";
import DarkModeIcon from "./components/dark-mode-icon.component";
import DeleteIcon from "./components/delete-icon.component";

import { addDataToDB, getDataFromDB, deleteOne, deleteAll } from "./api";

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
    const uid = uniqid();

    setAllNotes((prev) => [
      ...prev,
      {
        __id: uid,
        title: noteTitle,
        content: currNote,
      },
    ]);
    await addDataToDB({
      __id: uid,
      title: noteTitle,
      content: currNote,
    }).then(() => {
      setNoteTitle("");
      setCurrNote("");
    });
  };

  const clearAll = async (e) => {
    e.preventDefault();
    await deleteAll().then(() => {
      setAllNotes([]);
      setCurrNote("");
    });
  };

  const clearOne = async (e) => {
    const __id = e.currentTarget.id;
    await deleteOne(__id).then(() => {
      const leftNotes = allNotes.filter((note) => note.__id != __id);
      setAllNotes([...leftNotes]);
    });
  };

  const changeBgColor = (color) => {
    document.querySelector("body").style.backgroundColor = `${color}`;
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
            <span
              id={inputContent.__id}
              className={styles.deleteBtn}
              onClick={clearOne}
            >
              <DeleteIcon />
            </span>
            <h3 className={styles.mainContentTitle}>
              {inputContent.title.toUpperCase()}
            </h3>
            <p className={styles.mainContent}>{inputContent.content}</p>
          </div>
        ))}
      </div>
      <input
        className={styles.clearBtn}
        type="submit"
        value="Clear all"
        onClick={clearAll}
      />
      <div className={styles.switchMode} onClick={switchMode}>
        {mode == "dark" ? (
          <LightModeIcon cssClassName={styles.lightModeIcon} />
        ) : (
          <DarkModeIcon cssClassName={styles.darkModeIcon} />
        )}
      </div>
    </div>
  );
};

export default App;
