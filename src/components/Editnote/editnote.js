import React, { useState, useEffect } from "react";
import "./editnote.css";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";

const EditNote = ({ setEdit, editId, setReload }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch data from local storage based on editId when component mounts
    const fetchData = () => {
      const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const noteToEdit = storedNotes.find((note) => note.id === editId);

      if (noteToEdit) {
        setTitle(noteToEdit.title);
        setContent(noteToEdit.note);
      }
    };

    fetchData();
  }, [editId]);

  const handleUpdateClick = () => {
    // Update the note in local storage
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = storedNotes.map((note) => {
      if (note.id === editId) {
        return {
          ...note,
          title: title,
          note: content,
        };
      }
      return note;
    });

    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    setEdit(false);
    Swal.fire({
      icon: "success",
      title: "Data updated successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="outer-edit">
      <div className="inner-edit">
        <div className="modal-close">
          <FaTimes
            style={{
              cursor: "pointer",
              fontSize: "2rem",
              color: "red",
              fontWeight: "100",
            }}
            onClick={() => setEdit(false)}
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
