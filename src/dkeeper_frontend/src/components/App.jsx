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
    let cancelled = false;

    // useEffect can't be asynchronous, so must create a new async function
    async function fetchData() {
      while (!cancelled) {
        try {
          const notesArray = await dkeeper_backend.readNotes();

          // set timeout to allow the replica to fully load
          // otherwise notesArray will be empty
          if (notesArray.length === 0) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            continue;
          }
          setNotes(notesArray);
          return;
        } catch (err) {
          // set timeout in case of trustErrors, etc
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  async function updateNotes() {
    const updatedNotes = await dkeeper_backend.readNotes();
    setNotes(updatedNotes);
  }

  async function addNote(note) {
    await dkeeper_backend.createNote(note.title, note.content);
    updateNotes();
  }

  function deleteNote(id) {
    dkeeper_backend.deleteNote(id);
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
