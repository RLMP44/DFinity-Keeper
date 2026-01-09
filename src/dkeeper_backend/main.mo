import List "mo:base/List";
import Debug "mo:base/Debug";

persistent actor DKeeper {

  // make public so it is accessible from other parts of the app
  public type Note = {
    title: Text;
    content: Text;
  };

  // creates an array of Note objects, aka a List containing objects of type Note
  var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text) {
    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    // Motoko pushes to the start of the array, not the end
    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  }

}
