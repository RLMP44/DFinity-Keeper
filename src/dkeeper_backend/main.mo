import List "mo:base/List";
import Array "mo:base/Array";
import Debug "mo:base/Debug";

persistent actor DKeeper {

  // make public so it is accessible from other parts of the app
  public type Note = {
    id: Int;
    title: Text;
    content: Text;
  };

  // creates an array of Note objects, aka a List containing objects of type Note
  var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text) {
    let latestNote = List.last(List.reverse(notes));
    // no ternary operators in Motoko
    let lastID =
      switch (latestNote) {
        case (null) 0;
        case (?note) note.id;
      };
    let nextID = lastID + 1;

    let newNote: Note = {
      id = nextID;
      title = titleText;
      content = contentText;
    };

    // Motoko pushes to the start of the array, not the end
    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

  // query increases speed of return
  public query func readNotes(): async [Note] {
    // convert to array as they are much faster on ICP
    return List.toArray(notes);
  };

  public func deleteNote(id: Int) {
    let updatedNotes = List.mapFilter<Note, Note>(
      notes,
      func (note : Note) : ?Note {
        if (note.id != id) {
          ?(note);
        } else {
          null;
        }
      }
    );
    notes := updatedNotes;
  }

  // public func clearNotes() : async () {
  //   notes := List.nil<Note>();
  // }

}
