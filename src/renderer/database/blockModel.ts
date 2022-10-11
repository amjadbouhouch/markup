export enum BlockTypeEnum {
  text = 'text',
  heading = 'heading',
  paragraph = 'paragraph',
  bulletList = 'bulletList',
  showMore = 'showMore',
  mentionSuggestion = 'mentionSuggestion',
  orderedList = 'orderedList',
  listItem = 'listItem',
  horizontalRule = 'horizontalRule',
}

export type MarksType = {
  type?: 'italic' | 'bold' | 'link' | 'strike' | 'textStyle' | 'highlight';
  text?: string;
  attrs?: {
    href: string;
    color: string;
  };
};

export type BlockType = {
  type: BlockTypeEnum;
  _id: string;
  text?: string;
  marks?: MarksType[];
  content?: BlockType[];
  attrs?: {
    id: string;
  };
  num?: number;
};
