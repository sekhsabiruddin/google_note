import React from "react";
import "./colorPicker.css";
import { FaCheck } from "react-icons/fa";

//default array of background colors
const paletteColors = [
  "#fff",
  "#8e44ad",
  "#ffdab9",
  "#333333",
  "#2c3e50",
  "#34495e",
  "#2c2c54",
  "#1e272e",
  "#3498db",
  "#27ae60",
  "#e74c3c",
];

const ColorPicker = ({
  currentColor,
  setBgColor,
  setShowPallate,
  id,
  setLocalNotes,
}) => {
  //update background color
  const handleUpdateBg = (selectedColor) => {
    const notes = JSON.parse(localStorage.getItem("notes")); //fetch notes from the localstorage;

    //change color of the selected note
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, color: selectedColor };
      }
      return note;
    });

    //set updated notes to localStorage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setLocalNotes(() => updatedNotes);
    setShowPallate(false);
  };
  return (
    <div className="color-pallate-container">
      <div className="color-picker-outer">
        {paletteColors.map((color) => {
          return (
            <div
              className="color-circle"
              style={{
                backgroundColor: `${color}`,
                border: `${currentColor === color && "2px solid green"}`,
              }}
              onMouseEnter={() => setBgColor(color)}
              onClick={() => handleUpdateBg(color)}
            >
              {/* show check icon if color is currentColor */}
              {currentColor === color ? (
                <i>
                  <FaCheck />
                </i>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
