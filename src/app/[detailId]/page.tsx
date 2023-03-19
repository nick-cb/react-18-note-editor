import Note from "@/Note";
import React from "react";

const Detail = ({
  params,
}: {
  params: { [k in string]: string };
  searchParams: { searchText: string };
}) => {
  const selectedId = parseInt(params?.detailId?.toString());

  return <Note selectedId={selectedId} isEditing={false} />;
};

export default Detail;
