import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import swal from "sweetalert";

const NoteItem = (props) => {
  const { note, editNote } = props;

  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const handleDelete = async (id) => {
    const res = await deleteNote(id);
    if (res.success) {
      swal({ icon: "success", title: "Note has been deleted successfully!" });
    } else {
      swal({ icon: "error", title: res.error });
    }
  };

  return (
    <div className="col-md-4 d-flex my-1">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center4e4">{note.title}</h5>
          <div className="card-text pb-3">
            <div>{note.description}</div>
            <div>{note.tag}</div>
          </div>
          <i
            className="fa-solid fa-trash-can fa-beat "
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => {
              handleDelete(note._id);
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square fa-beat text-right"
            style={{ float: "left", cursor: "pointer" }}
            onClick={() => {
              editNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
