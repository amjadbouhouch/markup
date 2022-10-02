import Dexie, { Table } from 'dexie';

export interface Page {
  id?: number;
  name: string;
  content: string;
}

export default class DataBase extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  pages!: Table<Page>;

  constructor() {
    super('markup');
    this.version(1).stores({
      pages: '++id, name, content', // Primary key and indexed props
    });
  }
}
