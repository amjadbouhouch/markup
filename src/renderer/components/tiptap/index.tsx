import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import './stype.css';

const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Color,
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: 'Start typing...',
      }),
      Typography,
    ],
    content: `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
    <pre><code class="language-css">body {
display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
  `,
    onUpdate({ editor }) {
      const output = editor.getHTML();
      console.log(output);
    },
  });
  return <EditorContent editor={editor} />;
};

export default TipTapEditor;
