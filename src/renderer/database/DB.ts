import Dexie, { Table } from 'dexie';
/**
 * https://dexie.org/docs/Tutorial/React
 */
export interface Page {
  id?: number;
  title: string;
  content: string;
  cover?: string;
  parentId?: number | null;
  isDeleted?: boolean;
  isFavorite?: boolean;
  icon?: string;
}

export default class DataBase extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  pages!: Table<Page>;

  constructor() {
    super('markup');
    this.version(7).stores({
      pages:
        '++id, title, content, parentId, cover, isDeleted, isFavorite, icon', // Primary key and indexed props
    });
  }
}
