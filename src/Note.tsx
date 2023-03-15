import React from "react";
import NoteEditor from "./NoteEditor";
import prisma from "./db";
import EditButton from "./EditButton";
import { format } from "date-fns";
import NotePreview from "./NotePreview";

const Note = async ({
  selectedId,
  isEditing,
}: {
  selectedId: number;
  isEditing: boolean;
}) => {
  const note = await prisma.notes.findFirst({ where: { id: selectedId } });

  if (note === null) {
    if (isEditing) {
      return <NoteEditor />;
    } else {
      return (
        <div className="note--empty-state">
          <span className="note-text--empty-state">
            Click a note on the left to view something! 🥺
          </span>
        </div>
      );
    }
  }

  let { id, title, body, updated_at } = note;
  const updatedAt = new Date(updated_at);

  // We could also read from a file instead.
  // body = readFile(path.resolve(`./notes/${note.id}.md`), 'utf8');

  // Now let's see how the Suspense boundary above lets us not block on this.
  // fetch('http://localhost:4000/sleep/3000');

  if (isEditing) {
    return <NoteEditor />;
  } else {
    return (
      <div className="note">
        <div className="note-header">
          <h1 className="note-title">{title}</h1>
          <div className="note-menu" role="menubar">
            <small className="note-updated-at" role="status">
              Last updated on {format(updatedAt, "d MMM yyyy 'at' h:mm bb")}
            </small>
            <EditButton noteId={id}>Edit</EditButton>
          </div>
        </div>
        <NotePreview body={body || ""} />
      </div>
    );
  }
};

export default Note;
