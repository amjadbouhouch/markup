import PouchDB from 'pouchdb';
import pouchdbFind from 'pouchdb-find';
import { notify } from './pubsub';

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
export type DocsCallback<T> = (
  deleted: boolean,
  id: PouchDB.Core.DocumentId,
  doc?: PouchDB.Core.Document<T>
) => void;

export default class DataBase {
  blocks = new PouchDB<IBlock>('blocks');

  constructor() {
    this.blocks.info().then(console.info);
    this.blocks
      .changes({
        live: true,
        since: 'now',
      })
      .on('change', (change) => this.onDataChanged(change));
  }

  onDataChanged(change: PouchDB.Core.ChangesResponseChange<IBlock>) {
    if (change.deleted) {
      notify({
        _id: change.id,
        deleted: true,
        block: change.doc,
      });
    } else {
      this.blocks.get(change.id).then((doc) => {
        notify({
          _id: change.id,
          deleted: false,
          block: doc,
        });
      });
    }
  }
}
