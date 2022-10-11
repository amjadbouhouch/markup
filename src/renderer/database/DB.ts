import PouchDB from 'pouchdb';
import pouchdbFind from 'pouchdb-find';

PouchDB.plugin(pouchdbFind);
/**
 * https://dexie.org/docs/Tutorial/React
 */
export interface IBlock {
  _id: string;
  title: string;
  cover?: string;
  parentId?: string | null;
  isDeleted?: boolean;
  isFavorite?: boolean;
  icon?: string;
}

export default class DataBase {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  // blocks!: Table<IBlock, string>;
  blocks = new PouchDB<IBlock>('blocks');

  constructor() {
    this.blocks.info().then(console.info);
  }
}
