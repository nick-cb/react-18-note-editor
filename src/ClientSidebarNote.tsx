"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, {
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

const ClientSidebarNote = ({
  id,
  title,
  expandedChildren,
  children,
}: PropsWithChildren<{
  id: number;
  title: string | null;
  expandedChildren: React.ReactNode;
}>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = id === parseInt((searchParams.get("id") || "")?.toString());

  const itemRef = useRef<HTMLDivElement>(null);
  const prevTitleRef = useRef(title);
  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current?.classList.add("flash");
    }
  }, [title]);

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current?.classList.remove("flash");
      }}
      className={[
        "sidebar-note-list-item",
        isExpanded ? "note-expanded" : "",
      ].join(" ")}
    >
      {children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending
            ? "var(--gray-80)"
            : isActive
            ? "var(--tertiary-blue)"
            : "",
          border: isActive
            ? "1px solid var(--primary-border)"
            : "1px solid transparent",
        }}
        onClick={() => {
          startTransition(() => {
            router.push(`/${id}`);
          });
        }}
      >
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <img
            src="chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
};

export default ClientSidebarNote;
