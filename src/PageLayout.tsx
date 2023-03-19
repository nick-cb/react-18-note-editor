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
<div></div>
  );
};

export default PageLayout;
