import Note from "@/Note";
import NoteList from "@/NoteList";
import SearchField from "@/SearchField";
import React, { Suspense } from "react";

const Detail = ({
  params,
  searchParams,
}: {
  params: { [k in string]: string };
  searchParams: { searchText: string };
}) => {
  const selectedId = parseInt(params?.detail?.toString());

  return (
    <main className="main">
      <section className={"col sidebar"}>
        <section className={"sidebar-header"}>
          <img
            className="logo"
            src="next.svg"
            width="22px"
            height="20px"
            alt=""
            role="presentation"
          />
          <strong>React Notes</strong>
        </section>
        <section className="sidebar-menu" role="menubar">
          <SearchField searchText={searchParams?.searchText?.toString()} />
          {/* <EditButton noteId={null}>New</EditButton> */}
        </section>
        <nav>
          <Suspense fallback={<p>Loading...</p>}>
            {/* @ts-expect-error Server Component */}
            <NoteList searchText={searchParams?.searchText?.toString()} />
          </Suspense>
        </nav>
      </section>
      <section className="col note-viewer">
        <Suspense fallback={<p>Loading...</p>}>
          {/* @ts-expect-error Server Component */}
          <Note selectedId={selectedId} isEditing={false} />
        </Suspense>
      </section>
    </main>
  );
};

export default Detail;
