import TextWithMarkdown from './TextWithMarkdown';

export default function NotePreview({body}: {body: string}) {
  return (
    <div className="note-preview">
      <TextWithMarkdown text={body} />
    </div>
  );
}
