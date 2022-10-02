import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import { useEffect } from 'react';
import { Page } from 'renderer/database/DB';
import useDebouncedState from 'renderer/hooks/useDebouceState';
import './stype.css';
import dbService from 'renderer/database/dbService';

interface TipTapEditorProps {
  page: Page;
}
//
const ONE_SECONDS = 1000;

const TipTapEditor = ({ page }: TipTapEditorProps) => {
  const { content = '', id } = page;
  const [_, setContent] = useDebouncedState(content, ONE_SECONDS, {
    leading: false,
    onUpdate(newVal) {
      // TODO improve just a test
      dbService.updatePageContent(id!, newVal);
    },
  });
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: true,
        }),
        Color,
        TextStyle,
        Highlight.configure({ multicolor: true }),
        Placeholder.configure({
          placeholder: 'Start typing...',
          emptyNodeClass: 'text-gray-500',
        }),
        Typography,
      ],
      content,
      onUpdate({ editor, transaction }) {
        setContent(editor.getHTML());
      },
      autofocus: true,
    },
    [id]
  );
  useEffect(() => {
    // return () => {
    //   dbService.updatePageContent(id!, newContent);
    // };
  }, []);
  return <EditorContent editor={editor} />;
};

export default TipTapEditor;
