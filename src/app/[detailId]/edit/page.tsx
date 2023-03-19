import prisma from "@/db";
import NoteEditor from "@/NoteEditor";

const EditDetailPage = async ({
  params,
}: {
  params: { [k in string]: any };
}) => {
  const noteId = params.detailId;

  const note = await prisma.notes.findFirst({
    where: { id: parseInt(noteId) },
  });

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note?.title || "Untitled"}
      initialBody={note?.body || ""}
    />
  );
};

export default EditDetailPage;
