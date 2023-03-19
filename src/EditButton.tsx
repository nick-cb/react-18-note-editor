"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { PropsWithChildren, useTransition } from "react";

const EditButton: React.FC<PropsWithChildren<{ noteId?: number }>> = ({
  noteId,
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
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
          if (noteId) {
            router.push(`${pathname}/edit`);
          } else {
            router.push(`/new`);
          }
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
