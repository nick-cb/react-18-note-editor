"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useState, useTransition } from "react";
import Spinner from "./Spinner";
import debounce from "lodash.debounce";

const SearchField = ({ searchText }: { searchText?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [text, setText] = useState(searchText);
  const [isSearching, startSearching] = useTransition();

  const changeHandler = (newText: string) => {
    startSearching(() => {
      // Refresh is necessary to force layout to re-render
      if (!newText) {
        router.replace(pathname);
        router.refresh();
        return;
      }
      router.replace(`${pathname}?searchText=${newText}`);
      router.refresh();
    });
  };

  const debounceChangeHandler = useCallback(debounce(changeHandler, 300), []);

  return (
    <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder="Search"
        value={text}
        onChange={(e) => {
          const newText = e.target.value;
          setText(newText);
          debounceChangeHandler(newText);
        }}
      />
      <Spinner active={isSearching} />
    </form>
  );
};

export default SearchField;
