import { Editor } from '@tiptap/react';
import toast from 'react-hot-toast';

export const makeToast = toast;

export function setLink(editor: Editor, url: any) {
  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();

    return;
  }

  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
}
