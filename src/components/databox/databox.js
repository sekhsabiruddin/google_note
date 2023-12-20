import React, { useEffect, useState } from "react";
import "./databox.css";
import { FaEdit, FaPalette, FaTrash } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert";
import Editnote from "../Editnote/editnote";

const Databox = ({ notes }) => {
  const [localNotes, setLocalNotes] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState();

  useEffect(() => {
    // Use the prop notes to initialize the localNotes state
    setLocalNotes(notes);
  }, [notes]); // Update localNotes whenever the prop notes changes

  const handleEditClick = (id) => {
    setEdit(!edit);
    setEditId(id);
  };

  const handleDeleteClick = (id) => {
    Swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this note!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // If the user clicks "Yes," proceed with deletion
        const updatedNotes = localNotes.filter((note) => note.id !== id);

        // Update state and localStorage with the filtered notes
        setLocalNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));

        Swal("Poof! Your note has been deleted!", {
          icon: "success",
        });
      } else {
        // If the user clicks "No," show a message
        Swal("Your note is safe!");
      }
    });
  };

  return (
    <>
      {edit && <Editnote setEdit={setEdit} editId={editId} />}
      <div className="outer-data-box">
        <div className="inner-data-box">
          {localNotes.map((note) => (
            <div key={note.id} className="data-box-note">
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Databox;
