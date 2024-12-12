import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Notes = () => {
  const ref = useRef(null);
  const refClose = useRef(null);

  const context = useContext(NoteContext);
  const { notes, getNotes, updateNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const navigation = useNavigate();

  const fetchNotes = async () => {
    const res = await getNotes();
    console.log(res);

    if (!res.success) {
      swal({ icon: "error", title: res.error });
      navigation("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotes();
    } else {
      navigation("/login");
    }

    // eslint-disable-next-line
  }, []);
  const editNote = (CurrentNote) => {
    ref.current.click();
    setNote({
      id: CurrentNote._id,
      etitle: CurrentNote.title,
      edescription: CurrentNote.description,
      etag: CurrentNote.tag,
    });
  };

  const handleClick = async (e) => {
    refClose.current.click();
    const res = await updateNote(
      note.id,
      note.etitle,
      note.edescription,
      note.etag
    );
    if (!res.success) {
      swal({ icon: "error", title: res.error });
    } else {
      swal({
        icon: "success",
        title: "Now your note has Updated successfully!",
      });
    }
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="container my-4">
                <div className="row mb-3">
                  <label htmlFor="etitle" className="col-sm-2 col-form-label">
                    Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="edescription"
                    className="col-sm-2 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      value={note.edescription}
                      name="edescription"
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="etag" className="col-sm-2 col-form-label">
                    Tag
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mx-4">
        <h2 className="text-center">Your Notes</h2>
        <div
          className="container my-2"
          style={{ fontStyle: "italic", fontWeight: "600" }}
        >
          {notes.length === 0 ? `No notes to dispaly` : ""}
        </div>
        {notes.map((element) => {
          return (
            <NoteItem key={element._id} editNote={editNote} note={element} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
