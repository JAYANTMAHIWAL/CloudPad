import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import swal from "sweetalert";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await addNote(note.title, note.description, note.tag);

    if (!res.success) {
      swal({ icon: "error", title: res.error });
      return;
    }
    swal({ icon: "success", title: "Your Note is added successfully" });
    setNote({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h2 className="container text-center my-2">Add your note</h2>
      <form className="container my-4">
        <div className="row mb-3">
          <label htmlFor="title" className="col-sm-2 col-form-label">
            Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="description"
              value={note.description}
              name="description"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="tag" className="col-sm-2 col-form-label">
            Tag
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
