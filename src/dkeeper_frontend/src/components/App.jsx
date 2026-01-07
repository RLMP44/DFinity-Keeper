import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import storedNotes from "../notes";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState(storedNotes);

  function addNote(note) {
    setNotes((prevNotes) => {
      var lastID = prevNotes.at(-1).id;
      var nextID = lastID + 1;

      return [
        ...prevNotes,
        {
          id: nextID,
          title: note.title,
          content: note.content,
        },
      ];
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
