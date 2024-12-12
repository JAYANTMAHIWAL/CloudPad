import NoteContext from "./NoteContext";
import { useState } from "react";

const host = "http://localhost:5000";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  // Get all notes
  const getNotes = async () => {
    const url = `${host}/api/notes/getAllNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-header": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    if (json.success) {
      setNotes(json.notes);
      return { success: true };
    } else {
      return {
        success: false,
        error: json.error ? json.error : json,
      };
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    if (tag === "") {
      tag = "General";      
    }
    const url = `${host}/api/notes/addNote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-header": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      const newNote = json.note;
      setNotes(notes.concat(newNote));
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: json.error ? json.error : json,
      };
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deleteNote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-header": localStorage.getItem("token"),
      },

      body: JSON.stringify(),
    });
    const res = await response.json();
    if (res.success) {
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
      return { success: true };
    } else {
      return {
        success: false,
        error: res.error ? res.error : res,
      };
    }
  };

  // Update a note
  const updateNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updateNote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-header": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const res = await response.json();
    if (res.success) {
      const newNotes = notes.map((n) => {
        return n._id === id ? res.note : n;
      });
      setNotes(newNotes);
      return { success: true };
    } else {
      return {
        success: false,
        error: res.error ? res.error : res,
      };
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
