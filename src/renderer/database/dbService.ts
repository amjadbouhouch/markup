import { IndexableType } from 'dexie';
import { generateBlockId } from '../../utils/helpers';
import DataBase from './DB';

class DbService {
  private db: DataBase;

  constructor() {
    this.db = new DataBase();
  }

  async list(parentId: string | null = null) {
    const response = await this.db.blocks.find({
      selector: {
        parentId,
      },
    });
    console.warn(response.warning);
    return response.docs;
  }

  async create(title: string, parentId = null) {
    const _id = generateBlockId();
    const block = await this.db.blocks.put({
      title,
      _id,
      parentId,
      isDeleted: false,
      isFavorite: false,
    });
    return block.id;
  }

  async retrieve(id: string) {
    console.info(`get page by [id]= ${id}`);
    return this.db.blocks.get(id);
  }

  update(id: number, content = '') {
    console.info(`updatePageContent [id]= ${id}`);
    // return this.db.blocks.update(id, {
    //   content,
    // });
  }

  updatePageTitle(id: number, title: string) {
    console.info(`updatePageTitle [id]= ${id}, newTitle=${title}`);
    // return this.db.blocks.update(id, {
    //   title,
    // });
  }

  async toggleFavorite(id: IndexableType) {
    console.info(`toggleFavorite [id]= ${id}`);
    // const page = await this.getPageById(id);
    // if (!page) {
    //   return;
    // }
    // const isFavorite = Boolean(page?.isFavorite);
    // this.db.blocks.update(page!.id, {
    //   isFavorite: !isFavorite,
    // });
  }

  updatePageIcon(id: IndexableType, icon: string) {
    console.info(`updatePageIcon [id]=${id} & new Icon=${icon}`);
    // return this.db.blocks.update(id, {
    //   icon,
    // });
  }

  remove(id: IndexableType) {
    console.info(`removing [id]=${id}`);
    // return this.db.blocks.delete(id);
  }
}

const dbService = new DbService();
export default dbService;
