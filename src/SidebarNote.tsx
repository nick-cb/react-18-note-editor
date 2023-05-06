import React, { cache } from "react";
// @ts-ignore
import excerpts from "excerpts";
import { format, isToday } from "date-fns";
import { notes } from "@prisma/client";
import ClientSidebarNote from "./ClientSidebarNote";
import { marked } from "marked";

const SidebarNote = cache(({ note }: { note: notes }) => {
  const updatedAt = new Date(note.updated_at);
  const lastUpdatedAt = isToday(updatedAt)
    ? format(updatedAt, "h:mm bb")
    : format(updatedAt, "M/d/yy");
  const summary = excerpts(marked(note.body || ""), { words: 20 });

  return (
    <ClientSidebarNote
      id={note.id}
      title={note.title}
      expandedChildren={
        <p className="sidebar-note-excerpt">{summary || <i>(No content)</i>}</p>
      }
    >
      <header className="sidebar-note-header">
        <strong>{note.title}</strong>
        <small>{lastUpdatedAt}</small>
      </header>
    </ClientSidebarNote>
  );
});

export default SidebarNote;
