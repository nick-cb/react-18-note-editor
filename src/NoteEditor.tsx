"use client";

import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import NotePreview from "./NotePreview";
import { updateNote } from "./app/[detailId]/edit/actions";

const NoteEditor = ({
  noteId,
  initialTitle = "",
  initialBody = "",
}: {
  noteId: number | null;
  initialTitle?: string;
  initialBody?: string;
}) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [isNavigating, startNavigating] = useTransition();

  // async function handleUpdate() {
  //   const payload = { id: noteId, title, body };
  //   setIsSaving(true);
  //   fetch(`/api/notes/${noteId}`, {
  //     method: "PUT",
  //     body: JSON.stringify(payload),
  //   })
  //     .then(() => {
  //       startNavigating(() => {
  //         router.push(`/${noteId}`);
  //       });
  //     })
  //     .finally(() => setIsSaving(false));
  // }

  async function handleAdd() {
    const payload = { title, body };
    setIsSaving(true);
    fetch(`/api/notes/`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((data) => {
        startNavigating(() => {
          router.push(`/${data.id}`);
        });
      })
      .finally(() => setIsSaving(false));
  }

  async function handleDelete() {
    // const payload = { id: noteId };
    setIsDeleting(true);
    fetch(`/api/notes/${noteId}`, { method: "DELETE" })
      .then(() => {
        startNavigating(() => {
          router.refresh();
          router.push("/");
        });
      })
      .finally(() => setIsDeleting(false));

    // const requestedLocation = {
    //   selectedId: null,
    //   isEditing: false,
    //   searchText: searchText,
    // };
    // const response = await deleteNote(payload, requestedLocation);
    // navigate(response);
  }

  // function navigate(response: any) {
  //   const cacheKey = response.headers.get("X-Location");
  //   const nextLocation = JSON.parse(cacheKey);
  //   const seededResponse = createFromReadableStream(response.body);
  //   startNavigating(() => {
  //     // refresh(cacheKey, seededResponse);
  //     // setLocation(nextLocation);
  //   });
  // }

  const isDraft = noteId === null;
  return (
    <div className="note-editor">
      <form
        id="note-editor-form-id"
        className="note-editor-form"
        autoComplete="off"
        action={updateNote}
      >
        <input
          value={noteId?.toString()}
          name="id"
          aria-hidden={true}
          style={{ display: "none" }}
        />
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          id="note-body-input"
          value={body}
          name="body"
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </form>
      <div className="note-editor-preview">
        <div className="note-editor-menu" role="menubar">
          <button
            className="note-editor-done"
            disabled={isSaving || isNavigating}
            role="menuitem"
            form="note-editor-form-id"
            type="submit"
          >
            <img
              src="checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            Done
          </button>
          {!isDraft && (
            <button
              className="note-editor-delete"
              disabled={isDeleting || isNavigating}
              onClick={() => handleDelete()}
              role="menuitem"
            >
              <img
                src="cross.svg"
                width="10px"
                height="10px"
                alt=""
                role="presentation"
              />
              Delete
            </button>
          )}
        </div>
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview body={body} />
      </div>
    </div>
  );
};

export default NoteEditor;
