import React, { useState } from "react";
import { FaEdit, FaPalette, FaTrash } from "react-icons/fa";
import ColorPicker from "../ColorPicker/ColorPicker";
import "./note.css";

const Note = ({ note, handleEditClick, handleDeleteClick, setLocalNotes }) => {
  const [showPallate, setShowPallate] = useState(false);
  const [bgColor, setBgColor] = useState(note.color);

  return (
    <div className="note-container">
      <div
        key={note.id}
        className="data-box-note"
        style={{ backgroundColor: `${bgColor}` }}
      >
        <h3>{note.title}</h3>
        <p>{note.note}</p>
        <div>
          <i>
            <FaEdit
              style={{ color: "green" }}
              onClick={() => handleEditClick(note.id)}
            />
          </i>
          <i>
            <FaPalette
              style={{
                color:
                  "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)",
              }}
              onClick={() => setShowPallate(true)}
            />
          </i>
          <i>
            <FaTrash
              style={{ color: "red" }}
              onClick={() => handleDeleteClick(note.id)}
            />
          </i>
        </div>
      </div>
      {showPallate && (
        <ColorPicker
          currentColor={note.color}
          setBgColor={setBgColor}
          setShowPallate={setShowPallate}
          id={note.id}
          setLocalNotes={setLocalNotes}
        />
      )}
    </div>
  );
};

export default Note;
