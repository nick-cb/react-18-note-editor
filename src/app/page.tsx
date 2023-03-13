import NoteList from "@/NoteList";
import SearchField from "@/SearchField";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  params: { searchText: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main>
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
    </main>
  );
}
