"use client";

import React, { PropsWithChildren, useTransition } from "react";

const EditButton: React.FC<PropsWithChildren<{ noteId: number }>> = ({
  noteId,
  children,
}) => {
  const [isPending, startTransition] = useTransition();
  const isDraft = noteId == null;
  return (
    <button
      className={[
        "edit-button",
        isDraft ? "edit-button--solid" : "edit-button--outline",
      ].join(" ")}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          // setLocation((loc) => ({
          //   selectedId: noteId,
          //   isEditing: true,
          //   searchText: loc.searchText,
          // }));
        });
      }}
      role="menuitem"
    >
      {children}
    </button>
  );
};

export default EditButton;
