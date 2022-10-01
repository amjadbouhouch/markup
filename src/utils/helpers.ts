import { Editor } from '@tiptap/react';

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
