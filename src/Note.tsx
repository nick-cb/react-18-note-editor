import React from "react";
import prisma from "./db";
import EditButton from "./EditButton";
import { format } from "date-fns";
import NotePreview from "./NotePreview";

// How do we memo server component?
const Note = async ({ selectedId }: { selectedId: number }) => {
  if (!selectedId) {
    return null;
  }
  const note = await prisma.notes.findFirst({ where: { id: selectedId } });
  console.log({ note });

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  let { id, title, body, updated_at } = note;
  const updatedAt = new Date(updated_at);

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
};

export default Note;
