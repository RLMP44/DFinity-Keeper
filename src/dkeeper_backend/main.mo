import List "mo:base/List";

persistent actor DKeeper {

  // make public so it is accessible from other parts of the app
  public type Note = {
    title: Text;
    content: Text;
  };

  var notes: List.List<Note> = List.nil<Note>();
}
