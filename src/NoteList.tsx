import React, { cache } from "react";
import prisma from "./db";
import SidebarNote from "./SidebarNote";

const getAllNotes = cache(async (searchText: string | undefined) => {
  return await prisma.notes.findMany({
    where: {
      title: {
        contains: searchText,
      },
    },
    orderBy: {
      id: "desc",
    },
  });
});

async function NoteList({ searchText }: { searchText?: string }) {
  const notes = await getAllNotes(searchText);

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
