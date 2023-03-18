import React, { Suspense } from "react";
import NoteList from "./NoteList";
import SearchField from "./SearchField";

const PageLayout = ({
  children,
  searchParams,
}: {
  children: any;
  params: { searchText: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
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
            <NoteList searchText={searchParams?.searchText?.toString()} />
          </Suspense>
        </nav>
      </section>
      <section className="col note-viewer">{children}</section>
    </main>
  );
};

export default PageLayout;
