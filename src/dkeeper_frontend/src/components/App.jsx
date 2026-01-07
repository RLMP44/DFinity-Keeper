import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import storedNotes from "../notes";
import CreateArea from "./CreateArea";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  console.log('hi');
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

// import { useState } from 'react';
// import { dkeeper_backend } from 'declarations/dkeeper_backend';

// function App() {
//   console.log('hi')
//   const [greeting, setGreeting] = useState('');

//   function handleSubmit(event) {
//     event.preventDefault();
//     const name = event.target.elements.name.value;
//     dkeeper_backend.greet(name).then((greeting) => {
//       setGreeting(greeting);
//     });
//     return false;
//   }

//   return (
//     <main>
//       <img src="/logo2.svg" alt="DFINITY logo" />
//       <br />
//       <br />
//       <form action="#" onSubmit={handleSubmit}>
//         <label htmlFor="name">Enter your name: &nbsp;</label>
//         <input id="name" alt="Name" type="text" />
//         <button type="submit">Click Me!</button>
//       </form>
//       <section id="greeting">{greeting}</section>
//     </main>
//   );
// }

// export default App;
