import NoteList from "@/NoteList";
import SearchField from "@/SearchField";
import { Suspense } from "react";
import "./globals.css";
import { headers } from "next/headers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* Using headers() will automatically opt-out SSR */
  const headersList = headers();
  /*
   * Getting route info from x-url, which is provided by middleware
   * Layout don't have access to searchParams because it won't
   * be re-render on route changes
   * */
  const header_url = headersList.get("x-url") || "";
  let searchText = "";
  if (header_url) {
    const url = new URL(header_url);
    searchText = url.searchParams.get("searchText") || "";
  }

  return (
    <html lang="en">
      <body>
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
              <SearchField searchText={searchText} />
              {/* <EditButton noteId={null}>New</EditButton> */}
            </section>
            <nav>
              <Suspense fallback={<p>Loading...</p>}>
                <NoteList searchText={searchText} />
              </Suspense>
            </nav>
          </section>
          <section className="col note-viewer">{children}</section>
        </main>
      </body>
    </html>
  );
}
