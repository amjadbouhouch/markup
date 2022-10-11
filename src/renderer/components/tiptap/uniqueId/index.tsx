import { Node } from '@tiptap/core';
import { PluginKey, Plugin } from 'prosemirror-state';
import { generateBlockId } from 'utils/helpers';
import { BlockTypeEnum } from '../../../database/blockModel';

export const blockIdKey = new PluginKey('blockId');

export const BlockId = Node.create({
  name: 'blockId',

  addGlobalAttributes() {
    return [
      {
        types: Object.keys(BlockTypeEnum),
        attributes: {
          blockId: {
            default: null,
            rendered: false,
            keepOnSplit: false,
          },
        },
      },
    ];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        appendTransaction: (_transactions, oldState, newState) => {
          // no changes
          if (newState.doc === oldState.doc) {
            return;
          }
          const { tr } = newState;

          newState.doc.descendants((node, pos, parent) => {
            if (
              node.isBlock &&
              parent === newState.doc &&
              !node.attrs.blockId
            ) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                blockId: generateBlockId(),
              });
            }
          });
          return tr;
        },
      }),
    ];
  },
});
