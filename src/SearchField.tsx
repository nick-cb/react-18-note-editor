"use client";

import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import Spinner from "./Spinner";

const SearchField = ({ searchText }: { searchText?: string }) => {
  const router = useRouter();
  const [text, setText] = useState(searchText);
  const [isSearching, startSearching] = useTransition();

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
          startSearching(() => {
            if (!newText) {
              router.push("/");
              return;
            }
            router.push(`/?searchText=${newText}`);
            // setLocation((loc) => ({
            //   ...loc,
            //   searchText: newText,
            // }));
          });
        }}
      />
      <Spinner active={isSearching} />
    </form>
  );
};

export default SearchField;
