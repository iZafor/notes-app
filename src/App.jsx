import { useState, useEffect } from "react";
import uniqid from "uniqid";

import styles from "./index.module.css";

import { ReactComponent as LightModeIcon } from "./assets/sun.svg";
import { ReactComponent as DarkModeIcon } from "./assets/moon.svg";
import { ReactComponent as DeleteIcon } from "./assets/bin.svg";

import SuccessAlert, {
  showAlertMessage,
} from "./components/success-alert.component";

import { addDataToDB, getDataFromDB, deleteOne, deleteAll } from "./api";

const colorPalatte = {
  darkMode: {
    mainBgColor: "#181d31",
    fontColor: "#dfdfde",
    contentBgColor: "#2e2e31",
    modeSwitchBtnHoverBgColor: "#7b1a34",
    deleteBtnHoverBgColor: "#dfdfde",
  },
  lightMode: {
    mainBgColor: "#fff",
    fontColor: "#000",
    contentBgColor: "#f0f8ff",
    modeSwitchBtnHoverBgColor: "#000",
    deleteBtnHoverBgColor: "",
  },
};

const App = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [currNote, setCurrNote] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [mode, setMode] = useState("dark");
  const [animationClass, setAnimationClass] = useState("");

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

    if (noteTitle.length > 0 && currNote.length > 0) {
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
        showAlertMessage(setAnimationClass, styles.animate);
      });
    } else {
      setNoteTitle("");
      setCurrNote("");
    }
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

  const changeColors = (palatte) => {
    const r = document.querySelector(":root");
    r.style.setProperty("--main-bg-color", palatte.mainBgColor);
    r.style.setProperty("--font-color", palatte.fontColor);
    r.style.setProperty("--content-bg-color", palatte.contentBgColor);
  };

  const switchMode = () => {
    if (mode == "dark") {
      setMode("light");
      changeColors(colorPalatte.lightMode);
    } else {
      setMode("dark");
      changeColors(colorPalatte.darkMode);
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
      <SuccessAlert animationClass={animationClass} />
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
            <div className={styles.contentTopBar}>
              <p>{idx + 1}.</p>
              <span
                id={inputContent.__id}
                className={styles.deleteBtn}
                onClick={clearOne}
              >
                <DeleteIcon />
              </span>
            </div>
            <h3 className={styles.mainContentTitle}>
              {inputContent.title.toUpperCase()}
            </h3>
            <p className={styles.mainContent}>{inputContent.content}</p>
          </div>
        ))}
      </div>
      <div className={styles.topBar}>
        <input
          className={styles.clearBtn}
          type="submit"
          value="Clear all"
          onClick={clearAll}
        />
        {mode == "dark" ? (
          <LightModeIcon
            onClick={switchMode}
            className={styles.lightModeIcon}
          />
        ) : (
          <DarkModeIcon onClick={switchMode} className={styles.darkModeIcon} />
        )}
      </div>
    </div>
  );
};

export default App;
