import React from "react";
import prisma from "./db";
import SidebarNote from "./SidebarNote";

async function NoteList({ searchText }: { searchText?: string }) {
  const notes = await prisma.notes.findMany({
    where: {
      title: {
        contains: searchText,
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return notes.length > 0 ? (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={note.id}>
          <SidebarNote note={note} />
        </li>
      ))}
    </ul>
  ) : (
    <div className="notes-empty">
      {searchText
        ? `Couldn't find any notes titled "${searchText}".`
        : "No notes created yet!"}{" "}
    </div>
  );
}

export default NoteList;
