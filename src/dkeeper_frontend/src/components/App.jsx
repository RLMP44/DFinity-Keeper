import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper_backend } from "declarations/dkeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  // use effect hook is triggered every time the render function is called in react
  // needs second parameter to determine when to trigger to avoid infinite trigger loop
  // use [] to limit useEffect to be triggered only once when the website reloads
  useEffect(() => {
    // fetchData needs to be asynchronous and useEffect can't be
    fetchData();
  }, []);

  async function fetchData() {
    const notesArray = await dkeeper_backend.readNotes();
    setNotes(notesArray);
  }

  async function addNote(note) {
    setNotes((prevNotes) => {
      dkeeper_backend.createNote(note.title, note.content);
      return [note, ...prevNotes];
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
