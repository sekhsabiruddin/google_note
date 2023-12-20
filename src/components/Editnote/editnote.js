import React, { useState, useEffect } from "react";
import "./editnote.css";
import { FaTimes } from "react-icons/fa";

const EditNote = ({ setEdit, editId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch data from local storage based on editId when component mounts
    const fetchData = () => {
      const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const noteToEdit = storedNotes.find((note) => note.id === editId);
      console.log("Nottoedit", noteToEdit);
      if (noteToEdit) {
        setTitle(noteToEdit.title);
        setContent(noteToEdit.note);
      }
    };

    fetchData();
  }, [editId]);

  const handleUpdateClick = () => {
    setEdit(false);
  };

  return (
    <div className="outer-edit">
      <div className="inner-edit">
        <div className="modal-close">
          <FaTimes
            style={{ cursor: "pointer", fontSize: "2rem", color: "red" }}
            onClick={(e) => handleUpdateClick()}
          />
        </div>
        <h3>Update Your task</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          cols="50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={handleUpdateClick}>Update</button>
      </div>
    </div>
  );
};

export default EditNote;
