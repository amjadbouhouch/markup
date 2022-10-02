import { Node } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import Suggestion, {
  SuggestionKeyDownProps,
  SuggestionOptions,
} from '@tiptap/suggestion';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { PluginKey } from 'prosemirror-state';
import tippy, { Instance, Props } from 'tippy.js';
import CommandsListDropDown from './CommandsListDropDown';

type CommandsTriggerOptions = {
  suggestion: Omit<SuggestionOptions, 'editor'>;
};

type CommandsDropdownRef = {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
};

const COMMANDS = [
  {
    label: 'H1',
    value: 'H1',
  },
  {
    label: 'H2',
    value: 'H2',
  },
  {
    label: 'Paragraph',
    value: 'Paragraph',
  },
];
export const commandsTriggerKey = new PluginKey('commandsTrigger');

export const CommandsTrigger = Node.create<CommandsTriggerOptions>({
  name: 'commandsTrigger',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        allowSpaces: false,
        pluginKey: commandsTriggerKey,
        command: ({ editor, range, props }) => {
          const { value } = props;
          // const { nodeAfter } = editor.view.state.selection.$to;
          // const overrideSpace = nodeAfter?.text?.startsWith(' ');

          // if (overrideSpace) {
          //   range.to += 1;
          // }

          if (value === 'H1') editor.commands.setHeading({ level: 1 });
          else if (value === 'H2') editor.commands.setHeading({ level: 2 });
          else if (value === 'Paragraph') editor.commands.setParagraph();

          // editor.chain().focus().setBlockquote();
          // editor
          //   .chain()
          //   .focus()
          //   .insertContentAt(range, [
          //     {
          //       type: this.name,
          //       attrs: props,
          //     },
          //     {
          //       type: 'text',
          //       text: ' ',
          //     },
          //   ])
          //   .run();
          window.getSelection()?.collapseToEnd();
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          return !$from.parentOffset;
        },
        items({ query }) {
          return COMMANDS.filter((c) =>
            c.label.toLowerCase().includes(query.toLowerCase())
          );
        },
        render() {
          let reactRenderer: ReactRenderer<CommandsDropdownRef>;
          let popup: Instance<Props>[];
          return {
            onStart: (props) => {
              reactRenderer = new ReactRenderer(CommandsListDropDown, {
                props,
                editor: props.editor,
              });
              // @ts-ignore
              popup = tippy('body', {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: reactRenderer.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              });
            },
            onUpdate(props) {
              const { query } = props;
              reactRenderer.updateProps(props);
              popup[0].setProps({
                getReferenceClientRect: props.clientRect,
              });
            },
            onKeyDown(props) {
              if (props.event.key === 'Escape') {
                popup[0].hide();
                return true;
              }
              return Boolean(reactRenderer.ref?.onKeyDown(props));
            },
            onExit() {
              popup[0].destroy();
              reactRenderer.destroy();
            },
          };
        },
      },
    };
  },

  group: 'inline',

  inline: true,

  selectable: false,

  atom: true,

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
