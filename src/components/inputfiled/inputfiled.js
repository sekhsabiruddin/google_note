import React, { useState, useEffect } from "react";
import "./inputfiled.css";
import Databox from "../databox/databox";

const Inputfiled = () => {
  const [title, setTitle] = useState("");
  const [takenote, setTakenote] = useState("");
  const [notes, setNotes] = useState([]);

  const handleAddNoteClick = () => {
    if (!title) {
      alert("Title should not be empty");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      note: takenote,
      color: "#fff",
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);

    localStorage.setItem("notes", JSON.stringify([...notes, newNote]));

    setTitle("");
    setTakenote("");
  };

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  return (
    <>
      <div className="outer-input">
        <div className="inner-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Take a note"
            value={takenote}
            onChange={(e) => setTakenote(e.target.value)}
          />

          <button onClick={handleAddNoteClick} className="addBtn">
            ADD
          </button>
        </div>
      </div>
      <Databox notes={notes} />
    </>
  );
};

export default Inputfiled;
