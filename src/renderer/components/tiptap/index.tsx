import BubbleMenu from '@tiptap/extension-bubble-menu';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { IBlock } from 'renderer/database/DB';
import useDebouncedState from 'renderer/hooks/useDebouceState';
import Menu from './BubbleMenu';
import { CodeBlock, lowlight } from './CodeBlock';
import { CommandsTrigger } from './commandsList/index';
import './stype.css';
import { BlockId } from './uniqueId/index';

interface TipTapEditorProps {
  blocks: IBlock[];
  page: IBlock;
}
//
const ONE_SECONDS = 1000;

const TipTapEditor = ({ blocks = [], page }: TipTapEditorProps) => {
  const [_, setContent] = useDebouncedState(blocks, ONE_SECONDS, {
    leading: false,
    onUpdate(newVal) {
      // TODO improve just a test
      // dbService.updatePageContent(id!, newVal);
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
        Highlight.configure({ multicolor: false }),
        Placeholder.configure({
          // placeholder: ``,
          showOnlyWhenEditable: true,
          emptyEditorClass: 'is-editor-empty',
          emptyNodeClass: 'my-custom-is-empty-class',
          includeChildren: true,
          placeholder: ({ node }) => {
            // if (node.type.name === 'heading') {
            //   return 'What’s the title?';
            // }
            return 'Type / for commands';
          },
        }),
        Typography,
        BubbleMenu.configure({
          // element: document.querySelector('.menu'),
        }),
        Underline,
        CodeBlockLowlight.extend({
          addNodeView() {
            return ReactNodeViewRenderer(CodeBlock);
          },
        }).configure({ lowlight }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        CommandsTrigger,
        // BlockId,
      ],
      content: undefined,
      // onUpdate({ editor, transaction }) {
      //   const output = editor.getJSON();
      //   console.log(output);

      //   // setContent(editor.getHTML());
      // },
      autofocus: true,
    },
    [page._id]
  );
  useEffect(() => {
    if (blocks.length === 0 && editor) {
      editor.commands.clearContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);
  const onMouseDown = () => {
    if (editor && !editor.isFocused) {
      editor.chain().focus();
    }
  };
  useEffect(() => {
    // return () => {
    //   dbService.updatePageContent(id!, newContent);
    // };
  }, []);
  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        minHeight: 250,
      }}
      className="flex flex-1 cursor-text"
    >
      {editor && <Menu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
