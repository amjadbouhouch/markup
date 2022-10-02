import { IndexableType } from 'dexie';
import DataBase from './DB';
/**
 * https://dexie.org/docs/Tutorial/React
 */
class DbService {
  private db: DataBase;

  constructor() {
    this.db = new DataBase();
  }

  findPages() {
    return this.db.pages.toArray();
  }

  createPage(title: string, parentId = null) {
    console.info(`Create new Page with [title]= ${title}`);
    return this.db.pages.add({
      content: '',
      title,
      parentId,
      isDeleted: false,
      isFavorite: false,
    });
  }

  getPageById(id: IndexableType) {
    console.info(`get page by [id]= ${id}`);
    return this.db.pages.get(id);
  }

  updatePageContent(id: number, content = '') {
    console.info(`updatePageContent [id]= ${id}`);
    return this.db.pages.update(id, {
      content,
    });
  }

  updatePageTitle(id: number, title: string) {
    console.info(`updatePageTitle [id]= ${id}, newTitle=${title}`);
    return this.db.pages.update(id, {
      title,
    });
  }

  async toggleFavorite(id: IndexableType) {
    console.info(`toggleFavorite [id]= ${id}`);
    const page = await this.getPageById(id);
    const isFavorite = !!page.isFavorite;
    this.db.pages.update(page!.id, {
      isFavorite: !isFavorite,
    });
  }

  updatePageIcon(id: IndexableType, icon: string) {
    console.info(`updatePageIcon [id]=${id} & new Icon=${icon}`);
    return this.db.pages.update(id, {
      icon,
    });
  }

  remove(id: IndexableType) {
    console.info(`removing [id]=${id}`);
    return this.db.pages.delete(id);
  }
}

const dbService = new DbService();
export default dbService;
