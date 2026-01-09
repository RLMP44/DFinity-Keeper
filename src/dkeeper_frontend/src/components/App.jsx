import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import storedNotes from "../notes";
import CreateArea from "./CreateArea";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";

function App() {
  const [notes, setNotes] = useState(storedNotes);

  function addNote(note) {
    setNotes((prevNotes) => {
      dkeeper_backend.createNote(note.title, note.content);

      return notes;
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => {
        return note.id !== id;
      });
    });
  }

  return (
    <div className="main">
      <Header />
      <CreateArea addNote={addNote} />
      <div className="notes-container">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            deleteNote={deleteNote}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
