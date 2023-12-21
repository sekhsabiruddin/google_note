import React, { useEffect, useState } from "react";
import "./databox.css";

import Swal from "sweetalert";
import Editnote from "../Editnote/editnote";
import Note from "../Note/Note";

const Databox = ({ notes }) => {
  const [localNotes, setLocalNotes] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    console.log("Fetching data from local storage...");

    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setLocalNotes(storedNotes);
  }, [notes, edit]); // Update localNotes whenever the prop notes changes

  const handleEditClick = (id) => {
    setEdit(!edit);
    setEditId(id);
  };

  const handleDeleteClick = (id) => {
    Swal({
      title: "Do you reallly want to delete ?",
      text: "Once deleted, you will not be able to recover this note!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // If the user clicks "Yes," proceed with deletion
        const updatedNotes = localNotes.filter((note) => note.id !== id);

        // Update state and localStorage with the filtered notes
        setLocalNotes([...updatedNotes]); // Use a new array reference
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
      {edit && (
        <Editnote setEdit={setEdit} editId={editId} setReload={setReload} />
      )}

      <div className="outer-data-box">
        <div className="inner-data-box">
          {localNotes.map((note) => (
            <Note
              key={note.id}
              handleDeleteClick={handleDeleteClick}
              handleEditClick={handleEditClick}
              note={note}
              setLocalNotes={setLocalNotes}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Databox;
