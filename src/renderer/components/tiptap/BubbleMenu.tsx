import { Editor, BubbleMenu } from '@tiptap/react';
// import BubbleMenu from '@tiptap/extension-bubble-menu';
import classnames from 'classnames';
import {
  RiBold,
  RiH1,
  RiH2,
  RiItalic,
  RiLink,
  RiListOrdered,
  RiMarkPenLine,
  RiParagraph,
  RiSeparator,
  RiStrikethrough,
  RiUnderline,
} from 'react-icons/ri';

interface MenuProps {
  editor: Editor;
}
const Menu = ({ editor }: MenuProps) => {
  return (
    <BubbleMenu
      className="flex items-center rounded-md bg-base-300 btn-group"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={classnames(
          {
            'btn-primary': editor.isActive('bold'),
            'btn-ghost': !editor.isActive('bold'),
          },
          'btn btn-xs'
        )}
      >
        <RiBold />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={classnames(
          {
            'btn-primary': editor.isActive('italic'),
            'btn-ghost': !editor.isActive('italic'),
          },
          'btn btn-xs'
        )}
      >
        <RiItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={classnames(
          {
            'btn-primary': editor.isActive('underline'),
            'btn-ghost': !editor.isActive('underline'),
          },
          'btn btn-xs'
        )}
      >
        <RiUnderline />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={classnames(
          {
            'btn-primary': editor.isActive('strike'),
            'btn-ghost': !editor.isActive('strike'),
          },
          'btn btn-xs'
        )}
      >
        <RiStrikethrough />
      </button>
    </BubbleMenu>
  );
};

export default Menu;
