import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    id: null,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  function handleClick(event) {
    props.addNote(note);
    setNote({ title: "", content: "", id: null });
    event.preventDefault();
  }

  function expandBox() {
    setIsExpanded(true);
  }

  function handleHoverEffect() {
    setIsMouseOver((prevValue) => {
      return !prevValue;
    });
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={note.title}
          />
        )}
        <textarea
          onChange={handleChange}
          onClick={expandBox}
          name="content"
          placeholder="Take a note..."
          value={note.content}
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab
            style={isMouseOver ? { backgroundColor: "grey" } : {}}
            className="add-button"
            onClick={handleClick}
            onMouseOver={handleHoverEffect}
            onMouseOut={handleHoverEffect}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
